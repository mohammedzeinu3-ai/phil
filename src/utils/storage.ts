import { Article, Comment, ReadingPreferences, CurrentUser, ThoughtExperiment } from '../types';
import { INITIAL_ARTICLES } from '../data/initialArticles';
import { INITIAL_COMMENTS } from '../data/initialComments';

const ARTICLES_KEY = 'the_weekly_dialectic_articles_v1';
const COMMENTS_KEY = 'the_weekly_dialectic_comments_v1';
const PREFERENCES_KEY = 'the_weekly_dialectic_preferences_v1';
const USER_KEY = 'the_weekly_dialectic_user_v1';

export function getStoredArticles(): Article[] {
  try {
    const raw = localStorage.getItem(ARTICLES_KEY);
    if (!raw) {
      localStorage.setItem(ARTICLES_KEY, JSON.stringify(INITIAL_ARTICLES));
      return INITIAL_ARTICLES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load articles from storage:', err);
    return INITIAL_ARTICLES;
  }
}

export function saveStoredArticles(articles: Article[]): void {
  try {
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
  } catch (err) {
    console.error('Failed to save articles to storage:', err);
  }
}

export function getStoredComments(): Record<string, Comment[]> {
  try {
    const raw = localStorage.getItem(COMMENTS_KEY);
    if (!raw) {
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(INITIAL_COMMENTS));
      return INITIAL_COMMENTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load comments from storage:', err);
    return INITIAL_COMMENTS;
  }
}

export function saveStoredComments(comments: Record<string, Comment[]>): void {
  try {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  } catch (err) {
    console.error('Failed to save comments to storage:', err);
  }
}

// Helper to recursively find and attach a reply to a comment tree
export function insertReplyIntoTree(comments: Comment[], parentId: string, reply: Comment): boolean {
  for (const c of comments) {
    if (c.id === parentId) {
      if (!c.replies) c.replies = [];
      c.replies.push(reply);
      return true;
    }
    if (c.replies && c.replies.length > 0) {
      const found = insertReplyIntoTree(c.replies, parentId, reply);
      if (found) return true;
    }
  }
  return false;
}

// Helper to recursively update an upvote in the comment tree
export function toggleUpvoteInTree(comments: Comment[], commentId: string): boolean {
  for (const c of comments) {
    if (c.id === commentId) {
      c.userVoted = !c.userVoted;
      c.upvotes += c.userVoted ? 1 : -1;
      return true;
    }
    if (c.replies && c.replies.length > 0) {
      const found = toggleUpvoteInTree(c.replies, commentId);
      if (found) return true;
    }
  }
  return false;
}

// Count total comments including all nested replies
export function countTotalComments(comments: Comment[]): number {
  let count = 0;
  for (const c of comments) {
    count += 1;
    if (c.replies && c.replies.length > 0) {
      count += countTotalComments(c.replies);
    }
  }
  return count;
}

export function getStoredPreferences(): ReadingPreferences {
  try {
    const raw = localStorage.getItem(PREFERENCES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load preferences:', err);
  }
  return {
    fontFamily: 'serif',
    fontSize: 'md',
    theme: 'parchment'
  };
}

export function saveStoredPreferences(prefs: ReadingPreferences): void {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
  } catch (err) {
    console.error('Failed to save preferences:', err);
  }
}

export function getStoredUser(): CurrentUser {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load user:', err);
  }
  return {
    role: 'reader',
    name: 'Inquiring Scholar',
    schoolOfThought: 'Curious Skeptic'
  };
}

export function saveStoredUser(user: CurrentUser): void {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (err) {
    console.error('Failed to save user:', err);
  }
}
