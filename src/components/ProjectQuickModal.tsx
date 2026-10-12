import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowUpRight, CheckCircle2, Cpu, ExternalLink } from 'lucide-react';
import { Project } from '../data/projects';
import { ProjectVisualPreview } from './ProjectVisualPreview';

interface Props {
  project: Project | null;
  onClose: () => void;
  onOpenContact: (service: string) => void;
}

export const ProjectQuickModal: React.FC<Props> = ({ project, onClose, onOpenContact }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-3xl bg-white text-ink rounded-2xl border border-sand-shade shadow-2xl overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with Visual Preview */}
        <div className="relative bg-cyprus-deep p-4 sm:p-6 text-sand">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-30 p-2 text-sand-muted hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <ProjectVisualPreview project={project} isDetailed={true} />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyprus mb-2">
              <span className="font-semibold uppercase">{project.category}</span>
              <span>•</span>
              <span className="text-ink-muted">{project.type}</span>
              <span>•</span>
              <span className="text-ink-muted">{project.year}</span>
            </div>
            <h3 id="quick-modal-title" className="text-2xl sm:text-3xl font-bold font-display text-cyprus">
              {project.title}
            </h3>
            <p className="mt-2 text-base text-ink-muted leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyprus font-semibold mb-3">
              Core Capabilities & Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((feat, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-sand border border-sand-shade">
                  <div className="font-semibold text-xs text-cyprus flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    {feat.title}
                  </div>
                  <p className="text-xs text-ink-muted mt-1 leading-normal">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyprus font-semibold mb-2">
              Architectural Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span
                  key={tech.name}
                  className="px-2.5 py-1 rounded bg-cyprus/5 text-cyprus text-xs font-mono border border-cyprus/10"
                >
                  {tech.name} <span className="text-ink-muted text-[10px]">({tech.category})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Benchmark Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-sand-shade">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-3 bg-sand rounded-lg text-center">
                <div className="text-lg font-bold font-mono text-cyprus">{m.value}</div>
                <div className="text-[11px] font-semibold text-ink-muted">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-sand border-t border-sand-shade flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-ink-muted">
            {project.clientContext}
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenContact(project.category);
              }}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-cyprus/25 text-cyprus hover:border-cyprus/60 hover:bg-white text-xs font-semibold transition-colors"
            >
              Discuss Similar Solution
            </button>
            <Link
              to={`/projects/${project.slug}`}
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-cyprus text-sand hover:bg-cyprus-soft text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Full Case Study</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
