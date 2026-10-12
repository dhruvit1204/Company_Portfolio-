import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Sparkles, Code2, Shield, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COMPANY } from '../data/company';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { useSectionTransition } from '../context/SectionTransitionContext';
import { isReducedMotion, TRANSITIONS } from '../utils/animations';
import { HeroStoryTheater, STORY_CHAPTERS } from '../components/HeroStoryTheater';

interface Props {
  onOpenContact: () => void;
}

export const Hero: React.FC<Props> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();
  const { navigateToSection } = useSectionTransition();

  // Story Theater State & Auto-Play Controller
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  // Auto-progress chapter carousel (4500ms duration per chapter)
  useEffect(() => {
    if (isHovered) return;

    const intervalTime = 50; // Update every 50ms for smooth progress bar
    const stepIncrement = (intervalTime / 4500) * 100;

    const interval = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          setCurrentChapterIndex((prevIdx) => (prevIdx + 1) % STORY_CHAPTERS.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isHovered, currentChapterIndex]);

  const handleSelectChapter = (index: number) => {
    setCurrentChapterIndex(index);
    setProgressPercent(0);
  };

  useEffect(() => {
    if (isReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: TRANSITIONS.easePower3 } });

      // 1. Line-by-Line Unified Headline Reveal
      tl.from(
        '.hero-title-line',
        {
          y: '120%',
          rotateX: 8,
          opacity: 0,
          duration: 0.95,
          stagger: 0.14,
          ease: 'power4.out',
        }
      )
      // 3. Subtext Blur-to-Sharp Fade-Up
      .from(
        subtextRef.current,
        {
          opacity: 0,
          y: 20,
          filter: 'blur(6px)',
          duration: 0.75,
          ease: 'power3.out',
        },
        '-=0.5'
      )
      // 4. Staggered CTA Buttons
      .from(
        '.hero-cta-btn',
        {
          opacity: 0,
          y: 18,
          duration: 0.6,
          stagger: 0.1,
        },
        '-=0.4'
      )
      // 5. Capability Tags Strip
      .from(
        '.hero-tag-item',
        {
          opacity: 0,
          y: 14,
          duration: 0.55,
          stagger: 0.08,
        },
        '-=0.35'
      )
      // 6. Right Interactive Story Theater Entrance
      .from(
        visualRef.current,
        {
          opacity: 0,
          scale: 0.96,
          y: 25,
          duration: 0.9,
          ease: 'power3.out',
        },
        '-=0.65'
      )
      // 7. Scroll Down Indicator
      .from(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: 10,
          duration: 0.6,
        },
        '-=0.2'
      );

      // Subtle parallax scrub as user scrolls down the hero
      gsap.to(headlineRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -30,
        opacity: 0.8,
        ease: 'none',
      });

      gsap.to(visualRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
        y: -15,
        ease: 'none',
      });

      // Fade out the scroll indicator when scrolling down
      gsap.to(scrollIndicatorRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '15% top',
          scrub: true,
        },
        opacity: 0,
        y: 8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    navigateToSection('projects');
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100dvh] lg:h-[100dvh] flex items-center bg-gradient-to-b from-cyprus-deep via-cyprus to-cyprus-deepest text-sand pt-16 sm:pt-20 lg:pt-20 pb-6 sm:pb-8 lg:pb-8 overflow-hidden"
    >
      {/* Background Ambience & Official Website Diagonal Light Beam Motif */}
      <div className="absolute inset-0 bg-dark-grain opacity-35 pointer-events-none" />

      {/* Official Website Skew Light Ray (-18deg axis) */}
      <div
        className="pointer-events-none absolute inset-y-0 right-[4%] w-[50vw] -skew-x-[18deg] opacity-[0.05]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(205, 211, 208, 0.4) 48%, rgba(205, 211, 208, 0.4) 52%, transparent 100%)',
        }}
      />

      {/* Ambient Radial Glowing Blooms matching official site palette */}
      <div className="absolute top-1/4 -right-20 w-[450px] h-[450px] bg-accent-blue/15 rounded-full blur-[120px] pointer-events-none animate-ambient-glow" />
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-hero-bloom/20 rounded-full blur-[130px] pointer-events-none animate-ambient-glow" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Editorial Storytelling in Single Balanced Frame */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-4.5 text-left">
            {/* Main Editorial Headline with UNIFIED FONT COLOR */}

            {/* 2. Main Editorial Headline with UNIFIED FONT COLOR (Properly sized to fit in frame) */}
            <h1
              ref={headlineRef}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-[2.65rem] xl:text-[3.15rem] font-bold font-display tracking-tight text-sand leading-[1.12]"
            >
              <span className="block overflow-hidden py-0.5">
                <span className="hero-title-line inline-block text-sand">
                  Engineering Digital Experiences
                </span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span className="hero-title-line inline-block text-sand">
                  That Move Businesses Forward.
                </span>
              </span>
            </h1>

            {/* 3. Supporting Narrative Subtext */}
            <p
              ref={subtextRef}
              className="text-xs sm:text-sm md:text-base text-sand/80 max-w-xl font-light leading-relaxed line-clamp-3 sm:line-clamp-none"
            >
              {COMPANY.heroSubheadline}
            </p>

            {/* 4. CTAs (Compact row on mobile & desktop) */}
            <div className="pt-1 flex flex-row items-center gap-2.5 sm:gap-3.5">
              <button
                onClick={scrollToProjects}
                className="hero-cta-btn group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-sand text-cyprus font-bold text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 hover:bg-white hover:shadow-lg active:scale-95 shadow-md shrink-0"
              >
                <span>Explore Work</span>
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-y-1" />
              </button>

              <button
                onClick={onOpenContact}
                className="hero-cta-btn inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-white/10 border border-sand/30 text-sand hover:border-sand/70 hover:bg-white/15 font-semibold text-xs sm:text-sm transition-all duration-200 active:scale-95 backdrop-blur-sm shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                <span>Start a Project</span>
              </button>
            </div>

            {/* 5. Capability Tags Strip */}
            <div className="pt-2 sm:pt-3 border-t border-white/10 flex flex-wrap items-center gap-y-1.5 gap-x-4 sm:gap-x-5 text-[11px] sm:text-xs font-mono text-sand/70">
              <span className="hero-tag-item flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-accent-blue" /> Custom Web Apps
              </span>
              <span className="hero-tag-item flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-accent" /> Applied AI & ML
              </span>
              <span className="hero-tag-item flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> Zero-Trust Security
              </span>
            </div>
          </div>

          {/* Right Column: Minimal, Compact Interactive Story Theater */}
          <div
            ref={visualRef}
            className="lg:col-span-5 relative mt-1 lg:mt-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <HeroStoryTheater
              currentChapterIndex={currentChapterIndex}
              onSelectChapter={handleSelectChapter}
              progressPercent={progressPercent}
            />
          </div>
        </div>
      </div>

      {/* Elegant Scroll Down Indicator (Minimal height footprint) */}
      <div
        ref={scrollIndicatorRef}
        onClick={scrollToProjects}
        className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-1 cursor-pointer text-sand/60 hover:text-sand transition-colors group select-none"
        aria-label="Scroll down to projects"
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-sand/70 group-hover:text-accent-blue transition-colors">
          Scroll
        </span>
        <div className="w-4 h-7 rounded-full border border-white/20 group-hover:border-accent-blue/60 transition-colors flex justify-center pt-1 bg-black/20 backdrop-blur-sm">
          <span className="w-1 h-1.5 rounded-full bg-accent-blue animate-bounce" />
        </div>
      </div>
    </section>
  );
};
