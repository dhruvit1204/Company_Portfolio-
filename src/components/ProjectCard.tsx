import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { Project } from '../data/projects';
import { ProjectImageScroller } from './ProjectImageScroller';

interface Props {
  project: Project;
  featured?: boolean;
  cardIndex?: number;
}

export const ProjectCard: React.FC<Props> = ({ project, cardIndex = 0 }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className="project-card-item group relative flex flex-col rounded-2xl bg-cyprus-deep border border-sand-shade/80 shadow-md hover:shadow-2xl hover:border-cyprus/50 transition-all duration-500 overflow-hidden transform-gpu will-change-transform"
    >
      {/* 1. Dedicated Wide-Landscape Image Showcase Viewport */}
      <div className="relative w-full h-[260px] sm:h-[300px] md:h-[330px] bg-[#071322] overflow-hidden border-b border-white/10">
        <ProjectImageScroller
          project={project}
          isDetailsOpen={isCardHovered}
          cardIndex={cardIndex}
          className="h-full w-full"
        />

        {/* Top Floating Glass Navigation Header Bar */}
        <div className="absolute top-3.5 inset-x-3.5 z-20 flex items-center justify-between pointer-events-none gap-2">
          {/* Left Badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-full bg-cyprus-deep/90 backdrop-blur-md text-sand border border-white/20 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {project.category}
            </span>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyprus-deep/80 backdrop-blur-md text-sand-muted border border-white/15">
              {project.year}
            </span>
          </div>

          {/* Right Direct Live Site Badge (Interactive) */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="pointer-events-auto inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-full bg-cyprus-deep/90 backdrop-blur-md text-accent border border-accent/40 hover:bg-accent hover:text-cyprus-deepest transition-all shadow-md group/live"
              title={`Open ${project.title} live website`}
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3 transition-transform group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>

      {/* 2. Structured Card Information Body */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 bg-gradient-to-b from-cyprus-deep to-cyprus-deepest text-sand space-y-4">
        <div>
          {/* Subtitle / Context Row */}
          <div className="flex items-center gap-2 text-xs font-mono text-sand-muted mb-1.5">
            <span className="text-accent uppercase tracking-wider font-semibold">
              {project.type}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#c5a059]" /> Surat, Gujarat
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight leading-snug group-hover:text-accent transition-colors">
            <Link
              to={`/projects/${project.slug}`}
              className="hover:underline focus:outline-none"
            >
              {project.title}
            </Link>
          </h3>

          {/* Summary */}
          <p className="mt-2 text-xs sm:text-sm text-sand-muted leading-relaxed line-clamp-2">
            {project.summary}
          </p>

          {/* Technologies Badges */}
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map(tech => (
              <span
                key={tech.name}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-sand-muted"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="pt-3 border-t border-white/10 flex items-center gap-3">
          {/* View Case Study Button */}
          <Link
            to={`/projects/${project.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-cyprus-deepest font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-accent/90 transition-all shadow-md hover:shadow-accent/25 group/btn"
          >
            <span>View Case Study</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>

          {/* Live Site Button */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider border border-white/20 transition-all shadow-sm"
              title={`Open ${project.title} live website`}
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-accent" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
