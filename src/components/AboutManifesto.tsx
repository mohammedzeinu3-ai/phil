import React from 'react';
import { BookOpen, Users, Compass, Feather, Sparkles, ShieldCheck } from 'lucide-react';

export const AboutManifesto: React.FC<{ onStartReading: () => void }> = ({ onStartReading }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase font-bold tracking-widest text-[#78350f]">
          Editorial Statement
        </span>
        <h2 className="font-display-title text-3xl sm:text-4xl font-extrabold text-[#1c1917] mt-2 mb-3">
          The Socratic Imperative
        </h2>
        <p className="font-serif-body italic text-lg text-[#6b5c4d]">
          Why weekly philosophical contemplation and communal dialectic remain indispensable in an accelerated world.
        </p>
      </div>

      <div className="space-y-8 text-[#2c2825] font-serif-body text-[18px] leading-[1.8] max-w-[68ch] mx-auto">
        <p className="drop-cap">
          In 399 BCE, Socrates stood before the Athenian court and declared that the unexamined life is not worth living. He did not issue this verdict from an isolated ivory tower, nor did he carve it into stone as immutable dogma. He pursued it through living dialogue—in the marketplace, walking the dusty stones of the agora, cross-examining politicians, shoemakers, and poets alike.
        </p>

        <p>
          Today, the contemporary public sphere is overwhelmed by velocity. The velocity of breaking news cycles, the algorithmic rewards for manufactured outrage, and the premature certainty that forecloses genuine intellectual inquiry. We are inundated with information, yet starved for wisdom.
        </p>

        <div className="my-8 p-6 bg-[#f5ede3] border-l-4 border-[#78350f] rounded-r-xl">
          <h3 className="font-display-title text-xl font-bold text-[#1c1917] mb-2">
            The Three Pillars of The Weekly Dialectic
          </h3>
          <ul className="space-y-3 text-sm font-sans-ui text-[#453628]">
            <li className="flex items-start space-x-2">
              <span className="font-bold text-[#78350f]">1. Weekly Cadence:</span>
              <span>We publish once every Friday morning. No daily hot takes, no ephemeral clickbait. A single, deeply considered long-form inquiry on a fundamental ethical, existential, or metaphysical dilemma.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="font-bold text-[#78350f]">2. The Dialectic of Readers:</span>
              <span>An essay is not a monologue; it is an opening gambit. Every reader is invited to question the premises, introduce counter-examples, and engage in threaded debate with fellow inquirers and the author.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="font-bold text-[#78350f]">3. Epistemic Generosity:</span>
              <span>We adhere to the Principle of Charity: interpreting our interlocutor’s argument in its strongest, most plausible form before responding.</span>
            </li>
          </ul>
        </div>

        <p>
          Whether you align with Kantian deontology, Nietzschean critique, Buddhist phenomenology, or radical existentialist freedom, this publication is your sanctuary. We invite you to read deeply, pause, formulate your premises, and take your seat in the agora.
        </p>

        <div className="pt-6 text-center">
          <button
            type="button"
            onClick={onStartReading}
            className="px-6 py-3 rounded-xl bg-[#78350f] hover:bg-[#92400e] text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
          >
            Enter This Week's Inquiry →
          </button>
        </div>
      </div>
    </div>
  );
};
