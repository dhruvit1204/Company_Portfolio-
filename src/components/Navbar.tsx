import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { COMPANY } from '../data/company';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { useSectionTransition } from '../context/SectionTransitionContext';

interface Props {
  onOpenContact: (service?: string) => void;
}

export const Navbar: React.FC<Props> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { scrollTo, stop, start } = useSmoothScroll();
  const { navigateToSection } = useSectionTransition();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      stop();
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
        start();
      };
    } else {
      start();
    }
  }, [mobileMenuOpen, stop, start]);

  const navLinks = [
    { label: 'Projects', href: '/#projects' },
    { label: 'Services', href: '/#services' },
    { label: 'Approach', href: '/#process' },
    { label: 'Tech Stack', href: '/#tech-stack' },
    { label: 'About', href: '/#about' },
  ];

  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      navigateToSection(targetId);
    } else if (href === '/') {
      navigateToSection('hero');
    }
  };

  const isHomePage = location.pathname === '/';
  const isSolidNav = !isHomePage || scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          mobileMenuOpen
            ? 'bg-[#091426] border-b border-white/10 py-3 sm:py-4 shadow-xl'
            : isSolidNav
            ? 'bg-cyprus/95 backdrop-blur-md border-b border-white/10 py-3 shadow-lg'
            : 'bg-transparent border-b border-transparent py-3 sm:py-4 lg:py-5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={e => {
              if (location.pathname === '/') {
                e.preventDefault();
                navigateToSection('hero');
              }
            }}
            className="flex items-center gap-3 group focus:outline-none shrink-0"
            aria-label="Exception IT Solutions Home"
          >
            <img
              data-nav-logo="true"
              src="/logo-mark.png"
              alt="Exception IT Solutions"
              className="h-10 sm:h-11 lg:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 shrink-0"
            />
            <div className="hidden sm:block shrink-0">
              <span className="block text-xs font-mono uppercase tracking-[0.25em] text-accent whitespace-nowrap">
                Portfolio Edition
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Visible on lg screens 1024px+ to avoid tablet header crowding) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 shrink-0" aria-label="Main Navigation">
            {navLinks.map(link => {
              const isAnchor = link.href.startsWith('/#');
              const isProjectsActive = location.pathname.startsWith('/projects') && link.href === '/#projects';
              return isAnchor ? (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm font-medium transition-colors py-1 relative group whitespace-nowrap text-left ${
                    isProjectsActive ? 'text-accent font-semibold' : 'text-sand/85 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                      isProjectsActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-medium transition-colors py-1 relative group whitespace-nowrap ${
                    isProjectsActive ? 'text-accent font-semibold' : 'text-sand/85 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                      isProjectsActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}

            {/* Link to main website */}
            <a
              href={COMPANY.mainWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-sand-muted hover:text-sand transition-colors border-l border-white/15 pl-4 whitespace-nowrap"
              title="Exception IT Corporate Website"
            >
              <span>Main Site</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>

          {/* Desktop Right CTA (Visible on lg screens 1024px+) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenContact()}
              className="relative inline-flex items-center justify-center gap-2 px-4 xl:px-5 py-2.5 rounded-lg bg-sand text-cyprus hover:bg-white font-semibold text-xs tracking-wide uppercase transition-all duration-200 active:scale-95 shadow-md whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyprus" />
              <span>Start a Project</span>
            </button>
          </div>

          {/* Mobile & Tablet Right Controls (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => onOpenContact()}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-sand text-cyprus hover:bg-white font-semibold text-xs uppercase tracking-wide transition-colors shadow-sm whitespace-nowrap"
            >
              Consult
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="p-2 text-sand hover:text-white rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-accent" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Fullscreen Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 lg:hidden bg-[#091426] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(20,42,74,0.6),rgba(9,20,38,1))] pt-20 sm:pt-24 pb-8 px-6 sm:px-10 overflow-y-auto flex flex-col justify-between"
        >
          <div className="max-w-xl mx-auto w-full flex-1 flex flex-col justify-between">
            {/* Top Navigation Links */}
            <nav className="flex flex-col gap-2 py-4 text-left">
              <div className="pb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
                  Menu Navigation
                </span>
              </div>

              {navLinks.map(link => {
                const isProjectsActive = location.pathname.startsWith('/projects') && link.href === '/#projects';
                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className={`text-2xl sm:text-3xl font-bold font-display transition-colors py-2 px-3 -mx-3 rounded-xl hover:bg-white/5 flex items-center justify-between group w-full text-left ${
                      isProjectsActive ? 'text-accent' : 'text-white hover:text-accent active:text-accent'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      className={`w-5 h-5 text-accent transition-opacity ${
                        isProjectsActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    />
                  </button>
                );
              })}

              <div className="pt-4 mt-2 border-t border-white/10">
                <a
                  href={COMPANY.mainWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm sm:text-base text-sand-muted hover:text-white transition-colors py-1.5 px-3 -mx-3 rounded-lg hover:bg-white/5"
                >
                  <span>Visit Main Website (exceptionit.com)</span>
                  <ArrowUpRight className="w-4 h-4 text-accent" />
                </a>
              </div>
            </nav>

            {/* Bottom CTA & Support Bar */}
            <div className="space-y-4 pt-6 mt-6 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3.5 sm:py-4 rounded-xl bg-sand text-cyprus font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-xl hover:bg-white active:scale-[0.98] transition-all"
              >
                <Sparkles className="w-4 h-4 text-cyprus" /> Start a Project With Us
              </button>

              <div className="text-center text-xs text-sand-muted flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2">
                <span>Inquiries:</span>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-sand underline hover:text-accent font-mono transition-colors"
                >
                  {COMPANY.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
