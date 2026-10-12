import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from '../utils/animations';

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (
    target: number | string | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      immediate?: boolean;
    }
  ) => void;
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // If reduced motion is requested, do not initialize smooth scroll
    if (isReducedMotion()) {
      return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Connect Lenis scroll events to GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // Add Lenis to GSAP ticker for synchronized 60/120fps rendering
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // Notify ScrollTrigger of geometry refresh
    ScrollTrigger.refresh();

    return () => {
      lenis.off('scroll', handleScroll);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  const scrollTo = (
    target: number | string | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      immediate?: boolean;
    }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset ?? -80,
        duration: options?.duration ?? 1.2,
        immediate: options?.immediate ?? false,
      });
    } else {
      // Fallback for native scrolling
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: options?.immediate ? 'auto' : 'smooth' });
      } else if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const stop = () => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
  };

  const start = () => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  };

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisInstance,
        scrollTo,
        stop,
        start,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
};
