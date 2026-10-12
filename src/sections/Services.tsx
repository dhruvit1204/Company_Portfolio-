import React, { useState, useEffect, useRef } from 'react';
import {
  Palette,
  Code2,
  Cpu,
  Cloud,
  TrendingUp,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES, ServiceItem } from '../data/services';
import { isReducedMotion, TRANSITIONS } from '../utils/animations';

interface Props {
  onOpenContact?: (serviceName?: string) => void;
}

// Individual Awwwards-style 3D Tilt & Cursor Spotlight Card with unified website blue theme
const ServiceCard: React.FC<{
  service: ServiceItem;
}> = ({ service }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update CSS custom properties for radial spotlight
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    cardRef.current.style.setProperty('--card-glow', 'rgba(90, 169, 255, 0.22)');

    // Subtle 3D perspective tilt calculation for desktop
    if (window.innerWidth >= 768) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      setTilt({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    if (cardRef.current) {
      cardRef.current.style.removeProperty('--mouse-x');
      cardRef.current.style.removeProperty('--mouse-y');
    }
  };

  const getIcon = (iconName: string) => {
    const iconClass = "w-6 h-6 text-accent-blue transition-transform duration-300 group-hover:scale-110";
    switch (iconName) {
      case 'Palette':
        return <Palette className={iconClass} />;
      case 'Code2':
        return <Code2 className={iconClass} />;
      case 'Cpu':
        return <Cpu className={iconClass} />;
      case 'Cloud':
        return <Cloud className={iconClass} />;
      case 'TrendingUp':
        return <TrendingUp className={iconClass} />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck className={iconClass} />;
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tilt.x !== 0 || tilt.y !== 0
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`
          : undefined,
      }}
      className="card-spotlight group relative flex-shrink-0 w-[84vw] max-w-[340px] sm:w-[380px] sm:max-w-[380px] rounded-2xl bg-cyprus-deep/90 border border-sand/10 hover:border-accent-blue/40 hover:bg-cyprus-deep transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl select-none cursor-default"
    >
      {/* Top Laser Edge Glow matching website blue theme */}
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent group-hover:via-accent-blue transition-all duration-500" />

      {/* Giant Watermark Numeral in Background */}
      <div className="absolute top-2 right-4 text-7xl sm:text-8xl font-mono font-black text-white/10 group-hover:text-accent-blue/20 pointer-events-none select-none transition-colors duration-500">
        {service.indexNumber}
      </div>

      <div className="p-6 sm:p-7 relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Top Icon */}
          <div className="mb-5">
            <div className="w-12 h-12 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center transition-all duration-300 group-hover:border-accent-blue/40 group-hover:scale-105 shadow-inner">
              {getIcon(service.iconName)}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-sand transition-colors line-clamp-1">
            {service.title}
          </h3>

          {/* Agency Value Proposition Tag */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-tight text-sand-muted/80">
              {service.statsBadge}
            </span>
          </div>

          {/* Blurb */}
          <p className="mt-3 text-sm text-sand-muted leading-relaxed line-clamp-3">
            {service.blurb}
          </p>
        </div>

        {/* Capability Checklist Points */}
        <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-4">
          {service.points.map((pt, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-sand/90">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent-blue shrink-0 mt-0.5" />
              <span className="line-clamp-1">{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Services: React.FC<Props> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const marqueeContainerRef = useRef<HTMLDivElement>(null);

  // Marquee Pause State
  const [isPaused, setIsPaused] = useState(false);

  // Manual Drag Scrubbing State
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // GSAP Entrance Animations
  useEffect(() => {
    if (isReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.services-header-reveal', {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: TRANSITIONS.easePower3,
        clearProps: 'transform,opacity',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Drag to scrub handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!marqueeContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - marqueeContainerRef.current.offsetLeft);
    setScrollLeft(marqueeContainerRef.current.scrollLeft);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !marqueeContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - marqueeContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag sensitivity
    marqueeContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      ref={containerRef}
      id="services"
      className="py-24 sm:py-32 bg-cyprus text-sand relative overflow-hidden"
    >
      {/* Ambient Blue Background Glow matching website theme */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] bg-accent-blue/10 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full blur-[130px] bg-accent-blue/8 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl space-y-4 text-left">
          <div className="flex items-center gap-2.5">
            <span className="services-header-reveal font-mono text-xs uppercase tracking-[0.3em] text-accent font-semibold block">
              Core Capabilities & Specialized Squads
            </span>

          </div>

          <h2 className="services-header-reveal text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
            Six Disciplines. One Uncompromising Standard.
          </h2>
          <p className="services-header-reveal text-base sm:text-lg text-sand-muted leading-relaxed">
            From high-fidelity interactive user experiences to production AI pipelines and cybersecurity VAPT, we engineer every critical layer of your product under one roof.
          </p>
        </div>
      </div>

      {/* Full-Bleed Infinite Scroll Stream Container */}
      <div className="relative mt-12 sm:mt-16 overflow-hidden py-4">
        {/* Left & Right Elegant Fade Gradients (Desktop) */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-cyprus via-cyprus/80 to-transparent z-20 pointer-events-none" />
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-cyprus via-cyprus/80 to-transparent z-20 pointer-events-none" />

        {/* Marquee Track Wrapper */}
        <div
          ref={marqueeContainerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="overflow-x-auto no-scrollbar scroll-smooth flex"
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          {/* Dual Buffer for Seamless Infinite Marquee Loop */}
          <div
            className={`flex gap-5 sm:gap-6 px-4 sm:px-8 w-max animate-services-marquee-forward ${
              isPaused || isDragging ? 'marquee-paused' : ''
            }`}
            style={
              {
                '--marquee-duration': '34s',
              } as React.CSSProperties
            }
          >
            {/* First Set of 6 Services */}
            {SERVICES.map((service) => (
              <ServiceCard
                key={`${service.id}-set1`}
                service={service}
              />
            ))}

            {/* Second Set of 6 Services for Seamless Infinite Buffer */}
            {SERVICES.map((service) => (
              <ServiceCard
                key={`${service.id}-set2`}
                service={service}
              />
            ))}
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-mono text-sand-muted/70 sm:hidden">
          <span>&larr; Swipe to explore services &rarr;</span>
        </div>
      </div>
    </section>
  );
};
