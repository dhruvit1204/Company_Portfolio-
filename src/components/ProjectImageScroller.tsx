import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { Project, ProjectImageItem } from '../data/projects';

interface Props {
  project: Project;
  isDetailsOpen?: boolean;
  cardIndex?: number;
  className?: string;
}

export const ProjectImageScroller: React.FC<Props> = ({
  project,
  isDetailsOpen = false,
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

  // 3.5 seconds per slide
  const slideIntervalMs = 3500;

  // Clone first image at the end for an infinite, seamless forward-sliding carousel
  const displayImages = images.length > 1 ? [...images, images[0]] : images;

  // Track viewport visibility
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

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;

    if (slideIndex >= images.length) {
      setIsTransitioning(false);
      setSlideIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  };

  useEffect(() => {
    if (!isAutoScrolling) return;

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
            <div key={`${img.url}-${idx}`} className="relative w-full h-full shrink-0 overflow-hidden bg-[#071322]">
              {!hasError ? (
                <img
                  src={img.url}
                  alt={img.caption || `${project.title} screenshot ${realIdx + 1}`}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  onError={() => handleImageError(realIdx)}
                  className="w-full h-full object-cover object-top pointer-events-none transition-transform duration-700 group-hover/scroller:scale-[1.02]"
                />
              ) : (
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

              {/* Gentle bottom-only vignette for caption legibility, leaving the website screenshot bright and crisp */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* 2. Previous / Next Chevrons (Hover Reveal) */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={e => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/70 hover:bg-accent hover:text-cyprus-deepest text-white flex items-center justify-center backdrop-blur-md border border-white/20 opacity-0 group-hover/scroller:opacity-100 transition-all duration-300 shadow-md hover:scale-105"
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
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/70 hover:bg-accent hover:text-cyprus-deepest text-white flex items-center justify-center backdrop-blur-md border border-white/20 opacity-0 group-hover/scroller:opacity-100 transition-all duration-300 shadow-md hover:scale-105"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* 3. Bottom Overlay Controls: Caption Tag on Left, Dots in Center, Counter on Right */}
      <div className="absolute bottom-3 inset-x-3.5 z-20 flex items-center justify-between pointer-events-none">
        {/* Left: Current Tag */}
        {currentImage?.tag ? (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-sand border border-white/20 shadow-sm pointer-events-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {currentImage.tag}
          </span>
        ) : <span />}

        {/* Center: Slide Indicator Dots */}
        {images.length > 1 && (
          <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-sm pointer-events-auto">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                onClick={e => goToSlide(idx, e)}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  idx === activeDotIndex
                    ? 'w-5 bg-accent shadow-[0_0_8px_rgba(224,162,60,0.6)]'
                    : 'w-1.5 bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}

        {/* Right: Slide Counter */}
        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/70 backdrop-blur-md text-white/90 border border-white/20 shadow-sm pointer-events-auto">
          {activeDotIndex + 1} / {images.length}
        </span>
      </div>
    </div>
  );
};
