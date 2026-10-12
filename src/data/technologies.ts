export interface TechItem {
  name: string;
  description: string;
  badge?: string;
  iconName?: string;
  tags?: string[];
  level?: 'Core' | 'Enterprise' | 'Modern' | 'Realtime' | 'GenAI' | 'Cloud' | 'DevOps' | 'Security';
}

export interface TechCategory {
  id: string;
  category: string;
  shortName: string;
  description: string;
  items: TechItem[];
}

export const TECH_CATEGORIES: TechCategory[] = [
  {
    id: 'frontend',
    category: 'Frontend & Mobile UI',
    shortName: 'Frontend & Mobile',
    description: 'High-performance interactive interfaces, component design systems, and responsive cross-platform mobile apps.',
    items: [
      {
        name: 'React 19 / 18',
        description: 'Component-driven interactive web applications with concurrent rendering',
        badge: 'Core',
        iconName: 'Code2',
        tags: ['Hooks', 'Context API', 'Server Components'],
        level: 'Core'
      },
      {
        name: 'Next.js 15',
        description: 'Full-stack React framework with App Router, SSR, and Edge capabilities',
        badge: 'Modern',
        iconName: 'Globe',
        tags: ['App Router', 'Server Actions', 'SSR / SSG'],
        level: 'Enterprise'
      },
      {
        name: 'TypeScript 5+',
        description: 'Strict static typing, contract validation, and enterprise-grade code safety',
        badge: 'Safety',
        iconName: 'FileCode',
        tags: ['Strict Mode', 'Generics', 'Type Inference'],
        level: 'Core'
      },
      {
        name: 'Tailwind CSS',
        description: 'Atomic utility styling system customized with bespoke design tokens',
        badge: 'Styling',
        iconName: 'Layers',
        tags: ['JIT Engine', 'Responsive', 'CSS Variables'],
        level: 'Modern'
      },
      {
        name: 'GSAP & Motion',
        description: 'Curated timeline orchestration, smooth scrolls, and interactive animations',
        badge: 'Motion',
        iconName: 'Sparkles',
        tags: ['ScrollTrigger', 'Timelines', '60 FPS'],
        level: 'Modern'
      },
      {
        name: 'React Native',
        description: 'Cross-platform mobile applications for iOS and Android with native bridges',
        badge: 'Mobile',
        iconName: 'Smartphone',
        tags: ['iOS & Android', 'Expo', 'Native Performance'],
        level: 'Core'
      },
      {
        name: 'Flutter & Dart',
        description: 'High-fidelity compiled multi-platform UI applications with custom renderers',
        badge: 'Mobile',
        iconName: 'Smartphone',
        tags: ['Dart', 'Custom Engine', 'Material/Cupertino'],
        level: 'Modern'
      },
      {
        name: 'Vue.js 3 / Nuxt',
        description: 'Reactive progressive web architecture for performant enterprise client portals',
        badge: 'Modern',
        iconName: 'Code2',
        tags: ['Composition API', 'Pinia', 'Vite'],
        level: 'Modern'
      },
      {
        name: 'Vite & Turbopack',
        description: 'Sub-second Hot Module Replacement and optimized production bundle splits',
        badge: 'Build',
        iconName: 'Zap',
        tags: ['ES Modules', 'Tree-shaking', 'Zero Lag'],
        level: 'Core'
      },
      {
        name: 'Zustand & Redux',
        description: 'Predictable and lightweight global state stores with zero boilerplate',
        badge: 'State',
        iconName: 'Boxes',
        tags: ['Global Store', 'Immer', 'DevTools'],
        level: 'Core'
      }
    ]
  },
  {
    id: 'backend',
    category: 'Backend & Microservices',
    shortName: 'Backend & APIs',
    description: 'Robust server architecture, microservices, asynchronous workers, and high-throughput API endpoints.',
    items: [
      {
        name: 'Node.js',
        description: 'Non-blocking event-driven runtime powering fast concurrent web services',
        badge: 'Runtime',
        iconName: 'Server',
        tags: ['V8 Engine', 'Streams', 'Cluster'],
        level: 'Core'
      },
      {
        name: 'NestJS',
        description: 'Architectural enterprise TypeScript framework with dependency injection',
        badge: 'Enterprise',
        iconName: 'Boxes',
        tags: ['Modular', 'DI Container', 'Microservices'],
        level: 'Enterprise'
      },
      {
        name: 'Express.js',
        description: 'Minimalist RESTful routing, middleware pipelines, and auth services',
        badge: 'API',
        iconName: 'Terminal',
        tags: ['REST Endpoints', 'Middleware', 'JWT'],
        level: 'Core'
      },
      {
        name: 'ASP.NET Core (.NET 8)',
        description: 'Enterprise C# high-speed web services, clean architecture, and CQRS patterns',
        badge: 'Enterprise',
        iconName: 'Server',
        tags: ['C#', 'High Concurrency', 'Entity Framework'],
        level: 'Enterprise'
      },
      {
        name: 'Python / FastAPI',
        description: 'High-speed asynchronous Python endpoints for AI inference and backend services',
        badge: 'AI API',
        iconName: 'Zap',
        tags: ['AsyncIO', 'Pydantic', 'Auto OpenAPI'],
        level: 'Modern'
      },
      {
        name: 'Django & DRF',
        description: 'Batteries-included secure web framework with admin dashboards and ORM',
        badge: 'Secure',
        iconName: 'Layers',
        tags: ['Django ORM', 'Admin Suite', 'Authentication'],
        level: 'Enterprise'
      },
      {
        name: 'Go (Golang)',
        description: 'Low-memory compiled concurrency with goroutines for mission-critical daemons',
        badge: 'Fast',
        iconName: 'Terminal',
        tags: ['Goroutines', 'Microservices', 'Sub-millisecond'],
        level: 'Enterprise'
      },
      {
        name: 'GraphQL & Apollo',
        description: 'Strongly typed schema queries, mutations, and unified data federation',
        badge: 'Schema',
        iconName: 'Globe',
        tags: ['Schema-First', 'Resolvers', 'Federation'],
        level: 'Modern'
      },
      {
        name: 'WebSockets & gRPC',
        description: 'Low-latency full-duplex streaming and binary RPC communication protocols',
        badge: 'Realtime',
        iconName: 'Workflow',
        tags: ['Protobuf', 'Bi-directional', 'Sub-10ms'],
        level: 'Realtime'
      }
    ]
  },
  {
    id: 'database',
    category: 'Databases & In-Memory',
    shortName: 'Data & Storage',
    description: 'ACID transactional databases, lightning-fast in-memory caching, and vector indexing.',
    items: [
      {
        name: 'PostgreSQL',
        description: 'Rock-solid relational ACID persistence with JSONB and row-level security',
        badge: 'SQL',
        iconName: 'Database',
        tags: ['ACID Transactions', 'JSONB Indexing', 'RLS Security'],
        level: 'Core'
      },
      {
        name: 'MongoDB',
        description: 'Flexible document store for catalog indexing and high-volume unstructured data',
        badge: 'NoSQL',
        iconName: 'Database',
        tags: ['BSON Documents', 'Aggregation Pipeline', 'Atlas'],
        level: 'Core'
      },
      {
        name: 'Redis',
        description: 'Sub-millisecond in-memory cache, rate limiting, and pub/sub message brokers',
        badge: 'Cache',
        iconName: 'Zap',
        tags: ['In-Memory', 'Pub/Sub', 'Rate Limiter'],
        level: 'Enterprise'
      },
      {
        name: 'MySQL / MariaDB',
        description: 'Battle-tested relational engines for web platforms and enterprise records',
        badge: 'SQL',
        iconName: 'Database',
        tags: ['InnoDB', 'Replication', 'Query Optimization'],
        level: 'Core'
      },
      {
        name: 'Supabase',
        description: 'Modern open-source backend suite with PostgreSQL, Auth, and realtime listeners',
        badge: 'Realtime',
        iconName: 'Server',
        tags: ['Realtime DB', 'PostgREST', 'Storage'],
        level: 'Modern'
      },
      {
        name: 'Firebase Firestore',
        description: 'Cloud document database with live listeners and offline sync for mobile apps',
        badge: 'Realtime',
        iconName: 'Cloud',
        tags: ['Live Sync', 'Cloud Functions', 'Offline Support'],
        level: 'Modern'
      },
      {
        name: 'ChromaDB & Pinecone',
        description: 'High-dimensional vector stores for semantic retrieval and AI knowledge bases',
        badge: 'Vector',
        iconName: 'Cpu',
        tags: ['Embeddings', 'Cosine Similarity', 'RAG Pipelines'],
        level: 'GenAI'
      },
      {
        name: 'Prisma & Drizzle ORM',
        description: 'Type-safe database toolkits, automated migrations, and schema validation',
        badge: 'ORM',
        iconName: 'FileCode',
        tags: ['Type Safety', 'Declarative Migrations', 'Zero SQL Drift'],
        level: 'Modern'
      }
    ]
  },
  {
    id: 'cloud',
    category: 'Cloud, DevOps & Security',
    shortName: 'Cloud & DevOps',
    description: 'Zero-downtime automated deployments, containerized environments, and global edge security.',
    items: [
      {
        name: 'AWS Cloud Services',
        description: 'Enterprise architecture spanning S3, EC2, Lambda, ECS, RDS, and CloudFront',
        badge: 'Cloud',
        iconName: 'Cloud',
        tags: ['S3 Buckets', 'Lambda Serverless', 'CloudFront CDN'],
        level: 'Enterprise'
      },
      {
        name: 'Docker Containers',
        description: 'Isolated containerized execution ensuring identical local and production behavior',
        badge: 'Containers',
        iconName: 'Boxes',
        tags: ['Multi-Stage Builds', 'Compose', 'Lightweight'],
        level: 'Core'
      },
      {
        name: 'Kubernetes (K8s)',
        description: 'Automated container orchestration, blue-green rollouts, and self-healing pods',
        badge: 'Scale',
        iconName: 'Server',
        tags: ['Cluster Orchestration', 'Auto-scaling', 'Ingress'],
        level: 'Enterprise'
      },
      {
        name: 'GitHub Actions CI/CD',
        description: 'Automated test pipelines, linter audits, security scans, and continuous deployment',
        badge: 'DevOps',
        iconName: 'Workflow',
        tags: ['Automated Tests', 'Branch Protection', 'Staged Deploy'],
        level: 'Core'
      },
      {
        name: 'Vercel Edge Network',
        description: 'Global multi-region edge deployment with preview branches and instant rollbacks',
        badge: 'Edge',
        iconName: 'Globe',
        tags: ['Edge Middleware', 'Global CDN', 'Instant Previews'],
        level: 'Modern'
      },
      {
        name: 'Nginx & Reverse Proxies',
        description: 'High-performance SSL termination, load balancing, and HTTP/2 gzip compression',
        badge: 'Infra',
        iconName: 'Terminal',
        tags: ['SSL / TLS', 'Load Balancing', 'Rate Limits'],
        level: 'Enterprise'
      },
      {
        name: 'Cloudflare WAF & CDN',
        description: 'Global DDoS protection, edge caching, DNS routing, and firewall rules',
        badge: 'Security',
        iconName: 'ShieldCheck',
        tags: ['DDoS Mitigation', 'WAF Rules', 'Edge Cache'],
        level: 'Enterprise'
      },
      {
        name: 'OAuth 2.0 & JWT Security',
        description: 'Zero-trust token authorization, biometric MFA, and role-based access control',
        badge: 'Security',
        iconName: 'ShieldCheck',
        tags: ['Role-Based RBAC', 'JWT Tokens', 'MFA Protocols'],
        level: 'Enterprise'
      }
    ]
  },
  {
    id: 'ai',
    category: 'AI, Machine Learning & Automation',
    shortName: 'AI & Automation',
    description: 'Generative AI pipelines, contextual vector embeddings, autonomous agents, and workflow automations.',
    items: [
      {
        name: 'OpenAI & Claude APIs',
        description: 'State-of-the-art LLM orchestration for reasoning, semantic analysis, and smart agents',
        badge: 'GenAI',
        iconName: 'Sparkles',
        tags: ['GPT-4o', 'Claude 3.5 Sonnet', 'Function Calling'],
        level: 'GenAI'
      },
      {
        name: 'LangChain & LlamaIndex',
        description: 'Frameworks for context-augmented retrieval (RAG) and memory-enabled agents',
        badge: 'RAG',
        iconName: 'Workflow',
        tags: ['Retrieval Augmented', 'Vector Indexing', 'Tool Use'],
        level: 'GenAI'
      },
      {
        name: 'Python ML (PyTorch / Scikit)',
        description: 'Predictive modeling, custom classification, and machine learning data pipelines',
        badge: 'ML',
        iconName: 'Cpu',
        tags: ['Neural Networks', 'Model Evaluation', 'Feature Engineering'],
        level: 'Enterprise'
      },
      {
        name: 'Vector Embeddings & Search',
        description: 'Semantic vector representations enabling natural language knowledge discovery',
        badge: 'AI Search',
        iconName: 'Search',
        tags: ['Text Embeddings', 'Hybrid Search', 'Semantic Ranking'],
        level: 'GenAI'
      },
      {
        name: 'n8n & Webhook Automation',
        description: 'Event-driven cross-system workflows integrating CRM, payment, and analytics APIs',
        badge: 'Automation',
        iconName: 'Workflow',
        tags: ['Webhooks', 'Workflow Nodes', 'Zero-Code Bridges'],
        level: 'Modern'
      },
      {
        name: 'Hugging Face Transformers',
        description: 'Open-source transformer models for localized inference, translation, and sentiment',
        badge: 'Open AI',
        iconName: 'Cpu',
        tags: ['Transformers', 'Local Inference', 'Fine-Tuning'],
        level: 'Modern'
      },
      {
        name: 'BullMQ & Distributed Queues',
        description: 'High-reliability Redis background job workers with exponential backoff retries',
        badge: 'Queues',
        iconName: 'Zap',
        tags: ['Distributed Jobs', 'Retry Policies', 'Concurrency'],
        level: 'Enterprise'
      }
    ]
  },
  {
    id: 'tools',
    category: 'Testing, Tooling & Standards',
    shortName: 'Tooling & Quality',
    description: 'Automated regression safety, rigorous code standards, API documentation, and design synchronization.',
    items: [
      {
        name: 'Vitest & Jest',
        description: 'Blazing fast unit test suites and snapshot testing for regression prevention',
        badge: 'Testing',
        iconName: 'CheckCircle2',
        tags: ['Unit Testing', 'Mock Systems', 'Code Coverage'],
        level: 'Core'
      },
      {
        name: 'Playwright E2E',
        description: 'Resilient multi-browser end-to-end integration tests preventing UI regression',
        badge: 'Testing',
        iconName: 'CheckCircle2',
        tags: ['Chromium / WebKit', 'Headless Runs', 'Visual Regression'],
        level: 'Enterprise'
      },
      {
        name: 'ESLint & Strict Typing',
        description: 'Automated lint rules, strict zero-any TypeScript policies, and automated formatting',
        badge: 'Quality',
        iconName: 'FileCode',
        tags: ['Strict Typing', 'Code Consistency', 'Zero Warnings'],
        level: 'Core'
      },
      {
        name: 'Postman & OpenAPI',
        description: 'Comprehensive API contract documentation, mocking servers, and collection runners',
        badge: 'API Tools',
        iconName: 'Terminal',
        tags: ['Swagger / OpenAPI', 'Automated Tests', 'SDK Generation'],
        level: 'Core'
      },
      {
        name: 'Git & Branch Reviews',
        description: 'Trunk-based and feature-branch workflows with peer reviews and semantic versions',
        badge: 'VCS',
        iconName: 'GitBranch',
        tags: ['Pull Requests', 'Semantic Releases', 'Rebase Strategy'],
        level: 'Core'
      },
      {
        name: 'Figma Design System Sync',
        description: 'Design token architecture bridging Figma visual components directly to code',
        badge: 'Design',
        iconName: 'Layers',
        tags: ['Design Tokens', 'Component Parity', 'Design Handoff'],
        level: 'Modern'
      }
    ]
  }
];

// Highlight skills for dual-direction animated marquees
export const MARQUEE_ROW_1 = [
  { name: 'React 19', badge: 'Frontend', category: 'Frontend' },
  { name: 'Next.js 15', badge: 'Full-Stack', category: 'Frontend' },
  { name: 'TypeScript', badge: 'Strict', category: 'Frontend' },
  { name: 'Tailwind CSS', badge: 'Styling', category: 'Frontend' },
  { name: 'GSAP Motion', badge: 'Animation', category: 'Frontend' },
  { name: 'React Native', badge: 'Mobile', category: 'Mobile' },
  { name: 'Flutter', badge: 'Mobile UI', category: 'Mobile' },
  { name: 'Vue.js 3', badge: 'Reactive', category: 'Frontend' },
  { name: 'Vite', badge: 'Fast Build', category: 'Frontend' },
  { name: 'Zustand', badge: 'State', category: 'Frontend' },
  { name: 'Vitest', badge: 'Testing', category: 'Tooling' },
  { name: 'Playwright', badge: 'E2E Tests', category: 'Tooling' }
];

export const MARQUEE_ROW_2 = [
  { name: 'Node.js', badge: 'Backend', category: 'Backend' },
  { name: 'NestJS', badge: 'Enterprise', category: 'Backend' },
  { name: 'ASP.NET Core', badge: '.NET 8', category: 'Backend' },
  { name: 'FastAPI', badge: 'Python', category: 'AI Service' },
  { name: 'PostgreSQL', badge: 'ACID SQL', category: 'Data' },
  { name: 'MongoDB', badge: 'NoSQL', category: 'Data' },
  { name: 'Redis', badge: 'Cache', category: 'Data' },
  { name: 'AWS Cloud', badge: 'DevOps', category: 'Cloud' },
  { name: 'Docker', badge: 'Containers', category: 'Cloud' },
  { name: 'Kubernetes', badge: 'K8s Scale', category: 'Cloud' },
  { name: 'OpenAI GPT-4o', badge: 'GenAI', category: 'AI' },
  { name: 'LangChain & RAG', badge: 'AI Agents', category: 'AI' }
];
