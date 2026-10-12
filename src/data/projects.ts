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
  category: 'Web Development' | 'E-Commerce' | 'AI & Automation' | 'Cybersecurity' | 'Dashboards' | 'Mobile Applications';
  type: 'Concept' | 'Interactive Demo' | 'Enterprise Prototype' | 'Production Showcase';
  summary: string;
  heroColor: string;
  accentColor: string;
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
  'Web Development',
  'E-Commerce',
  'AI & Automation',
  'Cybersecurity',
  'Dashboards',
  'Mobile Applications',
] as const;

export type ProjectCategory = typeof CATEGORIES[number];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    slug: 'ecommerce-platform',
    title: 'ApexStore Modern E-Commerce Platform',
    tagline: 'High-speed digital commerce architecture with sub-second product filtering and checkout.',
    category: 'E-Commerce',
    type: 'Interactive Demo',
    summary: 'A headless e-commerce store featuring dynamic catalog search, faceted filter engine, persistent wishlist, cart state, and tokenized checkout flow.',
    heroColor: '#0f2240',
    accentColor: '#5aa9ff',
    year: '2025',
    clientContext: 'Illustrative enterprise retail demonstration engineered by Exception IT Solutions.',
    images: [
      {
        url: '/images/projects/ecommerce-platform/storefront.jpg',
        caption: 'Modern Dark-Mode Storefront & Dynamic Discovery Grid',
        tag: 'Storefront'
      },
      {
        url: '/images/projects/ecommerce-platform/filters.jpg',
        caption: 'Sub-65ms Faceted Multi-Attribute Product Filtering Engine',
        tag: 'Faceted Filters'
      },
      {
        url: '/images/projects/ecommerce-platform/checkout.jpg',
        caption: 'Interactive Slide-Over Shopping Cart & Tokenized Checkout',
        tag: 'Cart & Checkout'
      }
    ],
    technologies: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Frontend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'Express', category: 'Backend' },
      { name: 'MongoDB', category: 'Database' },
      { name: 'JWT Auth', category: 'Tools' },
    ],
    overview: 'ApexStore is a full-featured e-commerce prototype engineered to demonstrate performant product discovery, high-conversion product detail interactions, and structured cart orchestration under high traffic conditions.',
    problem: 'Traditional retail templates suffer from bloated bundle sizes, slow server-rendered filter cascades, and clumsy mobile checkout experiences that elevate cart abandonment.',
    objectives: [
      'Deliver client-side category filtering with instantaneous response times (<100ms).',
      'Implement multi-attribute product selection (color, size, storage) with persistent stock state.',
      'Ensure frictionless mobile navigation with slide-over drawers and guest checkout options.',
      'Architect modular API endpoints ready for microservices scaling.'
    ],
    solution: 'Engineered a decoupled React front-end powered by an Express/Node backend and MongoDB aggregation pipelines. Client state is managed with lightweight store patterns and persisted to local storage for guest retention.',
    keyFeatures: [
      {
        title: 'Faceted Multi-Filter Engine',
        description: 'Instant filtering by price range, brand, ratings, and stock status without full page reloads.'
      },
      {
        title: 'Interactive Cart & Mini-Drawer',
        description: 'Real-time cart updates with promotional coupon validation and shipping threshold meters.'
      },
      {
        title: 'Wishlist & Quick View Modal',
        description: 'Seamless quick previews allowing customers to inspect product details without abandoning their browsing context.'
      },
      {
        title: 'Robust Security & Checkout Flow',
        description: 'Role-based authentication, address validation, and simulated multi-gateway payment processing.'
      }
    ],
    architecture: [
      'Single Page Application architecture with client-side route code-splitting',
      'RESTful Express services with schema validation using Joi/Zod',
      'Indexed MongoDB queries utilizing compound indexing for faceted search',
      'Optimistic UI state updates for immediate user feedback'
    ],
    challenges: [
      {
        challenge: 'Maintaining real-time product inventory counts without overloading the catalog database during flash-sale conditions.',
        solution: 'Implemented in-memory cache layers for read-heavy product pages with atomic decrement operations on database transactions.'
      },
      {
        challenge: 'Fluid responsive layout that preserves faceted filters on mobile displays without cluttering the screen.',
        solution: 'Created an accessible slide-in bottom sheet with tactile touch triggers and sticky apply filters button.'
      }
    ],
    metrics: [
      { label: 'Filter Latency', value: '< 65ms', detail: 'Instantaneous client-side filter computation' },
      { label: 'Catalog Size', value: '1,000+', detail: 'Stress-tested with high item variance' },
      { label: 'Lighthouse Score', value: '98/100', detail: 'Optimized asset delivery and clean DOM' }
    ]
  },
  {
    id: 'proj-2',
    slug: 'ai-recommendation-system',
    title: 'Synapse AI Recommendation Engine',
    tagline: 'Vector-powered neural discovery system matching users with hyper-relevant digital assets.',
    category: 'AI & Automation',
    type: 'Enterprise Prototype',
    summary: 'Personalized recommendation platform leveraging embedding vectors, semantic similarity search, and automated real-time behavioral reranking.',
    heroColor: '#0a192f',
    accentColor: '#e0a23c',
    year: '2025',
    clientContext: 'Conceptual AI system designed to demonstrate intelligent content discovery capabilities.',
    images: [
      {
        url: '/images/projects/ai-recommendation-system/vector-matrix.jpg',
        caption: '384-Dimensional Vector Similarity Matrix & Neural Topology',
        tag: 'Vector Matrix'
      },
      {
        url: '/images/projects/ai-recommendation-system/recommendation-feed.jpg',
        caption: 'Context-Aware Recommendation Feed with Explainable AI Badges',
        tag: 'Discovery Feed'
      },
      {
        url: '/images/projects/ai-recommendation-system/inference-telemetry.jpg',
        caption: 'ONNX Runtime Inference Telemetry with 98.4ms P95 Latency',
        tag: 'Telemetry'
      }
    ],
    technologies: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'Python', category: 'Backend' },
      { name: 'FastAPI', category: 'Backend' },
      { name: 'PyTorch / Transformers', category: 'AI / Cloud' },
      { name: 'ChromaDB / Vector DB', category: 'Database' },
      { name: 'Tailwind CSS', category: 'Frontend' }
    ],
    overview: 'Synapse AI models user engagement patterns to generate continuous, context-aware suggestions. It bridges modern React presentation layers with high-throughput Python embedding pipelines.',
    problem: 'Standard keyword searches and rule-based recommendation tables fail when user intent is implicit or queries lack exact token matches.',
    objectives: [
      'Implement semantic embedding generation to understand user interests beyond literal keywords.',
      'Provide visual explainability: showing users WHY an item was recommended.',
      'Maintain sub-150ms recommendation inference across hundreds of user preference vectors.'
    ],
    solution: 'Designed an asynchronous inference architecture: user interactions trigger background embedding calculations, while vector similarity queries return nearest neighbors in millisecond windows.',
    keyFeatures: [
      {
        title: 'Semantic Similarity Matcher',
        description: 'Transforms text queries and item metadata into high-dimensional vector representations.'
      },
      {
        title: 'Explainable AI Badges',
        description: 'Displays transparent justification tags such as "Based on recent interest in Cloud Architecture".'
      },
      {
        title: 'Cold-Start Adaptive Onboarding',
        description: 'Rapid user-preference calibration through a 3-step interactive preference selector.'
      },
      {
        title: 'Live Confidence Tuning Slider',
        description: 'Interactive administrative controls to adjust exploratory vs. exploit model weights in real-time.'
      }
    ],
    architecture: [
      'Microservice pipeline: React front-end connects via OpenAPI specs to FastAPI',
      'Sentence-Transformers embedding pipeline running on optimized ONNX runtime',
      'HNSW indexed vector database for sub-linear similarity search times',
      'Client-side telemetry hook for non-intrusive behavioral scoring'
    ],
    challenges: [
      {
        challenge: 'Preventing recommendation bubbles where the model repeatedly surfaces identical categories.',
        solution: 'Incorporated a dynamic diversity entropy score that injects related but complementary adjacent topics.'
      },
      {
        challenge: 'Fast response times over low-bandwidth mobile connections.',
        solution: 'Pre-computed user cluster embeddings cached on CDN edge nodes with hydration on client mount.'
      }
    ],
    metrics: [
      { label: 'Inference Speed', value: '112ms', detail: 'Average latency for vector similarity search' },
      { label: 'Relevance Score', value: '94.2%', detail: 'Benchmark accuracy in simulated testing' },
      { label: 'Vector Dimensions', value: '384d', detail: 'Lightweight embedding dimensionality' }
    ]
  },
  {
    id: 'proj-3',
    slug: 'cybersecurity-training-platform',
    title: 'ShieldOps Cybersecurity Awareness Suite',
    tagline: 'Interactive enterprise security training, threat simulation, and employee risk analytics.',
    category: 'Cybersecurity',
    type: 'Enterprise Prototype',
    summary: 'A corporate security training LMS with interactive phishing simulation campaigns, vulnerability quizzes, role-based compliance matrices, and risk scoring.',
    heroColor: '#0b1e36',
    accentColor: '#38bdf8',
    year: '2025',
    clientContext: 'Prototype platform illustrating Exception IT’s cybersecurity educational architecture.',
    images: [
      {
        url: '/images/projects/cybersecurity-training-platform/phishing-sandbox.jpg',
        caption: 'Interactive Simulated Phishing Sandbox & Threat Lure Inspection',
        tag: 'Phishing Sandbox'
      },
      {
        url: '/images/projects/cybersecurity-training-platform/risk-heatmap.jpg',
        caption: 'Enterprise CISO Risk Heatmap & Employee Vulnerability Matrix',
        tag: 'Risk Heatmap'
      },
      {
        url: '/images/projects/cybersecurity-training-platform/compliance-audit.svg',
        caption: 'SOC2 Type II & ISO 27001 Trust Criteria Compliance Suite',
        tag: 'Audit Reporting'
      }
    ],
    technologies: [
      { name: 'React', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Frontend' },
      { name: 'ASP.NET Core', category: 'Backend' },
      { name: 'C#', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'OAuth 2.0 / MFA', category: 'Tools' },
      { name: 'Chart.js', category: 'Frontend' }
    ],
    overview: 'ShieldOps is built to educate workforce teams on modern cyber risks through hands-on simulated attack scenarios, realistic email spoof inspections, and real-time posture reporting for CISOs.',
    problem: 'Human error accounts for over 80% of corporate data breaches. Traditional static slide-deck security courses fail to produce genuine behavioral change against spear-phishing.',
    objectives: [
      'Deliver interactive simulated phishing emails where users must identify malicious indicators.',
      'Track individual and departmental Risk Indexes from Grade A to Grade F.',
      'Provide automated micro-training modules upon failed simulation drills.',
      'Deliver SOC2 and ISO 27001 audit-ready compliance reporting.'
    ],
    solution: 'Built a multi-tenant React dashboard backed by ASP.NET Core API services with secure data partitioning, audit logs, and gamified security certification paths.',
    keyFeatures: [
      {
        title: 'Simulated Phishing Sandbox',
        description: 'Interactive sandbox presenting real-world lures (CEO fraud, fake invoices) with inspectable email headers.'
      },
      {
        title: 'Departmental Risk Heatmap',
        description: 'Visual matrix highlighting departments requiring immediate refresher training based on drill failure rates.'
      },
      {
        title: 'Micro-Learning Modules',
        description: 'Bite-sized 3-minute interactive scenarios covering credential theft, social engineering, and ransomware prevention.'
      },
      {
        title: 'Compliance Audit Generator',
        description: 'Instant PDF export of completion records for compliance officers and external auditors.'
      }
    ],
    architecture: [
      'ASP.NET Core Clean Architecture with repository pattern and MediatR CQRS',
      'Entity Framework Core with PostgreSQL and Row-Level Security',
      'Zero-Trust authentication enforcing strict JWT validation and time-limited tokens',
      'Encrypted payload storage for all simulated campaign templates'
    ],
    challenges: [
      {
        challenge: 'Accurately tracking employee interaction without triggering corporate spam filters.',
        solution: 'Configured specialized simulation email headers (X-Simulation-ID) matched with internal whitelist rules.'
      },
      {
        challenge: 'Maintaining engaging user experience without inducing punitive user anxiety.',
        solution: 'Framed feedback constructively as immediate learning opportunities with positive reinforcement badges.'
      }
    ],
    metrics: [
      { label: 'Phish Catch Rate', value: '78% -> 96%', detail: 'Simulated cohort improvement over 90 days' },
      { label: 'Audit Readiness', value: '100%', detail: 'Compliant with SOC2 Trust Services criteria' },
      { label: 'Module Completion', value: '94%', detail: 'Achieved through 3-minute gamified modules' }
    ]
  },
  {
    id: 'proj-4',
    slug: 'workflow-automation-platform',
    title: 'PulseFlow AI & Business Automation',
    tagline: 'Visual automation orchestrator connecting ERP, CRM, and cloud services into autonomous workflows.',
    category: 'AI & Automation',
    type: 'Interactive Demo',
    summary: 'A no-code/low-code workflow canvas that automates business operations, processes incoming webhooks, transforms data via AI, and generates operational insights.',
    heroColor: '#10223e',
    accentColor: '#e0a23c',
    year: '2024',
    clientContext: 'Demonstration orchestrator showing enterprise workflow connectivity.',
    images: [
      {
        url: '/images/projects/workflow-automation-platform/node-builder.jpg',
        caption: 'Visual Drag-and-Drop Node Workflow Orchestrator Canvas',
        tag: 'Node Canvas'
      },
      {
        url: '/images/projects/workflow-automation-platform/execution-logs.jpg',
        caption: 'Real-Time Telemetry & 2,500/sec Redis Queue Pipeline Monitor',
        tag: 'Queue Telemetry'
      },
      {
        url: '/images/projects/workflow-automation-platform/ai-document-parser.svg',
        caption: 'AI-Powered OCR Document Parsing & ERP JSON Transformation',
        tag: 'AI Parsing'
      }
    ],
    technologies: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'Redis', category: 'Database' },
      { name: 'REST & Webhooks', category: 'Tools' },
      { name: 'Tailwind CSS', category: 'Frontend' }
    ],
    overview: 'PulseFlow enables operations teams to design logic triggers, document parsing pipelines, and notification bots without writing boilerplate integration code.',
    problem: 'Siloed SaaS applications force employees into manual copy-pasting, invoice data entry, and delayed inter-department communications.',
    objectives: [
      'Provide an intuitive visual node graph where triggers connect to actions.',
      'Integrate AI document extraction to parse incoming receipts and contracts automatically.',
      'Guarantee at-least-once message delivery with automated retries and dead-letter queues.'
    ],
    solution: 'Constructed an event-driven automation engine utilizing Redis Streams and Node.js workers, visualized via an interactive React node workspace.',
    keyFeatures: [
      {
        title: 'Visual Workflow Builder',
        description: 'Drag-and-connect trigger nodes, condition gates, API dispatchers, and notification blocks.'
      },
      {
        title: 'AI Document Parsing',
        description: 'Auto-extract structured JSON from unstructured PDF invoices and customer support tickets.'
      },
      {
        title: 'Live Execution Monitor',
        description: 'Real-time telemetry timeline showing step-by-step payload transformations and execution times.'
      },
      {
        title: 'Dead-Letter Queue & Auto-Retry',
        description: 'Configurable backoff algorithms ensuring failed third-party APIs recover without data loss.'
      }
    ],
    architecture: [
      'Event-driven worker pool processing jobs from distributed Redis queues',
      'Canvas state management with immutable graph data structures',
      'Sandboxed JavaScript evaluation engine for safe inline script transforms',
      'OpenAPI auto-discovery for third-party REST connectors'
    ],
    challenges: [
      {
        challenge: 'Handling rate limits imposed by third-party external APIs like Slack or Salesforce.',
        solution: 'Implemented intelligent token-bucket rate limiters per downstream service with queuing.'
      },
      {
        challenge: 'Smooth 60fps graph rendering with dozens of interconnected nodes and connectors.',
        solution: 'Utilized hardware-accelerated SVG paths and memoized React components.'
      }
    ],
    metrics: [
      { label: 'Manual Time Saved', value: '85%', detail: 'Simulated reduction in manual data entry' },
      { label: 'Event Throughput', value: '2,500/sec', detail: 'Worker pipeline capacity benchmark' },
      { label: 'Error Recovery', value: '99.8%', detail: 'Automatic resolution through exponential backoff' }
    ]
  },
  {
    id: 'proj-5',
    slug: 'digital-flipbook-platform',
    title: 'PaperFlow 3D Interactive Flipbook',
    tagline: 'Transforming static PDF publications into tactile, hardware-accelerated 3D digital magazines.',
    category: 'Web Development',
    type: 'Interactive Demo',
    summary: 'A web-based digital publishing platform that converts standard PDF files into realistic, curlable 3D flipbooks with rich media hotspots and offline reading.',
    heroColor: '#122644',
    accentColor: '#5aa9ff',
    year: '2024',
    clientContext: 'Interactive publishing technology prototype developed by Exception IT.',
    images: [
      {
        url: '/images/projects/digital-flipbook-platform/flipbook-reader.jpg',
        caption: 'WebGL Hardware-Accelerated 3D Page Curl Reader Experience',
        tag: '3D Reader'
      },
      {
        url: '/images/projects/digital-flipbook-platform/hotspot-editor.jpg',
        caption: 'Interactive Media Hotspot Studio with Clickable Buy Buttons',
        tag: 'Hotspot Studio'
      },
      {
        url: '/images/projects/digital-flipbook-platform/thumbnail-grid.svg',
        caption: 'Virtual Bookshelf & Reader Attention Span Analytics',
        tag: 'Bookshelf & Stats'
      }
    ],
    technologies: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'Next.js', category: 'Frontend' },
      { name: 'PDF.js', category: 'Tools' },
      { name: 'Canvas / WebGL', category: 'Tools' },
      { name: 'Tailwind CSS', category: 'Frontend' }
    ],
    overview: 'PaperFlow 3D replaces flat PDF scrolling with a dynamic, page-flipping digital reader that preserves typography while adding interactive video overlays, hyperlinks, and sound effects.',
    problem: 'Standard PDF viewers in mobile web browsers offer poor reading ergonomics, zero brand immersion, and no analytics on reader attention span.',
    objectives: [
      'Deliver smooth 60fps page curl physics responsive to mouse drag and touch swipe gestures.',
      'Allow publishers to pin clickable hotspots (video, links, audio) to any page coordinate.',
      'Achieve instant first-page render without requiring the entire 100MB PDF to download.'
    ],
    solution: 'Designed a hybrid Canvas & CSS 3D transform renderer coupled with page-by-page streaming via PDF.js worker threads.',
    keyFeatures: [
      {
        title: 'Tactile Page Turn Physics',
        description: 'Realistic curvature rendering simulating glossy paper with dynamic drop shadows and corner peeling.'
      },
      {
        title: 'Interactive Media Hotspots',
        description: 'Embed playable product videos, e-commerce buy buttons, and external citations directly onto pages.'
      },
      {
        title: 'Thumbnail Grid & Table of Contents',
        description: 'Rapid chapter navigation with responsive visual thumbnails and text search indexing.'
      },
      {
        title: 'Full-Screen Presentation Mode',
        description: 'Immersive reading environment tailored for desktop monitors, iPads, and smartphones.'
      }
    ],
    architecture: [
      'Client-side PDF page rendering offloaded to dedicated Web Workers',
      'Dual-page desktop view dynamically collapsing to single-page on mobile viewports',
      'WebGL shader effects for paper texture highlights and ambient lighting',
      'Progressive vector caching for crisp zoom up to 400%'
    ],
    challenges: [
      {
        challenge: 'Memory management on mobile browsers when flipping through 80+ page image-dense publications.',
        solution: 'Implemented virtualized page recycling, releasing canvas bitmaps outside the active viewport window.'
      },
      {
        challenge: 'Touch gesture responsiveness across varying mobile device refresh rates.',
        solution: 'Coupled touch delta tracking directly with requestAnimationFrame for stutter-free dragging.'
      }
    ],
    metrics: [
      { label: 'Render Frame Rate', value: '60 FPS', detail: 'Hardware-accelerated physics curl' },
      { label: 'Initial Page Load', value: '< 1.2s', detail: 'Streamed page-by-page chunking' },
      { label: 'Engagement Lift', value: '3.4x', detail: 'Compared to standard flat PDF scroll' }
    ]
  },
  {
    id: 'proj-6',
    slug: 'blood-bank-management',
    title: 'VitalPulse Smart Blood Bank Network',
    tagline: 'Life-critical blood inventory tracking, donor eligibility management, and emergency hospital dispatch.',
    category: 'Mobile Applications',
    type: 'Production Showcase',
    summary: 'A unified healthcare mobile and web ecosystem connecting voluntary blood donors, blood banks, and hospital emergency rooms for real-time inventory matching.',
    heroColor: '#0a1d38',
    accentColor: '#f87171',
    year: '2024',
    clientContext: 'Public health initiative architecture designed for rapid emergency resource dispatch.',
    images: [
      {
        url: '/images/projects/blood-bank-management/dispatch-radar.jpg',
        caption: 'Real-Time Hospital Emergency SOS Proximity Radar & GPS Dispatch',
        tag: 'Emergency Radar'
      },
      {
        url: '/images/projects/blood-bank-management/inventory-matrix.svg',
        caption: 'Cold-Chain 3.8°C Storage Matrix & Platelets / Plasma Ledger',
        tag: 'Cold Storage'
      },
      {
        url: '/images/projects/blood-bank-management/donor-mobile-app.svg',
        caption: 'Mobile Donor Companion App with Digital QR ID & Safety Timer',
        tag: 'Mobile Pass'
      }
    ],
    technologies: [
      { name: 'Android / Java', category: 'Frontend' },
      { name: 'React Web Portal', category: 'Frontend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'Firebase', category: 'Database' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Geolocation API', category: 'Tools' }
    ],
    overview: 'VitalPulse solves the critical problem of blood shortages during surgical emergencies by maintaining live GPS-linked donor availability and automated inventory reconciliation across regional hospital clusters.',
    problem: 'Hospitals often waste hours making phone calls during trauma surgeries to locate rare blood groups (such as O-negative), risking patient lives due to lack of synchronized inventory data.',
    objectives: [
      'Centralize live unit counts across A+, B+, AB+, O+, and negative variations with cold-storage temperature tracking.',
      'Broadcast instant emergency SOS push alerts to eligible nearby donors based on GPS proximity.',
      'Track donor safety intervals (90-day cooldown between whole-blood donations).'
    ],
    solution: 'Architected a native Android donor companion app paired with an admin web dashboard for blood bank operators, synchronized via real-time websockets and Firebase cloud functions.',
    keyFeatures: [
      {
        title: 'Real-Time Inventory Matrix',
        description: 'Live unit count dashboard filtered by component type (Whole Blood, Platelets, Plasma, Cryo).'
      },
      {
        title: 'Proximity Emergency SOS',
        description: 'Automated push notifications dispatched to certified donors within a 15km radius of requesting hospitals.'
      },
      {
        title: 'Donor Health & Eligibility Tracker',
        description: 'Digital health screening questionnaires and automated calculation of next eligible donation dates.'
      },
      {
        title: 'Digital Donation Certificate & Card',
        description: 'Secure QR-code donor cards verifying blood group and emergency contact details.'
      }
    ],
    architecture: [
      'Secure FHIR-compliant patient data model with role-based access control',
      'Real-time pub/sub synchronization between hospital stations and mobile donors',
      'Geo-hashing algorithms for rapid radius queries without scanning entire user tables',
      'Encrypted donor personal identifiers complying with healthcare privacy standards'
    ],
    challenges: [
      {
        challenge: 'Maintaining system operation in low-connectivity rural hospital areas.',
        solution: 'Engineered an offline-first SQLite cache on Android that synchronizes automatically when network restores.'
      },
      {
        challenge: 'Preventing duplicate donor responses to the same hospital emergency request.',
        solution: 'Implemented atomic reservation slots where donors confirm slots with instant verification.'
      }
    ],
    metrics: [
      { label: 'Dispatch Time', value: '< 4 Mins', detail: 'From emergency request to donor broadcast' },
      { label: 'Inventory Sync', value: 'Instant', detail: 'Sub-second real-time websocket updates' },
      { label: 'Availability Rate', value: '99.9%', detail: 'Zero downtime for emergency endpoints' }
    ]
  },
  {
    id: 'proj-7',
    slug: 'bi-analytics-dashboard',
    title: 'OmniMetrics Enterprise BI Dashboard',
    tagline: 'High-density business intelligence platform for executive decision-making and revenue tracking.',
    category: 'Dashboards',
    type: 'Enterprise Prototype',
    summary: 'An executive analytics portal with real-time financial telemetry, ARR forecasting, multi-variant cohort retention tables, and customizable reporting widgets.',
    heroColor: '#0c2242',
    accentColor: '#38bdf8',
    year: '2025',
    clientContext: 'Enterprise SaaS analytics interface designed by Exception IT Solutions.',
    images: [
      {
        url: '/images/projects/bi-analytics-dashboard/executive-kpi.svg',
        caption: 'Executive KPI Dashboard & 150K Data Point ARR Growth Curve',
        tag: 'Executive KPI'
      },
      {
        url: '/images/projects/bi-analytics-dashboard/cohort-heatmap.svg',
        caption: '12-Month Net Dollar Retention (NDR) Customer Cohort Heatmap',
        tag: 'Cohort Heatmap'
      },
      {
        url: '/images/projects/bi-analytics-dashboard/multi-series-analytics.svg',
        caption: 'Cross-Border Enterprise Subscription Ledger & Billing Telemetry',
        tag: 'Revenue Ledger'
      }
    ],
    technologies: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'Recharts / D3', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Frontend' },
      { name: 'REST APIs', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' }
    ],
    overview: 'OmniMetrics aggregates disparate data streams from Stripe, Salesforce, and internal databases into cohesive, actionable charts designed for executive teams and department heads.',
    problem: 'Executives struggle with scattered spreadsheets and stale weekly reports that fail to highlight revenue anomalies or customer churn until it is too late.',
    objectives: [
      'Render 100,000+ data point visualizations with smooth pan/zoom and zero frame drops.',
      'Provide customizable date range filters (LTV, MoM, YoY) with instant re-aggregation.',
      'Support automated email digest generation and scheduled CSV/PDF exports.'
    ],
    solution: 'Built a lightweight React dashboard using virtualized tables, optimized SVG chart layers, and responsive CSS grid cards that scale from desktop ultrawides to iPads.',
    keyFeatures: [
      {
        title: 'Executive KPI Cards',
        description: 'Instant overview of MRR, Net Retention Rate (NDR), CAC, and active user volume with percentage trends.'
      },
      {
        title: 'Interactive Multi-Series Charts',
        description: 'Revenue vs. Churn line charts with hover tooltip inspections, togglable legends, and zoom slices.'
      },
      {
        title: 'Customer Cohort Retention Matrix',
        description: 'Color-coded retention heatmap showing monthly cohort decay over 12-month periods.'
      },
      {
        title: 'Role-Based Dashboard Customization',
        description: 'Drag-and-drop widget arrangement allowing CFOs, CMOs, and CTOs to curate their unique views.'
      }
    ],
    architecture: [
      'Declarative React component architecture utilizing TypeScript for strict metric typings',
      'State persistence in URL query parameters enabling effortless link sharing between executives',
      'Data virtualization for high-density tabular ledgers holding thousands of transaction records',
      'Server-side aggregation queries with materialized views for fast analytical computation'
    ],
    challenges: [
      {
        challenge: 'Browser CPU lag when recalculating time-series curves across multiple complex filters.',
        solution: 'Utilized Web Workers to run heavy statistical rolling averages without blocking the UI thread.'
      },
      {
        challenge: 'Maintaining high aesthetic polish and contrast across dark and light data-heavy views.',
        solution: 'Constructed an intentional HSL color system that guarantees WCAG AAA readability on all data charts.'
      }
    ],
    metrics: [
      { label: 'Data Points', value: '150,000+', detail: 'Rendered smoothly in interactive views' },
      { label: 'Query Latency', value: '< 180ms', detail: 'Using materialized analytical views' },
      { label: 'Export Speed', value: '1.4s', detail: 'Client-side PDF and Excel generation' }
    ]
  },
  {
    id: 'proj-8',
    slug: 'corporate-digital-experience',
    title: 'Vanguard Digital Corporate Brand Experience',
    tagline: 'Award-caliber corporate web presence showcasing capabilities, thought leadership, and client pipelines.',
    category: 'Web Development',
    type: 'Production Showcase',
    summary: 'A bespoke corporate agency platform blending sophisticated editorial typography, smooth GSAP ScrollTrigger transitions, and high-converting contact funnels.',
    heroColor: '#142a4a',
    accentColor: '#e0a23c',
    year: '2025',
    clientContext: 'Flagship engineering showcase embodying the digital agency standard.',
    images: [
      {
        url: '/images/projects/corporate-digital-experience/kinetic-hero.svg',
        caption: 'Award-Caliber Kinetic Typography & 60fps Scroll Choreography',
        tag: 'Kinetic Hero'
      },
      {
        url: '/images/projects/corporate-digital-experience/editorial-showcase.svg',
        caption: 'Asymmetric Editorial Case Study Gallery & Interactive Reels',
        tag: 'Editorial Gallery'
      },
      {
        url: '/images/projects/corporate-digital-experience/discovery-configurator.svg',
        caption: 'Multi-Step Enterprise Project Scope & Timeline Configurator',
        tag: 'Proposal Flow'
      }
    ],
    technologies: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Frontend' },
      { name: 'GSAP & ScrollTrigger', category: 'Tools' },
      { name: 'Vite', category: 'Tools' }
    ],
    overview: 'Vanguard Digital reflects the pinnacle of modern web craftsmanship, featuring kinetic typography, smooth viewport reveals, and an undeniable aura of enterprise authority.',
    problem: 'Corporate websites frequently rely on generic stock templates that look indistinguishable from competitors and fail to establish premium trust with prospective enterprise clients.',
    objectives: [
      'Create an unforgettable first impression within the first 3 seconds of page visit.',
      'Achieve flawless 60fps animations that never hijack user scrolling or induce disorientation.',
      'Maximize inbound conversion through structured proposal inquiry flows.'
    ],
    solution: 'Designed and engineered a custom React application with curated typography, bespoke GSAP micro-animations, semantic HTML5 structure, and full accessibility accommodations.',
    keyFeatures: [
      {
        title: 'Kinetic Hero Headline & Depth Composition',
        description: 'Staggered headline character reveals paired with subtle geometric background depth effects.'
      },
      {
        title: 'Editorial Case Study Showcase',
        description: 'Asymmetric project cards that break traditional repetitive grids to highlight key deliverables.'
      },
      {
        title: 'Interactive Capability Drawer',
        description: 'Engaging expandable cards revealing tech capabilities and service deliverables on demand.'
      },
      {
        title: 'Guided Project Discovery Flow',
        description: 'Multi-step proposal configurator helping prospects specify timeline, scope, and target stack.'
      }
    ],
    architecture: [
      'Component-scoped GSAP timelines encapsulated within React useLayoutEffect/useEffect contexts',
      'Zero layout shifts (CLS = 0.0) with explicit aspect ratio preservation and preloaded fonts',
      'Mobile-first responsive adaptations with reduced motion fallbacks',
      'Semantic hierarchy with complete ARIA compliance and visible keyboard focus rings'
    ],
    challenges: [
      {
        challenge: 'Synchronizing GSAP ScrollTrigger calculations during dynamic font and asset loads.',
        solution: 'Implemented document font load promises before triggering ScrollTrigger.refresh() calls.'
      },
      {
        challenge: 'Ensuring fluid performance across mid-tier mobile hardware.',
        solution: 'Targeted exclusively GPU-accelerated CSS properties (transform and opacity) for all motion sequences.'
      }
    ],
    metrics: [
      { label: 'Time to Interactive', value: '0.8s', detail: 'Ultra-fast Vite optimized bundle' },
      { label: 'First Input Delay', value: '< 12ms', detail: 'Zero thread blockage' },
      { label: 'Bounce Rate Reduction', value: '42%', detail: 'Achieved through captivating visual pacing' }
    ]
  }
];
