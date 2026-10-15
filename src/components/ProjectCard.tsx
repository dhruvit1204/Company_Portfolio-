import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronUp } from 'lucide-react';
import { Project } from '../data/projects';
import { ProjectImageScroller } from './ProjectImageScroller';

interface Props {
  project: Project;
  featured?: boolean;
  cardIndex?: number;
}

export const ProjectCard: React.FC<Props> = ({ project, featured = false, cardIndex = 0 }) => {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  // Stop image animation when project details drawer is opened
  const isDetailsOpen = isCardHovered || isMobileExpanded;

  return (
    <article
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className={`project-card-item group relative flex flex-col justify-end rounded-2xl bg-cyprus-deep border border-sand-shade/80 shadow-md hover:shadow-2xl hover:border-cyprus/50 transition-[border-color,box-shadow] duration-500 overflow-hidden ${
        featured ? 'lg:col-span-2' : ''
      } h-[410px] sm:h-[430px] md:h-[450px]`}
    >
      {/* 1. Full-Bleed Multi-Image Auto-Scroll Preview */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <ProjectImageScroller
          project={project}
          isDetailsOpen={isDetailsOpen}
          cardIndex={cardIndex}
          className="h-full w-full rounded-2xl border-0 shadow-none"
        />
      </div>

      {/* 2. Floating Top-Left Badges */}
      <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-full bg-cyprus-deep/90 backdrop-blur-md text-sand border border-white/20 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          {project.type}
        </span>
        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyprus-deep/80 backdrop-blur-md text-sand-muted border border-white/15">
          {project.year}
        </span>
      </div>

      {/* 3. Expandable Frosted Glass Details Drawer (Bottom) */}
      <div
        className={`relative z-20 w-full bg-cyprus-deep/95 backdrop-blur-xl border-t border-white/15 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_-8px_30px_rgba(0,0,0,0.35)] ${
          isMobileExpanded
            ? 'translate-y-0'
            : 'translate-y-[calc(100%-80px)] md:translate-y-[calc(100%-80px)] md:group-hover:translate-y-0 md:group-focus-within:translate-y-0'
        }`}
      >
        {/* Drawer Header (Always visible in resting state: ~80px) */}
        <div
          className="p-4 sm:p-5 pb-3 flex items-center justify-between cursor-pointer select-none"
          onClick={() => setIsMobileExpanded(prev => !prev)}
        >
          <div className="min-w-0 flex-1 pr-3">
            <div className="flex items-center gap-2 text-[11px] font-mono mb-1">
              <span className="text-accent uppercase tracking-wider font-semibold">
                {project.category}
              </span>
              <span className="text-sand-muted/50">•</span>
              <span className="text-sand-muted text-[11px]">{project.year}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-tight truncate group-hover:text-accent-blue transition-colors">
              <Link
                to={`/projects/${project.slug}`}
                className="hover:underline focus:outline-none"
                onClick={e => e.stopPropagation()}
              >
                {project.title}
              </Link>
            </h3>
          </div>

          {/* Toggle pill (Mobile expand toggle & Desktop hover cue) */}
          <button
            type="button"
            aria-label={isMobileExpanded ? "Collapse project details" : "Expand project details"}
            className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sand border border-white/10 transition-colors text-xs font-mono"
            onClick={e => {
              e.stopPropagation();
              setIsMobileExpanded(prev => !prev);
            }}
          >
            <span className="text-[11px] md:hidden">
              {isMobileExpanded ? 'Close' : 'Details'}
            </span>
            <ChevronUp
              className={`w-4 h-4 text-sand transition-transform duration-300 ${
                isMobileExpanded ? 'rotate-180 text-accent' : 'md:group-hover:rotate-180'
              }`}
            />
          </button>
        </div>

        {/* Drawer Body (Revealed on hover / tap) */}
        <div className="px-4 sm:px-5 pb-5 pt-1 space-y-3.5 border-t border-white/10">
          <div className={featured ? 'lg:flex lg:gap-6 lg:items-center' : ''}>
            <div className={featured ? 'lg:flex-1' : ''}>
              {/* Summary */}
              <p className="text-xs sm:text-sm text-sand-muted leading-relaxed line-clamp-2 sm:line-clamp-3">
                {project.summary}
              </p>

              {/* Technologies */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map(tech => (
                  <span
                    key={tech.name}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-sand-muted"
                  >
                    {tech.name}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-sand-muted/70">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Single Action: View Case Study */}
            <div className={featured ? 'lg:w-56 lg:shrink-0 pt-3 lg:pt-0' : 'pt-3'}>
              <Link
                to={`/projects/${project.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-cyprus-deepest font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-accent/90 transition-all shadow-md hover:shadow-accent/25 group/btn"
                onClick={e => e.stopPropagation()}
              >
                <span>View Case Study</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
