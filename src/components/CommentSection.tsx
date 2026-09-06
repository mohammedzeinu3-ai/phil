import React, { useState } from 'react';
import { Comment, CurrentUser } from '../types';
import { CommentItem } from './CommentItem';
import {
  MessageSquare,
  Sparkles,
  Quote,
  Filter,
  ArrowUpDown,
  Send,
  HelpCircle,
  Award,
  Users
} from 'lucide-react';
import { countTotalComments } from '../utils/storage';

interface CommentSectionProps {
  articleId: string;
  discussionPrompt?: string;
  comments: Comment[];
  currentUser: CurrentUser;
  pendingQuote?: string | null;
  onClearPendingQuote?: () => void;
  onAddComment: (content: string, quotedSnippet?: string) => void;
  onAddReply: (parentId: string, content: string, quotedSnippet?: string) => void;
  onToggleUpvote: (commentId: string) => void;
  onDeleteComment?: (commentId: string) => void;
  onChangeUser: (user: CurrentUser) => void;
}

const PHILOSOPHICAL_SCHOOLS = [
  'Existentialist',
  'Stoic',
  'Kantian Rationalist',
  'Utilitarian',
  'Phenomenologist',
  'Critical Theorist',
  'Aristotelian',
  'Curious Skeptic',
  'Pragmatist',
  'Absurdist'
];

export const CommentSection: React.FC<CommentSectionProps> = ({
  articleId,
  discussionPrompt,
  comments,
  currentUser,
  pendingQuote,
  onClearPendingQuote,
  onAddComment,
  onAddReply,
  onToggleUpvote,
  onDeleteComment,
  onChangeUser
}) => {
  const [newCommentContent, setNewCommentContent] = useState('');
  const [sortBy, setSortBy] = useState<'top' | 'newest' | 'author'>('top');
  const [activeQuotedSnippet, setActiveQuotedSnippet] = useState<string | null>(null);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [tempName, setTempName] = useState(currentUser.name);
  const [tempSchool, setTempSchool] = useState(currentUser.schoolOfThought);

  // Synchronize incoming quote from article text
  React.useEffect(() => {
    if (pendingQuote) {
      setActiveQuotedSnippet(pendingQuote);
      // Scroll to comment composer
      const composer = document.getElementById('comment-composer-box');
      if (composer) {
        composer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [pendingQuote]);

  const handleSubmitRootComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentContent.trim()) return;

    onAddComment(newCommentContent.trim(), activeQuotedSnippet || undefined);
    setNewCommentContent('');
    setActiveQuotedSnippet(null);
    if (onClearPendingQuote) onClearPendingQuote();
  };

  const handleSaveUser = () => {
    onChangeUser({
      ...currentUser,
      name: tempName.trim() || 'Anonymous Philosopher',
      schoolOfThought: tempSchool
    });
    setIsEditingUser(false);
  };

  // Sorting comments
  const sortedComments = React.useMemo(() => {
    const list = [...comments];
    if (sortBy === 'top') {
      return list.sort((a, b) => b.upvotes - a.upvotes);
    }
    if (sortBy === 'newest') {
      return list.sort((a, b) => b.createdAt - a.createdAt);
    }
    if (sortBy === 'author') {
      return list.filter(c => c.isAuthor || c.replies?.some(r => r.isAuthor));
    }
    return list;
  }, [comments, sortBy]);

  const totalCount = countTotalComments(comments);

  return (
    <section id="dialectics-discussion" className="mt-16 pt-12 border-t-2 border-[#e7dfd5]">
      {/* Section Masthead */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#78350f] mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>The Agora of Ideas</span>
          </div>
          <h2 className="font-display-title text-2xl sm:text-3xl font-bold text-[#1c1917] flex items-center gap-3">
            <span>Reader Dialectics & Rejoinders</span>
            <span className="text-base font-sans font-medium px-3 py-0.5 rounded-full bg-[#ede5d8] text-[#5c4a38]">
              {totalCount} {totalCount === 1 ? 'perspective' : 'perspectives'}
            </span>
          </h2>
          <p className="text-sm text-[#786b5e] mt-1 font-serif-body italic">
            Where thoughtful critique, counterarguments, and nuanced rejoinders take shape.
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-[#8c7e6f] flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort by:</span>
          </span>
          <div className="inline-flex rounded-lg border border-[#d6cbbe] p-0.5 bg-[#f5ede3]">
            <button
              type="button"
              onClick={() => setSortBy('top')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                sortBy === 'top' ? 'bg-white text-[#1c1917] shadow-xs' : 'text-[#6b5c4d] hover:text-[#1c1917]'
              }`}
            >
              Top Insights
            </button>
            <button
              type="button"
              onClick={() => setSortBy('newest')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                sortBy === 'newest' ? 'bg-white text-[#1c1917] shadow-xs' : 'text-[#6b5c4d] hover:text-[#1c1917]'
              }`}
            >
              Newest
            </button>
            <button
              type="button"
              onClick={() => setSortBy('author')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                sortBy === 'author' ? 'bg-white text-[#1c1917] shadow-xs' : 'text-[#6b5c4d] hover:text-[#1c1917]'
              }`}
            >
              Author Replies
            </button>
          </div>
        </div>
      </div>

      {/* Discussion Catalyst Box */}
      {discussionPrompt && (
        <div className="mb-8 p-5 bg-[#fef9ee] border border-[#f59e0b]/40 rounded-xl shadow-xs">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-[#fde68a]/60 text-[#92400e] rounded-lg mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#92400e]">
                Weekly Inquiry for Readers
              </span>
              <p className="text-[15px] font-medium text-[#451a03] mt-1 leading-relaxed">
                "{discussionPrompt}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Root Comment Composer */}
      <div
        id="comment-composer-box"
        className="mb-10 p-5 sm:p-6 bg-white rounded-2xl border border-[#e2d8ca] shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#f0e8dc]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#78350f] text-white text-xs font-bold flex items-center justify-center">
              {currentUser.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-[#1c1917]">
                  {currentUser.name}
                </span>
                {currentUser.role === 'author' ? (
                  <span className="bg-[#fef3c7] text-[#92400e] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#fde68a]">
                    Author Mode
                  </span>
                ) : (
                  <span className="bg-[#ede5d8] text-[#5c4a38] text-[11px] font-medium px-2 py-0.5 rounded-full">
                    {currentUser.schoolOfThought}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setTempName(currentUser.name);
              setTempSchool(currentUser.schoolOfThought);
              setIsEditingUser(!isEditingUser);
            }}
            className="text-xs text-[#78350f] hover:underline self-start sm:self-auto cursor-pointer"
          >
            {isEditingUser ? 'Close moniker editor' : 'Customize moniker / school'}
          </button>
        </div>

        {/* Identity Customizer Panel */}
        {isEditingUser && (
          <div className="mb-4 p-4 bg-[#faf6f0] rounded-xl border border-[#decbb7] space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#5c4a38] mb-1">
                  Your Display Name
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="e.g. Diogenes of Sinope, Elena Rostova"
                  className="w-full text-sm p-2 rounded-lg border border-[#d6cbbe] bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#5c4a38] mb-1">
                  Philosophical School / Stance
                </label>
                <select
                  value={tempSchool}
                  onChange={(e) => setTempSchool(e.target.value)}
                  className="w-full text-sm p-2 rounded-lg border border-[#d6cbbe] bg-white"
                >
                  {PHILOSOPHICAL_SCHOOLS.map((school) => (
                    <option key={school} value={school}>
                      {school}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveUser}
                className="px-3 py-1.5 text-xs font-semibold bg-[#78350f] text-white rounded-lg hover:bg-[#92400e] cursor-pointer"
              >
                Apply Moniker
              </button>
            </div>
          </div>
        )}

        {/* Quoted Snippet Indicator */}
        {activeQuotedSnippet && (
          <div className="mb-3 p-3 bg-[#f5ede3] border-l-3 border-[#78350f] rounded-r-lg flex items-start justify-between text-xs">
            <div className="flex items-start space-x-2">
              <Quote className="w-4 h-4 text-[#78350f] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#78350f] block mb-0.5">Quoting passage from essay:</span>
                <span className="italic text-[#4a3b2c]">"{activeQuotedSnippet}"</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveQuotedSnippet(null);
                if (onClearPendingQuote) onClearPendingQuote();
              }}
              className="text-[#a89988] hover:text-[#1c1917] p-1 cursor-pointer"
              title="Remove quoted passage"
            >
              ✕
            </button>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmitRootComment}>
          <textarea
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            placeholder="Introduce your premise, challenge the author's logic, or present an alternative philosophical viewpoint..."
            rows={4}
            className="w-full p-3.5 text-[15px] rounded-xl border border-[#d6cbbe] bg-[#faf8f5] text-[#1c1917] placeholder:text-[#a89988] focus:outline-hidden focus:ring-2 focus:ring-[#78350f] focus:bg-white resize-y leading-relaxed"
          />

          <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5 text-xs text-[#786b5e]">
              <span className="text-[11px] self-center mr-1">Prefix idea:</span>
              <button
                type="button"
                onClick={() => setNewCommentContent(prev => prev ? `[Counterpoint]: ${prev}` : '[Counterpoint]: ')}
                className="px-2 py-0.5 rounded bg-[#f5ede3] hover:bg-[#ebe0d1] text-[#574c3e] cursor-pointer"
              >
                + Counterpoint
              </button>
              <button
                type="button"
                onClick={() => setNewCommentContent(prev => prev ? `[Thought Experiment]: ${prev}` : '[Thought Experiment]: ')}
                className="px-2 py-0.5 rounded bg-[#f5ede3] hover:bg-[#ebe0d1] text-[#574c3e] cursor-pointer"
              >
                + Thought Experiment
              </button>
              <button
                type="button"
                onClick={() => setNewCommentContent(prev => prev ? `[Question for Author]: ${prev}` : '[Question for Author]: ')}
                className="px-2 py-0.5 rounded bg-[#f5ede3] hover:bg-[#ebe0d1] text-[#574c3e] cursor-pointer"
              >
                + Question for Author
              </button>
            </div>

            <button
              type="submit"
              disabled={!newCommentContent.trim()}
              className="inline-flex items-center justify-center space-x-2 px-5 py-2 rounded-xl bg-[#78350f] hover:bg-[#92400e] text-white text-sm font-semibold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Publish Comment</span>
            </button>
          </div>
        </form>
      </div>

      {/* Comment List */}
      {sortedComments.length === 0 ? (
        <div className="text-center py-12 px-4 bg-white/60 rounded-2xl border border-dashed border-[#d6cbbe]">
          <MessageSquare className="w-10 h-10 text-[#a89988] mx-auto mb-3" />
          <h3 className="font-display-title text-lg font-bold text-[#1c1917]">
            Be the First Interlocutor
          </h3>
          <p className="text-sm text-[#786b5e] max-w-md mx-auto mt-1">
            No perspectives have been recorded on this weekly inquiry yet. Step forward and present your thesis or challenge the author's premises.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUser={currentUser}
              onAddReply={onAddReply}
              onToggleUpvote={onToggleUpvote}
              onDeleteComment={onDeleteComment}
              depth={0}
            />
          ))}
        </div>
      )}
    </section>
  );
};
