import React, { useState, useEffect } from 'react';
import { Article, Comment, CurrentUser, ReadingPreferences } from '../types';
import { FormattedEssay } from './FormattedEssay';
import { DilemmaWidget } from './DilemmaWidget';
import { CommentSection } from './CommentSection';
import { essayAudio } from '../utils/speech';
import {
  Calendar,
  Clock,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Share2,
  Heart,
  Bookmark,
  MessageSquare,
  BookOpen,
  ArrowLeft,
  Sparkles,
  Award,
  ChevronRight,
  ExternalLink,
  Check
} from 'lucide-react';
import { countTotalComments } from '../utils/storage';

interface ArticleReaderProps {
  article: Article;
  comments: Comment[];
  currentUser: CurrentUser;
  preferences: ReadingPreferences;
  onBackToArchive?: () => void;
  onToggleLike: (articleId: string) => void;
  onToggleBookmark: (articleId: string) => void;
  onVoteDilemma: (articleId: string, optionId: string) => void;
  onAddComment: (articleId: string, content: string, quotedSnippet?: string) => void;
  onAddReply: (articleId: string, parentId: string, content: string, quotedSnippet?: string) => void;
  onToggleUpvoteComment: (articleId: string, commentId: string) => void;
  onDeleteComment?: (articleId: string, commentId: string) => void;
  onChangeUser: (user: CurrentUser) => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  comments,
  currentUser,
  preferences,
  onBackToArchive,
  onToggleLike,
  onToggleBookmark,
  onVoteDilemma,
  onAddComment,
  onAddReply,
  onToggleUpvoteComment,
  onDeleteComment,
  onChangeUser
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.95);
  const [copiedLink, setCopiedLink] = useState(false);
  const [pendingQuote, setPendingQuote] = useState<string | null>(null);

  // Scroll Progress Tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, current)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subscribe to speech synthesis state
  useEffect(() => {
    essayAudio.subscribe((playing) => {
      setIsPlayingAudio(playing);
    });

    return () => {
      essayAudio.stop();
    };
  }, [article.id]);

  const toggleAudioNarration = () => {
    if (isPlayingAudio) {
      essayAudio.pause();
    } else {
      if (window.speechSynthesis.paused) {
        essayAudio.resume();
      } else {
        const speechContent = `${article.title}. ${article.subtitle}. ${article.content}`;
        essayAudio.play(speechContent, speechRate);
      }
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleQuoteInDebate = (quote: string) => {
    setPendingQuote(quote);
  };

  const totalComments = countTotalComments(comments);

  return (
    <div className="relative pb-24">
      {/* Sticky Top Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#ede5d8] z-50">
        <div
          className="h-full bg-[#78350f] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8">
        {/* Breadcrumb / Issue Banner */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-2 text-xs">
            {onBackToArchive && (
              <button
                type="button"
                onClick={onBackToArchive}
                className="inline-flex items-center space-x-1 text-[#78350f] hover:underline font-semibold cursor-pointer mr-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Archive</span>
              </button>
            )}
            <span className="font-bold text-[#78350f] tracking-wide">
              ISSUE #{article.issueNumber}
            </span>
            <span className="text-[#d6cbbe]">•</span>
            <span className="font-medium text-[#786b5e]">
              {article.weekLabel}
            </span>
          </div>

          <span className="bg-[#f5ede3] text-[#78350f] text-xs font-bold px-3 py-1 rounded-full border border-[#decbb7]">
            {article.branch}
          </span>
        </div>

        {/* Title Header */}
        <header className="mb-8 text-center sm:text-left">
          <h1 className="font-display-title text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1c1917] tracking-tight leading-[1.15] mb-4">
            {article.title}
          </h1>

          <p className="font-serif-body italic text-lg sm:text-xl text-[#574c3e] leading-relaxed max-w-3xl mb-6">
            {article.subtitle}
          </p>

          {/* Author Byline & Audio Player Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-[#e7dfd5]">
            <div className="flex items-center space-x-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full object-cover border-2 border-[#d6cbbe]"
              />
              <div>
                <span className="font-bold text-sm text-[#1c1917] block">
                  {article.author.name}
                </span>
                <span className="text-xs text-[#786b5e]">
                  {article.author.title} · {article.readTimeMinutes} min read
                </span>
              </div>
            </div>

            {/* Audio Essay Narrator */}
            <div className="flex items-center space-x-2 bg-[#f5ede3] p-1.5 rounded-xl border border-[#decbb7] self-start sm:self-auto">
              <button
                type="button"
                onClick={toggleAudioNarration}
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#78350f] text-white text-xs font-semibold hover:bg-[#92400e] transition-colors cursor-pointer shadow-xs"
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlayingAudio ? 'Pause Narration' : 'Listen Aloud'}</span>
              </button>

              {isPlayingAudio && (
                <button
                  type="button"
                  onClick={() => essayAudio.stop()}
                  className="p-1.5 text-[#786b5e] hover:text-[#1c1917] transition-colors cursor-pointer"
                  title="Stop audio"
                >
                  <VolumeX className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Cover Artwork */}
        {article.coverImage && (
          <figure className="mb-10 rounded-2xl overflow-hidden border border-[#e2d8ca] shadow-xs">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full max-h-[440px] object-cover"
            />
            {article.coverCaption && (
              <figcaption className="p-3 bg-[#f5ede3] text-xs text-center text-[#786b5e] font-serif-body italic border-t border-[#e2d8ca]">
                {article.coverCaption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Core Thesis Highlight */}
        {article.summaryThesis && (
          <div className="mb-10 p-6 bg-[#fef9ee] border-l-4 border-[#78350f] rounded-r-2xl shadow-xs">
            <span className="text-xs font-bold uppercase tracking-widest text-[#92400e] block mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Weekly Core Thesis</span>
            </span>
            <p className="font-serif-body text-[17px] text-[#451a03] font-medium leading-relaxed">
              "{article.summaryThesis}"
            </p>
          </div>
        )}

        {/* Main Formatted Essay Body */}
        <div className="my-10">
          <FormattedEssay
            content={article.content}
            onQuoteSelect={handleQuoteInDebate}
            fontFamily={preferences.fontFamily}
            fontSize={preferences.fontSize}
          />
        </div>

        {/* Thought Experiment / Dilemma of the Week */}
        {article.dilemma && (
          <DilemmaWidget
            dilemma={article.dilemma}
            onVote={(optId) => onVoteDilemma(article.id, optId)}
          />
        )}

        {/* Scholarly References & Citations */}
        {article.references && article.references.length > 0 && (
          <div className="my-12 p-6 bg-white rounded-2xl border border-[#e7dfd5]">
            <h3 className="font-display-title text-base font-bold text-[#1c1917] uppercase tracking-wider mb-4 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-[#78350f]" />
              <span>Scholarly Citations & Further Reading</span>
            </h3>
            <ul className="space-y-3">
              {article.references.map((ref, idx) => (
                <li key={idx} className="text-xs text-[#574c3e] pl-4 border-l-2 border-[#d6cbbe]">
                  <span className="font-semibold text-[#1c1917]">{ref.author}</span>{' '}
                  {ref.year && <span className="font-mono text-[#8c7e6f]">({ref.year}). </span>}
                  <span className="italic">{ref.title}. </span>
                  {ref.note && <span className="text-[#786b5e] block mt-0.5">{ref.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Social Action Bar (Like, Bookmark, Jump to Debate, Share) */}
        <div className="my-10 py-4 px-6 bg-white rounded-2xl border border-[#e2d8ca] flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => onToggleLike(article.id)}
              className={`inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                article.isLiked
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : 'text-[#5c4a38] border-[#e2d8ca] hover:bg-[#faf6f0]'
              }`}
            >
              <Heart className={`w-4 h-4 ${article.isLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
              <span>{article.likesCount + (article.isLiked ? 1 : 0)}</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleBookmark(article.id)}
              className={`inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                article.isBookmarked
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'text-[#5c4a38] border-[#e2d8ca] hover:bg-[#faf6f0]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${article.isBookmarked ? 'fill-amber-700 text-amber-700' : ''}`} />
              <span>Save</span>
            </button>

            <a
              href="#dialectics-discussion"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#78350f] hover:underline"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{totalComments} {totalComments === 1 ? 'Perspective' : 'Perspectives'}</span>
            </a>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#5c4a38] hover:text-[#1c1917] px-3 py-1.5 rounded-lg border border-[#e2d8ca] hover:bg-[#faf6f0] transition-colors cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
          </button>
        </div>

        {/* Author Bio Card */}
        <div className="my-10 p-6 bg-[#f5ede3] rounded-2xl border border-[#decbb7] flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
          />
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#78350f] block mb-1">
              About the Author & Editor
            </span>
            <h4 className="font-display-title text-base font-bold text-[#1c1917]">
              {article.author.name}
            </h4>
            <p className="text-xs text-[#6b5c4d] mt-1 leading-relaxed">
              {article.author.bio}
            </p>
          </div>
        </div>

        {/* Reader Comments & Replies Section */}
        <CommentSection
          articleId={article.id}
          discussionPrompt={article.discussionPrompt}
          comments={comments}
          currentUser={currentUser}
          pendingQuote={pendingQuote}
          onClearPendingQuote={() => setPendingQuote(null)}
          onAddComment={(content, quote) => onAddComment(article.id, content, quote)}
          onAddReply={(parentId, content, quote) => onAddReply(article.id, parentId, content, quote)}
          onToggleUpvote={(cId) => onToggleUpvoteComment(article.id, cId)}
          onDeleteComment={currentUser.role === 'author' ? (cId) => onDeleteComment && onDeleteComment(article.id, cId) : undefined}
          onChangeUser={onChangeUser}
        />
      </div>
    </div>
  );
};
