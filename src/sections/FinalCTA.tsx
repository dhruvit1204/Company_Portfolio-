import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Sparkles, Mail, Phone, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COMPANY } from '../data/company';
import { isReducedMotion, TRANSITIONS } from '../utils/animations';

interface Props {
  onOpenContact: () => void;
}

export const FinalCTA: React.FC<Props> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
        defaults: { ease: TRANSITIONS.easePower3 },
      });

      tl.from('.final-cta-badge', {
        opacity: 0,
        y: -15,
        scale: 0.9,
        duration: 0.7,
      })
      .from('.final-cta-heading', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power4.out',
      }, '-=0.4')
      .from('.final-cta-subtext', {
        opacity: 0,
        y: 25,
        filter: 'blur(6px)',
        duration: 0.8,
      }, '-=0.5')
      .from('.final-cta-btn', {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.7,
      }, '-=0.4')
      .from('.final-cta-contact-bar', {
        opacity: 0,
        y: 15,
        duration: 0.7,
      }, '-=0.3');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="contact" className="py-24 sm:py-32 bg-cyprus-deep text-sand relative overflow-hidden">
      {/* Background radial glow with ambient animation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[140px] pointer-events-none animate-ambient-glow" />

      <div className="mx-auto max-w-5xl px-5 sm:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="final-cta-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-sand">
            Let's Collaborate
          </span>
        </div>

        {/* Heading */}
        <h2 className="final-cta-heading text-4xl sm:text-6xl font-bold font-display text-white tracking-tight leading-tight">
          Have an Idea Worth Building?
        </h2>

        {/* Supporting text */}
        <p className="final-cta-subtext mt-6 text-lg sm:text-xl text-sand-muted max-w-2xl mx-auto font-light leading-relaxed">
          Let’s turn your next digital idea into a thoughtful, functional, and scalable solution. We partner with founders, enterprise leaders, and innovation teams.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-md sm:max-w-none mx-auto">
          <button
            onClick={onOpenContact}
            className="final-cta-btn w-full sm:w-auto px-8 py-4 rounded-xl bg-sand text-cyprus font-bold text-sm tracking-wide uppercase hover:bg-white hover:shadow-xl transition-all duration-200 active:scale-95 shadow-lg flex items-center justify-center gap-2"
          >
            <span>Discuss Your Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <a
            href={COMPANY.mainWebsiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="final-cta-btn w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-sand/30 text-sand font-semibold text-sm hover:border-sand/70 hover:bg-white/10 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Visit Exception IT</span>
            <ExternalLink className="w-4 h-4 opacity-70" />
          </a>
        </div>

        {/* Direct Contacts Bar */}
        <div className="final-cta-contact-bar mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-sand-muted">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-accent" />
            <a href={`mailto:${COMPANY.email}`} className="text-sand underline hover:text-accent transition-colors">
              {COMPANY.email}
            </a>
          </div>
          <span className="hidden sm:inline text-white/20">•</span>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-accent shrink-0" />
            <div className="flex flex-wrap items-center gap-2 font-mono">
              <a href={`tel:${COMPANY.phones[0].raw}`} className="text-sand hover:text-accent transition-colors">
                {COMPANY.phones[0].display}
              </a>
              <span className="text-white/20">•</span>
              <a href={`tel:${COMPANY.phones[1].raw}`} className="text-sand hover:text-accent transition-colors">
                {COMPANY.phones[1].display}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
