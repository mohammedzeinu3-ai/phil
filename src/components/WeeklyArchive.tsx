import React, { useState } from 'react';
import { Article, BranchOfPhilosophy, Comment } from '../types';
import { Search, Calendar, Clock, MessageSquare, BookOpen, Edit, Trash2, Tag } from 'lucide-react';
import { countTotalComments } from '../utils/storage';

interface WeeklyArchiveProps {
  articles: Article[];
  comments: Record<string, Comment[]>;
  onSelectArticle: (article: Article) => void;
  onEditArticle?: (article: Article) => void;
  onDeleteArticle?: (articleId: string) => void;
  isAuthor: boolean;
}

const BRANCH_FILTERS: (BranchOfPhilosophy | 'All')[] = [
  'All',
  'Existentialism',
  'Ethics',
  'Epistemology',
  'Metaphysics',
  'Philosophy of Mind',
  'Political Philosophy',
  'Aesthetics'
];

export const WeeklyArchive: React.FC<WeeklyArchiveProps> = ({
  articles,
  comments,
  onSelectArticle,
  onEditArticle,
  onDeleteArticle,
  isAuthor
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<BranchOfPhilosophy | 'All'>('All');

  const filteredArticles = articles.filter((art) => {
    const matchesBranch = selectedBranch === 'All' || art.branch === selectedBranch;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      art.title.toLowerCase().includes(query) ||
      art.subtitle.toLowerCase().includes(query) ||
      art.summaryThesis.toLowerCase().includes(query) ||
      art.content.toLowerCase().includes(query) ||
      art.branch.toLowerCase().includes(query);

    return matchesBranch && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
      {/* Archive Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase font-bold tracking-widest text-[#78350f]">
          Historical Catalog
        </span>
        <h2 className="font-display-title text-3xl sm:text-4xl font-extrabold text-[#1c1917] mt-1 mb-2">
          The Weekly Journal Archive
        </h2>
        <p className="font-serif-body italic text-base text-[#6b5c4d]">
          Every Friday, an inquiry is published. Browse past editions, read the full essays, and enter past dialectic threads.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 text-[#8c7e6f] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts (e.g., bad faith, consciousness, Socrates, hedonism)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#d6cbbe] bg-white text-sm text-[#1c1917] placeholder:text-[#a89988] focus:ring-2 focus:ring-[#78350f] focus:outline-hidden shadow-xs"
          />
        </div>

        {/* Branch Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
          {BRANCH_FILTERS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setSelectedBranch(b)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedBranch === b
                  ? 'bg-[#78350f] text-white shadow-xs'
                  : 'bg-[#ede5d8] text-[#5c4a38] hover:bg-[#e2d6c3]'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Article Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-white/70 rounded-2xl border border-dashed border-[#d6cbbe]">
          <BookOpen className="w-10 h-10 text-[#a89988] mx-auto mb-3" />
          <h3 className="font-display-title text-lg font-bold text-[#1c1917]">
            No Inquiries Found
          </h3>
          <p className="text-sm text-[#786b5e] mt-1">
            No published issues match your search query or philosophical branch filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const articleComments = comments[article.id] || [];
            const commentCount = countTotalComments(articleComments);

            return (
              <article
                key={article.id}
                className="bg-white rounded-2xl border border-[#e2d8ca] overflow-hidden shadow-xs hover:shadow-md hover:border-[#cfc0ae] transition-all flex flex-col group"
              >
                {/* Cover Image */}
                <div
                  onClick={() => onSelectArticle(article)}
                  className="h-48 overflow-hidden relative cursor-pointer"
                >
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#1c1917]/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                    Issue #{article.issueNumber}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#78350f] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
                    {article.branch}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-[#8c7e6f] font-mono mb-1.5 flex items-center space-x-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{article.publishDate}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTimeMinutes} min read</span>
                      </span>
                    </div>

                    <h3
                      onClick={() => onSelectArticle(article)}
                      className="font-display-title text-xl font-bold text-[#1c1917] group-hover:text-[#78350f] transition-colors line-clamp-2 cursor-pointer"
                    >
                      {article.title}
                    </h3>

                    <p className="font-serif-body text-sm text-[#5c4a38] mt-2 line-clamp-3 leading-relaxed">
                      {article.summaryThesis}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-5 pt-3 border-t border-[#f0e8dc] flex items-center justify-between text-xs text-[#8c7e6f]">
                    <div className="flex items-center space-x-1.5 font-medium text-[#78350f]">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{commentCount} {commentCount === 1 ? 'debate' : 'debates'}</span>
                    </div>

                    {/* Author Management Actions */}
                    {isAuthor ? (
                      <div className="flex items-center space-x-2">
                        {onEditArticle && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditArticle(article);
                            }}
                            className="p-1 hover:text-[#78350f] transition-colors cursor-pointer"
                            title="Edit this issue"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {onDeleteArticle && articles.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`Are you certain you wish to delete Issue #${article.issueNumber}?`)) {
                                onDeleteArticle(article.id);
                              }
                            }}
                            className="p-1 hover:text-red-600 transition-colors cursor-pointer"
                            title="Delete this issue"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSelectArticle(article)}
                        className="font-semibold text-[#78350f] hover:underline cursor-pointer"
                      >
                        Read Inquiry →
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
