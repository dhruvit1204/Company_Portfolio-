import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    // Only initialize on desktop devices with a precision pointer (mouse)
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let currentScale = 1;
    let targetScale = 1;
    let hoveringInteractive = false;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseDown = () => {
      setIsMouseDown(true);
      targetScale = 0.85;
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
      targetScale = hoveringInteractive ? 1.45 : 1;
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, label, .cursor-pointer'
      );
      hoveringInteractive = !!interactive;
      setIsHovering(hoveringInteractive);
      targetScale = hoveringInteractive ? 1.45 : 1;
    };

    // Smooth lerp tracking for outer follower ring and scale
    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      currentScale += (targetScale - currentScale) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${currentScale})`;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <>
      {/* Center sharp dot - instantaneous follow */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[99999] rounded-full bg-white transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: '5px',
          height: '5px',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />

      {/* Outer follower ring - smooth easing and hover expansion */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[99998] w-8 h-8 rounded-full border transition-[opacity,background-color,border-color] duration-200 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHovering
            ? 'bg-white/10 border-white/80'
            : isMouseDown
            ? 'bg-white/15 border-white/90'
            : 'bg-white/5 border-white/50'
        }`}
        style={{
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
    </>
  );
};
