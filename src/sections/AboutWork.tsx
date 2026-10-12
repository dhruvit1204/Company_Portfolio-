import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COMPANY } from '../data/company';
import { isReducedMotion, TRANSITIONS } from '../utils/animations';

interface Props {
  onOpenContact: () => void;
}

export const AboutWork: React.FC<Props> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Narrative left column entrance
      gsap.from('.about-narrative-item', {
        scrollTrigger: {
          trigger: narrativeRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: TRANSITIONS.easePower3,
        clearProps: 'transform,opacity',
      });

      // Principles cards staggered entrance
      gsap.from('.about-principle-card', {
        scrollTrigger: {
          trigger: principlesRef.current,
          start: 'top 82%',
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: TRANSITIONS.easePower3,
        clearProps: 'transform,opacity',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="py-24 sm:py-32 bg-sand relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative Headline */}
          <div ref={narrativeRef} className="lg:col-span-5 space-y-6">
            <span className="about-narrative-item font-mono text-xs uppercase tracking-[0.3em] text-cyprus font-semibold block">
              Our Engineering Philosophy
            </span>
            <h2 className="about-narrative-item text-3xl sm:text-5xl font-bold font-display text-cyprus tracking-tight leading-tight">
              {COMPANY.philosophyHeadline}
            </h2>
            <p className="about-narrative-item text-base sm:text-lg text-ink-muted leading-relaxed">
              At Exception IT Solutions, we believe exceptional software is neither an accident nor an assembly line template. It is the outcome of deep client alignment, meticulous architectural hygiene, and relentless attention to human usability.
            </p>
            <div className="about-narrative-item pt-2">
              <a
                href={COMPANY.mainWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyprus hover:text-accent transition-colors"
              >
                <span>Read more about Exception IT on our main website</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: 4 Authentic Core Principles */}
          <div ref={principlesRef} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {COMPANY.principles.map((p, idx) => (
              <div
                key={idx}
                className="about-principle-card p-6 rounded-2xl bg-white border border-sand-shade hover:border-cyprus/30 hover:-translate-y-1.5 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-sand flex items-center justify-center text-cyprus mb-4 font-mono font-bold text-sm group-hover:bg-cyprus group-hover:text-sand transition-colors">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold font-display text-cyprus group-hover:text-cyprus-soft transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed mt-2.5">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
