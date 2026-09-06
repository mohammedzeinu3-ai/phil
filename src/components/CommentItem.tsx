import React, { useState } from 'react';
import { Comment, CurrentUser } from '../types';
import { MessageSquare, ThumbsUp, CornerDownRight, Quote, ShieldCheck, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

interface CommentItemProps {
  comment: Comment;
  currentUser: CurrentUser;
  onAddReply: (parentId: string, content: string, quotedSnippet?: string) => void;
  onToggleUpvote: (commentId: string) => void;
  onDeleteComment?: (commentId: string) => void;
  depth?: number;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  currentUser,
  onAddReply,
  onToggleUpvote,
  onDeleteComment,
  depth = 0
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [quotedSnippet, setQuotedSnippet] = useState<string | undefined>(undefined);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const maxVisualIndentDepth = 4;
  const currentIndent = Math.min(depth, maxVisualIndentDepth);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    onAddReply(comment.id, replyContent.trim(), quotedSnippet);
    setReplyContent('');
    setQuotedSnippet(undefined);
    setIsReplying(false);
  };

  const handleQuoteThisComment = () => {
    setQuotedSnippet(comment.content.slice(0, 150) + (comment.content.length > 150 ? '...' : ''));
    setIsReplying(true);
  };

  const repliesCount = comment.replies?.length || 0;

  return (
    <div
      id={`comment-${comment.id}`}
      className={`relative group ${currentIndent > 0 ? 'ml-3 sm:ml-6 pl-3 sm:pl-5 border-l-2 border-[#e6ded2]' : ''}`}
    >
      <div
        className={`p-4 sm:p-5 rounded-xl transition-all duration-200 ${
          comment.isAuthor
            ? 'bg-[#fef9ee] border border-[#f59e0b]/30 shadow-xs'
            : 'bg-[#faf6f0] border border-[#ebe3d5] hover:border-[#dfd4c3]'
        }`}
      >
        {/* Comment Header */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center space-x-2.5">
            {comment.authorAvatar ? (
              <img
                src={comment.authorAvatar}
                alt={comment.authorName}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-[#d6cbbe]"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#e8dece] text-[#78350f] font-semibold text-xs flex items-center justify-center border border-[#d6cbbe]">
                {comment.authorName.slice(0, 2).toUpperCase()}
              </div>
            )}

            <div>
              <div className="flex items-center flex-wrap gap-1.5">
                <span className="font-semibold text-sm text-[#1c1917]">
                  {comment.authorName}
                </span>

                {comment.isAuthor ? (
                  <span className="inline-flex items-center space-x-1 bg-[#fef3c7] text-[#92400e] text-[11px] font-bold px-2 py-0.5 rounded-full border border-[#fde68a]">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Essay Author</span>
                  </span>
                ) : comment.schoolOfThought ? (
                  <span className="bg-[#ede5d8] text-[#574c3e] text-[11px] font-medium px-2 py-0.5 rounded-full">
                    {comment.schoolOfThought}
                  </span>
                ) : null}
              </div>

              <span className="text-[12px] text-[#8c7e6f]">
                {comment.timestamp}
              </span>
            </div>
          </div>

          {/* Upvote & Action Header */}
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={() => onToggleUpvote(comment.id)}
              className={`flex items-center space-x-1 text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                comment.userVoted
                  ? 'bg-[#78350f] text-white border-[#78350f]'
                  : 'bg-white/80 text-[#5c4a38] border-[#e2d8ca] hover:bg-[#ede5d8]'
              }`}
              title="Commend this philosophical insight"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span className="font-semibold">{comment.upvotes}</span>
            </button>

            {currentUser.role === 'author' && onDeleteComment && (
              <button
                type="button"
                onClick={() => onDeleteComment(comment.id)}
                className="text-[#a89988] hover:text-red-600 p-1 rounded transition-colors cursor-pointer"
                title="Moderate comment (Author privilege)"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Quoted Snippet if replying to a passage */}
        {comment.quotedText && (
          <div className="my-2.5 pl-3 border-l-2 border-[#b45309] bg-[#f5ede3]/70 py-1.5 pr-2.5 rounded-r text-xs italic text-[#5c4a38]">
            <Quote className="w-3 h-3 inline mr-1 text-[#b45309]" />
            "{comment.quotedText}"
          </div>
        )}

        {/* Comment Body */}
        <p className="text-[15px] leading-relaxed text-[#292524] whitespace-pre-wrap">
          {comment.content}
        </p>

        {/* Footer Actions: Reply, Quote, Expand */}
        <div className="mt-3.5 pt-2 border-t border-[#ebe3d5]/70 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsReplying(!isReplying)}
              className="inline-flex items-center space-x-1.5 text-[#78350f] font-semibold hover:text-[#92400e] px-2 py-1 rounded hover:bg-[#f3ece0] transition-colors cursor-pointer"
            >
              <CornerDownRight className="w-3.5 h-3.5" />
              <span>Reply</span>
            </button>

            <button
              type="button"
              onClick={handleQuoteThisComment}
              className="inline-flex items-center space-x-1 text-[#6b5c4d] hover:text-[#2c2825] px-2 py-1 rounded hover:bg-[#f3ece0] transition-colors cursor-pointer"
            >
              <Quote className="w-3 h-3" />
              <span>Quote</span>
            </button>
          </div>

          {repliesCount > 0 && (
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-[#8c7e6f] hover:text-[#574c3e] flex items-center space-x-1 cursor-pointer"
            >
              <span>{repliesCount} {repliesCount === 1 ? 'reply' : 'replies'}</span>
              {isCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Inline Reply Form */}
      {isReplying && (
        <form
          onSubmit={handleSendReply}
          className="mt-3 mb-4 p-3.5 bg-[#f5ede3] rounded-xl border border-[#decbb7] shadow-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#5c4a38] flex items-center space-x-1.5">
              <span>Replying as</span>
              <strong className="text-[#1c1917]">{currentUser.name}</strong>
              {currentUser.role === 'author' && (
                <span className="bg-[#fef3c7] text-[#92400e] text-[10px] px-1.5 py-0.2 rounded font-bold">
                  Author
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsReplying(false);
                setQuotedSnippet(undefined);
              }}
              className="text-xs text-[#8c7e6f] hover:text-[#332b24] cursor-pointer"
            >
              Cancel
            </button>
          </div>

          {quotedSnippet && (
            <div className="mb-2 p-2 bg-white/70 border-l-2 border-[#78350f] rounded-r text-xs text-[#574c3e] flex items-center justify-between">
              <span className="italic truncate">"{quotedSnippet}"</span>
              <button
                type="button"
                onClick={() => setQuotedSnippet(undefined)}
                className="text-xs text-[#a89988] hover:text-red-600 ml-2"
              >
                ✕
              </button>
            </div>
          )}

          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder={`Formulate your reply to ${comment.authorName}... (support your thesis or challenge their premises)`}
            rows={3}
            autoFocus
            className="w-full text-sm p-3 rounded-lg border border-[#d6cbbe] bg-white text-[#1c1917] placeholder:text-[#a89988] focus:outline-hidden focus:ring-2 focus:ring-[#78350f] resize-y"
          />

          <div className="mt-2.5 flex items-center justify-between">
            <div className="text-[11px] text-[#8c7e6f]">
              Constructive dialectic: focus on arguments over persons.
            </div>

            <button
              type="submit"
              disabled={!replyContent.trim()}
              className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#78350f] text-white hover:bg-[#92400e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs cursor-pointer"
            >
              Post Reply
            </button>
          </div>
        </form>
      )}

      {/* Nested Replies */}
      {!isCollapsed && comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              onAddReply={onAddReply}
              onToggleUpvote={onToggleUpvote}
              onDeleteComment={onDeleteComment}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
