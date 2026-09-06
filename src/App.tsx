/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Article, Comment, CurrentUser, ReadingPreferences } from './types';
import {
  getStoredArticles,
  saveStoredArticles,
  getStoredComments,
  saveStoredComments,
  insertReplyIntoTree,
  toggleUpvoteInTree,
  getStoredPreferences,
  saveStoredPreferences,
  getStoredUser,
  saveStoredUser
} from './utils/storage';
import { Header } from './components/Header';
import { ArticleReader } from './components/ArticleReader';
import { WeeklyArchive } from './components/WeeklyArchive';
import { AboutManifesto } from './components/AboutManifesto';
import { AuthorStudioModal } from './components/AuthorStudioModal';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(() => getStoredArticles());
  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>(() => getStoredComments());
  const [currentArticleId, setCurrentArticleId] = useState<string>(() => {
    const list = getStoredArticles();
    return list[0]?.id || 'issue-36-algorithmic-self';
  });
  const [currentView, setCurrentView] = useState<'current' | 'archive' | 'about'>('current');
  const [preferences, setPreferences] = useState<ReadingPreferences>(() => getStoredPreferences());
  const [currentUser, setCurrentUser] = useState<CurrentUser>(() => getStoredUser());
  const [isAuthorStudioOpen, setIsAuthorStudioOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Sync to storage
  useEffect(() => {
    saveStoredArticles(articles);
  }, [articles]);

  useEffect(() => {
    saveStoredComments(commentsMap);
  }, [commentsMap]);

  useEffect(() => {
    saveStoredPreferences(preferences);
  }, [preferences]);

  useEffect(() => {
    saveStoredUser(currentUser);
  }, [currentUser]);

  const currentArticle = articles.find((a) => a.id === currentArticleId) || articles[0];
  const currentComments = commentsMap[currentArticle?.id] || [];

  // Toggle user role between author and reader
  const handleToggleRole = () => {
    setCurrentUser((prev) => ({
      ...prev,
      role: prev.role === 'author' ? 'reader' : 'author',
      name: prev.role === 'author' ? 'Inquiring Scholar' : 'Dr. Alistair Vance',
      schoolOfThought: prev.role === 'author' ? 'Curious Skeptic' : 'Author & Editor'
    }));
  };

  // Open Author Studio
  const handleOpenNewIssue = () => {
    setEditingArticle(null);
    setIsAuthorStudioOpen(true);
  };

  const handleEditIssue = (articleToEdit: Article) => {
    setEditingArticle(articleToEdit);
    setIsAuthorStudioOpen(true);
  };

  // Save new or edited article from Author Studio
  const handleSaveArticle = (savedArticle: Article) => {
    setArticles((prev) => {
      const existsIndex = prev.findIndex((a) => a.id === savedArticle.id);
      if (existsIndex >= 0) {
        const copy = [...prev];
        copy[existsIndex] = savedArticle;
        return copy;
      } else {
        // Prepend as latest weekly issue
        return [savedArticle, ...prev];
      }
    });

    setCurrentArticleId(savedArticle.id);
    setCurrentView('current');
  };

  // Delete article
  const handleDeleteArticle = (articleId: string) => {
    setArticles((prev) => {
      const filtered = prev.filter((a) => a.id !== articleId);
      if (currentArticleId === articleId && filtered.length > 0) {
        setCurrentArticleId(filtered[0].id);
      }
      return filtered;
    });
  };

  // Comment Actions
  const handleAddComment = (articleId: string, content: string, quotedSnippet?: string) => {
    const isAuthor = currentUser.role === 'author';
    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      articleId,
      authorName: currentUser.name,
      authorAvatar: isAuthor
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        : undefined,
      isAuthor,
      schoolOfThought: isAuthor ? "Author's Rejoinder" : currentUser.schoolOfThought,
      content,
      quotedText: quotedSnippet,
      timestamp: 'Just now',
      createdAt: Date.now(),
      upvotes: 1,
      userVoted: true,
      parentId: null,
      replies: []
    };

    setCommentsMap((prev) => {
      const existing = prev[articleId] || [];
      return {
        ...prev,
        [articleId]: [newComment, ...existing]
      };
    });
  };

  // Reply to nested comment
  const handleAddReply = (articleId: string, parentId: string, content: string, quotedSnippet?: string) => {
    const isAuthor = currentUser.role === 'author';
    const newReply: Comment = {
      id: `rep-${Date.now()}`,
      articleId,
      authorName: currentUser.name,
      authorAvatar: isAuthor
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        : undefined,
      isAuthor,
      schoolOfThought: isAuthor ? "Author's Rejoinder" : currentUser.schoolOfThought,
      content,
      quotedText: quotedSnippet,
      timestamp: 'Just now',
      createdAt: Date.now(),
      upvotes: 1,
      userVoted: true,
      parentId,
      replies: []
    };

    setCommentsMap((prev) => {
      const existing = [...(prev[articleId] || [])];
      insertReplyIntoTree(existing, parentId, newReply);
      return {
        ...prev,
        [articleId]: existing
      };
    });
  };

  // Upvote comment
  const handleToggleUpvoteComment = (articleId: string, commentId: string) => {
    setCommentsMap((prev) => {
      const existing = [...(prev[articleId] || [])];
      toggleUpvoteInTree(existing, commentId);
      return {
        ...prev,
        [articleId]: existing
      };
    });
  };

  // Delete comment (author privilege)
  const handleDeleteComment = (articleId: string, commentId: string) => {
    const filterComment = (list: Comment[]): Comment[] => {
      return list
        .filter((c) => c.id !== commentId)
        .map((c) => ({
          ...c,
          replies: c.replies ? filterComment(c.replies) : []
        }));
    };

    setCommentsMap((prev) => {
      const existing = prev[articleId] || [];
      return {
        ...prev,
        [articleId]: filterComment(existing)
      };
    });
  };

  // Vote on Thought Experiment Dilemma
  const handleVoteDilemma = (articleId: string, optionId: string) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id !== articleId || !art.dilemma) return art;

        const alreadyVotedOption = art.dilemma.userVotedOptionId;
        const updatedOptions = art.dilemma.options.map((opt) => {
          if (opt.id === optionId) {
            return { ...opt, votes: opt.votes + 1 };
          }
          if (alreadyVotedOption && opt.id === alreadyVotedOption) {
            return { ...opt, votes: Math.max(0, opt.votes - 1) };
          }
          return opt;
        });

        return {
          ...art,
          dilemma: {
            ...art.dilemma,
            options: updatedOptions,
            userVotedOptionId: optionId
          }
        };
      })
    );
  };

  // Like Article
  const handleToggleLike = (articleId: string) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id !== articleId) return art;
        const isLiked = !art.isLiked;
        return {
          ...art,
          isLiked,
          likesCount: isLiked ? art.likesCount + 1 : Math.max(0, art.likesCount - 1)
        };
      })
    );
  };

  // Bookmark Article
  const handleToggleBookmark = (articleId: string) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id !== articleId) return art;
        const isBookmarked = !art.isBookmarked;
        return {
          ...art,
          isBookmarked,
          bookmarksCount: isBookmarked ? art.bookmarksCount + 1 : Math.max(0, art.bookmarksCount - 1)
        };
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1c1917]">
      {/* Editorial Header */}
      <Header
        currentView={currentView}
        onSelectView={(v) => setCurrentView(v)}
        currentUser={currentUser}
        onToggleRole={handleToggleRole}
        onOpenAuthorStudio={handleOpenNewIssue}
        preferences={preferences}
        onChangePreferences={setPreferences}
        currentIssueNumber={currentArticle?.issueNumber || 36}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'current' && currentArticle && (
          <ArticleReader
            article={currentArticle}
            comments={currentComments}
            currentUser={currentUser}
            preferences={preferences}
            onBackToArchive={() => setCurrentView('archive')}
            onToggleLike={handleToggleLike}
            onToggleBookmark={handleToggleBookmark}
            onVoteDilemma={handleVoteDilemma}
            onAddComment={handleAddComment}
            onAddReply={handleAddReply}
            onToggleUpvoteComment={handleToggleUpvoteComment}
            onDeleteComment={handleDeleteComment}
            onChangeUser={setCurrentUser}
          />
        )}

        {currentView === 'archive' && (
          <WeeklyArchive
            articles={articles}
            comments={commentsMap}
            onSelectArticle={(selected) => {
              setCurrentArticleId(selected.id);
              setCurrentView('current');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onEditArticle={handleEditIssue}
            onDeleteArticle={handleDeleteArticle}
            isAuthor={currentUser.role === 'author'}
          />
        )}

        {currentView === 'about' && (
          <AboutManifesto
            onStartReading={() => {
              setCurrentView('current');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Author Publishing Studio Modal */}
      <AuthorStudioModal
        isOpen={isAuthorStudioOpen}
        onClose={() => setIsAuthorStudioOpen(false)}
        onSaveArticle={handleSaveArticle}
        editingArticle={editingArticle}
        currentIssueCount={articles.length}
      />

      {/* Journal Colophon Footer */}
      <footer className="mt-auto border-t border-[#e7dfd5] bg-[#f5ede3] py-10 px-4 sm:px-8 text-xs text-[#786b5e]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="font-display-title font-bold text-sm text-[#1c1917] block">
              THE WEEKLY DIALECTIC
            </span>
            <p className="mt-1 font-serif-body italic text-[#6b5c4d]">
              Published every Friday. Dedicated to contemplative inquiry, ethical rigor, and respectful debate.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setCurrentView('current')}
              className="hover:text-[#1c1917] cursor-pointer"
            >
              Current Inquiry
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setCurrentView('archive')}
              className="hover:text-[#1c1917] cursor-pointer"
            >
              Archive
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setCurrentView('about')}
              className="hover:text-[#1c1917] cursor-pointer"
            >
              Manifesto
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={handleOpenNewIssue}
              className="text-[#78350f] font-semibold hover:underline cursor-pointer"
            >
              Author Studio
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
