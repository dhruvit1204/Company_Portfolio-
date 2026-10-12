import React, { useEffect, useState } from 'react';
import { Download, FileText, X, ChevronDown, Check } from 'lucide-react';
import { Project } from '../data/projects';
import { downloadMasterPortfolioPdf, downloadProjectCaseStudyPdf } from '../utils/pdfDownload';

interface Props {
  project: Project;
}

export const FloatingPdfBar: React.FC<Props> = ({ project }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;
      // Show when scrolled past 400px and not at the very bottom
      const scrolled = window.scrollY > 400;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDownloadMaster = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen(false);
    setStatusMsg('Downloading Master PDF...');
    await downloadMasterPortfolioPdf({
      onSuccess: () => {
        setStatusMsg('Downloaded!');
        setTimeout(() => setStatusMsg(null), 3000);
      },
    });
  };

  const handleDownloadCaseStudy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen(false);
    setStatusMsg('Downloading Case Study...');
    await downloadProjectCaseStudyPdf(project.slug, project.title, {
      onSuccess: () => {
        setStatusMsg('Downloaded!');
        setTimeout(() => setStatusMsg(null), 3000);
      },
    });
  };

  if (!isVisible || isDismissed) return null;

  return (
    <aside
      aria-label="Quick PDF Download Bar"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-2xl animate-fade-in-up"
    >
      <div className="relative rounded-2xl bg-cyprus-deep/95 backdrop-blur-xl border border-white/20 shadow-2xl p-2.5 sm:p-3 text-sand flex items-center justify-between gap-3">
        {/* Left: Project Branding & Info */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center text-accent shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="truncate">B2B Documentation • A4 PDF</span>
            </div>
            <div className="text-xs font-bold font-display text-white truncate">
              {project.title}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="relative flex items-center gap-1.5 shrink-0">
          {/* Quick Download Button with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(prev => !prev)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-accent text-cyprus-deepest font-bold text-xs uppercase tracking-wider hover:bg-accent/90 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              {statusMsg ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="text-[11px]">{statusMsg}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">PDF</span>
                  <ChevronDown className="w-3 h-3 transition-transform" />
                </>
              )}
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 bottom-full mb-2 w-64 rounded-xl bg-cyprus-deepest/95 backdrop-blur-2xl border border-white/20 shadow-2xl p-2 space-y-1.5 text-xs z-50">
                <button
                  onClick={handleDownloadMaster}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-white/10 transition-colors flex items-start gap-2 text-sand"
                >
                  <FileText className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-white text-[11px]">Master Company Portfolio</div>
                    <div className="text-[10px] text-sand-muted">Complete 17 Pgs • All 8 Projects (5.0 MB)</div>
                  </div>
                </button>

                <button
                  onClick={handleDownloadCaseStudy}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-white/10 transition-colors flex items-start gap-2 text-sand"
                >
                  <FileText className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-white text-[11px]">This Project Case Study</div>
                    <div className="text-[10px] text-sand-muted">Focused 3 Pgs • Dedicated Briefing</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss floating PDF download bar"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-sand-muted hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
