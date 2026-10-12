import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS, CATEGORIES, ProjectCategory, Project } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { isReducedMotion, TRANSITIONS } from '../utils/animations';

interface Props {
  onQuickView?: (project: Project) => void;
}

export const ProjectExplorer: React.FC<Props> = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All Projects');
  const [searchQuery, setSearchQuery] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchesCategory =
        selectedCategory === 'All Projects' || project.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Category counts map
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All Projects': PROJECTS.length,
    };
    CATEGORIES.slice(1).forEach(cat => {
      counts[cat] = PROJECTS.filter(p => p.category === cat).length;
    });
    return counts;
  }, []);

  const handleReset = () => {
    setSelectedCategory('All Projects');
    setSearchQuery('');
  };

  // ScrollTrigger Initial Reveal for Section Header and Controls
  useEffect(() => {
    if (isReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.project-header-reveal', {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: TRANSITIONS.easePower3,
        clearProps: 'transform,opacity',
      });

      // Controls entrance
      gsap.from(controlsRef.current, {
        scrollTrigger: {
          trigger: controlsRef.current,
          start: 'top 88%',
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: TRANSITIONS.easePower3,
        clearProps: 'transform,opacity',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Stagger animation when cards are loaded / filtered
  useEffect(() => {
    if (isReducedMotion() || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('article');
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: TRANSITIONS.easePower3,
          clearProps: 'transform,opacity',
        }
      );
    }
  }, [selectedCategory, searchQuery]);

  return (
    <section ref={containerRef} id="projects" className="py-24 sm:py-32 bg-sand relative overflow-hidden">
      {/* Background grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-60" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl space-y-4">
          <span className="project-header-reveal font-mono text-xs uppercase tracking-[0.3em] text-cyprus font-semibold block">
            Featured Portfolio & Case Studies
          </span>
          <h2 className="project-header-reveal text-3xl sm:text-5xl font-bold font-display text-cyprus tracking-tight leading-tight">
            Selected Work. Real Solutions.{' '}
            <span className="text-cyprus-soft">Thoughtful Engineering.</span>
          </h2>
          <p className="project-header-reveal text-base sm:text-lg text-ink-muted leading-relaxed">
            Explore a curated selection of our digital capabilities across full-stack web platforms, machine learning pipelines, enterprise cybersecurity awareness tools, and high-density analytics dashboards.
          </p>
        </div>

        {/* Filter and Search Bar Controls */}
        <div ref={controlsRef} className="mt-12 space-y-5">
          {/* Top row: Search input + Results summary */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted/70" />
              <input
                type="text"
                placeholder="Search by title, technology (e.g. React, Python, ASP.NET)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-sand-shade text-ink placeholder-ink-muted/60 text-sm shadow-sm focus:border-cyprus focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-muted hover:text-ink font-mono"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
              <span>Showing {filteredProjects.length} of {PROJECTS.length} solutions</span>
              {(selectedCategory !== 'All Projects' || searchQuery) && (
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 text-cyprus font-semibold hover:underline ml-2"
                >
                  <RotateCcw className="w-3 h-3" /> Reset filters
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
            {CATEGORIES.map(category => {
              const count = categoryCounts[category] || 0;
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-cyprus text-sand shadow-md'
                      : 'bg-white border border-sand-shade text-ink-muted hover:text-cyprus hover:border-cyprus/30'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-sand text-ink-muted'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="mt-10">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  cardIndex={idx}
                  featured={idx === 0 && selectedCategory === 'All Projects' && !searchQuery}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-20 text-center bg-white rounded-2xl border border-sand-shade p-8 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-sand flex items-center justify-center text-ink-muted">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-cyprus">
                No matching projects found
              </h3>
              <p className="text-sm text-ink-muted max-w-md mx-auto">
                No solutions matched "{searchQuery}" under the category "{selectedCategory}". Try adjusting your keywords or clearing the filter.
              </p>
              <div>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-lg bg-cyprus text-sand font-semibold text-xs uppercase tracking-wider hover:bg-cyprus-soft transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
