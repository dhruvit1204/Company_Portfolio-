import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger once globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const TRANSITIONS = {
  easePower3: 'power3.out',
  easePower4: 'power4.out',
  easeExpo: 'expo.out',
  textDuration: 0.9,
  imageDuration: 1.1,
  cardStagger: 0.12,
  defaultScrollStart: 'top 85%',
};

export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Creates a standard staggered card reveal with ScrollTrigger
 */
export const animateCardsReveal = (
  trigger: HTMLElement | string,
  cards: (HTMLElement | null)[] | NodeListOf<Element> | string,
  options?: {
    start?: string;
    y?: number;
    stagger?: number;
    duration?: number;
  }
) => {
  if (isReducedMotion()) return null;

  return gsap.from(cards, {
    scrollTrigger: {
      trigger,
      start: options?.start || TRANSITIONS.defaultScrollStart,
      once: true,
    },
    y: options?.y ?? 40,
    opacity: 0,
    duration: options?.duration ?? 0.8,
    stagger: options?.stagger ?? TRANSITIONS.cardStagger,
    ease: TRANSITIONS.easePower3,
    clearProps: 'opacity,transform',
  });
};

/**
 * Creates a headline mask reveal animation
 */
export const animateHeadlineReveal = (
  trigger: HTMLElement | string,
  elements: (HTMLElement | null)[] | string,
  options?: {
    start?: string;
    y?: string | number;
    stagger?: number;
    duration?: number;
  }
) => {
  if (isReducedMotion()) return null;

  return gsap.from(elements, {
    scrollTrigger: {
      trigger,
      start: options?.start || TRANSITIONS.defaultScrollStart,
      once: true,
    },
    y: options?.y ?? '100%',
    opacity: 0,
    duration: options?.duration ?? TRANSITIONS.textDuration,
    stagger: options?.stagger ?? 0.08,
    ease: TRANSITIONS.easePower3,
    clearProps: 'opacity,transform',
  });
};

export { gsap, ScrollTrigger };
