export interface ServiceItem {
  id: string;
  indexNumber: string;
  title: string;
  shortDesc: string;
  blurb: string;
  points: string[];
  iconName: string;
  highlight: string;
  statsBadge: string;
  accentColor: string;
  accentGlow: string;
  externalUrl?: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'experience-design',
    indexNumber: '01',
    title: 'Interactive Experience Design',
    shortDesc: 'Crafting captivating visual journeys and seamless interactions.',
    blurb: 'We craft captivating visual journeys and seamless interactions to keep your audience engaged from the very first click.',
    points: ['User journey mapping', 'High-fidelity prototyping', 'Visual & brand design systems'],
    iconName: 'Palette',
    highlight: 'Human-Centered UX',
    statsBadge: 'Award-Caliber Prototyping',
    accentColor: '#5aa9ff',
    accentGlow: 'rgba(90, 169, 255, 0.22)',
    externalUrl: 'https://exceptionit.com/#services'
  },
  {
    id: 'web-development',
    indexNumber: '02',
    title: 'Custom Web Development',
    shortDesc: 'End-to-end, highly interactive web applications built from scratch.',
    blurb: 'End-to-end, highly interactive web applications built from scratch with modern full-stack frameworks to captivate your users.',
    points: ['Full-stack modern frameworks', 'API & microservice integrations', 'Responsive enterprise architecture'],
    iconName: 'Code2',
    highlight: 'Rock-Solid Architecture',
    statsBadge: 'Sub-80ms Latency',
    accentColor: '#5aa9ff',
    accentGlow: 'rgba(90, 169, 255, 0.22)',
    externalUrl: 'https://exceptionit.com/#services'
  },
  {
    id: 'ai-ml-solutions',
    indexNumber: '03',
    title: 'AI / ML Solutions',
    shortDesc: 'Custom machine learning models and intelligent pipelines.',
    blurb: 'Custom deep learning models and intelligent pipelines wired directly into your real workflows to automate processes and unlock insights.',
    points: ['LLM & embedding integration', 'Predictive business analytics', 'Applied automated pipelines'],
    iconName: 'Cpu',
    highlight: 'Intelligent Automation',
    statsBadge: 'Production-Hardened AI',
    accentColor: '#5aa9ff',
    accentGlow: 'rgba(90, 169, 255, 0.22)',
    externalUrl: 'https://exceptionit.com/#services'
  },
  {
    id: 'cloud-deployment',
    indexNumber: '04',
    title: 'Cloud & Deployment',
    shortDesc: 'Scalable architecture and automated deployment pipelines.',
    blurb: 'Scalable architecture and automated deployment pipelines that take your applications from staging to production without a hitch.',
    points: ['Automated CI/CD workflows', 'Serverless & container clusters', 'Cloud resource cost optimization'],
    iconName: 'Cloud',
    highlight: 'Zero-Downtime Releases',
    statsBadge: '99.99% Guaranteed SLA',
    accentColor: '#5aa9ff',
    accentGlow: 'rgba(90, 169, 255, 0.22)',
    externalUrl: 'https://exceptionit.com/#services'
  },
  {
    id: 'performance-seo',
    indexNumber: '05',
    title: 'Performance & SEO Strategy',
    shortDesc: 'Comprehensive technical optimization for search rankings.',
    blurb: 'Comprehensive technical optimization that ensures your digital products not only run flawlessly but dominate search engine rankings.',
    points: ['Technical SEO architecture', 'Core Web Vitals tuning', 'Speed & performance audits'],
    iconName: 'TrendingUp',
    highlight: 'Top Rankings & Speed',
    statsBadge: '100/100 Core Web Vitals',
    accentColor: '#5aa9ff',
    accentGlow: 'rgba(90, 169, 255, 0.22)',
    externalUrl: 'https://exceptionit.com/#services'
  },
  {
    id: 'cybersecurity-vapt',
    indexNumber: '06',
    title: 'Cybersecurity & VAPT',
    shortDesc: 'Vulnerability assessment, penetration testing, and security posture hardening.',
    blurb: 'Comprehensive Vulnerability Assessment and Penetration Testing (VAPT) paired with zero-trust defense to safeguard your digital assets against threats.',
    points: ['VAPT & penetration testing', 'Application & API security hardening', 'Threat auditing & compliance checks'],
    iconName: 'ShieldCheck',
    highlight: 'Enterprise Security & VAPT',
    statsBadge: 'Zero-Breach Architecture',
    accentColor: '#5aa9ff',
    accentGlow: 'rgba(90, 169, 255, 0.22)',
    externalUrl: 'https://exceptionit.com/#services'
  }
];
