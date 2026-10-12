export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  iconName: string;
  duration: string;
  tag: string;
  metricBadge: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    subtitle: 'Business problem, goals & scope',
    description: 'We dive deep into your domain, dissect user friction points, and outline measurable functional specifications. No ambiguous assumptions.',
    deliverables: ['Requirements specification', 'Architecture feasibility audit', 'Milestone roadmap'],
    iconName: 'Compass',
    duration: 'Sprint 01',
    tag: 'Alignment & Architecture',
    metricBadge: 'Zero Ambiguity'
  },
  {
    number: '02',
    title: 'Design',
    subtitle: 'User experience & technical blueprint',
    description: 'We map comprehensive user journeys, craft responsive wireframes, define design tokens, and model secure database schemas.',
    deliverables: ['High-fidelity interactive prototype', 'System architecture diagram', 'API contract schema'],
    iconName: 'Layers',
    duration: 'Sprint 02',
    tag: 'UX & System Blueprint',
    metricBadge: 'Pixel Precision'
  },
  {
    number: '03',
    title: 'Develop',
    subtitle: 'Clean, reliable, scalable engineering',
    description: 'Our engineers write strongly typed, tested, and modular code with modern best practices, continuous commits, and iterative sprint reviews.',
    deliverables: ['Component-driven frontend', 'Hardened backend APIs', 'CI/CD pipeline integration'],
    iconName: 'Code2',
    duration: 'Sprints 03–05',
    tag: 'Full-Stack Scalability',
    metricBadge: '100% Type-Safe'
  },
  {
    number: '04',
    title: 'Test',
    subtitle: 'Functionality, security & speed validation',
    description: 'Rigorous cross-browser verification, responsive stress-testing, automated API regressions, and Core Web Vitals optimization.',
    deliverables: ['Cross-platform QA audit', 'Security & vulnerability review', 'Lighthouse 95+ performance check'],
    iconName: 'ShieldCheck',
    duration: 'Sprint 06',
    tag: 'Zero-Defect Verification',
    metricBadge: 'Enterprise Secure'
  },
  {
    number: '05',
    title: 'Deliver',
    subtitle: 'Production launch & ongoing stability',
    description: 'Seamless deployment to production cloud infrastructure with zero downtime, telemetry alarms, and post-launch maintenance.',
    deliverables: ['Production cloud release', 'Comprehensive handover docs', 'Real-time uptime monitoring'],
    iconName: 'Rocket',
    duration: 'Release',
    tag: 'Continuous Availability',
    metricBadge: '99.99% Uptime'
  }
];
