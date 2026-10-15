import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { Project, ProjectImageItem } from '../data/projects';

interface Props {
  project: Project;
  isDetailsOpen: boolean; // True when card is hovered or mobile drawer expanded
  cardIndex?: number;
  className?: string;
}

export const ProjectImageScroller: React.FC<Props> = ({
  project,
  isDetailsOpen,
  cardIndex = 0,
  className = '',
}) => {
  const images: ProjectImageItem[] = project.images && project.images.length > 0
    ? project.images
    : [];

  const containerRef = useRef<HTMLDivElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [imageErrorMap, setImageErrorMap] = useState<Record<number, boolean>>({});

  // 3.2 seconds per image change for comfortable, premium pacing
  const slideIntervalMs = 3200;

  // Clone first image at the end for an infinite, seamless forward-sliding carousel
  const displayImages = images.length > 1 ? [...images, images[0]] : images;

  // Track viewport visibility to pause off-screen cards
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll runs continuously on page, and STOPS when details are opened (hovered/expanded)
  const isAutoScrolling =
    isVisible &&
    !isDetailsOpen &&
    !isHoveringImage &&
    images.length > 1;

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setSlideIndex(prev => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setSlideIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToSlide = (idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsTransitioning(true);
    setSlideIndex(idx);
  };

  // Seamless infinite loop handler
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    // Only respond to track transition, prevent bubbling from child elements
    if (e.target !== e.currentTarget) return;

    if (slideIndex >= images.length) {
      // Instantly reset to index 0 without animation
      setIsTransitioning(false);
      setSlideIndex(0);
      // Re-enable smooth transition for next advance
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  };

  // Lightweight, hardware-friendly timer without 50ms state thrashing
  useEffect(() => {
    if (!isAutoScrolling) return;

    // Organic stagger offset on slide 0 so cards don't all flip at the exact same millisecond
    const delay = slideIndex === 0 ? slideIntervalMs + (cardIndex % 4) * 350 : slideIntervalMs;

    const timer = setTimeout(() => {
      nextSlide();
    }, delay);

    return () => clearTimeout(timer);
  }, [isAutoScrolling, slideIndex, nextSlide, slideIntervalMs, cardIndex]);

  const handleImageError = (index: number) => {
    setImageErrorMap(prev => ({ ...prev, [index]: true }));
  };

  if (images.length === 0) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-cyprus-deep to-[#0e213b] flex items-center justify-center ${className}`}>
        <Layers className="w-10 h-10 text-white/30" />
      </div>
    );
  }

  const activeDotIndex = slideIndex % images.length;
  const currentImage = images[activeDotIndex];

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none bg-[#071322] group/scroller ${className}`}
      onMouseEnter={() => setIsHoveringImage(true)}
      onMouseLeave={() => setIsHoveringImage(false)}
    >
      {/* 1. Smooth Sliding Filmstrip Carousel Track */}
      <div
        className={`flex w-full h-full will-change-transform ${
          isTransitioning
            ? 'transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]'
            : ''
        }`}
        style={{ transform: `translate3d(-${slideIndex * 100}%, 0, 0)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {displayImages.map((img, idx) => {
          const realIdx = idx % images.length;
          const hasError = imageErrorMap[realIdx];

          return (
            <div key={`${img.url}-${idx}`} className="relative w-full h-full shrink-0 overflow-hidden">
              {!hasError ? (
                <img
                  src={img.url}
                  alt={img.caption || `${project.title} screenshot ${realIdx + 1}`}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  onError={() => handleImageError(realIdx)}
                  className="w-full h-full object-cover object-top pointer-events-none"
                />
              ) : (
                /* Elegant fallback if image asset fails */
                <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-cyprus-deep via-[#0d223f] to-[#071322] text-sand">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-3 border border-white/15">
                    <Layers className="w-7 h-7 text-accent" />
                  </div>
                  <h4 className="text-sm font-bold font-display text-white text-center">
                    {project.title}
                  </h4>
                  <p className="text-xs text-sand-muted mt-1 text-center font-mono">
                    {img.tag || 'Interactive Preview'}
                  </p>
                </div>
              )}

              {/* Ambient Dark Scrim for bottom contrast and text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyprus-deep/95 via-transparent to-black/35 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* 2. Top-Right Image Counter Badge (Clean pill, Auto tag removed) */}
      <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 pointer-events-none">
        <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-black/60 backdrop-blur-md text-white/90 border border-white/20 shadow-md">
          {activeDotIndex + 1} / {images.length}
        </span>
      </div>

      {/* 3. Image Caption Tag (Top Left under Project Badges) */}
      {currentImage?.tag && (
        <div className="absolute top-12 left-3.5 z-20 pointer-events-none transition-all duration-300">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-cyprus-deep/90 backdrop-blur-md text-sand border border-white/15 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
            {currentImage.tag}
          </span>
        </div>
      )}

      {/* 4. Previous / Next Chevrons (Smooth hover reveal) */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={e => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-accent hover:text-cyprus-deepest text-white flex items-center justify-center backdrop-blur-md border border-white/15 opacity-0 group-hover/scroller:opacity-90 transition-all duration-300 shadow-md hover:scale-105"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={e => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-accent hover:text-cyprus-deepest text-white flex items-center justify-center backdrop-blur-md border border-white/15 opacity-0 group-hover/scroller:opacity-90 transition-all duration-300 shadow-md hover:scale-105"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* 5. Pagination Indicators & Smooth Progress Line */}
      <div className="absolute bottom-[88px] left-0 right-0 z-20 px-4 flex flex-col items-center gap-1.5 pointer-events-auto">
        {/* Slide Indicator Dots */}
        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 shadow-md">
          {images.map((_, idx) => {
            const isActive = idx === activeDotIndex;
            return (
              <button
                key={idx}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                onClick={e => goToSlide(idx, e)}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  isActive
                    ? 'w-6 bg-accent shadow-[0_0_8px_rgba(224,162,60,0.6)]'
                    : 'w-2 bg-white/40 hover:bg-white/80'
                }`}
              />
            );
          })}
        </div>

        {/* Real-time Ticker Progress Line (Hardware accelerated, 0 React re-renders) */}
        {isAutoScrolling && (
          <div className="w-24 h-0.5 bg-white/20 rounded-full overflow-hidden">
            <div
              key={`${slideIndex}-${isAutoScrolling}`}
              className="h-full bg-accent rounded-full animate-scroller-progress"
              style={{
                animationDuration: `${slideIntervalMs}ms`,
                animationPlayState: isAutoScrolling ? 'running' : 'paused',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
