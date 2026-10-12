import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { isReducedMotion } from '../utils/animations';

interface Props {
  onComplete?: () => void;
}

export const IntroLogoPreloader: React.FC<Props> = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const logoBoxRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);

  const { stop, start } = useSmoothScroll();
  const stopRef = useRef(stop);
  const startRef = useRef(start);
  const onCompleteRef = useRef(onComplete);

  // Keep callback refs fresh without re-triggering main animation effect
  useEffect(() => {
    stopRef.current = stop;
  }, [stop]);

  useEffect(() => {
    startRef.current = start;
  }, [start]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Main Intro Animation Effect - mounts ONCE on page load
  useEffect(() => {
    // If reduced motion is preferred, bypass immediately
    if (isReducedMotion()) {
      setIsDone(true);
      const targetLogo = document.querySelector('[data-nav-logo]') as HTMLElement;
      if (targetLogo) {
        gsap.set(targetLogo, { opacity: 1, visibility: 'visible' });
      }
      onCompleteRef.current?.();
      return;
    }

    // Freeze page scroll during intro
    stopRef.current();
    document.body.style.overflow = 'hidden';

    // Hide navbar logo initially to prevent duplicate logos during preloader
    const navLogo = document.querySelector('[data-nav-logo]') as HTMLElement;
    if (navLogo) {
      gsap.set(navLogo, { opacity: 0, visibility: 'hidden' });
    }

    const ctx = gsap.context(() => {
      // Coordinate holder for FLIP docking to navbar
      let deltaX = 0;
      let deltaY = 0;
      let dockScale = 0.2;

      // Single Unified Master Timeline
      const masterTl = gsap.timeline({
        delay: 0.1, // 100ms micro-settle for clean initial paint
        onComplete: () => {
          // Reveal the navbar logo permanently
          const targetLogo = document.querySelector('[data-nav-logo]') as HTMLElement;
          if (targetLogo) {
            gsap.set(targetLogo, { opacity: 1, visibility: 'visible' });
          }

          // Restore smooth scrolling and unmount preloader
          document.body.style.overflow = '';
          startRef.current();
          setIsDone(true);
          onCompleteRef.current?.();
        },
      });

      // 0. Initial States: Logo starts SMALL, subtle, and gently blurred in the center
      gsap.set(logoBoxRef.current, { scale: 0.35, opacity: 0, filter: 'blur(6px)' });
      gsap.set(glintRef.current, { opacity: 0, scale: 0.3 });
      if (backdropRef.current) {
        gsap.set(backdropRef.current, { opacity: 1 });
      }

      // 1. PHASE 1: Slow, Majestic Expansion from Small to Big (2.2s)
      masterTl.to(logoBoxRef.current, {
        scale: 1.0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 2.2,
        ease: 'power2.out',
        force3D: true,
      })

      // Specular Bloom Light Pulse as the logo reaches full size
      .to(glintRef.current, {
        opacity: 0.9,
        scale: 1.45,
        duration: 0.35,
        ease: 'power2.out',
      }, '-=0.35')
      .to(glintRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 0.55,
        ease: 'power2.inOut',
      })

      // 2. PHASE 2: Center Stage Prestige Hold (1.0s)
      // Logo rests flat and prominent so visitors can admire the brand emblem & typography
      .to({}, { duration: 1.0 })

      // 3. PHASE 3: Seamless Navbar Docking & Hero Reveal (2.0s)
      // Dynamically measure exact header logo position directly within the master timeline
      .call(() => {
        const targetNavLogo = document.querySelector('[data-nav-logo]') as HTMLElement;
        const logoBox = logoBoxRef.current;

        if (targetNavLogo && logoBox) {
          const targetRect = targetNavLogo.getBoundingClientRect();
          const currentRect = logoBox.getBoundingClientRect();

          if (targetRect.height > 0 && currentRect.height > 0) {
            const currentCenterX = currentRect.left + currentRect.width / 2;
            const currentCenterY = currentRect.top + currentRect.height / 2;
            const targetCenterX = targetRect.left + targetRect.width / 2;
            const targetCenterY = targetRect.top + targetRect.height / 2;

            deltaX = targetCenterX - currentCenterX;
            deltaY = targetCenterY - currentCenterY;
            dockScale = targetRect.height / currentRect.height;
          } else {
            // Responsive fallback if target measurement is zero
            const isMobile = window.innerWidth < 640;
            deltaX = -window.innerWidth / 2 + (isMobile ? 50 : 80);
            deltaY = -window.innerHeight / 2 + (isMobile ? 32 : 44);
            dockScale = isMobile ? 0.16 : 0.2;
          }
        }
      })

      // A. Smooth, majestic glide & scale-down into the navbar header position (2.0s)
      .to(logoBoxRef.current, {
        x: () => deltaX,
        y: () => deltaY,
        scale: () => dockScale,
        duration: 2.0,
        ease: 'power3.inOut',
        force3D: true,
      })

      // B. Backdrop curtain lifts and fades gradually (1.2s), revealing the hero section without sudden jumps
      .to(backdropRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut',
      }, '-=1.4') // Starts smoothly 0.6s into the docking flight

      // C. Seamless, flicker-free cross-fade handover right at the arrival destination
      .call(() => {
        const targetNavLogo = document.querySelector('[data-nav-logo]') as HTMLElement;
        if (targetNavLogo) {
          gsap.set(targetNavLogo, { opacity: 1, visibility: 'visible' });
        }
      }, undefined, '-=0.2')

      .to(logoBoxRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power1.out',
      }, '-=0.2');
    }, containerRef);

    // Global developer helper to replay anytime in console: window.__replayIntro()
    (window as any).__replayIntro = () => {
      setIsDone(false);
    };

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
      startRef.current();
      const targetLogo = document.querySelector('[data-nav-logo]') as HTMLElement;
      if (targetLogo) {
        gsap.set(targetLogo, { opacity: 1, visibility: 'visible' });
      }
    };
  }, []); // Run on initial mount only, completely immune to parent re-renderings

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-label="Loading Exception IT Solutions"
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden"
    >
      {/* 1. Independent Dark Backdrop Curtain Layer */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-[#070e1b] pointer-events-auto will-change-[opacity]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(20, 42, 74, 0.75) 0%, #070e1b 80%),
            radial-gradient(ellipse 60% 40% at 50% 30%, rgba(90, 169, 255, 0.08), transparent 70%)
          `,
        }}
      >
        <div className="absolute inset-0 bg-dark-grain opacity-25 pointer-events-none" />
      </div>

      {/* 2. Independent Animated Logo Stage Layer */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outer Docking & Scaling Wrapper: Controls Expansion (Small to Big) & Header Docking */}
        <div
          ref={logoBoxRef}
          className="relative w-64 sm:w-80 md:w-96 aspect-[480/322] flex items-center justify-center will-change-transform drop-shadow-[0_12px_40px_rgba(20,42,74,0.9)]"
          style={{ transformOrigin: 'center center' }}
        >
          {/* Specular Flash / Bloom */}
          <div
            ref={glintRef}
            className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-60 h-48 sm:h-60 rounded-full pointer-events-none will-change-transform z-30"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(90,169,255,0.65) 35%, transparent 70%)',
              filter: 'blur(10px)',
            }}
          />

          {/* Official Authentic Exception IT Solutions Logo */}
          <img
            src="/logo-mark.png"
            alt="Exception IT Solutions"
            className="w-full h-full object-contain pointer-events-none select-none"
          />
        </div>
      </div>
    </div>
  );
};
