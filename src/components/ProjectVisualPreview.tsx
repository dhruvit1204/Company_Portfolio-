import React, { useState } from 'react';
import {
  ExternalLink,
  MapPin,
  Home,
  Building,
  CheckCircle2,
  Calendar,
  Phone,
  Stethoscope,
  HeartPulse,
  Activity,
  Award,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Project } from '../data/projects';

interface Props {
  project: Project;
  isDetailed?: boolean;
  className?: string;
}

export const ProjectVisualPreview: React.FC<Props> = ({ project, isDetailed = false, className }) => {
  const heightClass = className ?? (isDetailed ? 'min-h-[380px]' : 'min-h-[290px]');

  // VM Brothers Interactive State
  const [activeCorridor, setActiveCorridor] = useState<'All' | 'Masma-Orma' | 'Olpad' | 'Jahangirpura'>('All');
  const [selectedProperty, setSelectedProperty] = useState(0);

  // Dr. Janvi Rana Interactive State
  const [activeSpecialty, setActiveSpecialty] = useState(0);

  if (project.slug === 'vm-brothers') {
    const properties = [
      {
        name: 'Sahjanand Bunglows & Row House',
        type: '2 & 3 BHK G+1 Homes',
        corridor: 'Masma-Orma',
        status: 'Fast Selling',
        features: ['Individual Compound', 'Vastu Compliant', 'Children Play Area'],
        price: 'Corridor Prime'
      },
      {
        name: 'Shubh Aangan',
        type: '2 & 3 BHK Row Houses',
        corridor: 'Olpad',
        status: 'Under Construction',
        features: ['Wide Internal RCC Road', '24/7 Water Supply', 'Gated Security'],
        price: 'Family Living'
      },
      {
        name: 'Vinayak Villa',
        type: 'Family Villa Community',
        corridor: 'Masma-Orma',
        status: 'Limited Inventory',
        features: ['Spacious Living Hall', 'Terrace Garden Space', 'Peaceful Enclave'],
        price: 'Premium Lifestyle'
      },
      {
        name: 'Aarna Heights',
        type: '1 BHK Flats & Commercial Shops',
        corridor: 'Jahangirpura',
        status: 'New Launch',
        features: ['Main Road Facing Shops', 'Spacious Balconies', 'Elevator Access'],
        price: 'High Footfall'
      }
    ];

    const filtered = activeCorridor === 'All'
      ? properties
      : properties.filter(p => p.corridor === activeCorridor);

    const currentProp = filtered[selectedProperty % filtered.length] || properties[0];

    return (
      <div className={`w-full ${heightClass} bg-gradient-to-br from-[#0c1b2a] via-[#102438] to-[#08131e] p-5 sm:p-6 rounded-xl flex flex-col justify-between relative overflow-hidden text-sand border border-white/10 shadow-xl group`}>
        {/* Ambient background decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-sand">
              VM Brothers • Surat Corridor Discovery
            </span>
          </div>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#c5a059] text-cyprus-deepest hover:bg-[#d6b26b] transition-all"
            >
              <span>Visit Live Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Interactive Corridor Filter Pills */}
        <div className="my-3 z-10 flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <span className="text-sand-muted text-[11px] mr-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#c5a059]" /> Corridor:
          </span>
          {(['All', 'Masma-Orma', 'Olpad', 'Jahangirpura'] as const).map(corridor => (
            <button
              key={corridor}
              onClick={() => {
                setActiveCorridor(corridor);
                setSelectedProperty(0);
              }}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeCorridor === corridor
                  ? 'bg-[#c5a059] text-cyprus-deepest font-bold shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 text-sand-muted'
              }`}
            >
              {corridor}
            </button>
          ))}
        </div>

        {/* Center Live Property Card Simulator */}
        <div className="my-auto z-10 bg-white/5 backdrop-blur-md border border-white/15 rounded-xl p-4 sm:p-5 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#c5a059]">
                <Home className="w-3.5 h-3.5" />
                <span>{currentProp.type}</span>
                <span>•</span>
                <span className="text-sand-muted">{currentProp.corridor}, Surat</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold font-display text-white mt-0.5">
                {currentProp.name}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
                {currentProp.status}
              </span>
              <button
                onClick={() => setSelectedProperty(prev => prev + 1)}
                className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-xs font-mono text-sand transition-colors"
                title="Next development"
              >
                Next &gt;
              </button>
            </div>
          </div>

          <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {currentProp.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-sand-muted">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Booking Trigger */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 z-10 text-xs text-sand-muted font-mono">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
            Direct Guidance: +91 74338 61000
          </span>
          <span className="text-emerald-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Guided Site Visits Available
          </span>
        </div>
      </div>
    );
  }

  // Dr. Janvi Rana Interactive State
  if (project.slug === 'dr-janvi-rana') {
    const specialties = [
      {
        title: 'Spine & Sciatica Decompression',
        badge: 'Cervical & Lumbar Focus',
        focus: 'Targeted spinal disc decompression, posture realignment & sciatica nerve gliding.',
        modalities: ['Therapeutic Ultrasound', 'TENS Electrotherapy', 'Manual Mobilization', 'Core Ergonomics'],
        outcome: '94% pain reduction reported within 6 sessions'
      },
      {
        title: 'Post-Operative Orthopedic Rehab',
        badge: 'Joint Replacement & Fractures',
        focus: 'Early phase protected mobilization following knee replacement, hip arthroplasty & trauma pinning.',
        modalities: ['Passive Range of Motion', 'Capsular Release', 'Cryotherapy', 'Quadriceps Re-education'],
        outcome: 'Safe restoration of independent gait'
      },
      {
        title: 'Neurological & Stroke Recovery',
        badge: 'Neuro Plasticity',
        focus: 'Hemiplegia rehabilitation, upper limb fine motor re-education, and balance training at home.',
        modalities: ['Sensory Stimulation', 'Mirror Therapy', 'PNF Stretching', 'Gait Kinematics'],
        outcome: 'Restoring functional daily independence'
      },
      {
        title: 'Geriatric Mobility & Fall Prevention',
        badge: 'Senior 1-on-1 Care',
        focus: 'Gentle, respectful in-home physiotherapy focused on stability, balance confidence, and joint stiffness.',
        modalities: ['Balance Board Training', 'Safe Transfer Drills', 'Gentle IFT', 'Walking Aid Training'],
        outcome: 'Zero-fall household confidence'
      }
    ];

    const currentSpec = specialties[activeSpecialty % specialties.length];

    return (
      <div className={`w-full ${heightClass} bg-gradient-to-br from-[#061821] via-[#0b2734] to-[#041219] p-5 sm:p-6 rounded-xl flex flex-col justify-between relative overflow-hidden text-sand border border-white/10 shadow-xl group`}>
        {/* Ambient background decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-sand">
              Dr. Janvi Rana (BPT) • Clinical Care Simulator
            </span>
          </div>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500 text-cyprus-deepest hover:bg-emerald-400 transition-all"
            >
              <span>Visit Live Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Clinical Specialty Tabs */}
        <div className="my-3 z-10 flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <span className="text-sand-muted text-[11px] mr-1 flex items-center gap-1">
            <Stethoscope className="w-3 h-3 text-emerald-400" /> Specialty:
          </span>
          {specialties.map((spec, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSpecialty(idx)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeSpecialty === idx
                  ? 'bg-emerald-500 text-cyprus-deepest font-bold shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 text-sand-muted'
              }`}
            >
              {spec.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Center Clinical Case Mockup */}
        <div className="my-auto z-10 bg-white/5 backdrop-blur-md border border-white/15 rounded-xl p-4 sm:p-5 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                <Award className="w-3.5 h-3.5" />
                <span>{currentSpec.badge}</span>
                <span>•</span>
                <span className="text-sand-muted">Surat Home Visits</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold font-display text-white mt-0.5">
                {currentSpec.title}
              </h4>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {currentSpec.outcome}
              </span>
            </div>
          </div>

          <p className="text-xs text-sand-muted mt-2.5 leading-relaxed">
            {currentSpec.focus}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {currentSpec.modalities.map((mod, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-white/10 border border-white/15 text-[11px] font-mono text-sand"
              >
                {mod}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Booking Trigger */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 z-10 text-xs text-sand-muted font-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Govt. Civil Hospital Surat & Spinex Verified
          </span>
          <span className="text-emerald-400 flex items-center gap-1">
            WhatsApp Direct: +91 96626 98781
          </span>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className={`w-full ${heightClass} bg-cyprus-deep p-6 rounded-xl flex items-center justify-center text-sand border border-white/10`}>
      <p className="text-sm font-mono text-sand-muted">Interactive preview for {project.title}</p>
    </div>
  );
};
