import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  Layers,
  Code2,
  ShieldCheck,
  Rocket,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '../data/process';
import { isReducedMotion, TRANSITIONS } from '../utils/animations';

export const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [mobileViewMode, setMobileViewMode] = useState<'spotlight' | 'accordion'>('spotlight');

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const desktopGridRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const stepperTrackRef = useRef<HTMLDivElement>(null);

  // Touch swipe tracking refs
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Icon helper
  const renderStepIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'Compass':
        return <Compass className={className} />;
      case 'Layers':
        return <Layers className={className} />;
      case 'Code2':
        return <Code2 className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'Rocket':
        return <Rocket className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  // GSAP ScrollTrigger entrances
  useEffect(() => {
    if (isReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.process-header-reveal', {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: TRANSITIONS.easePower3,
        clearProps: 'transform,opacity',
      });

      // Conduit line entrance
      gsap.from('.process-conduit-bar', {
        scrollTrigger: {
          trigger: desktopGridRef.current,
          start: 'top 82%',
          once: true,
        },
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1,
        ease: 'power3.out',
        clearProps: 'transform',
      });

      // Desktop Process Cards entrance
      gsap.from('.process-step-card', {
        scrollTrigger: {
          trigger: desktopGridRef.current,
          start: 'top 80%',
          once: true,
        },
        y: 45,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: TRANSITIONS.easePower3,
        clearProps: 'transform,opacity',
      });

      // Mobile container entrance
      if (mobileContainerRef.current) {
        gsap.from(mobileContainerRef.current, {
          scrollTrigger: {
            trigger: mobileContainerRef.current,
            start: 'top 85%',
            once: true,
          },
          y: 35,
          opacity: 0,
          duration: 0.8,
          ease: TRANSITIONS.easePower3,
          clearProps: 'transform,opacity',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Safe internal auto-scroll for stepper track without affecting window/parent scroll
  useEffect(() => {
    const container = stepperTrackRef.current;
    if (!container) return;
    const activePill = container.children[activeStep] as HTMLElement | undefined;
    if (activePill) {
      const containerWidth = container.clientWidth;
      const pillLeft = activePill.offsetLeft;
      const pillWidth = activePill.clientWidth;
      const targetScroll = pillLeft - containerWidth / 2 + pillWidth / 2;

      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
    }

    // Safety: ensure root document/window never shifts horizontally
    if (typeof window !== 'undefined' && window.scrollX !== 0) {
      window.scrollTo({ left: 0, top: window.scrollY });
    }
  }, [activeStep]);

  // Touch Swipe Handlers for mobile spotlight card
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    // Only trigger if horizontal swipe is significantly stronger than vertical scroll
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0 && activeStep < PROCESS_STEPS.length - 1) {
        // Swiped Left -> Next Step
        setActiveStep((prev) => prev + 1);
      } else if (diffX < 0 && activeStep > 0) {
        // Swiped Right -> Prev Step
        setActiveStep((prev) => prev - 1);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const currentStep = PROCESS_STEPS[activeStep];
  const progressPercent = ((activeStep + 1) / PROCESS_STEPS.length) * 100;

  return (
    <section
      ref={containerRef}
      id="process"
      className="py-20 sm:py-28 lg:py-32 bg-sand relative overflow-hidden w-full max-w-full"
    >
      {/* Background grain texture */}
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full blur-[140px] bg-accent-blue/5 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-[140px] bg-accent/5 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl space-y-3.5">
          <div className="flex items-center gap-2">
            <span className="process-header-reveal font-mono text-xs uppercase tracking-[0.3em] text-accent font-semibold block">
              Proven Engineering Lifecycle
            </span>
          </div>

          <h2 className="process-header-reveal text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-cyprus tracking-tight">
            How We Build. Step by Step.
          </h2>

          <p className="process-header-reveal text-sm sm:text-base text-ink-muted leading-relaxed">
            Every product moves through our battle-tested 5-stage development cycle. Zero ambiguous assumptions, strict type safety, and real-time observability at every milestone.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 1. DESKTOP VIEW: Connected High-Tech Pipeline Grid (Visible on lg+) */}
        {/* ========================================================================= */}
        <div ref={desktopGridRef} className="hidden lg:block mt-16">
          {/* Animated Energy Flow Conduit Line connecting all 5 steps */}
          <div className="relative mb-8 px-6">
            {/* Base track line */}
            <div className="process-conduit-bar h-[3px] w-full bg-sand-shade rounded-full overflow-hidden relative">
              {/* Dynamic filled gradient pulse track */}
              <div
                className="h-full bg-gradient-to-r from-cyprus via-accent-blue to-accent transition-all duration-500 rounded-full animate-pipeline-flow"
                style={{
                  width:
                    hoveredStep !== null
                      ? `${((hoveredStep + 1) / PROCESS_STEPS.length) * 100}%`
                      : '100%',
                }}
              />
            </div>

            {/* Stepper Node Pins aligned over the 5 cards */}
            <div className="absolute -top-3.5 left-6 right-6 flex justify-between pointer-events-none">
              {PROCESS_STEPS.map((step, idx) => {
                const isHovered = hoveredStep === idx;
                const isPassed = (hoveredStep !== null ? hoveredStep : 4) >= idx;

                return (
                  <div
                    key={`node-${step.number}`}
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 border-2 ${
                      isHovered
                        ? 'bg-cyprus text-accent-blue border-accent-blue scale-125 shadow-lg shadow-accent-blue/20'
                        : isPassed
                        ? 'bg-white text-cyprus border-cyprus shadow-sm'
                        : 'bg-sand-shade text-ink-muted border-sand-shade'
                    }`}
                  >
                    {isHovered ? (
                      <span className="w-2 h-2 rounded-full bg-accent-blue animate-ping" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5-Column Interconnected Cards Grid */}
          <div className="grid grid-cols-5 gap-4 xl:gap-5">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.number}
                onMouseEnter={() => setHoveredStep(idx)}
                onMouseLeave={() => setHoveredStep(null)}
                className="process-step-card group relative p-5 xl:p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-sand-shade hover:border-accent-blue/40 hover:-translate-y-2 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default"
              >
                {/* Laser top edge glow on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Giant watermark numeral in card background */}
                <div className="absolute top-3 right-3 text-6xl font-mono font-black text-cyprus/[0.04] group-hover:text-accent-blue/[0.08] pointer-events-none select-none transition-colors duration-300">
                  {step.number}
                </div>



                <div className="relative z-10">
                  {/* Top Step Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyprus/5 border border-cyprus/10 flex items-center justify-center text-cyprus group-hover:bg-cyprus group-hover:text-accent-blue group-hover:border-accent-blue/30 transition-all duration-300 shadow-sm">
                      {renderStepIcon(step.iconName, 'w-5 h-5')}
                    </div>
                  </div>

                  {/* Title & Tag */}
                  <h3 className="text-lg xl:text-xl font-bold font-display text-cyprus group-hover:text-cyprus-soft transition-colors tracking-tight">
                    {step.title}
                  </h3>

                  <div className="text-[11px] font-semibold text-accent mt-0.5 mb-2 line-clamp-1">
                    {step.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-ink-muted leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables Checklist Footer */}
                <div className="relative z-10 mt-4 pt-3.5 border-t border-sand-shade/80 space-y-1.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyprus/70 font-bold block">
                      Deliverables
                    </span>
                    <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      {step.metricBadge}
                    </span>
                  </div>

                  {step.deliverables.map((del, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-ink-muted">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1 group-hover:text-ink transition-colors">
                        {del}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MOBILE VIEW: Interactive Compact Experience (Visible on < lg) */}
        {/* Eliminates long scrolling fatigue; compact viewport with zero horizontal overflow */}
        {/* ========================================================================= */}
        <div ref={mobileContainerRef} className="block lg:hidden mt-10 w-full max-w-full overflow-hidden">
          {/* View Mode Switcher Header */}
          <div className="flex items-center justify-between mb-5 px-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span className="font-mono text-xs text-cyprus font-semibold uppercase tracking-wider">
                Phase {activeStep + 1} of {PROCESS_STEPS.length}
              </span>
            </div>

            {/* Segmented Switch: Spotlight vs Accordion */}
            <div className="flex items-center bg-sand-shade/70 p-1 rounded-xl border border-sand-shade">
              <button
                type="button"
                onClick={() => setMobileViewMode('spotlight')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                  mobileViewMode === 'spotlight'
                    ? 'bg-white text-cyprus shadow-sm font-semibold'
                    : 'text-ink-muted hover:text-cyprus'
                }`}
              >
                Deck
              </button>
              <button
                type="button"
                onClick={() => setMobileViewMode('accordion')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                  mobileViewMode === 'accordion'
                    ? 'bg-white text-cyprus shadow-sm font-semibold'
                    : 'text-ink-muted hover:text-cyprus'
                }`}
              >
                Accordion
              </button>
            </div>
          </div>

          {/* =================================================================== */}
          {/* MODE A: COMPACT SPOTLIGHT DECK (Default & Recommended) */}
          {/* =================================================================== */}
          {mobileViewMode === 'spotlight' && (
            <div className="space-y-4 w-full max-w-full">
              {/* Stepper Progress Bar */}
              <div className="h-1.5 w-full bg-sand-shade rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyprus via-accent-blue to-accent transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Horizontal Scrollable Phase Pills */}
              <div
                ref={stepperTrackRef}
                className="flex gap-2 overflow-x-auto no-scrollbar py-1 px-1 scroll-smooth w-full max-w-full"
              >
                {PROCESS_STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={`pill-${step.number}`}
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-200 border ${
                        isActive
                          ? 'bg-cyprus text-white border-cyprus shadow-md shadow-cyprus/20 ring-1 ring-cyprus'
                          : 'bg-white text-ink-muted border-sand-shade hover:border-cyprus/30 hover:text-cyprus'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                          isActive
                            ? 'bg-accent-blue text-cyprus-deep font-extrabold'
                            : 'bg-sand text-cyprus'
                        }`}
                      >
                        {step.number}
                      </span>
                      <span className="font-semibold">{step.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Phase Card (Touch Swipeable) */}
              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{ touchAction: 'pan-y' }}
                className="relative w-full max-w-full p-5 sm:p-7 rounded-2xl bg-white border border-sand-shade shadow-lg shadow-cyprus/5 overflow-hidden transition-all duration-300"
              >
                {/* Laser top accent border */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyprus via-accent-blue to-accent" />

                {/* Giant watermark numeral */}
                <div className="absolute top-2 right-4 text-7xl font-mono font-black text-cyprus/[0.05] pointer-events-none select-none">
                  {currentStep.number}
                </div>

                <div key={activeStep} className="animate-step-card-in w-full">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-cyprus text-accent-blue flex items-center justify-center shadow-md shrink-0">
                        {renderStepIcon(currentStep.iconName, 'w-5 h-5')}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold font-display text-cyprus">
                          {currentStep.title}
                        </h3>
                        <div className="text-xs font-semibold text-accent mt-0.5">
                          {currentStep.subtitle}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold shrink-0">
                      {currentStep.metricBadge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-5">
                    {currentStep.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="pt-4 border-t border-sand-shade space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyprus font-bold block">
                      Key Deliverables:
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {currentStep.deliverables.map((del, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-ink-muted bg-sand/50 p-2 rounded-lg border border-sand-shade/60"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="font-medium text-ink">{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Prev / Next Bottom Controls & Touch Gesture Hint */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono transition-all ${
                    activeStep === 0
                      ? 'opacity-40 cursor-not-allowed text-ink-muted'
                      : 'bg-white text-cyprus border border-sand-shade shadow-sm hover:border-cyprus/40 active:scale-95'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>

                {/* Step indicator dots */}
                <div className="flex items-center gap-1.5">
                  {PROCESS_STEPS.map((_, idx) => (
                    <button
                      key={`dot-${idx}`}
                      type="button"
                      aria-label={`Jump to phase ${idx + 1}`}
                      onClick={() => setActiveStep(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeStep === idx
                          ? 'w-6 bg-cyprus'
                          : 'w-2 bg-sand-shade hover:bg-cyprus/30'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  disabled={activeStep === PROCESS_STEPS.length - 1}
                  onClick={() =>
                    setActiveStep((prev) => Math.min(PROCESS_STEPS.length - 1, prev + 1))
                  }
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono transition-all ${
                    activeStep === PROCESS_STEPS.length - 1
                      ? 'opacity-40 cursor-not-allowed text-ink-muted'
                      : 'bg-cyprus text-white shadow-md shadow-cyprus/20 hover:bg-cyprus-soft active:scale-95'
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Subtle Swipe Helper */}
              <div className="text-center text-[10px] font-mono text-ink-muted/70 pt-1">
                &larr; Swipe card or tap steps &rarr;
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* MODE B: INTERACTIVE ACCORDION VIEW */}
          {/* Compact 1-expanded + 4 collapsed vertical bars (~480px total height) */}
          {/* =================================================================== */}
          {mobileViewMode === 'accordion' && (
            <div className="space-y-3 w-full max-w-full">
              {PROCESS_STEPS.map((step, idx) => {
                const isExpanded = activeStep === idx;
                return (
                  <div
                    key={`accordion-${step.number}`}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isExpanded
                        ? 'bg-white border-cyprus/30 shadow-lg'
                        : 'bg-white/80 border-sand-shade hover:border-cyprus/20'
                    }`}
                  >
                    {/* Collapsible Header Bar */}
                    <button
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      className="w-full flex items-center justify-between p-4 text-left select-none focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                            isExpanded
                              ? 'bg-cyprus text-accent-blue shadow-sm'
                              : 'bg-sand text-cyprus'
                          }`}
                        >
                          {renderStepIcon(step.iconName, 'w-4 h-4')}
                        </div>

                        <div>
                          <h4 className="text-base font-bold font-display text-cyprus">
                            {step.title}
                          </h4>
                          <div className="text-[11px] font-semibold text-accent mt-0.5">
                            {step.subtitle}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center border transition-transform duration-300 shrink-0 ${
                          isExpanded
                            ? 'bg-cyprus text-white rotate-90 border-cyprus'
                            : 'bg-sand text-cyprus border-sand-shade'
                        }`}
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </button>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="px-4 pb-5 pt-1 space-y-4 animate-step-card-in border-t border-sand-shade/60">
                        <div className="text-xs font-semibold text-accent">
                          {step.subtitle}
                        </div>
                        <p className="text-xs text-ink-muted leading-relaxed">
                          {step.description}
                        </p>

                        <div className="pt-3 border-t border-sand-shade space-y-1.5">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono uppercase text-cyprus font-bold">
                              Deliverables:
                            </span>
                            <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                              {step.metricBadge}
                            </span>
                          </div>
                          {step.deliverables.map((del, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-1.5 text-xs text-ink-muted"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{del}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
