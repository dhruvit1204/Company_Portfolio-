import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Layers,
  Image as ImageIcon,
  Download,
  FileText
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../data/projects';
import { ProjectVisualPreview } from '../components/ProjectVisualPreview';
import { ContactModal } from '../components/ContactModal';
import { B2BDownloadCard } from '../components/B2BDownloadCard';
import { FloatingPdfBar } from '../components/FloatingPdfBar';
import { downloadMasterPortfolioPdf } from '../utils/pdfDownload';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { useSectionTransition } from '../context/SectionTransitionContext';
import { isReducedMotion, TRANSITIONS } from '../utils/animations';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [viewTab, setViewTab] = useState<'screenshots' | 'interactive'>('screenshots');
  const containerRef = useRef<HTMLDivElement>(null);
  const { lenis, stop, start } = useSmoothScroll();
  const { navigateToSection } = useSectionTransition();

  const project = PROJECTS.find(p => p.slug === slug);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    if (project) {
      document.title = `${project.title} | Case Study | Exception IT Solutions`;
    } else {
      document.title = 'Project Not Found | Exception IT Solutions';
    }
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [project, slug, lenis]);

  // Modal scroll lock synchronization
  useEffect(() => {
    if (contactOpen) {
      stop();
    } else {
      start();
    }
  }, [contactOpen, stop, start]);

  // ScrollTrigger Animations for Case Study Elements
  useEffect(() => {
    if (isReducedMotion() || !project || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero Content Entrance
      const tl = gsap.timeline({ defaults: { ease: TRANSITIONS.easePower3 } });

      tl.from('.detail-nav-item', {
        opacity: 0,
        y: -15,
        duration: 0.6,
        stagger: 0.08,
      })
      .from('.detail-meta-badge', {
        opacity: 0,
        y: 15,
        duration: 0.6,
        stagger: 0.08,
      }, '-=0.3')
      .from('.detail-hero-title', {
        opacity: 0,
        y: 35,
        duration: 0.9,
        ease: 'power4.out',
      }, '-=0.4')
      .from('.detail-hero-tagline', {
        opacity: 0,
        y: 20,
        filter: 'blur(6px)',
        duration: 0.8,
      }, '-=0.5')
      .from('.detail-preview-showcase', {
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
      }, '-=0.4')
      .from('.detail-metric-card', {
        opacity: 0,
        y: 25,
        stagger: 0.1,
        duration: 0.7,
      }, '-=0.4');

      // 2. Sections on-scroll reveals
      const el = containerRef.current;
      if (el) {
        const sections = el.querySelectorAll('.detail-scroll-section');
        sections.forEach(sec => {
          gsap.from(sec, {
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              once: true,
            },
            opacity: 0,
            y: 35,
            duration: 0.8,
            ease: TRANSITIONS.easePower3,
            clearProps: 'transform,opacity',
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [project, slug]);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-sand px-5 py-24 text-center">
        <div className="max-w-md space-y-4">
          <AlertCircle className="w-12 h-12 text-cyprus mx-auto" />
          <h1 className="text-2xl font-bold font-display text-cyprus">Case Study Not Found</h1>
          <p className="text-sm text-ink-muted">
            The project you requested does not exist or has been relocated in our portfolio.
          </p>
          <a
            href="/#projects"
            onClick={e => {
              e.preventDefault();
              navigateToSection('projects');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyprus text-sand font-semibold text-xs uppercase cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Portfolio
          </a>
        </div>
      </div>
    );
  }

  // Related projects in the same category or adjacent
  const relatedProjects = PROJECTS.filter(p => p.id !== project.id).slice(0, 2);

  return (
    <div ref={containerRef} className="bg-sand text-ink pt-28 pb-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="detail-nav-item flex items-center gap-2 text-xs font-mono text-ink-muted mb-8">
          <Link to="/" className="hover:text-cyprus transition-colors">Home</Link>
          <span>/</span>
          <a
            href="/#projects"
            onClick={e => {
              e.preventDefault();
              navigateToSection('projects');
            }}
            className="hover:text-cyprus transition-colors cursor-pointer"
          >
            Projects
          </a>
          <span>/</span>
          <span className="text-cyprus font-semibold truncate">{project.title}</span>
        </nav>

        {/* Back Link */}
        <div className="detail-nav-item mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-mono text-ink-muted hover:text-cyprus transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to previous view</span>
          </button>
        </div>

        {/* Project Header */}
        <header className="space-y-4 pb-8 border-b border-sand-shade">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="detail-meta-badge px-3 py-1 rounded-full text-xs font-mono uppercase bg-cyprus text-sand font-semibold shadow-sm">
              {project.category}
            </span>
            <span className="detail-meta-badge px-3 py-1 rounded-full text-xs font-mono bg-white border border-sand-shade text-ink-muted">
              {project.type}
            </span>
            <span className="detail-meta-badge text-xs font-mono text-ink-muted flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {project.year}
            </span>
            <button
              onClick={() => downloadMasterPortfolioPdf()}
              className="detail-meta-badge ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-accent text-cyprus-deepest hover:bg-accent/90 transition-all shadow-sm cursor-pointer"
              title="Download 17-page B2B Company Portfolio PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>B2B PDF</span>
            </button>
          </div>

          <h1 className="detail-hero-title text-3xl sm:text-5xl font-bold font-display text-cyprus tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="detail-hero-tagline text-lg sm:text-xl text-ink-muted leading-relaxed max-w-3xl font-light">
            {project.tagline}
          </p>
        </header>

        {/* Visual Showcase (Screenshots Gallery & Interactive Architecture Engine) */}
        <div className="detail-preview-showcase my-10 rounded-2xl overflow-hidden shadow-2xl border border-sand-shade bg-cyprus-deep text-sand">
          {/* Header Switcher Bar */}
          <div className="px-5 py-3.5 bg-cyprus-deepest/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewTab('screenshots')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  viewTab === 'screenshots'
                    ? 'bg-accent text-cyprus-deepest shadow-sm'
                    : 'bg-white/5 text-sand-muted hover:text-white hover:bg-white/10'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Product Screenshots ({project.images?.length || 0})</span>
              </button>

              <button
                type="button"
                onClick={() => setViewTab('interactive')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  viewTab === 'interactive'
                    ? 'bg-accent text-cyprus-deepest shadow-sm'
                    : 'bg-white/5 text-sand-muted hover:text-white hover:bg-white/10'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Interactive Live Architecture</span>
              </button>
            </div>

            {viewTab === 'screenshots' && project.images && project.images.length > 0 && (
              <div className="flex items-center gap-2 text-xs font-mono text-sand-muted">
                <span>Screen {selectedImageIdx + 1} of {project.images.length}</span>
              </div>
            )}
          </div>

          {/* Main Visual Display */}
          {viewTab === 'screenshots' && project.images && project.images.length > 0 ? (
            <div className="relative flex flex-col bg-[#071322]">
              {/* Primary Image View */}
              <div className="relative w-full h-[320px] sm:h-[440px] md:h-[520px] bg-black/40 overflow-hidden flex items-center justify-center group/mainimg">
                <img
                  src={project.images[selectedImageIdx].url}
                  alt={project.images[selectedImageIdx].caption}
                  className="w-full h-full object-cover object-top transition-all duration-500 ease-out"
                />

                {/* Ambient Scrim & Caption Bar */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    {project.images[selectedImageIdx].tag && (
                      <span className="inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-accent/20 border border-accent/40 text-accent mb-1">
                        {project.images[selectedImageIdx].tag}
                      </span>
                    )}
                    <p className="text-xs sm:text-sm text-white font-medium">
                      {project.images[selectedImageIdx].caption}
                    </p>
                  </div>

                  {/* Chevrons */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center">
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={() =>
                        setSelectedImageIdx(prev =>
                          prev === 0 ? project.images.length - 1 : prev - 1
                        )
                      }
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-accent hover:text-cyprus-deepest text-white flex items-center justify-center transition-colors border border-white/10"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={() =>
                        setSelectedImageIdx(prev =>
                          (prev + 1) % project.images.length
                        )
                      }
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-accent hover:text-cyprus-deepest text-white flex items-center justify-center transition-colors border border-white/10"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Thumbnail Selector Strip */}
              <div className="p-3 sm:p-4 bg-cyprus-deepest/95 border-t border-white/10 flex items-center gap-3 overflow-x-auto scrollbar-none">
                {project.images.map((img, idx) => {
                  const isSelected = idx === selectedImageIdx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`relative shrink-0 w-28 sm:w-36 h-18 sm:h-22 rounded-lg overflow-hidden border-2 transition-all duration-300 text-left ${
                        isSelected
                          ? 'border-accent shadow-md shadow-accent/20 scale-[1.02]'
                          : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/40'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-full object-cover object-top"
                      />
                      <span className="absolute bottom-0 inset-x-0 p-1 bg-black/75 text-[10px] font-mono text-sand truncate">
                        {img.tag || `Screen ${idx + 1}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-0">
              <ProjectVisualPreview project={project} isDetailed={true} />
            </div>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="detail-metric-card p-5 rounded-xl bg-white border border-sand-shade shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-cyprus">{m.value}</div>
              <div className="text-xs font-bold text-cyprus-soft mt-1">{m.label}</div>
              <p className="text-[11px] text-ink-muted mt-0.5">{m.detail}</p>
            </div>
          ))}
        </div>

        {/* Deep Dive Content Grid */}
        <div className="space-y-16">
          {/* Section: Overview & Context */}
          <section className="detail-scroll-section space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-cyprus font-semibold">
              01 • Executive Overview
            </h2>
            <h3 className="text-2xl font-bold font-display text-cyprus">Project Context & Purpose</h3>
            <p className="text-base text-ink-muted leading-relaxed">
              {project.overview}
            </p>
            <div className="p-4 rounded-xl bg-cyprus/5 border border-cyprus/10 text-xs text-cyprus">
              <strong>Context Note:</strong> {project.clientContext}
            </div>
          </section>

          {/* Section: Problem vs Solution */}
          <section className="detail-scroll-section grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white border border-sand-shade space-y-3 shadow-sm">
              <h3 className="text-lg font-bold font-display text-rose-900 flex items-center gap-2">
                <span>The Problem & Friction</span>
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-sand-shade space-y-3 shadow-sm">
              <h3 className="text-lg font-bold font-display text-emerald-900 flex items-center gap-2">
                <span>The Engineered Solution</span>
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {project.solution}
              </p>
            </div>
          </section>

          {/* Section: Objectives */}
          <section className="detail-scroll-section space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-cyprus font-semibold">
              02 • Technical Objectives
            </h2>
            <h3 className="text-2xl font-bold font-display text-cyprus">Key Project Goals</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.objectives.map((obj, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-sand-shade flex items-start gap-3 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-cyprus/10 flex items-center justify-center text-cyprus text-xs font-bold font-mono shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">{obj}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Key Features */}
          <section className="detail-scroll-section space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-cyprus font-semibold">
              03 • Capability Blueprint
            </h2>
            <h3 className="text-2xl font-bold font-display text-cyprus">Key Features & Interactions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.keyFeatures.map((feat, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-sand-shade shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-base font-bold font-display text-cyprus">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <span>{feat.title}</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">{feat.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Architecture & Tech Stack */}
          <section className="detail-scroll-section space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-cyprus font-semibold">
              04 • Engineering Architecture
            </h2>
            <h3 className="text-2xl font-bold font-display text-cyprus">Technology Stack Breakdown</h3>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map(tech => (
                <div
                  key={tech.name}
                  className="px-3 py-1.5 rounded-lg bg-white border border-sand-shade text-xs font-mono text-cyprus flex items-center gap-2 shadow-sm"
                >
                  <span className="font-semibold">{tech.name}</span>
                  <span className="text-[10px] text-ink-muted px-1.5 py-0.5 rounded bg-sand">
                    {tech.category}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-white border border-sand-shade space-y-3 shadow-sm">
              <h4 className="text-sm font-bold text-cyprus font-mono uppercase tracking-wider">
                System Implementation Notes
              </h4>
              <ul className="space-y-2">
                {project.architecture.map((arch, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-ink-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <span>{arch}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section: Challenges and Overcoming Them */}
          <section className="detail-scroll-section space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-cyprus font-semibold">
              05 • Technical Nuances
            </h2>
            <h3 className="text-2xl font-bold font-display text-cyprus">Challenges & Resolutions</h3>
            <div className="space-y-4">
              {project.challenges.map((c, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-sand-shade space-y-3 shadow-sm">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-rose-800 font-bold">Challenge:</span>
                    <p className="text-sm text-ink font-medium mt-0.5">{c.challenge}</p>
                  </div>
                  <div className="pt-2 border-t border-sand-shade">
                    <span className="text-[11px] font-mono uppercase text-emerald-800 font-bold">Engineered Solution:</span>
                    <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">{c.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: B2B Executive PDF Download Hub */}
          <section className="detail-scroll-section space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-cyprus font-semibold">
              06 • Executive Download Hub
            </h2>
            <B2BDownloadCard project={project} />
          </section>

          {/* Section: CTA Banner */}
          <section className="detail-scroll-section p-8 sm:p-12 rounded-2xl bg-cyprus-deep text-sand text-center space-y-6 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <h3 className="text-2xl sm:text-4xl font-bold font-display text-white">
                Need a Solution Like This?
              </h3>
              <p className="text-sm text-sand-muted leading-relaxed">
                Exception IT Solutions designs and engineers high-speed web apps, custom AI pipelines, and enterprise software matching your exact operational requirements.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setContactOpen(true)}
                  className="px-6 py-3 rounded-lg bg-sand text-cyprus font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg active:scale-95"
                >
                  Discuss Your Requirements
                </button>
                <a
                  href="/#projects"
                  onClick={e => {
                    e.preventDefault();
                    navigateToSection('projects');
                  }}
                  className="px-6 py-3 rounded-lg border border-sand/30 text-sand hover:border-sand/70 hover:bg-white/10 font-medium text-xs transition-colors cursor-pointer"
                >
                  Browse Other Projects
                </a>
              </div>
            </div>
          </section>

          {/* Related Projects */}
          <section className="detail-scroll-section pt-8 border-t border-sand-shade">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold font-display text-cyprus">Explore Other Solutions</h3>
              <a
                href="/#projects"
                onClick={e => {
                  e.preventDefault();
                  navigateToSection('projects');
                }}
                className="text-xs font-semibold text-cyprus hover:text-accent transition-colors cursor-pointer"
              >
                View all projects →
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map(rel => (
                <div
                  key={rel.id}
                  className="p-5 rounded-xl bg-white border border-sand-shade hover:border-cyprus/30 hover:-translate-y-1 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="text-[11px] font-mono uppercase text-cyprus font-semibold">
                      {rel.category}
                    </span>
                    <h4 className="text-base font-bold text-ink mt-0.5 group-hover:text-cyprus transition-colors">
                      {rel.title}
                    </h4>
                  </div>
                  <Link
                    to={`/projects/${rel.slug}`}
                    className="w-9 h-9 rounded-lg bg-sand flex items-center justify-center text-cyprus group-hover:bg-cyprus group-hover:text-sand transition-colors shrink-0 ml-4"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <FloatingPdfBar project={project} />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        preselectedService={project.category}
      />
    </div>
  );
};
