import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Code2,
  Layers,
  Terminal,
  Database,
  Cpu,
  Cloud,
  Check,
  Search,
  X,
  Sparkles,
  Smartphone,
  Server,
  Globe,
  Boxes,
  FileCode,
  Workflow,
  Zap,
  CheckCircle2,
  ShieldCheck,
  GitBranch,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  TECH_CATEGORIES,
  MARQUEE_ROW_1,
  MARQUEE_ROW_2,
  TechItem,
  TechCategory
} from '../data/technologies';
import { isReducedMotion, TRANSITIONS } from '../utils/animations';

export const TechStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const marqueeContainerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Window resize listener to dynamically configure items per slide page
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute items per slide:
  // Desktop (>= 1024px): 8 cards (4 cols x 2 rows)
  // Tablet (640px - 1023px): 6 cards (3 cols x 2 rows)
  // Mobile (< 640px): 6 cards (2 cols x 3 rows)
  const cardsPerPage = useMemo(() => {
    if (windowWidth >= 1024) return 8;
    return 6;
  }, [windowWidth]);

  // Compute flattened skills array
  const allSkills = useMemo(() => {
    const list: (TechItem & { categoryName: string; categoryId: string })[] = [];
    TECH_CATEGORIES.forEach(cat => {
      cat.items.forEach(item => {
        list.push({
          ...item,
          categoryName: cat.category,
          categoryId: cat.id
        });
      });
    });
    return list;
  }, []);

  // Filter skills based on selected category & search query
  const filteredSkills = useMemo(() => {
    let list = allSkills;

    if (selectedCategory !== 'all') {
      list = list.filter(item => item.categoryId === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        item =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.badge?.toLowerCase().includes(q) ||
          item.tags?.some(tag => tag.toLowerCase().includes(q)) ||
          item.categoryName.toLowerCase().includes(q)
      );
    }

    return list;
  }, [allSkills, selectedCategory, searchQuery]);

  // Total pages computation
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredSkills.length / cardsPerPage));
  }, [filteredSkills.length, cardsPerPage]);

  // Reset page to 0 when category or search changes
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory, searchQuery]);

  // Safety clamp if window resize changes total pages
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [totalPages, currentPage]);

  // Skills for active slide page
  const displayedSkills = useMemo(() => {
    const startIdx = currentPage * cardsPerPage;
    return filteredSkills.slice(startIdx, startIdx + cardsPerPage);
  }, [filteredSkills, currentPage, cardsPerPage]);

  // Entrance animations on initial view
  useEffect(() => {
    if (isReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.tech-header-reveal', {
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

      // Marquee reveal
      if (marqueeContainerRef.current) {
        gsap.from(marqueeContainerRef.current, {
          scrollTrigger: {
            trigger: marqueeContainerRef.current,
            start: 'top 88%',
            once: true,
          },
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: TRANSITIONS.easePower3,
          clearProps: 'transform,opacity',
        });
      }

      // Filter controls entrance
      if (controlsRef.current) {
        gsap.from(controlsRef.current, {
          scrollTrigger: {
            trigger: controlsRef.current,
            start: 'top 88%',
            once: true,
          },
          y: 25,
          opacity: 0,
          duration: 0.7,
          ease: TRANSITIONS.easePower3,
          clearProps: 'transform,opacity',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Slide transition animation when page, category, or search changes
  useEffect(() => {
    if (isReducedMotion() || !cardsGridRef.current) return;

    const cards = cardsGridRef.current.querySelectorAll('.tech-item-card');
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 12,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          stagger: 0.03,
          ease: TRANSITIONS.easePower3,
          clearProps: 'transform,opacity',
        }
      );
    }
  }, [currentPage, selectedCategory, searchQuery]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (diffX > 50 && currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    } else if (diffX < -50 && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
    touchStartX.current = null;
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
  };

  const getTechIcon = (iconName?: string) => {
    const iconClass = "w-4 h-4 text-accent-blue transition-transform duration-300 group-hover:scale-110";
    switch (iconName) {
      case 'Code2': return <Code2 className={iconClass} />;
      case 'Globe': return <Globe className={iconClass} />;
      case 'FileCode': return <FileCode className={iconClass} />;
      case 'Layers': return <Layers className={iconClass} />;
      case 'Sparkles': return <Sparkles className={iconClass} />;
      case 'Smartphone': return <Smartphone className={iconClass} />;
      case 'Zap': return <Zap className={iconClass} />;
      case 'Boxes': return <Boxes className={iconClass} />;
      case 'Server': return <Server className={iconClass} />;
      case 'Terminal': return <Terminal className={iconClass} />;
      case 'Workflow': return <Workflow className={iconClass} />;
      case 'Database': return <Database className={iconClass} />;
      case 'Cloud': return <Cloud className={iconClass} />;
      case 'Cpu': return <Cpu className={iconClass} />;
      case 'ShieldCheck': return <ShieldCheck className={iconClass} />;
      case 'CheckCircle2': return <CheckCircle2 className={iconClass} />;
      case 'GitBranch': return <GitBranch className={iconClass} />;
      case 'Search': return <Search className={iconClass} />;
      default: return <Cpu className={iconClass} />;
    }
  };

  const getBadgeStyles = (level?: string) => {
    switch (level) {
      case 'GenAI':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'Enterprise':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Realtime':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      case 'Modern':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      case 'Security':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'Core':
      default:
        return 'bg-accent-blue/15 text-accent-blue border-accent-blue/30';
    }
  };

  const handleMarqueeSkillClick = (skillName: string) => {
    setSearchQuery(skillName.split(' ')[0]);
    setSelectedCategory('all');
    if (cardsGridRef.current) {
      cardsGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="tech-stack"
      className="py-16 sm:py-24 bg-cyprus-deep text-sand relative overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-10 right-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-72 sm:w-80 h-72 sm:h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-mono tracking-wider uppercase">
            <Flame className="w-3.5 h-3.5" />
            <span>Technical Architecture & Production Tooling</span>
          </div>
          <h2 className="tech-header-reveal text-3xl sm:text-5xl font-bold font-display text-white tracking-tight leading-tight">
            Modern Tech Stack.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sand to-accent-blue">
              Engineered For Scale.
            </span>
          </h2>
          <p className="tech-header-reveal text-sm sm:text-base text-sand-muted leading-relaxed max-w-2xl">
            We architect production-grade software using battle-tested frameworks, strict static typing, and scalable cloud ergonomics. Explore our active toolchains below.
          </p>
        </div>

        {/* 1. DUAL-DIRECTION INFINITE ANIMATED MARQUEE */}
        <div
          ref={marqueeContainerRef}
          className="mt-10 sm:mt-12 relative overflow-hidden tech-marquee-container rounded-2xl bg-cyprus/40 border border-sand/10 p-3 sm:p-4 shadow-xl backdrop-blur-sm"
        >
          {/* Gradient Masks for Seamless Edge Fading */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-14 sm:w-24 bg-gradient-to-r from-cyprus-deep to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-14 sm:w-24 bg-gradient-to-l from-cyprus-deep to-transparent z-10" />

          {/* Ribbon 1: Leftward Infinite Stream */}
          <div className="flex overflow-hidden py-1">
            <div className="flex gap-2 sm:gap-2.5 shrink-0 animate-tech-marquee-left">
              {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((item, idx) => (
                <button
                  key={`marquee-1-${idx}`}
                  onClick={() => handleMarqueeSkillClick(item.name)}
                  className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-accent-blue/40 hover:bg-accent-blue/10 transition-all duration-200 cursor-pointer text-left whitespace-nowrap"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/60 group-hover:bg-accent-blue animate-pulse" />
                  <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-accent-blue transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-sand-muted group-hover:bg-accent-blue/20 group-hover:text-sand">
                    {item.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Ribbon 2: Rightward Infinite Stream */}
          <div className="flex overflow-hidden py-1">
            <div className="flex gap-2 sm:gap-2.5 shrink-0 animate-tech-marquee-right">
              {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((item, idx) => (
                <button
                  key={`marquee-2-${idx}`}
                  onClick={() => handleMarqueeSkillClick(item.name)}
                  className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-accent/10 transition-all duration-200 cursor-pointer text-left whitespace-nowrap"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60 group-hover:bg-accent animate-pulse" />
                  <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-accent transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-sand-muted group-hover:bg-accent/20 group-hover:text-sand">
                    {item.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>


        {/* 3. INTERACTIVE CATEGORY TABS & LIVE SEARCH */}
        <div ref={controlsRef} className="mt-8 space-y-3.5">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Horizontal Scrollable Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0 scroll-smooth">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-sand text-cyprus font-bold shadow-md'
                    : 'bg-white/5 text-sand-muted hover:text-white hover:bg-white/10'
                }`}
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>All Skills</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/10">
                  {allSkills.length}
                </span>
              </button>

              {TECH_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-sand text-cyprus font-bold shadow-md'
                      : 'bg-white/5 text-sand-muted hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{cat.shortName}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedCategory === cat.id
                        ? 'bg-cyprus/20 text-cyprus'
                        : 'bg-white/10 text-sand-muted'
                    }`}
                  >
                    {cat.items.length}
                  </span>
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative min-w-[220px] sm:w-64">
              <Search className="w-3.5 h-3.5 text-sand-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-sand placeholder:text-sand-muted/60 focus:outline-none focus:border-accent-blue/60 focus:bg-white/10 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sand-muted hover:text-white p-0.5 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 4. COMPACT SLIDE SHOWCASE (PREVENTS LONG PAGE OVERFLOW) */}
        <div
          ref={cardsGridRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="mt-5"
        >
          {/* Compact Cards Grid: 4 cols on desktop, 3 on tablet, 2 on mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 min-h-[140px]">
            {displayedSkills.map(item => (
              <TechSkillCard
                key={item.name}
                item={item}
                getTechIcon={getTechIcon}
                getBadgeStyles={getBadgeStyles}
              />
            ))}
          </div>

          {/* Empty State when search returns 0 results */}
          {filteredSkills.length === 0 && (
            <div className="p-8 rounded-xl bg-white/[0.03] border border-white/10 text-center space-y-2">
              <Search className="w-6 h-6 text-sand-muted mx-auto" />
              <h4 className="text-sm font-bold text-white">No skills match "{searchQuery}"</h4>
              <p className="text-xs text-sand-muted">
                We also engineer customized stacks on request.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs font-semibold text-accent-blue hover:underline"
              >
                Clear search filter
              </button>
            </div>
          )}

          {/* 5. SLIDE PAGE CONTROLLER & DOTS (CLEAN, FIXED-HEIGHT PAGINATION) */}
          {filteredSkills.length > 0 && (
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-cyprus/50 border border-sand/10 shadow-md">
              {/* Left: Slide Index Meta */}
              <div className="flex items-center gap-2 text-xs text-sand-muted">
                <span className="font-mono text-sand font-bold text-[11px]">
                  Slide {String(currentPage + 1).padStart(2, '0')}
                </span>
                <span className="text-white/20">/</span>
                <span className="font-mono text-sand-muted text-[11px]">
                  {String(totalPages).padStart(2, '0')}
                </span>
                <span className="text-white/20 hidden sm:inline">•</span>
                <span className="text-[11px] hidden sm:inline">
                  Showing {currentPage * cardsPerPage + 1}-
                  {Math.min((currentPage + 1) * cardsPerPage, filteredSkills.length)} of{' '}
                  {filteredSkills.length} skills
                </span>
              </div>

              {/* Center: Slide Dots */}
              {totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={`slide-dot-${idx}`}
                      onClick={() => setCurrentPage(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`transition-all duration-300 rounded-full ${
                        currentPage === idx
                          ? 'w-6 h-1.5 bg-accent-blue shadow-sm'
                          : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Right: Prev & Next Arrow Controls */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-sand-muted/70 hidden sm:inline mr-1">
                  Slide Page
                </span>
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className={`p-1.5 sm:p-2 rounded-lg border transition-all duration-200 flex items-center justify-center ${
                    currentPage === 0
                      ? 'opacity-30 border-white/5 text-sand-muted cursor-not-allowed'
                      : 'bg-white/5 border-white/10 hover:border-accent-blue/40 hover:bg-accent-blue/10 text-white active:scale-95'
                  }`}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages - 1}
                  className={`p-1.5 sm:p-2 rounded-lg border transition-all duration-200 flex items-center justify-center ${
                    currentPage >= totalPages - 1
                      ? 'opacity-30 border-white/5 text-sand-muted cursor-not-allowed'
                      : 'bg-white/5 border-white/10 hover:border-accent-blue/40 hover:bg-accent-blue/10 text-white active:scale-95'
                  }`}
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Touch Swipe Hint on Mobile */}
          <div className="mt-2 text-center text-[10px] font-mono text-sand-muted/60 sm:hidden">
            👈 Swipe horizontally or tap arrows to view more skills 👉
          </div>
        </div>

      </div>
    </section>
  );
};

// Compact Skill Card (Only Shows Skill Identity, No Bulky Paragraphs)
interface CompactCardProps {
  item: TechItem & { categoryName?: string };
  getTechIcon: (iconName?: string) => React.ReactNode;
  getBadgeStyles: (level?: string) => string;
}

const TechSkillCard: React.FC<CompactCardProps> = ({
  item,
  getTechIcon,
  getBadgeStyles
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    cardRef.current.style.setProperty('--card-glow', 'rgba(90, 169, 255, 0.22)');
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.removeProperty('--mouse-x');
      cardRef.current.style.removeProperty('--mouse-y');
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card-spotlight tech-item-card group relative p-2.5 sm:p-3 rounded-xl bg-cyprus/75 border border-sand/10 hover:border-accent-blue/50 hover:bg-cyprus/95 transition-all duration-300 flex items-center justify-between gap-2 shadow-sm hover:shadow-lg hover:-translate-y-0.5 select-none"
    >
      {/* Top Laser Edge Glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent group-hover:via-accent-blue transition-all duration-500" />

      {/* Left: Icon & Skill Name */}
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-accent-blue/50 transition-all shadow-inner">
          {getTechIcon(item.iconName)}
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-accent-blue transition-colors truncate leading-tight">
            {item.name}
          </h3>
          <div className="text-[10px] text-sand-muted truncate">
            {item.badge || item.categoryName}
          </div>
        </div>
      </div>

      {/* Right: Level Tag */}
      {item.level && (
        <span
          className={`text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${getBadgeStyles(
            item.level
          )}`}
        >
          {item.level}
        </span>
      )}
    </div>
  );
};
