import React, { useState } from 'react';
import { Article, BranchOfPhilosophy, ThoughtExperiment } from '../types';
import {
  X,
  Plus,
  Trash2,
  BookOpen,
  Sparkles,
  Eye,
  PenTool,
  HelpCircle,
  Image as ImageIcon,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { FormattedEssay } from './FormattedEssay';

interface AuthorStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveArticle: (article: Article) => void;
  editingArticle?: Article | null;
  currentIssueCount: number;
}

const BRANCHES: BranchOfPhilosophy[] = [
  'Existentialism',
  'Ethics',
  'Epistemology',
  'Metaphysics',
  'Philosophy of Mind',
  'Political Philosophy',
  'Aesthetics',
  'Logic & Language'
];

const CURATED_COVERS = [
  {
    label: 'Contemplative Silhouette',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80',
    caption: 'Meditation upon human contingency and solitude.'
  },
  {
    label: 'Classical Greek Agora',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1600&q=80',
    caption: 'The historical stones of philosophical inquiry.'
  },
  {
    label: 'Geometric Mind & Labyrinth',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    caption: 'Labyrinthine patterns of consciousness.'
  },
  {
    label: 'Chiaroscuro Night & Horizon',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    caption: 'Thresholds of knowledge and perception.'
  },
  {
    label: 'Ancient Library Archives',
    url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=80',
    caption: 'The quiet sanctuary of written wisdom.'
  },
  {
    label: 'Nebula & Void',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    caption: 'Cosmic scale and existential awe.'
  }
];

export const AuthorStudioModal: React.FC<AuthorStudioModalProps> = ({
  isOpen,
  onClose,
  onSaveArticle,
  editingArticle,
  currentIssueCount
}) => {
  const nextIssueNum = editingArticle ? editingArticle.issueNumber : currentIssueCount + 1;

  const [activeTab, setActiveTab] = useState<'compose' | 'preview'>('compose');
  const [title, setTitle] = useState(editingArticle?.title || '');
  const [subtitle, setSubtitle] = useState(editingArticle?.subtitle || '');
  const [issueNumber, setIssueNumber] = useState(nextIssueNum);
  const [weekLabel, setWeekLabel] = useState(
    editingArticle?.weekLabel || `Week ${nextIssueNum} · ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}`
  );
  const [branch, setBranch] = useState<BranchOfPhilosophy>(editingArticle?.branch || 'Ethics');
  const [coverImage, setCoverImage] = useState(
    editingArticle?.coverImage || CURATED_COVERS[0].url
  );
  const [coverCaption, setCoverCaption] = useState(
    editingArticle?.coverCaption || CURATED_COVERS[0].caption
  );
  const [summaryThesis, setSummaryThesis] = useState(editingArticle?.summaryThesis || '');
  const [discussionPrompt, setDiscussionPrompt] = useState(editingArticle?.discussionPrompt || '');
  const [content, setContent] = useState(
    editingArticle?.content ||
      `### I. The Formulation of the Dilemma\n\nBegin with the foundational question or thought experiment that illustrates the problem...\n\n> "The unexamined life is not worth living."\n> — Socrates\n\n### II. The Prevailing Consensus and Its Fault Lines\n\nExamine how standard modern thinking approaches this, and where its philosophical justification begins to collapse...\n\n### III. A Call for Revaluation\n\nOffer your synthesis or new ethical framework...`
  );

  // Thought experiment poll options
  const [hasDilemma, setHasDilemma] = useState(!!editingArticle?.dilemma);
  const [dilemmaQuestion, setDilemmaQuestion] = useState(
    editingArticle?.dilemma?.question || 'The Ethical Dilemma of the Week'
  );
  const [dilemmaContext, setDilemmaContext] = useState(
    editingArticle?.dilemma?.context || 'Imagine the following scenario...'
  );
  const [dilemmaOptions, setDilemmaOptions] = useState(
    editingArticle?.dilemma?.options || [
      { id: 'opt-1', label: 'Action A: Prioritize deontological duty', philosophicalStance: 'Deontology', votes: 0 },
      { id: 'opt-2', label: 'Action B: Maximize aggregate utility', philosophicalStance: 'Utilitarianism', votes: 0 }
    ]
  );

  if (!isOpen) return null;

  // Auto calculate reading time based on 200 words per min
  const calculatedReadTime = Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200));

  const handleInsertText = (textToInsert: string) => {
    setContent((prev) => prev + '\n\n' + textToInsert);
  };

  const handleAddOption = () => {
    setDilemmaOptions((prev) => [
      ...prev,
      {
        id: `opt-${Date.now()}`,
        label: `Option ${prev.length + 1}`,
        philosophicalStance: 'Virtue Ethics',
        votes: 0
      }
    ]);
  };

  const handleRemoveOption = (id: string) => {
    setDilemmaOptions((prev) => prev.filter((o) => o.id !== id));
  };

  const handleUpdateOption = (id: string, field: 'label' | 'philosophicalStance', val: string) => {
    setDilemmaOptions((prev) =>
      prev.map((o) => (o.id === id ? { ...o, [field]: val } : o))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Please provide at least a title and article body.');
      return;
    }

    const compiledDilemma: ThoughtExperiment | undefined = hasDilemma
      ? {
          id: editingArticle?.dilemma?.id || `dilemma-${Date.now()}`,
          question: dilemmaQuestion,
          context: dilemmaContext,
          options: dilemmaOptions
        }
      : undefined;

    const newArticle: Article = {
      id: editingArticle?.id || `issue-${issueNumber}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}`,
      issueNumber,
      publishDate: editingArticle?.publishDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      weekLabel,
      title: title.trim(),
      subtitle: subtitle.trim() || 'A Weekly Inquiry into Philosophical Life.',
      branch,
      author: editingArticle?.author || {
        name: 'Dr. Alistair Vance',
        title: 'Editor & Philosophical Essayist',
        bio: 'Senior Lecturer in Continental Philosophy and Editor-in-Chief of The Weekly Dialectic.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      },
      readTimeMinutes: calculatedReadTime,
      coverImage,
      coverCaption,
      summaryThesis: summaryThesis.trim() || 'An examination of fundamental philosophical principles.',
      content: content.trim(),
      discussionPrompt:
        discussionPrompt.trim() ||
        'How does this argument sit with your lived experience? Challenge the premises or defend the thesis below.',
      quotes: editingArticle?.quotes || [],
      references: editingArticle?.references || [],
      dilemma: compiledDilemma,
      likesCount: editingArticle?.likesCount || 0,
      bookmarksCount: editingArticle?.bookmarksCount || 0,
      isPublished: true
    };

    onSaveArticle(newArticle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#faf8f5] text-[#1c1917] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#d6cbbe] overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* Studio Modal Header */}
        <div className="px-6 py-4 border-b border-[#e7dfd5] bg-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#78350f] text-white flex items-center justify-center shadow-xs">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display-title text-xl font-bold text-[#1c1917]">
                {editingArticle ? 'Edit Weekly Philosophical Issue' : 'Publish New Weekly Issue'}
              </h2>
              <p className="text-xs text-[#786b5e]">
                Compose long-form essays, seed thought experiments, and frame debate for readers.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="inline-flex rounded-lg border border-[#d6cbbe] p-0.5 bg-[#f5ede3] text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('compose')}
                className={`px-3 py-1.5 rounded-md font-semibold flex items-center space-x-1.5 cursor-pointer ${
                  activeTab === 'compose' ? 'bg-white text-[#1c1917] shadow-xs' : 'text-[#6b5c4d]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Editor</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-md font-semibold flex items-center space-x-1.5 cursor-pointer ${
                  activeTab === 'preview' ? 'bg-white text-[#1c1917] shadow-xs' : 'text-[#6b5c4d]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Reader Preview</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-[#8c7e6f] hover:bg-[#ede5d8] hover:text-[#1c1917] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'preview' ? (
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto border-b border-[#e7dfd5] pb-8">
                <span className="text-xs uppercase tracking-widest font-bold text-[#78350f]">
                  Issue #{issueNumber} · {branch} · {calculatedReadTime} min read
                </span>
                <h1 className="font-display-title text-3xl font-extrabold text-[#1c1917] mt-2 mb-3">
                  {title || 'Untitled Philosophical Essay'}
                </h1>
                <p className="font-serif-body italic text-lg text-[#574c3e]">
                  {subtitle || 'Subtitle or philosophical abstract...'}
                </p>
              </div>

              {coverImage && (
                <div className="rounded-xl overflow-hidden max-w-2xl mx-auto border border-[#e2d8ca]">
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="w-full h-64 object-cover"
                  />
                  {coverCaption && (
                    <p className="text-xs text-[#8c7e6f] p-2 bg-[#f5ede3] text-center italic">
                      {coverCaption}
                    </p>
                  )}
                </div>
              )}

              {summaryThesis && (
                <div className="max-w-[70ch] mx-auto p-5 bg-[#fef9ee] border-l-3 border-[#78350f] rounded-r-xl">
                  <span className="text-xs uppercase font-bold text-[#78350f] block mb-1">
                    Core Thesis & Inquiry:
                  </span>
                  <p className="text-sm font-medium text-[#451a03] leading-relaxed">
                    {summaryThesis}
                  </p>
                </div>
              )}

              <FormattedEssay content={content} />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Issue Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5c4a38] mb-1.5">
                    Issue Number
                  </label>
                  <input
                    type="number"
                    value={issueNumber}
                    onChange={(e) => setIssueNumber(parseInt(e.target.value) || 1)}
                    className="w-full p-2.5 rounded-lg border border-[#d6cbbe] bg-white font-mono text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5c4a38] mb-1.5">
                    Branch of Philosophy
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value as BranchOfPhilosophy)}
                    className="w-full p-2.5 rounded-lg border border-[#d6cbbe] bg-white text-sm"
                  >
                    {BRANCHES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5c4a38] mb-1.5">
                    Week Label
                  </label>
                  <input
                    type="text"
                    value={weekLabel}
                    onChange={(e) => setWeekLabel(e.target.value)}
                    placeholder="e.g. Week 37 · Sept 2026"
                    className="w-full p-2.5 rounded-lg border border-[#d6cbbe] bg-white text-sm"
                    required
                  />
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5c4a38] mb-1.5">
                    Article Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. The Ethics of Artificial Moral Patients"
                    className="w-full p-3 rounded-xl border border-[#d6cbbe] bg-white font-display-title text-lg font-bold text-[#1c1917]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5c4a38] mb-1.5">
                    Subtitle / Epigraph
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. If an artificial consciousness can experience phenomenological suffering, what obligations do we owe it?"
                    className="w-full p-2.5 rounded-lg border border-[#d6cbbe] bg-white text-sm text-[#4a3b2c]"
                  />
                </div>
              </div>

              {/* Summary Thesis */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5c4a38] mb-1.5">
                  Core Philosophical Thesis (The Abstract)
                </label>
                <textarea
                  value={summaryThesis}
                  onChange={(e) => setSummaryThesis(e.target.value)}
                  placeholder="Summarize the core metaphysical, ethical, or epistemological tension in 2-3 sentences..."
                  rows={2}
                  className="w-full p-2.5 rounded-lg border border-[#d6cbbe] bg-white text-sm leading-relaxed"
                />
              </div>

              {/* Cover Image Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5c4a38] mb-2 flex items-center justify-between">
                  <span>Cover Artwork</span>
                  <span className="text-[11px] font-normal text-[#8c7e6f]">
                    Select curated artwork or enter custom URL
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-2">
                  {CURATED_COVERS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setCoverImage(preset.url);
                        setCoverCaption(preset.caption);
                      }}
                      className={`relative rounded-lg overflow-hidden border-2 text-left h-20 group cursor-pointer transition-all ${
                        coverImage === preset.url
                          ? 'border-[#78350f] ring-2 ring-[#78350f]/30'
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-end p-1.5">
                        <span className="text-[10px] text-white font-medium leading-tight line-clamp-1">
                          {preset.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="Or paste custom image URL..."
                  className="w-full p-2 text-xs rounded-lg border border-[#d6cbbe] bg-white font-mono"
                />
              </div>

              {/* Article Content with Helper Actions */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#5c4a38]">
                    Essay Body (Markdown Enabled)
                  </label>
                  <div className="flex flex-wrap gap-1 text-xs">
                    <button
                      type="button"
                      onClick={() => handleInsertText('### New Section Heading')}
                      className="px-2 py-0.5 rounded bg-[#ede5d8] hover:bg-[#dfd4c3] text-[#4a3b2c] cursor-pointer"
                    >
                      + Section Heading
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertText('> "Philosophical quote here."\n> — Attributed Thinker, *Work Title*')}
                      className="px-2 py-0.5 rounded bg-[#ede5d8] hover:bg-[#dfd4c3] text-[#4a3b2c] cursor-pointer"
                    >
                      + Blockquote
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertText('---\n')}
                      className="px-2 py-0.5 rounded bg-[#ede5d8] hover:bg-[#dfd4c3] text-[#4a3b2c] cursor-pointer"
                    >
                      + Divider
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertText('1. First premise\n2. Second premise\n3. Conclusion')}
                      className="px-2 py-0.5 rounded bg-[#ede5d8] hover:bg-[#dfd4c3] text-[#4a3b2c] cursor-pointer"
                    >
                      + Syllogism List
                    </button>
                  </div>
                </div>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={14}
                  className="w-full p-4 rounded-xl border border-[#d6cbbe] bg-white font-mono text-sm leading-relaxed text-[#1c1917] focus:ring-2 focus:ring-[#78350f] focus:outline-hidden"
                  required
                />
                <div className="flex justify-between text-xs text-[#8c7e6f] mt-1">
                  <span>Estimated read time: ~{calculatedReadTime} minutes</span>
                  <span>Word count: {content.split(/\s+/).filter(Boolean).length} words</span>
                </div>
              </div>

              {/* Reader Discussion Catalyst */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5c4a38] mb-1.5">
                  Reader Discussion Prompt (Weekly Question)
                </label>
                <textarea
                  value={discussionPrompt}
                  onChange={(e) => setDiscussionPrompt(e.target.value)}
                  placeholder="The provocative question readers will debate in the comments section below your essay..."
                  rows={2}
                  className="w-full p-2.5 rounded-lg border border-[#d6cbbe] bg-white text-sm"
                />
              </div>

              {/* Thought Experiment Poll Builder */}
              <div className="p-4 rounded-xl border border-[#e2d8ca] bg-[#faf6f0] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hasDilemma"
                      checked={hasDilemma}
                      onChange={(e) => setHasDilemma(e.target.checked)}
                      className="w-4 h-4 text-[#78350f] rounded border-[#d6cbbe] focus:ring-[#78350f]"
                    />
                    <label htmlFor="hasDilemma" className="text-sm font-bold text-[#1c1917] cursor-pointer">
                      Include "Thought Experiment Dilemma" Poll
                    </label>
                  </div>
                  <span className="text-xs text-[#786b5e]">
                    Allows readers to register their philosophical stance
                  </span>
                </div>

                {hasDilemma && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#5c4a38] mb-1">
                        Dilemma Question
                      </label>
                      <input
                        type="text"
                        value={dilemmaQuestion}
                        onChange={(e) => setDilemmaQuestion(e.target.value)}
                        placeholder="e.g. Would you flip the switch on the Trolley?"
                        className="w-full p-2 text-sm rounded border border-[#d6cbbe] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#5c4a38] mb-1">
                        Scenario Context
                      </label>
                      <textarea
                        value={dilemmaContext}
                        onChange={(e) => setDilemmaContext(e.target.value)}
                        placeholder="Detail the ethical or metaphysical thought experiment..."
                        rows={2}
                        className="w-full p-2 text-sm rounded border border-[#d6cbbe] bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-[#5c4a38]">
                          Reader Stance Options
                        </label>
                        <button
                          type="button"
                          onClick={handleAddOption}
                          className="text-xs text-[#78350f] font-semibold flex items-center space-x-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Option</span>
                        </button>
                      </div>

                      {dilemmaOptions.map((opt) => (
                        <div key={opt.id} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={opt.label}
                            onChange={(e) => handleUpdateOption(opt.id, 'label', e.target.value)}
                            placeholder="Option choice..."
                            className="flex-1 p-2 text-xs rounded border border-[#d6cbbe] bg-white"
                          />
                          <input
                            type="text"
                            value={opt.philosophicalStance}
                            onChange={(e) => handleUpdateOption(opt.id, 'philosophicalStance', e.target.value)}
                            placeholder="School/Stance (e.g. Kantian, Utilitarian)"
                            className="w-44 p-2 text-xs rounded border border-[#d6cbbe] bg-white"
                          />
                          {dilemmaOptions.length > 2 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveOption(opt.id)}
                              className="text-[#a89988] hover:text-red-600 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Action */}
              <div className="pt-4 border-t border-[#e7dfd5] flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-semibold text-[#6b5c4d] hover:text-[#1c1917] cursor-pointer"
                >
                  Cancel
                </button>

                <div className="flex items-center space-x-3">
                  <button
                    type="submit"
                    className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#78350f] hover:bg-[#92400e] text-white text-sm font-bold shadow-md transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Publish Issue #{issueNumber} to Journal</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
