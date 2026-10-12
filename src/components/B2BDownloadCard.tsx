import React, { useState } from 'react';
import {
  FileText,
  Download,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  ExternalLink,
  Layers,
  Printer
} from 'lucide-react';
import { Project } from '../data/projects';
import { downloadMasterPortfolioPdf, downloadProjectCaseStudyPdf } from '../utils/pdfDownload';

interface Props {
  project?: Project;
  className?: string;
}

export const B2BDownloadCard: React.FC<Props> = ({ project, className = '' }) => {
  const [downloadingMaster, setDownloadingMaster] = useState(false);
  const [downloadingProject, setDownloadingProject] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownloadMaster = async () => {
    setDownloadingMaster(true);
    setDownloadSuccess(null);
    try {
      await downloadMasterPortfolioPdf({
        onSuccess: () => {
          setDownloadingMaster(false);
          setDownloadSuccess('Master Portfolio PDF downloaded successfully!');
          setTimeout(() => setDownloadSuccess(null), 5000);
        },
        onError: () => setDownloadingMaster(false),
      });
    } catch {
      setDownloadingMaster(false);
    }
  };

  const handleDownloadProject = async () => {
    if (!project) return;
    setDownloadingProject(true);
    setDownloadSuccess(null);
    try {
      await downloadProjectCaseStudyPdf(project.slug, project.title, {
        onSuccess: () => {
          setDownloadingProject(false);
          setDownloadSuccess(`${project.title} Case Study PDF downloaded!`);
          setTimeout(() => setDownloadSuccess(null), 5000);
        },
        onError: () => setDownloadingProject(false),
      });
    } catch {
      setDownloadingProject(false);
    }
  };

  return (
    <div
      className={`relative rounded-3xl overflow-hidden border border-sand-shade/80 bg-gradient-to-br from-cyprus-deepest via-cyprus-deep to-[#0A192F] text-sand shadow-2xl p-6 sm:p-10 ${className}`}
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header Eyebrow */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent font-semibold">
            B2B Technology Briefing • 2026 Edition
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-sand-muted px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
          <Printer className="w-3 h-3 text-accent" />
          <span>Vector A4 Printable</span>
        </div>
      </div>

      {/* Main Title & Value Pitch */}
      <div className="relative z-10 max-w-2xl space-y-3 mb-8">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-tight leading-tight">
          Download Official B2B Case Study & Company Portfolio
        </h3>
        <p className="text-xs sm:text-sm text-sand-muted leading-relaxed">
          Need to present this architecture to your executive team, CTO, or investment committee? 
          Download our client-ready, high-resolution documentation detailing system diagrams, technology stacks, verified deliverables, and engagement terms.
        </p>
      </div>

      {/* Highlights / Badges Pill Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
          <Zap className="w-4 h-4 text-accent shrink-0" />
          <div>
            <div className="text-[11px] font-bold text-white font-mono">Instant Stream</div>
            <div className="text-[10px] text-sand-muted">&lt; 0.5s Static Delivery</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
          <FileText className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <div>
            <div className="text-[11px] font-bold text-white font-mono">Vector Typography</div>
            <div className="text-[10px] text-sand-muted">Adobe & Mobile Ready</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
          <Layers className="w-4 h-4 text-accent shrink-0" />
          <div>
            <div className="text-[11px] font-bold text-white font-mono">17 Master Pages</div>
            <div className="text-[10px] text-sand-muted">All 8 Case Studies</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <div className="text-[11px] font-bold text-white font-mono">Verified Specs</div>
            <div className="text-[10px] text-sand-muted">100% Type-Safe Code</div>
          </div>
        </div>
      </div>

      {/* Action Buttons: Dual Download Choice */}
      <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
        {/* Primary Button: Master Portfolio */}
        <button
          onClick={handleDownloadMaster}
          disabled={downloadingMaster}
          className="flex-1 group/btn relative inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-accent to-accent-blue text-cyprus-deepest font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-accent/20 cursor-pointer disabled:opacity-60"
        >
          {downloadingMaster ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-cyprus border-t-transparent rounded-full animate-spin" />
              <span>Preparing Download...</span>
            </span>
          ) : (
            <>
              <Download className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5" />
              <span>Download Master Portfolio PDF</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyprus-deepest/15 text-cyprus-deepest font-bold">
                17 Pgs • 5.0 MB
              </span>
            </>
          )}
        </button>

        {/* Secondary Button: Dedicated Project Case Study */}
        {project && (
          <button
            onClick={handleDownloadProject}
            disabled={downloadingProject}
            className="flex-1 group/btn inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/40 font-semibold text-xs uppercase tracking-wider active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60"
          >
            {downloadingProject ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Downloading...</span>
              </span>
            ) : (
              <>
                <FileText className="w-4 h-4 text-accent transition-transform group-hover/btn:scale-110" />
                <span>Download This Case Study PDF</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-sand-muted">
                  3 Pgs
                </span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Success Notification Bar */}
      {downloadSuccess && (
        <div className="relative z-10 mt-4 p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Footnote */}
      <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-sand-muted">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-accent" />
          <span>Includes verified architecture diagrams, technical challenges, and NDA-backed delivery terms.</span>
        </div>
        <a
          href="/docs/Exception-IT-Solutions-B2B-Company-Portfolio.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-accent hover:underline font-mono text-[10px]"
        >
          <span>Open PDF in new tab</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
