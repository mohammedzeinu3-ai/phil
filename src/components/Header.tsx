import React, { useState } from 'react';
import { CurrentUser, ReadingPreferences } from '../types';
import {
  BookOpen,
  PenTool,
  Sliders,
  Sparkles,
  Search,
  UserCheck,
  RotateCcw,
  Volume2,
  Calendar,
  Layers,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  currentView: 'current' | 'archive' | 'about';
  onSelectView: (view: 'current' | 'archive' | 'about') => void;
  currentUser: CurrentUser;
  onToggleRole: () => void;
  onOpenAuthorStudio: () => void;
  preferences: ReadingPreferences;
  onChangePreferences: (prefs: ReadingPreferences) => void;
  currentIssueNumber: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  currentUser,
  onToggleRole,
  onOpenAuthorStudio,
  preferences,
  onChangePreferences,
  currentIssueNumber
}) => {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  return (
    <header className="border-b border-[#e7dfd5] bg-[#faf8f5]/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      {/* Top Editorial Bar */}
      <div className="border-b border-[#f0e8dc] px-4 sm:px-8 py-1.5 text-xs text-[#786b5e] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-[#78350f] tracking-wide flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>PUBLISHED EVERY FRIDAY</span>
          </span>
          <span className="hidden md:inline text-[#d6cbbe]">|</span>
          <span className="hidden md:inline font-mono">
            Vol. IV · Issue #{currentIssueNumber}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* User Mode Switcher */}
          <button
            type="button"
            onClick={onToggleRole}
            className={`px-2.5 py-0.5 rounded-full font-medium transition-colors flex items-center space-x-1 cursor-pointer ${
              currentUser.role === 'author'
                ? 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]'
                : 'bg-[#ede5d8] text-[#5c4a38] hover:bg-[#e2d6c3]'
            }`}
            title="Click to toggle between Author and Reader modes"
          >
            <UserCheck className="w-3 h-3" />
            <span>Mode: {currentUser.role === 'author' ? 'Author (Publisher)' : 'Reader'}</span>
          </button>

          {/* Typography Settings Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
              className="p-1 rounded text-[#786b5e] hover:text-[#1c1917] hover:bg-[#ede5d8] transition-colors cursor-pointer"
              title="Reading typography & sizing"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>

            {showSettingsDropdown && (
              <div className="absolute right-0 mt-2 w-56 p-3 bg-white rounded-xl shadow-xl border border-[#e2d8ca] z-50 text-xs space-y-3">
                <div className="font-bold text-[#1c1917] border-b border-[#f0e8dc] pb-1.5">
                  Reading Experience
                </div>

                <div>
                  <span className="text-[#8c7e6f] block mb-1">Typeface:</span>
                  <div className="grid grid-cols-2 gap-1 bg-[#f5ede3] p-0.5 rounded-md">
                    <button
                      type="button"
                      onClick={() => onChangePreferences({ ...preferences, fontFamily: 'serif' })}
                      className={`py-1 rounded font-serif-body text-xs cursor-pointer ${
                        preferences.fontFamily === 'serif' ? 'bg-white font-bold text-[#1c1917] shadow-xs' : 'text-[#6b5c4d]'
                      }`}
                    >
                      Classical Serif
                    </button>
                    <button
                      type="button"
                      onClick={() => onChangePreferences({ ...preferences, fontFamily: 'sans' })}
                      className={`py-1 rounded font-sans-ui text-xs cursor-pointer ${
                        preferences.fontFamily === 'sans' ? 'bg-white font-bold text-[#1c1917] shadow-xs' : 'text-[#6b5c4d]'
                      }`}
                    >
                      Modern Sans
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[#8c7e6f] block mb-1">Font Size:</span>
                  <div className="grid grid-cols-3 gap-1 bg-[#f5ede3] p-0.5 rounded-md text-center font-mono">
                    {(['sm', 'md', 'lg'] as const).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => onChangePreferences({ ...preferences, fontSize: size })}
                        className={`py-1 rounded cursor-pointer ${
                          preferences.fontSize === size ? 'bg-white font-bold text-[#1c1917] shadow-xs' : 'text-[#6b5c4d]'
                        }`}
                      >
                        {size.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Masthead Banner */}
      <div className="px-4 sm:px-8 py-5 sm:py-6 flex flex-col items-center justify-center text-center">
        <div className="flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] font-display-title text-[#78350f] mb-1">
          <span>Established in the Agora</span>
          <span>•</span>
          <span>Open Inquiry</span>
        </div>

        <h1
          onClick={() => onSelectView('current')}
          className="font-display-title text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1c1917] cursor-pointer hover:opacity-90 transition-opacity"
        >
          THE WEEKLY DIALECTIC
        </h1>

        <p className="font-serif-body italic text-sm sm:text-base text-[#6b5c4d] max-w-xl mt-1.5">
          Long-form essays on ethics, metaphysics, and existential dilemmas — where every thesis invites rejoinder.
        </p>
      </div>

      {/* Navigation & Publisher Call to Action */}
      <div className="border-t border-[#f0e8dc] px-4 sm:px-8 py-2 flex items-center justify-between text-xs sm:text-sm">
        <nav className="flex items-center space-x-1 sm:space-x-4">
          <button
            type="button"
            onClick={() => onSelectView('current')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              currentView === 'current'
                ? 'bg-[#78350f] text-white shadow-xs'
                : 'text-[#574c3e] hover:bg-[#ede5d8]'
            }`}
          >
            This Week's Inquiry
          </button>

          <button
            type="button"
            onClick={() => onSelectView('archive')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center space-x-1 cursor-pointer ${
              currentView === 'archive'
                ? 'bg-[#78350f] text-white shadow-xs'
                : 'text-[#574c3e] hover:bg-[#ede5d8]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Weekly Archive</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectView('about')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              currentView === 'about'
                ? 'bg-[#78350f] text-white shadow-xs'
                : 'text-[#574c3e] hover:bg-[#ede5d8]'
            }`}
          >
            Editorial Manifesto
          </button>
        </nav>

        {/* Author Publishing CTA */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onOpenAuthorStudio}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#78350f] hover:bg-[#92400e] text-white font-semibold text-xs transition-all shadow-xs cursor-pointer"
            title="Publish a new philosophical essay for this week"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Post Weekly Article</span>
            <span className="sm:hidden">Post</span>
          </button>
        </div>
      </div>
    </header>
  );
};
