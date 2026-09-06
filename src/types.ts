export type BranchOfPhilosophy =
  | 'Existentialism'
  | 'Ethics'
  | 'Epistemology'
  | 'Metaphysics'
  | 'Philosophy of Mind'
  | 'Political Philosophy'
  | 'Aesthetics'
  | 'Logic & Language';

export interface AuthorProfile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
}

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  authorAvatar?: string;
  isAuthor: boolean;
  schoolOfThought?: string; // e.g. "Kantian", "Existentialist", "Stoic", "Utilitarian", "Pragmatist", "Skeptic"
  content: string;
  quotedText?: string;
  timestamp: string;
  createdAt: number; // for sorting
  upvotes: number;
  userVoted?: boolean;
  parentId: string | null;
  replies?: Comment[];
}

export interface PhilosophicalQuote {
  quote: string;
  author: string;
  source?: string;
}

export interface ReferenceItem {
  title: string;
  author: string;
  year?: string;
  note?: string;
}

export interface DilemmaOption {
  id: string;
  label: string;
  philosophicalStance: string; // e.g. "Deontological (Kant)", "Utilitarian (Bentham/Mill)"
  votes: number;
}

export interface ThoughtExperiment {
  id: string;
  question: string;
  context: string;
  options: DilemmaOption[];
  userVotedOptionId?: string;
}

export interface Article {
  id: string;
  issueNumber: number;
  publishDate: string;
  weekLabel: string;
  title: string;
  subtitle: string;
  branch: BranchOfPhilosophy;
  author: AuthorProfile;
  readTimeMinutes: number;
  coverImage: string;
  coverCaption?: string;
  summaryThesis: string;
  content: string;
  discussionPrompt: string;
  quotes: PhilosophicalQuote[];
  references: ReferenceItem[];
  dilemma?: ThoughtExperiment;
  likesCount: number;
  bookmarksCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  isPublished: boolean;
}

export interface ReadingPreferences {
  fontFamily: 'serif' | 'sans';
  fontSize: 'sm' | 'md' | 'lg';
  theme: 'parchment' | 'ivory' | 'midnight';
}

export interface CurrentUser {
  role: 'author' | 'reader';
  name: string;
  schoolOfThought: string;
}
