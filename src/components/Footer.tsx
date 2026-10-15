import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Instagram,
  Facebook,
  Linkedin,
} from 'lucide-react';
import { COMPANY } from '../data/company';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { useSectionTransition } from '../context/SectionTransitionContext';

interface Props {
  onOpenContact: () => void;
}

export const Footer: React.FC<Props> = ({ onOpenContact }) => {
  const currentYear = new Date().getFullYear();
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const location = useLocation();
  const { navigateToSection } = useSectionTransition();
  const footerRef = useRef<HTMLElement>(null);
  const { stop, start } = useSmoothScroll();

  useEffect(() => {
    if (legalModal) {
      stop();
    } else {
      start();
    }
  }, [legalModal, stop, start]);

  const navLinks = [
    { label: 'Projects', href: '/#projects' },
    { label: 'Services', href: '/#services' },
    { label: 'Approach', href: '/#process' },
    { label: 'Tech Stack', href: '/#tech-stack' },
    { label: 'About', href: '/#about' },
  ];

  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      navigateToSection(targetId);
    } else if (href === '/') {
      navigateToSection('hero');
    }
  };

  return (
    <>
      <footer ref={footerRef} className="bg-cyprus-deep text-sand border-t border-white/10 relative overflow-hidden">
        {/* Subtle ambient lighting */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16 sm:py-20 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
            {/* Left Brand Information */}
            <div className="footer-col-item max-w-md space-y-5">
              <Link
                to="/"
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    navigateToSection('hero');
                  }
                }}
                className="inline-block group focus:outline-none"
                aria-label="Exception IT Solutions Home"
              >
                <img
                  src="/logo-mark.png"
                  alt="Exception IT Solutions"
                  className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <p className="text-sm text-sand-muted leading-relaxed max-w-sm">
                We build, secure, and run the technology modern companies depend on. Engineering exceptions, not excuses.
              </p>
            </div>

            {/* Right: NAVIGATE and CONTACT Columns */}
            <div className="footer-col-item flex flex-wrap sm:flex-nowrap gap-14 sm:gap-20 lg:gap-28">
              {/* NAVIGATE Column */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-sand-muted/70 font-semibold mb-5">
                  NAVIGATE
                </h4>
                <ul className="space-y-3.5 text-sm text-sand-muted">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <button
                        type="button"
                        onClick={() => handleNavClick(link.href)}
                        className="text-sand-muted hover:text-white transition-colors cursor-pointer text-left block focus:outline-none"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CONTACT Column */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-sand-muted/70 font-semibold mb-5">
                  CONTACT
                </h4>
                <div className="space-y-3.5 text-sm text-sand-muted">
                  <div>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-sand-muted hover:text-white transition-colors block"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                  <div>
                    <a
                      href="tel:+917698404843"
                      className="text-sand-muted hover:text-white font-mono transition-colors block"
                    >
                      +91 7698404843
                    </a>
                  </div>
                  <div>
                    <a
                      href="tel:+919824214100"
                      className="text-sand-muted hover:text-white font-mono transition-colors block"
                    >
                      +91 9824214100
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider and Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Copyright & Legal */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-sand-muted text-center sm:text-left">
              <span>© {currentYear} {COMPANY.name}. All rights reserved.</span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <button
                onClick={() => setLegalModal('privacy')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Privacy
              </button>
              <span className="text-white/20 hidden sm:inline">•</span>
              <button
                onClick={() => setLegalModal('terms')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Terms
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href={COMPANY.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-sand-muted hover:text-white hover:border-white/50 transition-colors"
                aria-label="Exception IT on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={COMPANY.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-sand-muted hover:text-white hover:border-white/50 transition-colors"
                aria-label="Exception IT on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-sand-muted hover:text-white hover:border-white/50 transition-colors"
                aria-label="Exception IT on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      {legalModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
        >
          <div className="bg-cyprus-deep text-sand p-6 sm:p-8 rounded-2xl max-w-lg w-full border border-white/15 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-display text-white">
                {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Engagement'}
              </h3>
              <button
                onClick={() => setLegalModal(null)}
                className="text-sand-muted hover:text-white"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-sand-muted leading-relaxed space-y-3 max-h-60 overflow-y-auto">
              <p>
                Exception IT Solutions adheres to strict confidentiality, IP protection, and data governance standards. All customer project information, architecture specs, and communications submitted through this portfolio website are held in absolute confidence.
              </p>
              <p>
                We do not sell or lease personal inquiry details to third-party brokers. Project inquiries are used solely by our internal engineering team to provide solution proposals and consultations.
              </p>
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 bg-sand text-cyprus hover:bg-white rounded text-xs font-semibold transition-colors"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
