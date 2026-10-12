import React from 'react';
import {
  ShoppingBag,
  Sparkles,
  Shield,
  Workflow,
  BookOpen,
  HeartPulse,
  BarChart3,
  Globe,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';
import { Project } from '../data/projects';

interface Props {
  project: Project;
  isDetailed?: boolean;
  className?: string;
}

export const ProjectVisualPreview: React.FC<Props> = ({ project, isDetailed = false, className }) => {
  const heightClass = className ?? (isDetailed ? 'h-80 sm:h-96' : 'h-64 sm:h-72');
  // Select specialized interactive preview based on project slug
  switch (project.slug) {
    case 'ecommerce-platform':
      return (
        <div className={`w-full ${heightClass} bg-gradient-to-br from-cyprus-deep via-cyprus to-[#11294d] p-5 sm:p-6 rounded-xl flex flex-col justify-between relative overflow-hidden text-sand border border-white/10 shadow-xl group`}>
          {/* Subtle background mesh */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Top Bar */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-sand-muted">Catalog Engine v2.4</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-2.5 py-1 rounded-full text-xs text-sand">
              <ShoppingBag className="w-3.5 h-3.5 text-accent-blue" />
              <span>Cart (3 items)</span>
            </div>
          </div>

          {/* Center Product Mockup Card */}
          <div className="my-auto z-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3.5 flex items-center gap-4 transition-transform duration-300 group-hover:scale-[1.02]">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-md bg-gradient-to-tr from-accent/20 to-accent-blue/30 flex items-center justify-center border border-white/10 shrink-0">
              <Layers className="w-8 h-8 text-accent-blue animate-pulse-slow" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-accent uppercase tracking-wider">In Stock • Fast Ship</span>
                <span className="text-xs font-bold text-sand">$289.00</span>
              </div>
              <h4 className="text-sm font-semibold text-white truncate mt-0.5">Titanium Wireless Studio Pro</h4>
              <p className="text-xs text-sand-muted truncate mt-0.5">Faceted filters • Instant checkout</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-3.5 h-3.5 rounded-full bg-slate-700 border border-white/40" />
                <span className="w-3.5 h-3.5 rounded-full bg-accent-blue border border-white/40" />
                <span className="w-3.5 h-3.5 rounded-full bg-amber-600 border border-white/40" />
                <span className="text-[10px] text-sand-muted ml-1">+3 finishes</span>
              </div>
            </div>
          </div>

          {/* Bottom Filter Metrics Strip */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-sand-muted z-10 font-mono">
            <span>Query: &lt;65ms</span>
            <span className="text-emerald-400">99.98% Cache Hit</span>
            <span>REST / MongoDB</span>
          </div>
        </div>
      );

    case 'ai-recommendation-system':
      return (
        <div className={`w-full ${heightClass} bg-gradient-to-br from-[#071326] via-[#0d1e38] to-[#14284d] p-5 sm:p-6 rounded-xl flex flex-col justify-between relative overflow-hidden text-sand border border-white/10 shadow-xl group`}>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent animate-spin-slow" />
              <span className="text-xs font-mono uppercase tracking-wider text-sand-muted">Neural Vector Match</span>
            </div>
            <span className="bg-accent/20 border border-accent/40 text-accent text-xs font-mono px-2 py-0.5 rounded">
              98.4% Match
            </span>
          </div>

          {/* Center Neural Graph Visualization */}
          <div className="my-auto z-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3.5 transition-transform duration-300 group-hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-white flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-accent-blue" />
                Cosine Similarity Score
              </span>
              <span className="text-xs font-mono text-accent">384 Dimensions</span>
            </div>
            
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] text-sand-muted mb-1">
                  <span>Cloud Architecture & DevOps</span>
                  <span className="text-emerald-400 font-mono">0.962</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-accent to-accent-blue h-full rounded-full w-[96%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-sand-muted mb-1">
                  <span>Distributed Microservices</span>
                  <span className="text-emerald-400 font-mono">0.894</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-accent to-accent-blue h-full rounded-full w-[89%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-sand-muted z-10 font-mono">
            <span>FastAPI / PyTorch</span>
            <span className="text-accent">Explainable AI</span>
            <span>112ms Inference</span>
          </div>
        </div>
      );

    case 'cybersecurity-training-platform':
      return (
        <div className={`w-full ${heightClass} bg-gradient-to-br from-[#061224] via-[#091a33] to-[#122b4e] p-5 sm:p-6 rounded-xl flex flex-col justify-between relative overflow-hidden text-sand border border-white/10 shadow-xl group`}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-sand-muted">Posture: SOC2 Audit Ready</span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
              <CheckCircle2 className="w-3 h-3" /> Grade A+
            </span>
          </div>

          <div className="my-auto z-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3.5 space-y-2.5 transition-transform duration-300 group-hover:scale-[1.02]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Live Phishing Simulation Drill #18
              </span>
              <span className="font-mono text-emerald-400">96% Detected</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[10px] text-sand-muted uppercase font-mono">Sent</div>
                <div className="text-sm font-bold text-white mt-0.5">1,420</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[10px] text-sand-muted uppercase font-mono">Reported</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">1,363</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[10px] text-sand-muted uppercase font-mono">Risk Index</div>
                <div className="text-sm font-bold text-sky-400 mt-0.5">2.4%</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-sand-muted z-10 font-mono">
            <span>ASP.NET Core</span>
            <span>Zero-Trust MFA</span>
            <span>PostgreSQL</span>
          </div>
        </div>
      );

    case 'workflow-automation-platform':
      return (
        <div className={`w-full ${heightClass} bg-gradient-to-br from-[#0c1a30] via-[#102444] to-[#16335e] p-5 sm:p-6 rounded-xl flex flex-col justify-between relative overflow-hidden text-sand border border-white/10 shadow-xl group`}>
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <Workflow className="w-4 h-4 text-accent" />
              <span className="text-xs font-mono uppercase tracking-wider text-sand-muted">Pipeline Active</span>
            </div>
            <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
              2,500 events/s
            </span>
          </div>

          {/* Interactive node pipeline simulation */}
          <div className="my-auto z-10 flex items-center justify-between gap-1.5 sm:gap-2 px-1">
            <div className="bg-white/10 border border-white/20 p-2.5 rounded-lg text-center flex-1 transition-transform group-hover:-translate-y-1">
              <div className="text-[10px] font-mono text-accent uppercase">Trigger</div>
              <div className="text-xs font-medium text-white truncate mt-0.5">Webhook In</div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-sand-muted shrink-0 animate-pulse" />
            <div className="bg-accent/20 border border-accent/40 p-2.5 rounded-lg text-center flex-1 transition-transform group-hover:-translate-y-1">
              <div className="text-[10px] font-mono text-accent uppercase">AI Node</div>
              <div className="text-xs font-medium text-white truncate mt-0.5">Extract JSON</div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-sand-muted shrink-0 animate-pulse" />
            <div className="bg-white/10 border border-white/20 p-2.5 rounded-lg text-center flex-1 transition-transform group-hover:-translate-y-1">
              <div className="text-[10px] font-mono text-accent uppercase">Dispatch</div>
              <div className="text-xs font-medium text-white truncate mt-0.5">ERP Sync</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-sand-muted z-10 font-mono">
            <span>Redis Stream Queue</span>
            <span className="text-emerald-400">0 Dead Letters</span>
            <span>REST Orchestration</span>
          </div>
        </div>
      );

    case 'digital-flipbook-platform':
      return (
        <div className={`w-full ${heightClass} bg-gradient-to-br from-[#0e1d35] via-[#142c52] to-[#1b3d70] p-5 sm:p-6 rounded-xl flex flex-col justify-between relative overflow-hidden text-sand border border-white/10 shadow-xl group`}>
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent-blue" />
              <span className="text-xs font-mono uppercase tracking-wider text-sand-muted">WebGL 3D Physics</span>
            </div>
            <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded text-sand">
              Page 18 / 64
            </span>
          </div>

          {/* 3D Folded Page Simulation */}
          <div className="my-auto z-10 relative flex justify-center items-center py-2">
            <div className="w-48 sm:w-56 h-28 sm:h-32 bg-white/10 backdrop-blur-md rounded-md border border-white/20 shadow-2xl flex relative overflow-hidden transition-all duration-300 group-hover:scale-105">
              {/* Left page */}
              <div className="w-1/2 p-2 border-r border-white/20 flex flex-col justify-between bg-white/[0.04]">
                <div className="h-2 w-12 bg-white/40 rounded" />
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-white/20 rounded" />
                  <div className="h-1.5 w-4/5 bg-white/20 rounded" />
                  <div className="h-1.5 w-3/4 bg-white/20 rounded" />
                </div>
                <span className="text-[9px] font-mono text-sand-muted">18</span>
              </div>
              {/* Right curled page */}
              <div className="w-1/2 p-2 flex flex-col justify-between bg-gradient-to-l from-white/[0.08] to-transparent relative">
                <div className="absolute top-0 right-0 w-4 h-4 bg-accent-blue/30 -skew-x-12 rounded-bl-sm" />
                <div className="h-8 w-full rounded bg-accent-blue/20 flex items-center justify-center text-[10px] text-white font-medium">
                  Video Hotspot
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-white/20 rounded" />
                  <div className="h-1.5 w-3/5 bg-white/20 rounded" />
                </div>
                <span className="text-[9px] font-mono text-sand-muted self-end">19</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-sand-muted z-10 font-mono">
            <span>60 FPS Fluid Curl</span>
            <span>PDF.js Workers</span>
            <span>Responsive 3D</span>
          </div>
        </div>
      );

    case 'blood-bank-management':
      return (
        <div className={`w-full ${heightClass} bg-gradient-to-br from-[#0c182a] via-[#12233f] to-[#1c355f] p-5 sm:p-6 rounded-xl flex flex-col justify-between relative overflow-hidden text-sand border border-white/10 shadow-xl group`}>
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-rose-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-sand-muted">Emergency Dispatch</span>
            </div>
            <span className="text-xs font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded">
              SOS Broadcast
            </span>
          </div>

          {/* Blood group inventory grid */}
          <div className="my-auto z-10 grid grid-cols-4 gap-2 text-center transition-transform duration-300 group-hover:scale-[1.02]">
            <div className="bg-rose-500/10 border border-rose-500/30 p-2 rounded-lg">
              <div className="text-sm font-bold text-rose-400 font-mono">O-</div>
              <div className="text-[10px] text-rose-300 mt-0.5">Critical (4u)</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
              <div className="text-sm font-bold text-white font-mono">O+</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">Avail (38u)</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
              <div className="text-sm font-bold text-white font-mono">A+</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">Avail (26u)</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
              <div className="text-sm font-bold text-white font-mono">B+</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">Avail (41u)</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-sand-muted z-10 font-mono">
            <span>Radius: 15km GPS</span>
            <span>Real-time Socket</span>
            <span>Android / Web</span>
          </div>
        </div>
      );

    case 'bi-analytics-dashboard':
      return (
        <div className={`w-full ${heightClass} bg-gradient-to-br from-[#081528] via-[#0e2140] to-[#153260] p-5 sm:p-6 rounded-xl flex flex-col justify-between relative overflow-hidden text-sand border border-white/10 shadow-xl group`}>
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-sand-muted">Executive BI Portal</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-mono">
              <TrendingUp className="w-3.5 h-3.5" /> +28.4% YoY
            </div>
          </div>

          {/* Metric KPI Card and Sparkline */}
          <div className="my-auto z-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3.5 transition-transform duration-300 group-hover:scale-[1.02]">
            <div className="flex justify-between items-baseline mb-2">
              <div>
                <span className="text-[11px] text-sand-muted uppercase font-mono">Annual Run Rate</span>
                <div className="text-lg font-bold text-white font-mono mt-0.5">$2,840,000</div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-sand-muted uppercase font-mono">NDR</span>
                <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">124.6%</div>
              </div>
            </div>

            {/* Sparkline curve */}
            <div className="h-10 w-full flex items-end gap-1 pt-2">
              {[35, 45, 40, 60, 55, 75, 70, 85, 90, 100].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 bg-gradient-to-t from-sky-500/40 to-sky-400 rounded-t-sm"
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-sand-muted z-10 font-mono">
            <span>150k+ Data Points</span>
            <span>Recharts / D3</span>
            <span>&lt;180ms Materialized</span>
          </div>
        </div>
      );

    case 'corporate-digital-experience':
    default:
      return (
        <div className={`w-full ${heightClass} bg-gradient-to-br from-[#0c1d37] via-[#142a4a] to-[#1f3f6e] p-5 sm:p-6 rounded-xl flex flex-col justify-between relative overflow-hidden text-sand border border-white/10 shadow-xl group`}>
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-accent" />
              <span className="text-xs font-mono uppercase tracking-wider text-sand-muted">Digital Craftsmanship</span>
            </div>
            <span className="text-xs font-mono bg-accent/20 text-accent border border-accent/40 px-2 py-0.5 rounded">
              GSAP Motion
            </span>
          </div>

          {/* Kinetic agency composition */}
          <div className="my-auto z-10 text-center py-2 transition-transform duration-300 group-hover:scale-[1.02]">
            <div className="inline-block border border-accent/30 bg-accent/10 rounded-full px-3 py-1 text-xs text-accent mb-2">
              Engineering Digital Experiences
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white font-display tracking-tight">
              Bespoke Web Systems & Motion Architecture
            </h4>
            <p className="text-xs text-sand-muted mt-1 max-w-xs mx-auto">
              Fluid viewport triggers, zero layout shifts, and high conversion pipelines.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-sand-muted z-10 font-mono">
            <span>React + Vite</span>
            <span>Tailwind CSS</span>
            <span>Lighthouse 98+</span>
          </div>
        </div>
      );
  }
};
