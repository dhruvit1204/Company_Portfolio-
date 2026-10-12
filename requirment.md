
# MASTER PROMPT: Build a Premium, Animated IT Company Portfolio Website for Exception IT

## 1. Project Overview

Act as a senior UI/UX designer, creative frontend developer, GSAP animation specialist, and technical SEO expert.

Build a complete, professional, production-quality **company portfolio website for Exception IT**, using the existing main company website as the primary branding reference:

**Main Website:** https://exceptionit.com/

The portfolio must be a separate website from the main company website. Its purpose is to showcase the company's technical capabilities, projects, digital solutions, case studies, and expertise to potential clients.

Do not simply create a generic portfolio template. Build a distinctive, premium, visually engaging IT company portfolio that looks like it was designed by an experienced digital agency.

### Primary objectives

- Match the visual identity, brand colors, logo, typography, and design direction of the existing main website.
- Create an impressive first impression within the first few seconds.
- Showcase multiple technology projects through beautiful, interactive project cards.
- Use smooth GSAP animations and modern interactive components.
- Maintain excellent responsiveness, accessibility, loading performance, and SEO.
- Generate a complete, working React application, not just a static design or screenshot.

## 2. Analyze the Existing Company Website First

Before implementing the portfolio, inspect https://exceptionit.com/ and identify:

- Existing company logo and brand identity.
- Primary, secondary, and accent colors.
- Typography and heading styles.
- Header, navigation, button, and footer styles.
- Background patterns, gradients, illustrations, and other visual elements.
- Existing services, company description, contact details, email address, and social links.

Use the existing website as the source of truth for branding.

Reuse the actual company logo and legitimate public company information wherever possible. Do not invent brand colors or replace the company identity with an unrelated design.

If the website cannot be accessed, ask for a screenshot or logo if necessary. Otherwise, use a provisional design that can easily be adjusted to match the reference later.

The portfolio should feel like a natural extension of the main website while having its own creative project-showcase experience.

## 3. Required Technology Stack

Use the following frontend stack:

- React.js with functional components and React Hooks.
- Vite for development and production builds.
- Tailwind CSS for responsive styling.
- GSAP for high-quality animations.
- GSAP ScrollTrigger for scroll-based animations.
- React Router for multi-page navigation if needed.
- Lucide React for consistent, lightweight icons.
- Reusable React components and organized project data.
- Modern JavaScript or TypeScript, preferably TypeScript for maintainability.

Use lightweight CSS animations for simple hover effects and GSAP for complex motion.

Do not add unnecessary libraries when native CSS, React, or GSAP can accomplish the same task.

## 4. Creative Design Direction

Create a premium, modern, technology-focused visual experience inspired by high-quality digital agencies, innovative SaaS companies, and creative development studios.

Design characteristics:

- Strong visual hierarchy and bold typography.
- Beautiful spacing and balanced layouts.
- Large, editorial-style headlines.
- Carefully designed project preview images.
- Sophisticated gradients and subtle background effects consistent with the brand.
- Clean, polished buttons and interactive elements.
- Smooth transitions between sections.
- Subtle depth through layered visuals and restrained shadows.
- Consistent design across desktop, tablet, and mobile.

Avoid generic template aesthetics, excessive glassmorphism, excessive gradients, random neon colors, oversized rounded cards everywhere, and unnecessary decorative elements.

The final design must feel professional, distinctive, trustworthy, and suitable for a real IT services company.

## 5. Website Structure and Sections

### A. Navigation Header

Create a premium, responsive navigation header containing:

- Actual Exception IT logo.
- Home.
- Projects.
- Services.
- Case Studies.
- About Our Work.
- Contact.
- A prominent "Start a Project" CTA.

Requirements:

- Sticky or intelligently compacting header.
- Smooth navigation to sections or pages.
- Mobile hamburger menu with an animated open/close interaction.
- Active navigation states.
- Accessible keyboard navigation.
- Subtle background or border transition on scroll.

The header should link to the main company website where appropriate without confusing users about which website they are visiting.

### B. Hero Section

Create an impressive, full-width hero section.

Suggested headline:

"Engineering Digital Experiences That Move Businesses Forward."

Supporting description:

"Explore how Exception IT transforms ideas into digital products through modern web development, intelligent automation, and technology-driven solutions."

Primary CTA: "Explore Our Work"

Secondary CTA: "Start a Project"

Visual direction:

- Oversized typography with carefully controlled line breaks.
- A visually rich, animated technology composition.
- Layered project previews, abstract technical elements, or a tasteful interactive visual.
- Subtle animated background shapes or a grid.
- Small floating technology elements only when they improve the composition.
- Clear visual hierarchy and strong contrast.

Use GSAP for a coordinated hero entrance sequence, text reveals, and subtle movement.

The hero must look attractive without delaying access to the content or harming performance.

Do not invent company statistics, awards, client names, or project results.

### C. Featured Projects

Make this the most important section of the portfolio.

Section heading:

"Selected Work. Real Solutions. Thoughtful Engineering."

Create 6–8 featured project cards using a varied, premium editorial layout rather than identical cards in a repetitive grid.

Each project card should include:

- Project thumbnail or product interface preview.
- Project title.
- Category.
- Short project overview.
- Technologies used.
- Project type.
- A "View Case Study" action.
- Optional live-demo and source-code links when real URLs are available.

Suggested demo projects:

1. Modern E-Commerce Platform

   - Product listings, category filters, cart, wishlist, and authentication.
   - Technologies: React, TypeScript, Tailwind CSS, Node.js, Express, MongoDB.
2. AI-Powered Recommendation System

   - Personalized recommendations and intelligent content discovery.
   - Technologies: React, Python, machine learning, and APIs where appropriate.
3. Cybersecurity Awareness Training Platform

   - Security awareness campaigns, training dashboards, and simulated phishing education.
   - Technologies: React, ASP.NET Core, SQL or PostgreSQL, and secure authentication.
4. AI & Business Workflow Automation

   - Illustrative workflow automation dashboard, task processing, and reporting.
   - Technologies: React, REST APIs, and an appropriate automation integration.
5. Interactive Digital Flipbook Platform

   - Transform PDF documents into interactive digital publications.
   - Technologies: Next.js, React, and PDF-processing libraries where applicable.
6. Blood Bank Management Application

   - Donor records, blood availability, and request management.
   - Technologies: Java, Firebase, and Android.
7. Analytics and Business Intelligence Dashboard

   - KPI cards, charts, filters, and operational reporting.
   - Technologies: React, TypeScript, charting libraries, and APIs.
8. Corporate Website Experience

   - Responsive company website, service presentation, and lead-generation interfaces.
   - Technologies: React, Tailwind CSS, and GSAP.

Important: These are illustrative projects for the initial demonstration. Label unbuilt examples as "Concept", "Demo", or "Prototype". Do not claim that a demo was delivered to a client, generated revenue, or achieved measurable results unless verified information is provided.

Use authentic project screenshots when available. Otherwise, create attractive, original project-preview interfaces using React and CSS or suitable illustrative assets. Do not use random images unrelated to each project.

### D. Interactive Project Explorer

Build a project filtering experience with categories such as:

- All Projects
- Web Development
- E-Commerce
- AI & Automation
- Cybersecurity
- Dashboards
- Mobile Applications

Requirements:

- Filtering must work, not merely change the selected button's appearance.
- Animate project transitions using GSAP or an appropriate layout transition.
- Keep the interface accessible and responsive.
- Display a useful empty state if a filter has no results.
- Include a clear way to reset the filter.

Add a search field only if it improves the experience and can be implemented properly.

### E. Individual Project Case Studies

Every featured project should have a dedicated detail page or a meaningful project-detail view.

Use a reusable case-study template containing:

1. Project overview.
2. Problem or opportunity.
3. Project objectives.
4. Proposed solution.
5. Key features.
6. UI/UX and development approach.
7. Technology stack.
8. Relevant screenshots or interface previews.
9. Challenges and implementation details.
10. Verified outcomes, if available.
11. Related projects.
12. CTA to discuss a similar solution.

Use realistic sample content for demos, clearly identified as illustrative.

Do not invent client testimonials, client identities, certifications, performance statistics, or business results.

Use descriptive URLs, for example:

- /projects/ecommerce-platform
- /projects/ai-recommendation-system
- /projects/cybersecurity-training-platform

### F. Services and Technical Expertise

Create a compact portfolio section that demonstrates the company's capabilities without copying the entire services page from the main website.

Include relevant capabilities such as:

- Web Application Development.
- Full-Stack Development.
- E-Commerce Development.
- AI & Automation.
- Cybersecurity Solutions.
- UI/UX Implementation.
- API and System Integration.
- Data Dashboards and Business Applications.

Only include services that align with the actual company's offerings.

Present each capability using refined cards, icons, small interactive details, and short benefit-oriented descriptions.

Link to the corresponding page on the main website when a relevant page exists.

### G. Our Development Approach

Create a clean, animated workflow:

01 — Discover
Understand the business problem, goals, and requirements.

02 — Design
Plan the user experience, interfaces, and technical architecture.

03 — Develop
Build reliable, responsive, maintainable solutions.

04 — Test
Validate functionality, accessibility, compatibility, and security.

05 — Deliver
Deploy the solution and support the next stage of improvement.

Use a horizontal timeline on larger screens and a vertical timeline on mobile.

Animate each step into view using ScrollTrigger without making scrolling feel slow or forced.

### H. Technology Stack Showcase

Create a visually attractive section highlighting relevant technologies.

Organize technologies into categories:

- Frontend: React, Next.js, JavaScript, TypeScript, Tailwind CSS.
- Backend: Node.js, Express.js, ASP.NET Core.
- Databases: MongoDB, PostgreSQL, SQL Server, Firebase.
- AI & Automation: Python, machine learning, API integrations, automation tools.
- Tools & Deployment: Git, GitHub, Vite, and relevant deployment platforms.

Only show technologies the company actually uses or can substantiate.

Use tasteful icons, labels, and subtle hover effects. Avoid meaningless animated skill percentages.

### I. About Our Work

Explain the philosophy behind the company's technical work.

Suggested headline:

"Built with Purpose. Designed for People. Engineered for Growth."

Include concise content about:

- Solving real business problems.
- User-focused design.
- Maintainable and scalable architecture.
- Security-conscious development.
- Collaboration and continuous improvement.

Use only verified company facts. Do not fabricate the number of employees, years of experience, clients, projects delivered, or awards.

### J. Final Call-to-Action

Create a strong conversion-focused section.

Suggested heading:

"Have an Idea Worth Building?"

Supporting text:

"Let's turn your next digital idea into a thoughtful, functional, and scalable solution."

Buttons:

- "Discuss Your Project"
- "Visit Exception IT"

Connect the buttons to a working contact flow or the actual main website contact page.

### K. Footer

Include:

- Company logo.
- A short company description.
- Portfolio navigation.
- Links to relevant services on the main website.
- Verified company email and contact details.
- Official social profiles where available.
- Privacy Policy and Terms links if valid pages exist.
- Copyright notice with a dynamically generated year.

Use the same brand identity as the main website.

## 6. GSAP Animation Requirements

Use GSAP thoughtfully to create a premium motion experience.

Required animations:

- Hero text entrance using staggered reveals.
- Subtle hero visual movement.
- Scroll-triggered section reveals.
- Project card entrance animations.
- Image reveal or clipping transitions.
- Subtle project-card hover interactions.
- Animated process timeline.
- Smooth mobile navigation transitions.
- Refined CTA and button interactions.
- Optional horizontal project showcase where it genuinely improves usability.

Technical rules:

- Use GSAP ScrollTrigger correctly.
- Use React refs and `useEffect` or `useLayoutEffect` with `gsap.context()` for component-scoped animations.
- Clean up animations and ScrollTriggers when components unmount.
- Use `gsap.matchMedia()` or equivalent responsive logic for breakpoint-specific animations.
- Respect `prefers-reduced-motion`.
- Avoid animating expensive layout properties when transform or opacity will work.
- Avoid excessive parallax, cursor-following effects, scroll hijacking, and animations that interfere with reading.
- Keep navigation, filtering, links, and interactive controls functional during animations.

Animations should enhance the content, not compete with it.

## 7. SEO and Search Engine Optimization

Implement technical, on-page, and content SEO.

### Technical SEO

- Semantic HTML5.
- A logical H1, H2, and H3 hierarchy.
- Unique document titles and meta descriptions for every indexable page.
- Canonical URLs configured for the actual portfolio domain.
- XML sitemap.
- Robots.txt.
- Descriptive, readable URL paths.
- Open Graph and social-sharing metadata.
- Appropriate image alt text.
- Optimized images in WebP or AVIF where supported.
- Lazy-load below-the-fold images.
- Do not lazy-load the main above-the-fold hero image if it is the LCP element.
- Avoid duplicate titles and descriptions.
- Ensure all important portfolio content is available to search engines.
- Add appropriate redirects and a custom 404 page if the hosting setup supports them.

### Structured Data

Implement appropriate JSON-LD only where the information is accurate and supported, such as:

- Organization, where suitable.
- WebSite.
- BreadcrumbList for project detail pages.
- CreativeWork or other relevant project markup when appropriate.

Do not add fabricated ratings, reviews, awards, or unsupported claims. Do not use FAQ structured data simply to chase rich results.

### On-Page SEO

Use natural, descriptive language related to:

- Exception IT portfolio.
- Web application development projects.
- AI and automation solutions.
- Cybersecurity projects.
- E-commerce development.
- Custom software development.

Treat these as topic examples, not keywords to repeat unnaturally.

Create unique titles and descriptions for the portfolio homepage and individual case studies. Avoid keyword stuffing and duplicate content from the main website.

### Performance and Core Web Vitals

- Aim for strong Lighthouse performance, accessibility, SEO, and best-practice scores.
- Minimize JavaScript and unnecessary dependencies.
- Use code splitting for project detail pages when beneficial.
- Prevent layout shifts by specifying image dimensions or aspect ratios.
- Avoid large, unnecessary video backgrounds.
- Use responsive image sizes.
- Ensure GSAP animations do not create excessive rendering work.
- Test the production build and deployed pages.

Do not claim a particular Lighthouse score until the site has actually been tested.

## 8. Responsive Design

The complete website must work properly on:

- Small mobile phones.
- Larger smartphones.
- Tablets.
- Laptops.
- Desktop monitors.
- Wide desktop displays.

Requirements:

- Mobile-first Tailwind CSS layouts.
- No horizontal overflow.
- Readable typography on small screens.
- Touch-friendly interactive controls.
- Responsive navigation.
- Correctly scaled project screenshots.
- Animations adjusted for smaller screens.
- Usable project filters on mobile.

Do not simply shrink the desktop design. Adapt layouts and interactions to the available screen size.

## 9. Accessibility and Security

Implement:

- Semantic landmarks.
- Keyboard-accessible navigation and project controls.
- Visible focus indicators.
- Sufficient color contrast.
- Meaningful alt text.
- Reduced-motion support.
- Accessible form labels and validation messages.
- Safe handling of external links.
- No hardcoded API secrets.
- No sensitive credentials in frontend environment variables.
- No fake contact forms that show success without actually submitting data.

If a backend or email integration is not available, provide a clear integration point and document what is required to make the form operational.

## 10. Code Architecture

Organize the project using a maintainable structure similar to:

src/
  assets/
  components/
    Navbar/
    Footer/
    Buttons/
    ProjectCard/
    ProjectFilter/
    SectionHeading/
    AnimatedSection/
  sections/
    Hero/
    FeaturedProjects/
    Services/
    Process/
    TechStack/
    About/
    ContactCTA/
  pages/
    Home/
    ProjectDetails/
    NotFound/
  data/
    projects.ts
    technologies.ts
  hooks/
  animations/
  utils/
  App.tsx
  main.tsx

Adapt the structure if needed, but keep components reusable and responsibilities clearly separated.

Store project content in structured data rather than duplicating JSX for every project.

Keep SEO metadata, animations, and project routing organized.

Use reusable design tokens for brand colors, typography, spacing, and common UI elements.

## 11. Functional Requirements

All visible interactions must work.

Verify:

- Navigation links.
- Mobile menu.
- Project filtering.
- Project detail navigation.
- Back navigation and browser history.
- CTA links.
- External website links.
- Contact form validation and submission behavior, if included.
- Responsive layouts.
- GSAP animation cleanup.
- Reduced-motion behavior.
- Page titles and metadata.
- Not-found route.
- Production build.

Do not use placeholder links such as `href="#"` for interactive elements.

Do not leave buttons that look functional but do nothing.

## 12. Final Deliverables

Produce:

1. Complete React.js application.
2. Tailwind CSS configuration and design tokens.
3. Reusable components and organized project data.
4. GSAP animation implementation.
5. Responsive layouts for every section and page.
6. Working project filtering and case-study navigation.
7. SEO metadata, robots.txt, sitemap, and appropriate structured data.
8. Original or properly licensed project preview assets.
9. README with setup, development, build, and deployment instructions.
10. `.env.example` if configuration variables are needed.
11. A production build that runs successfully.
12. A short testing checklist and any remaining integration requirements.

Do not stop after generating the hero section. Complete the entire website, including the footer, project details, responsive behavior, SEO, and functional interactions.

## 13. Final Quality Standard

Before finishing, review the website as a senior frontend engineer and creative director.

Ask yourself:

- Does it look consistent with the actual Exception IT brand?
- Does it feel different from a generic AI-generated template?
- Are the project previews attractive and relevant?
- Are demo projects clearly distinguished from real client work?
- Do the animations feel smooth, intentional, and professional?
- Does the website load quickly and work on mobile?
- Is the content useful to potential clients?
- Is the SEO implementation technically sound?
- Do all links and interactive features work?
- Does the code build successfully?

Fix issues before declaring the project complete.

**Final goal:** Deliver an impressive, conversion-focused, SEO-friendly, animated IT company portfolio website that complements https://exceptionit.com/ while giving Exception IT a dedicated space to showcase its technical expertise and project work.
