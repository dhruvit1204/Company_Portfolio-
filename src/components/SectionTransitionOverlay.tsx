import React, { useEffect, useRef } from 'react';
import { useSectionTransition } from '../context/SectionTransitionContext';

export const SectionTransitionOverlay: React.FC = () => {
  const { currentMeta, registerOverlayRefs } = useSectionTransition();

  const containerRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerOverlayRefs({
      container: containerRef.current,
      veil: veilRef.current,
      curtain: curtainRef.current,
      card: cardRef.current,
      laser: laserRef.current,
    });
  }, [registerOverlayRefs]);

  return (
    <aside
      ref={containerRef}
      aria-label="Section Transition Animation"
      aria-hidden="true"
      className="fixed inset-0 z-[100] pointer-events-none overflow-hidden select-none invisible"
    >
      {/* 1. Underlying Accent Veil Layer (Lead-in curtain) */}
      <div
        ref={veilRef}
        className="absolute inset-0 bg-[#0c1b30] border-t border-accent/25 will-change-transform"
      />

      {/* 2. Main Midnight Luxury Curtain Layer */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-[#070e1b] flex flex-col items-center justify-center will-change-transform border-t border-white/10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(20, 42, 74, 0.8) 0%, rgba(7, 14, 27, 0.98) 100%),
            radial-gradient(ellipse 70% 40% at 50% 0%, rgba(205, 211, 208, 0.08), transparent 70%)
          `,
        }}
      >
        {/* Subtle Ambient Grain & Technical Grid */}
        <div className="absolute inset-0 bg-dark-grain opacity-40 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Diagonal Soft Ambient Light Ray */}
        <div
          className="pointer-events-none absolute inset-y-0 right-[15%] w-[40vw] -skew-x-[22deg] opacity-[0.04]"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(205, 211, 208, 0.6) 50%, transparent 100%)',
          }}
        />

        {/* Technical Corner Brackets (Awwwards Signature Details) */}
        <div className="absolute top-6 left-6 font-mono text-[10px] text-sand/40 tracking-[0.2em] uppercase hidden sm:flex items-center gap-2">
          <span className="text-accent">+</span>
          <span>EXCEPTION IT // STUDIO SYSTEM</span>
        </div>
        <div className="absolute top-6 right-6 font-mono text-[10px] text-sand/40 tracking-[0.2em] uppercase hidden sm:flex items-center gap-2">
          <span>PORTFOLIO DIRECTORY</span>
          <span className="text-accent">+</span>
        </div>
        <div className="absolute bottom-6 left-6 font-mono text-[10px] text-sand/30 tracking-[0.2em] uppercase hidden sm:flex items-center gap-2">
          <span className="text-accent">+</span>
          <span>LATENCY // ZERO-FRAME READY</span>
        </div>
        <div className="absolute bottom-6 right-6 font-mono text-[10px] text-sand/30 tracking-[0.2em] uppercase hidden sm:flex items-center gap-2">
          <span>VIEWPORT // CHOREOGRAPHED</span>
          <span className="text-accent">+</span>
        </div>

        {/* 3. Center Luxury Editorial Watermark Card */}
        <div
          ref={cardRef}
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto will-change-transform"
          style={{ opacity: 0 }}
        >
          {/* Top Pill with Pulsing Live Beacon */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent font-semibold">
              SECTION {currentMeta.number} // {currentMeta.badge}
            </span>
          </div>

          {/* High-End Editorial Title */}
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight uppercase mb-3 drop-shadow-2xl">
            {currentMeta.title}
          </h2>

          {/* Subtitle Description */}
          <p className="text-sand/70 text-xs sm:text-sm font-sans tracking-widest uppercase max-w-md mx-auto mb-8 font-medium">
            {currentMeta.subtitle}
          </p>

          {/* Futuristic Laser Progress Beam */}
          <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <div
              ref={laserRef}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent transform -translate-x-full will-change-transform"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
