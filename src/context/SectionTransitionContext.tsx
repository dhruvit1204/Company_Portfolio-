import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useSmoothScroll } from './SmoothScrollContext';
import { isReducedMotion } from '../utils/animations';
import { triggerSectionArrival } from '../utils/sectionArrivalAnimation';

export interface SectionMeta {
  number: string;
  badge: string;
  title: string;
  subtitle: string;
}

export const SECTION_METADATA: Record<string, SectionMeta> = {
  projects: {
    number: '01',
    badge: 'SELECTED WORKS',
    title: 'Featured Projects',
    subtitle: 'Enterprise Architecture, SaaS & Digital Platforms',
  },
  services: {
    number: '02',
    badge: 'SOLUTIONS & CAPABILITIES',
    title: 'Core Services',
    subtitle: 'Full-Cycle Engineering & Strategic Digital Solutions',
  },
  process: {
    number: '03',
    badge: 'DELIVERY FRAMEWORK',
    title: 'Strategic Process',
    subtitle: 'From Architecture Design to Production Scale',
  },
  'tech-stack': {
    number: '04',
    badge: 'ENGINEERING ARSENAL',
    title: 'Technology Stack',
    subtitle: 'Modern Tooling, Cloud Infrastructure & Standards',
  },
  about: {
    number: '05',
    badge: 'COMPANY DNA',
    title: 'About The Studio',
    subtitle: 'Philosophy, Innovation & Engineering Culture',
  },
  hero: {
    number: '00',
    badge: 'STUDIO OVERVIEW',
    title: 'Exception IT Solutions',
    subtitle: 'High-Impact Engineering & Creative Technology',
  },
};

interface OverlayElements {
  container: HTMLDivElement | null;
  veil: HTMLDivElement | null;
  curtain: HTMLDivElement | null;
  card: HTMLDivElement | null;
  laser: HTMLDivElement | null;
}

interface SectionTransitionContextType {
  isTransitioning: boolean;
  currentMeta: SectionMeta;
  navigateToSection: (sectionId: string, customMeta?: Partial<SectionMeta>) => void;
  registerOverlayRefs: (refs: OverlayElements) => void;
}

const defaultMeta: SectionMeta = SECTION_METADATA.services;

const SectionTransitionContext = createContext<SectionTransitionContextType>({
  isTransitioning: false,
  currentMeta: defaultMeta,
  navigateToSection: () => {},
  registerOverlayRefs: () => {},
});

export const useSectionTransition = () => useContext(SectionTransitionContext);

interface Props {
  children: React.ReactNode;
}

export const SectionTransitionProvider: React.FC<Props> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentMeta, setCurrentMeta] = useState<SectionMeta>(defaultMeta);
  const isTransitioningRef = useRef(false);

  const overlayRefs = useRef<OverlayElements>({
    container: null,
    veil: null,
    curtain: null,
    card: null,
    laser: null,
  });

  const { lenis, scrollTo } = useSmoothScroll();
  const location = useLocation();
  const navigate = useNavigate();

  const registerOverlayRefs = useCallback((refs: OverlayElements) => {
    overlayRefs.current = refs;
  }, []);

  const navigateToSection = useCallback(
    (sectionId: string, customMeta?: Partial<SectionMeta>) => {
      const cleanId = sectionId.replace('/#', '').replace('#', '').trim() || 'hero';
      const meta = {
        ...(SECTION_METADATA[cleanId] || {
          number: '✦',
          badge: 'NAVIGATION',
          title: cleanId.replace('-', ' ').toUpperCase(),
          subtitle: 'Direct Section Viewport',
        }),
        ...customMeta,
      };

      setCurrentMeta(meta);

      // Accessibility Fallback: if user requested reduced motion, navigate immediately
      if (isReducedMotion()) {
        if (location.pathname !== '/') {
          navigate(cleanId === 'hero' ? '/' : `/#${cleanId}`);
        } else {
          const el = cleanId === 'hero' ? null : document.getElementById(cleanId);
          if (el) {
            scrollTo(el, { offset: -70 });
          } else {
            scrollTo(0, { immediate: true });
          }
          triggerSectionArrival(cleanId);
        }
        return;
      }

      const { container, veil, curtain, card, laser } = overlayRefs.current;
      if (!container || !veil || !curtain || !card) {
        // Fallback if overlay elements not yet rendered
        if (location.pathname !== '/') {
          navigate(cleanId === 'hero' ? '/' : `/#${cleanId}`);
        } else {
          const el = cleanId === 'hero' ? null : document.getElementById(cleanId);
          if (el) {
            scrollTo(el, { offset: -70 });
          } else {
            scrollTo(0);
          }
          triggerSectionArrival(cleanId);
        }
        return;
      }

      // Guard against rapid duplicate clicks
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      setIsTransitioning(true);

      // 1. Reset initial GSAP values
      gsap.set(container, { autoAlpha: 1 });
      container.style.pointerEvents = 'auto';
      gsap.set([veil, curtain], { yPercent: 100 });
      gsap.set(card, { opacity: 0, y: 35, scale: 0.94 });
      if (laser) gsap.set(laser, { xPercent: -100 });

      // 2. Build the unified transition timeline
      const tl = gsap.timeline();

      // --- PHASE 1: Curtain sweeps up to 100% cover the screen ---
      tl.to(veil, {
        yPercent: 0,
        duration: 0.38,
        ease: 'power3.inOut',
      })
        .to(
          curtain,
          {
            yPercent: 0,
            duration: 0.44,
            ease: 'power4.inOut',
          },
          '-=0.25'
        )
        .to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.32,
            ease: 'power3.out',
          },
          '-=0.18'
        );

      if (laser) {
        tl.to(
          laser,
          {
            xPercent: 100,
            duration: 0.55,
            ease: 'power2.inOut',
          },
          '-=0.3'
        );
      }

      // --- PHASE 2: Mid-Transition Repositioning (The screen is completely covered!) ---
      tl.call(() => {
        const performJump = () => {
          const targetEl = cleanId === 'hero' ? null : document.getElementById(cleanId);
          let targetY = 0;
          if (targetEl) {
            targetY = Math.max(0, targetEl.getBoundingClientRect().top + window.scrollY - 70);
          }

          // Instant silent jump behind the dark curtain (no one can see this jump)
          window.scrollTo({ top: targetY, behavior: 'instant' as ScrollBehavior });
          if (lenis) {
            lenis.scrollTo(targetY, { immediate: true });
          }
        };

        if (location.pathname !== '/') {
          navigate('/');
          setTimeout(performJump, 60);
        } else {
          performJump();
        }
      });

      // Brief dramatic pause (150ms) while screen is masked so the user sees the section title
      tl.to({}, { duration: 0.16 });

      // --- PHASE 3: Curtain slides up into the sky to reveal destination ---
      tl.to(card, {
        opacity: 0,
        y: -25,
        scale: 0.96,
        duration: 0.24,
        ease: 'power2.in',
      })
        .to(
          curtain,
          {
            yPercent: -100,
            duration: 0.46,
            ease: 'power4.inOut',
          },
          '-=0.1'
        )
        .to(
          veil,
          {
            yPercent: -100,
            duration: 0.38,
            ease: 'power3.inOut',
          },
          '-=0.32'
        );

      // --- PHASE 4: On Complete: Clean up overlay and trigger section arrival sequence ---
      tl.call(() => {
        gsap.set(container, { autoAlpha: 0 });
        gsap.set([curtain, veil], { yPercent: 100 });
        container.style.pointerEvents = 'none';
        isTransitioningRef.current = false;
        setIsTransitioning(false);

        // Choreographed arrival entrance on target section
        triggerSectionArrival(cleanId);
      });
    },
    [location.pathname, navigate, lenis, scrollTo]
  );

  return (
    <SectionTransitionContext.Provider
      value={{
        isTransitioning,
        currentMeta,
        navigateToSection,
        registerOverlayRefs,
      }}
    >
      {children}
    </SectionTransitionContext.Provider>
  );
};
