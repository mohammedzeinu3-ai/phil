import { Comment } from '../types';

export const INITIAL_COMMENTS: Record<string, Comment[]> = {
  'issue-36-algorithmic-self': [
    {
      id: 'c1',
      articleId: 'issue-36-algorithmic-self',
      authorName: 'Elena Rostova',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      isAuthor: false,
      schoolOfThought: 'Existentialist',
      content: 'Dr. Vance’s comparison between Sartre’s waiter and our modern feeds is startlingly precise. But wouldn’t Sartre also say that blaming the algorithm is itself a manifestation of bad faith? If we choose to outsource our decisions to predictive systems, isn’t that still our sovereign choice for which we remain radically responsible?',
      timestamp: 'Yesterday at 10:14 AM',
      createdAt: Date.now() - 86400000 * 1.5,
      upvotes: 38,
      userVoted: false,
      parentId: null,
      replies: [
        {
          id: 'c1-1',
          articleId: 'issue-36-algorithmic-self',
          authorName: 'Dr. Alistair Vance',
          authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          isAuthor: true,
          schoolOfThought: 'Author’s Rejoinder',
          quotedText: 'If we choose to outsource our decisions to predictive systems, isn’t that still our sovereign choice for which we remain radically responsible?',
          content: 'Splendid counterpoint, Elena. You are entirely correct through a strict Sartreian lens: the moment we say "the algorithm made me do it," we commit textbook bad faith. My anxiety, however, is that current architectures are deliberately obfuscated—they present themselves as neutral utility rather than moral surrender. We are anaesthetized before we even realize we are signing away our freedom.',
          timestamp: 'Yesterday at 1:45 PM',
          createdAt: Date.now() - 86400000 * 1.2,
          upvotes: 45,
          userVoted: false,
          parentId: 'c1',
          replies: [
            {
              id: 'c1-1-1',
              articleId: 'issue-36-algorithmic-self',
              authorName: 'Marcus Aurelius Fan',
              authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
              isAuthor: false,
              schoolOfThought: 'Stoic Inquirer',
              content: 'From a Stoic standpoint, the algorithm is merely an external circumstance (an *indifferent*). What remains in our exclusive control is our assent (*synkatathesis*). A virtuous mind can use Spotify or an automated route without surrendering its inner citadel.',
              timestamp: 'Yesterday at 4:20 PM',
              createdAt: Date.now() - 86400000 * 0.9,
              upvotes: 19,
              userVoted: false,
              parentId: 'c1-1'
            }
          ]
        },
        {
          id: 'c1-2',
          articleId: 'issue-36-algorithmic-self',
          authorName: 'Theodor Adorno Scholar',
          authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
          isAuthor: false,
          schoolOfThought: 'Critical Theorist',
          content: 'I agree with Elena, but we must add the materialist dimension. This is not purely personal psychology; it is the commodification of contemplation. Frankfurt School thinkers like Marcuse warned of "one-dimensional man"—when technology satisfies false needs, true critical thought becomes almost impossible to formulate.',
          timestamp: 'Yesterday at 6:30 PM',
          createdAt: Date.now() - 86400000 * 0.7,
          upvotes: 24,
          userVoted: false,
          parentId: 'c1'
        }
      ]
    },
    {
      id: 'c2',
      articleId: 'issue-36-algorithmic-self',
      authorName: 'Julian Sterling',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      isAuthor: false,
      schoolOfThought: 'Pragmatist',
      content: 'Is friction really an unmitigated virtue? If an algorithm saves me three hours of mundane grocery selection or administrative scheduling, I have MORE cognitive energy for reading Spinoza or sitting in meditation. Why romanticize unnecessary friction when efficiency can expand our leisure for higher contemplation?',
      timestamp: '2 days ago',
      createdAt: Date.now() - 86400000 * 2.2,
      upvotes: 31,
      userVoted: false,
      parentId: null,
      replies: [
        {
          id: 'c2-1',
          articleId: 'issue-36-algorithmic-self',
          authorName: 'Hannah Arendt Reader',
          authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
          isAuthor: false,
          schoolOfThought: 'Phenomenologist',
          quotedText: 'Why romanticize unnecessary friction when efficiency can expand our leisure for higher contemplation?',
          content: 'The danger Julian is that efficiency does not stop at logistics. The same mechanism that recommends laundry detergent begins recommending who to marry, what art to appreciate, and what moral postures to inhabit. When friction is eliminated from judgment, *thinking* itself atrophies into computation.',
          timestamp: 'Yesterday at 11:00 AM',
          createdAt: Date.now() - 86400000 * 1.3,
          upvotes: 27,
          userVoted: false,
          parentId: 'c2'
        }
      ]
    },
    {
      id: 'c3',
      articleId: 'issue-36-algorithmic-self',
      authorName: 'Kierkegaardian Leap',
      authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
      isAuthor: false,
      schoolOfThought: 'Christian Existentialist',
      content: '“Anxiety is the dizziness of freedom.” Kierkegaard understood this a century before Sartre. Algorithms are essentially sedative machines built to cure dizziness. But in curing dizziness, they also extinguish faith, courage, and love—all of which require a leap over an unbridgeable epistemic chasm.',
      timestamp: '3 days ago',
      createdAt: Date.now() - 86400000 * 3,
      upvotes: 42,
      userVoted: false,
      parentId: null,
      replies: []
    }
  ],
  'issue-35-ship-of-theseus-mind': [
    {
      id: 'c-35-1',
      articleId: 'issue-35-ship-of-theseus-mind',
      authorName: 'Kantian Rationalist',
      authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
      isAuthor: false,
      schoolOfThought: 'Kantian',
      content: 'Parfit assumes that the "I" is merely an empirical bundle of memories. But for Kant, the Transcendental Unity of Apperception is the formal condition that makes any experience possible in the first place! You cannot reduce the unified subject of experience to mere causal continuity of mental tokens.',
      timestamp: '6 days ago',
      createdAt: Date.now() - 86400000 * 6,
      upvotes: 18,
      userVoted: false,
      parentId: null,
      replies: []
    }
  ]
};
