# Exception IT Solutions — Company Portfolio Website

A premium, interactive, animation-driven company portfolio website built specifically for **Exception IT Solutions**, honoring the brand identity, typography, visual hierarchy, and core offerings of the main website ([exceptionit.com](https://exceptionit.com/)).

---

## 🌟 Highlights & Key Features

1. **Authentic Brand Alignment**
   - Incorporates the official **Exception IT** logo mark, favicon, and color palette (`#142a4a` Cyprus deep navy, `#eef0f4` Sand, `#131922` Ink, `#e0a23c` Warm Gold, and `#5aa9ff` Accent Blue).
   - Reflects verified company information, social links (Instagram, Facebook, LinkedIn), direct telephone (`+91 76984 04843`), and verified email (`exceptionitsolution@gmail.com`).

2. **Hero Section with GSAP Animation**
   - Staggered timeline entrance utilizing GSAP and `gsap.context()` for clean memory cleanup.
   - Live architectural telemetry composition displaying terminal metrics and core vitals.
   - Respects user accessibility preferences (`prefers-reduced-motion`).

3. **Curated Showcase of 8 Featured Solutions**
   - **ApexStore E-Commerce**: Headless retail architecture with faceted filter engine.
   - **Synapse AI Discovery**: Vector similarity recommendation engine with explainable AI tags.
   - **ShieldOps Security Academy**: Simulated phishing training and corporate risk posture matrices.
   - **PulseFlow Automation**: Event-driven workflow orchestrator with dead-letter queue recovery.
   - **PaperFlow 3D**: WebGL and canvas-powered interactive digital flipbook reader.
   - **VitalPulse Blood Network**: Emergency donor proximity dispatch and real-time inventory synchronization.
   - **OmniMetrics BI**: High-density executive analytics with ARR and cohort retention curves.
   - **Vanguard Corporate Experience**: Bespoke agency web platform with kinetic motion design.

4. **Interactive Project Explorer**
   - Instant multi-category filtering (`All Projects`, `Web Development`, `E-Commerce`, `AI & Automation`, `Cybersecurity`, `Dashboards`, `Mobile Applications`).
   - Real-time text search query engine across titles, descriptions, and technologies.
   - Dynamic count badges and responsive empty-state handling with one-click filter reset.

5. **Individual Case Studies (`/projects/:slug`)**
   - Dedicated 12-point case study layout covering Executive Overview, Problem vs. Solution, Objectives, Key Features, Technical Stack, Nuances & Challenges, and Verified Metrics.
   - Accessible breadcrumb trail and return navigation.

6. **Authentic 6 Core Services**
   - Exact alignment with Exception IT: *Interactive Experience Design*, *Custom Web Development*, *AI / ML Solutions*, *Cloud & Deployment*, *Performance & SEO Strategy*, and *Ongoing Support*.

7. **5-Stage Development Methodology**
   - Responsive horizontal/vertical timeline: `01 Discover` ➔ `02 Design` ➔ `03 Develop` ➔ `04 Test` ➔ `05 Deliver`.

8. **Technical SEO & Core Web Vitals**
   - Semantic HTML5 structure with single `h1` and consistent heading hierarchy.
   - OpenGraph and Twitter Card metadata for rich social link sharing.
   - Pre-configured `public/robots.txt` and `public/sitemap.xml`.
   - Schema.org `Organization` structured data (JSON-LD).

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) (GreenSock Animation Platform)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js version 18 or newer
- npm version 9 or newer

### Installation
```bash
# Clone or navigate to the project directory
cd "f:/Company Portfolio"

# Install dependencies
npm install
```

### Running Locally
```bash
# Start Vite development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
# Run TypeScript validation and compile production bundle
npm run build
```
Optimized static production files will be output to the `dist/` directory.

### Previewing the Production Build
```bash
npm run preview
```

---

## 📂 Project Structure

```
├── public/
│   ├── favicon.png               # Official Exception IT favicon
│   ├── logo-mark.png             # Official Exception IT logo
│   ├── robots.txt                # Search engine crawler instructions
│   └── sitemap.xml               # Search engine XML sitemap
├── src/
│   ├── assets/                   # Static visual assets
│   ├── components/
│   │   ├── ContactModal.tsx      # Inbound proposal consultation dialog
│   │   ├── Footer.tsx            # Footer with verified links and social profiles
│   │   ├── Navbar.tsx            # Sticky header with brand logo & mobile drawer
│   │   ├── ProjectCard.tsx       # Interactive card with visual preview
│   │   ├── ProjectQuickModal.tsx # Rapid preview drawer
│   │   └── ProjectVisualPreview.tsx # Specialized UI mockup renderer for each project
│   ├── data/
│   │   ├── company.ts            # Brand constants, phone, email, and social links
│   │   ├── process.ts            # 5-step development methodology
│   │   ├── projects.ts           # 8 featured projects & deep case study specs
│   │   ├── services.ts           # 6 core service capabilities
│   │   └── technologies.ts       # Categorized technical stack breakdown
│   ├── pages/
│   │   ├── HomePage.tsx          # Homepage assembling all portfolio sections
│   │   ├── NotFoundPage.tsx      # Custom 404 handler
│   │   └── ProjectDetailPage.tsx  # Dynamic case study detail view (/projects/:slug)
│   ├── sections/
│   │   ├── AboutWork.tsx         # Engineering philosophy & principles
│   │   ├── FinalCTA.tsx          # High-converting lead generation banner
│   │   ├── Hero.tsx              # Animated hero section with GSAP
│   │   ├── ProcessTimeline.tsx   # 5-phase delivery workflow
│   │   ├── ProjectExplorer.tsx   # Interactive search, filters, and cards
│   │   ├── Services.tsx          # The 6 Exception IT service domains
│   │   └── TechStack.tsx         # Tabbed architecture showcase
│   ├── App.tsx                   # Main router and layout orchestrator
│   ├── index.css                 # Custom CSS tokens & utilities
│   └── main.tsx                  # React DOM mount point
├── index.html                    # SEO head tags, fonts, JSON-LD Schema
├── package.json
├── tailwind.config.js            # Exception IT design tokens
├── tsconfig.json                 # Strict TypeScript configuration
└── vite.config.ts                # Vite build settings
```

---

## ✅ Quality & Testing Checklist

- [x] **Branding**: Colors, fonts, and authentic company logo matching https://exceptionit.com/.
- [x] **Responsiveness**: Mobile-first design tested across mobile, tablet, and desktop viewports.
- [x] **Filtering**: All 7 category tabs filter projects in real-time with zero latency.
- [x] **Search**: Live title and technology stack search queries work instantly.
- [x] **Navigation**: Dedicated `/projects/:slug` case study URLs with back navigation and deep-linking.
- [x] **Contact Flow**: Working modal inquiry validation with direct `mailto:` fallback.
- [x] **GSAP Animation**: Clean component-scoped timelines with `prefers-reduced-motion` safety.
- [x] **Production Build**: Verified zero TypeScript or bundling errors via `npm run build`.
