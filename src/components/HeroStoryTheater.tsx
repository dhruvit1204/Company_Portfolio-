import React from 'react';
import {
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

export interface StoryChapter {
  id: string;
  stepNumber: string;
  title: string;
  shortLabel: string;
  tagline: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
}

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'real-results',
    stepNumber: '01',
    title: 'Real Products, Not Just Ideas',
    shortLabel: 'Real Launch',
    tagline: 'We turn your vision into working digital solutions that actually launch and grow your business — not endless slide decks.',
    highlights: [
      'Delivered on time and aligned with your business goals',
      'Tested thoroughly before customers ever see it',
      'Ready to create real impact from Day One',
    ],
    metrics: [
      { label: 'Delivery', value: '100% On-Time' },
      { label: 'Focus', value: 'Real Launch' },
      { label: 'Usability', value: 'Customer-Ready' },
    ],
  },
  {
    id: 'one-team',
    stepNumber: '02',
    title: 'Everything Under One Roof',
    shortLabel: 'One Team',
    tagline: 'Modern design, smart technology, and launch managed by one dedicated team — so you never have to juggle multiple agencies.',
    highlights: [
      'Beautiful, easy-to-use designs your customers will love',
      'Intelligent digital features that make work effortless',
      'Zero headache or finger-pointing between separate vendors',
    ],
    metrics: [
      { label: 'Team Model', value: 'All-in-One' },
      { label: 'Coordination', value: 'Single Contact' },
      { label: 'Vendor Stress', value: 'Zero Chaos' },
    ],
  },
  {
    id: 'partnership',
    stepNumber: '03',
    title: 'True Partners, Not Just Vendors',
    shortLabel: 'Partnership',
    tagline: 'Direct, honest communication, transparent updates, and genuine dedication to the success of your business.',
    highlights: [
      'Direct contact with the creators working on your project',
      'Clear, simple updates without confusing technical jargon',
      'We treat your business and budget like our own',
    ],
    metrics: [
      { label: 'Communication', value: 'Direct & Open' },
      { label: 'Updates', value: 'Jargon-Free' },
      { label: 'Dedication', value: 'Founder-Level' },
    ],
  },
  {
    id: 'built-to-last',
    stepNumber: '04',
    title: 'Built to Grow With You',
    shortLabel: 'Built to Last',
    tagline: 'Fast, secure, and rock-solid systems that protect your information and handle your company’s future growth with ease.',
    highlights: [
      'Lightning-fast loading that keeps customers engaged',
      'High-grade protection to keep your company data safe',
      'Always-online reliability you can count on 24/7',
    ],
    metrics: [
      { label: 'Experience', value: 'Ultra-Fast' },
      { label: 'Data Safety', value: 'Top Security' },
      { label: 'Reliability', value: '99.9% Uptime' },
    ],
  },
];

interface HeroStoryTheaterProps {
  currentChapterIndex: number;
  onSelectChapter: (index: number) => void;
  progressPercent: number;
}

export const HeroStoryTheater: React.FC<HeroStoryTheaterProps> = ({
  currentChapterIndex,
  onSelectChapter,
  progressPercent,
}) => {
  const currentChapter = STORY_CHAPTERS[currentChapterIndex];

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none select-none">
      {/* Subtle Ambient Glow Halo */}
      <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue/20 via-accent/15 to-hero-bloom/20 rounded-2xl blur-lg opacity-60 pointer-events-none" />

      {/* Main Minimal Theater Card */}
      <div className="relative rounded-2xl bg-cyprus-deep/90 border border-white/10 shadow-xl backdrop-blur-xl p-4 sm:p-5 text-sand overflow-hidden">
        {/* Subtle dark texture */}
        <div className="absolute inset-0 bg-dark-grain opacity-20 pointer-events-none" />

        {/* Minimal Header */}
        <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10">
          {/* Mac-style Window Dots + Clean Non-Technical Title */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="ml-2 text-[11px] font-mono text-sand/70">
              Why Companies Trust Us
            </span>
          </div>

          {/* Minimal Step Indicator */}
          <span className="text-[11px] font-mono text-accent-blue bg-accent-blue/10 px-2.5 py-0.5 rounded border border-accent-blue/20">
            Pillar {currentChapter.stepNumber} of 04
          </span>
        </div>

        {/* 4 Minimal Non-Technical Tabs */}
        <div className="relative z-10 grid grid-cols-4 gap-1.5 pt-3 pb-2">
          {STORY_CHAPTERS.map((chap, idx) => {
            const isActive = idx === currentChapterIndex;
            const isPast = idx < currentChapterIndex;

            return (
              <button
                key={chap.id}
                onClick={() => onSelectChapter(idx)}
                className={`group relative flex flex-col text-left py-1.5 px-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-white/10 border border-white/15'
                    : 'bg-white/[0.02] border border-transparent hover:bg-white/[0.05]'
                }`}
                aria-label={`Select pillar ${chap.stepNumber}: ${chap.title}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-mono font-bold ${
                      isActive ? 'text-accent-blue' : 'text-sand/40'
                    }`}
                  >
                    {chap.stepNumber}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                  )}
                </div>
                <span
                  className={`text-[10px] sm:text-[11px] font-medium truncate mt-0.5 ${
                    isActive ? 'text-white font-semibold' : 'text-sand/70 group-hover:text-sand'
                  }`}
                >
                  {chap.shortLabel}
                </span>

                {/* Micro Progress Bar */}
                <div className="mt-1.5 h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-accent-blue transition-all"
                    style={{
                      width: isActive
                        ? `${progressPercent}%`
                        : isPast
                        ? '100%'
                        : '0%',
                      transitionDuration: isActive ? '75ms' : '200ms',
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Minimal Content Showcase Stage (Animates smoothly on pillar change) */}
        <div key={currentChapter.id} className="relative z-10 pt-2 pb-1 space-y-2.5 min-h-[175px]">
          {/* Chapter Title & Tagline with smooth entrance */}
          <div className="animate-pillar-text">
            <h3 className="text-sm sm:text-base font-bold font-display text-white tracking-tight flex items-center gap-1.5">
              <span>{currentChapter.title}</span>
            </h3>
            <p className="text-xs text-sand/80 mt-0.5 leading-relaxed line-clamp-2">
              {currentChapter.tagline}
            </p>
          </div>

          {/* Minimal Clean Highlights Strip (Clear, plain English business benefits) */}
          <div className="animate-pillar-highlights p-2.5 sm:p-3 rounded-xl bg-black/30 border border-white/5 space-y-1.5">
            {currentChapter.highlights.map((highlight, hIdx) => (
              <div
                key={hIdx}
                className="flex items-center gap-2 text-[11px] sm:text-xs text-sand/90"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-blue shrink-0" />
                <span className="truncate">{highlight}</span>
              </div>
            ))}
          </div>

          {/* Minimal 3-Metric Row (Plain English business outcomes) */}
          <div className="animate-pillar-metrics grid grid-cols-3 gap-2 pt-0.5">
            {currentChapter.metrics.map((m, mIdx) => (
              <div
                key={mIdx}
                className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-center"
              >
                <div className="text-[9px] font-mono text-sand-muted uppercase truncate">
                  {m.label}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white tracking-tight mt-0.5 truncate">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Minimal Footer Link */}
        <div className="relative z-10 pt-2.5 mt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-sand/60">
          <span className="italic truncate text-[10px] sm:text-[11px]">
            "We engineer exceptions, not excuses."
          </span>
          <a
            href="https://exceptionit.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-white flex items-center gap-1 font-mono text-[10px] sm:text-[11px] shrink-0 transition-colors"
          >
            <span>exceptionit.com</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
