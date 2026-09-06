import React, { useState } from 'react';
import { ThoughtExperiment } from '../types';
import { HelpCircle, Check, BarChart2, ShieldAlert } from 'lucide-react';

interface DilemmaWidgetProps {
  dilemma: ThoughtExperiment;
  onVote: (optionId: string) => void;
}

export const DilemmaWidget: React.FC<DilemmaWidgetProps> = ({ dilemma, onVote }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(
    dilemma.userVotedOptionId
  );

  const totalVotes = dilemma.options.reduce((acc, curr) => acc + curr.votes, 0);

  const handleVote = (optionId: string) => {
    setSelectedOptionId(optionId);
    onVote(optionId);
  };

  return (
    <div className="my-12 p-6 sm:p-8 bg-[#fdfaf5] border border-[#e2d8ca] rounded-2xl shadow-xs">
      <div className="flex items-center space-x-2.5 text-xs font-bold uppercase tracking-widest text-[#78350f] mb-2">
        <HelpCircle className="w-4 h-4" />
        <span>Weekly Thought Experiment</span>
      </div>

      <h3 className="font-display-title text-xl sm:text-2xl font-bold text-[#1c1917] mb-3">
        {dilemma.question}
      </h3>

      <p className="font-serif-body text-[16px] text-[#574c3e] leading-relaxed mb-6">
        {dilemma.context}
      </p>

      <div className="space-y-3">
        {dilemma.options.map((opt) => {
          const isVoted = selectedOptionId === opt.id;
          const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;

          return (
            <div
              key={opt.id}
              onClick={() => handleVote(opt.id)}
              className={`relative overflow-hidden p-4 rounded-xl border transition-all cursor-pointer ${
                isVoted
                  ? 'border-[#78350f] bg-[#fdf4e8] ring-2 ring-[#78350f]/20'
                  : 'border-[#ebe3d5] bg-white hover:border-[#cfc1b0] hover:bg-[#faf6f0]'
              }`}
            >
              {/* Vote percentage background bar */}
              {selectedOptionId && (
                <div
                  className="absolute inset-0 bg-[#eaddcf]/50 transition-all duration-700 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              )}

              <div className="relative flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <div
                    className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isVoted
                        ? 'bg-[#78350f] border-[#78350f] text-white'
                        : 'border-[#c9bea7] bg-white'
                    }`}
                  >
                    {isVoted && <Check className="w-3 h-3" />}
                  </div>

                  <div>
                    <span className="text-sm font-semibold text-[#1c1917] block leading-snug">
                      {opt.label}
                    </span>
                    <span className="text-xs text-[#78350f] font-medium mt-1 inline-block bg-[#f8efe3] px-2 py-0.5 rounded">
                      Philosophical School: {opt.philosophicalStance}
                    </span>
                  </div>
                </div>

                {selectedOptionId && (
                  <div className="text-right shrink-0">
                    <span className="font-mono text-sm font-bold text-[#1c1917]">
                      {percentage}%
                    </span>
                    <span className="block text-[11px] text-[#8c7e6f]">
                      {opt.votes} {opt.votes === 1 ? 'vote' : 'votes'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-[#ebe3d5] flex items-center justify-between text-xs text-[#8c7e6f]">
        <span>
          {selectedOptionId ? 'Your stance has been recorded.' : 'Click an option to record your stance.'}
        </span>
        <span className="font-mono">
          Total inquirers: {totalVotes}
        </span>
      </div>
    </div>
  );
};
