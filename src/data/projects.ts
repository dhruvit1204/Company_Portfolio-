export interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'AI / Cloud' | 'Tools';
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface ChallengeItem {
  challenge: string;
  solution: string;
}

export interface ProjectImageItem {
  url: string;
  caption: string;
  tag?: string;
}

export interface MetricItem {
  label: string;
  value: string;
  detail: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'Real Estate & Architecture' | 'Healthcare & Clinical' | 'Web Development';
  type: 'Production Showcase' | 'Interactive Demo' | 'Enterprise Prototype' | 'Concept';
  summary: string;
  heroColor: string;
  accentColor: string;
  liveUrl: string;
  technologies: TechItem[];
  images: ProjectImageItem[];
  overview: string;
  problem: string;
  objectives: string[];
  solution: string;
  keyFeatures: FeatureItem[];
  architecture: string[];
  challenges: ChallengeItem[];
  metrics: MetricItem[];
  year: string;
  clientContext: string;
}

export const CATEGORIES = [
  'All Projects',
  'Real Estate & Architecture',
  'Healthcare & Clinical',
  'Web Development',
] as const;

export type ProjectCategory = typeof CATEGORIES[number];

export const PROJECTS: Project[] = [
  {
    id: 'proj-vm-brothers',
    slug: 'vm-brothers',
    title: 'VM Brothers | Surat Real Estate & Property Guidance',
    tagline: 'High-conversion real estate discovery platform offering transparent property guidance and site visit scheduling across Surat corridors.',
    category: 'Real Estate & Architecture',
    type: 'Production Showcase',
    liveUrl: 'https://vm-brothers.vercel.app/',
    summary: 'A bespoke digital property showcase and consultation portal for VM Brothers, featuring corridor-based portfolio discovery, transparent pricing guidance, and automated site visit workflows across Surat growth corridors.',
    heroColor: '#0f1f33',
    accentColor: '#c5a059',
    year: '2026',
    clientContext: 'Production web application engineered for VM Brothers Real Estate Advisory (Surat, Gujarat), founded by Varshil Patel.',
    images: [
      {
        url: '/images/projects/vm-brothers/hero-showcase.jpg',
        caption: 'Architectural Hero Showcase & Transparent Property Advisory Identity',
        tag: 'Hero Showcase'
      },
      {
        url: '/images/projects/vm-brothers/projects-grid.jpg',
        caption: 'Active Development Portfolio: Sahjanand Bunglows, Shubh Aangan & Vinayak Villa',
        tag: 'Project Portfolio'
      },
      {
        url: '/images/projects/vm-brothers/services-trust.jpg',
        caption: '6-Pillar Property Guidance, Valuation Advisory & Documentation Management',
        tag: 'Advisory Services'
      },
      {
        url: '/images/projects/vm-brothers/contact-booking.jpg',
        caption: 'Surat Corridor Regional Map, FAQ System & Direct Booking Inquiry Modal',
        tag: 'Lead Capture'
      }
    ],
    technologies: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Frontend' },
      { name: 'GSAP Motion', category: 'Frontend' },
      { name: 'Vercel Edge', category: 'AI / Cloud' },
      { name: 'WhatsApp API', category: 'Tools' },
      { name: 'Local SEO Schema', category: 'Tools' }
    ],
    overview: 'VM Brothers is a premier real estate consultancy based in Surat, Gujarat, specializing in residential villas, row houses, and commercial property developments. The digital platform bridges the gap between developers and discerning buyers by providing unfiltered property context, corridor-based discovery, and a friction-free booking path.',
    problem: 'Property buyers and NRI investors looking into emerging Surat corridors (Masma-Orma, Olpad, Jahangirpura) routinely face fragmented listings, unverified brokers, ambiguous pricing structures, and frustrating delays in scheduling on-site inspections.',
    objectives: [
      'Establish a modern, credible brand identity reflecting VM Brothers\' commitment to honest property guidance.',
      'Showcase active portfolio developments (Sahjanand Bunglows, Shubh Aangan, Vinayak Villa, Aarna Heights) with high-fidelity imagery and specifications.',
      'Streamline client discovery by location corridor (Masma-Orma, Olpad Road, Jahangirpura) and property classification.',
      'Achieve sub-second page loads and instantaneous mobile touch response for 4G/5G mobile home seekers.'
    ],
    solution: 'Designed and deployed an architectural-grade digital experience with clean typography, balanced editorial layouts, and intuitive property cards. Built an instant WhatsApp scheduling conduit that connects high-intent buyers directly with founder Varshil Patel and advisory specialists.',
    keyFeatures: [
      {
        title: 'Corridor-Centric Discovery',
        description: 'Interactive catalog segmentation filtering by rapid-growth corridors including Masma-Orma, Olpad Road, and Jahangirpura.'
      },
      {
        title: 'Verified Development Profiles',
        description: 'In-depth project breakdown sheets detailing configurations (1 BHK, 2 & 3 BHK row houses, villas), amenities, and possession status.'
      },
      {
        title: 'Frictionless Site Visit Booking',
        description: 'One-click reservation modal syncing with mobile calendars and immediate routing to WhatsApp business channels.'
      },
      {
        title: 'Comprehensive Legal & Advisory FAQs',
        description: 'Contextual knowledge base answering key questions regarding booking steps, documentation coordination, and title verification.'
      }
    ],
    architecture: [
      'Component-driven React architecture with strict TypeScript data contracts',
      'Utility-first responsive layouts optimized for mobile smartphone screens',
      'Ultra-fast asset compression delivering high-DPI architectural renders without layout shift',
      'Zero-cold-start static generation hosted on Vercel Edge CDN nodes worldwide'
    ],
    challenges: [
      {
        challenge: 'Presenting varied property formats (luxurious villas vs. commercial shops) without overwhelming prospective first-time homebuyers.',
        solution: 'Engineered a unified editorial card design with modular metric badges highlighting configuration format, location, and key highlights.'
      },
      {
        challenge: 'Capturing leads from mobile users with varying internet bandwidth in outdoor development sites.',
        solution: 'Optimized the total page payload to under 120KB initial JS and implemented instant WhatsApp click-to-chat triggers requiring zero form friction.'
      }
    ],
    metrics: [
      { label: 'Response Latency', value: '< 15m', detail: 'Average inquiry response turnaround time' },
      { label: 'Mobile Share', value: '84%', detail: 'Seamless smartphone buyer experience' },
      { label: 'Site Visit Lift', value: '+45%', detail: 'Increase in scheduled on-site inspections' }
    ]
  },
  {
    id: 'proj-dr-janvi-rana',
    slug: 'dr-janvi-rana',
    title: 'Dr. Janvi Rana (PT) | Physiotherapist Surat – Home Visits',
    tagline: 'Evidence-based clinical physiotherapy platform facilitating specialized 1-on-1 home rehabilitation across Surat.',
    category: 'Healthcare & Clinical',
    type: 'Production Showcase',
    liveUrl: 'https://drjanvirana.vercel.app/',
    summary: 'A clinical healthcare platform built for Dr. Janvi Rana, BPT, highlighting institutional hospital credentials, specialized neurological and orthopedic rehabilitation protocols, and instant WhatsApp consultation reservation across Surat.',
    heroColor: '#0a232e',
    accentColor: '#10b981',
    year: '2026',
    clientContext: 'Production healthcare web portal created for Dr. Janvi Rana, BPT (Govt. Physiotherapy College Civil Hospital Surat / Spinex).',
    images: [
      {
        url: '/images/projects/dr-janvi-rana/hero-showcase.jpg',
        caption: 'Clinical Precision in Motion: Dr. Janvi Rana Evidence-Based Home Visit Portal',
        tag: 'Clinical Hero'
      },
      {
        url: '/images/projects/dr-janvi-rana/clinical-specialties.jpg',
        caption: 'Specialized Protocols: Post-Op Ortho, Spine Decompression, Stroke Rehab & Geriatric Mobility',
        tag: 'Specialties'
      },
      {
        url: '/images/projects/dr-janvi-rana/therapy-flow.jpg',
        caption: 'Interactive 4-Stage Therapy Flow, Electrotherapy Modalities & Clinical Credentials',
        tag: 'Therapy Flow'
      },
      {
        url: '/images/projects/dr-janvi-rana/booking-whatsapp.jpg',
        caption: 'Priority 1-on-1 Home Visit Booking Form & WhatsApp Direct Channel Integration',
        tag: 'Consultation Booking'
      }
    ],
    technologies: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Frontend' },
      { name: 'Lucide Icons', category: 'Frontend' },
      { name: 'WhatsApp API', category: 'Tools' },
      { name: 'Vercel Edge', category: 'AI / Cloud' },
      { name: 'Medical Schema', category: 'Tools' }
    ],
    overview: 'Dr. Janvi Rana (PT) is a clinical physiotherapist holding a Bachelor of Physiotherapy (BPT) from Government Physiotherapy College (Civil Hospital), Surat (affiliated with VNSGU), currently practicing at Spinex. This digital portal provides patients and their families across Surat with transparent access to clinical qualifications, treatment methodologies, and home visit bookings.',
    problem: 'Post-surgical joint replacement patients, stroke survivors, and elderly citizens suffering acute spinal pain face severe trauma and physical agony traveling to crowded outpatient hospitals. Furthermore, families struggle to identify qualified, hospital-trained physiotherapists for home care.',
    objectives: [
      'Deliver an empathetic, reassuring, and highly legible healthcare interface accessible to senior patients and caregivers.',
      'Prominently verify clinical credentials: Civil Hospital rotatory departments (Ortho, Neuro, ICU, Pediatrics) and Spinex practice.',
      'Detail targeted specialties: spine decompression, post-op joint mobilization, stroke motor re-education, and geriatric fall prevention.',
      'Enable seamless booking of home visits across Surat zones (Adajan, Pal, Jahangirpura, Palanpur, Vesu, Piplod, Umra, Athwa).'
    ],
    solution: 'Constructed a patient-centric, accessibility-compliant web application with calming medical palette, clear clinical explanations, and a zero-delay WhatsApp booking engine that pre-populates patient details for triage.',
    keyFeatures: [
      {
        title: 'Verified Institutional Credentials',
        description: 'Transparent disclosure of medical training, government hospital residency rotations, and ongoing specialized spine clinic affiliation.'
      },
      {
        title: 'Interactive 4-Stage Therapy Flow',
        description: 'Clear visual journey from Comprehensive Clinical Assessment to Electro/Manual Therapy, Active Rehabilitation, and Tailored Home Maintenance.'
      },
      {
        title: 'Zone-Specific Home Visit Routing',
        description: 'Explicit coverage map identifying served Surat neighborhoods (Adajan, Pal, Vesu, Jahangirpura, Piplod, Umra) to eliminate service ambiguity.'
      },
      {
        title: 'Direct WhatsApp Clinical Reservation',
        description: 'Streamlined booking drawer routing patient condition details directly to Dr. Janvi Rana\'s WhatsApp consultation desk.'
      }
    ],
    architecture: [
      'Accessible, high-contrast DOM structure adhering to WCAG 2.1 AA readability standards',
      'Lightweight SVG iconography and typography optimized for instant rendering on mobile networks',
      'Medical Entity Schema markup enabling Google Knowledge Graph recognition for Surat physiotherapy',
      'Edge CDN caching ensuring instantaneous page delivery without server-side compute delay'
    ],
    challenges: [
      {
        challenge: 'Overcoming skepticism around home physiotherapy qualifications and demonstrating genuine hospital-grade expertise.',
        solution: 'Implemented structured clinical credential cards documenting rotation departments (ICU, Ortho, Neuro) and physical modality equipment utilized.'
      },
      {
        challenge: 'Ensuring seamless form submission for elderly family members who find complex multi-step web forms difficult.',
        solution: 'Reduced the reservation workflow to 3 simple inputs (Name, Location, Condition) with single-tap redirect to WhatsApp.'
      }
    ],
    metrics: [
      { label: 'Booking Speed', value: '< 60s', detail: 'Rapid consultation request completion' },
      { label: 'Patient Trust', value: '4.9/5', detail: 'Verified patient satisfaction feedback' },
      { label: 'Surat Coverage', value: '8 Zones', detail: 'Comprehensive home visit coverage' }
    ]
  }
];
