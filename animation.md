
# Master Prompt: Premium Website Scroll Animations Using GSAP + ScrollTrigger + Lenis

## Role

Act as a senior frontend developer, creative web designer, and professional motion designer specializing in high-end agency websites, cinematic scrolling experiences, and modern React.js applications.

Your task is to transform my existing website into a visually stunning, premium, smooth, and interactive digital experience using **GSAP, ScrollTrigger, and Lenis Smooth Scroll**.

The final result should feel like a professionally designed award-winning creative agency website: elegant, modern, fluid, visually engaging, and highly polished—not a generic template.

## 1. First, Analyze My Existing Project

Before writing or modifying any code:

- Inspect the complete project structure and existing source code.
- Identify the framework, dependencies, routing, components, styling system, and current animation libraries.
- Understand the existing website design, branding, colors, typography, layout, and functionality.
- Identify every major section and determine where animations will improve the experience.
- Reuse the existing design system and components wherever possible.
- Do not replace working code unnecessarily.
- Do not assume the project uses TypeScript. Use **React JSX files (.jsx), not TSX files (.tsx)**.
- Check the installed package versions and existing dependencies before installing anything.

If this is an existing website, enhance it rather than rebuilding it from scratch.

## 2. Required Animation Technology

Use the following animation architecture:

- **GSAP:** Main animation engine.
- **GSAP ScrollTrigger:** Scroll-based reveals, scrubbed animations, pinned sections, and section transitions.
- **Lenis:** Optional smooth scrolling for a refined scrolling experience.

Install dependencies only when needed:

`npm install gsap lenis`

Use the installed versions and their current APIs correctly.

### Important implementation rules

- Integrate Lenis and ScrollTrigger correctly so they work together.
- Do not create multiple competing smooth-scroll systems.
- Do not install unnecessary animation libraries.
- Prevent duplicate animation initialization in React Strict Mode.
- Clean up GSAP timelines, ScrollTriggers, event listeners, and animation contexts on component unmount.
- Avoid hydration issues if the project uses server-side rendering.
- Use reusable animation utilities or custom hooks where appropriate.

## 3. Premium Scroll Animation Requirements

Implement animations selectively throughout the website.

### A. Hero Section

Create an impressive first-screen experience with:

- Smooth headline reveal, preferably line-by-line or word-by-word.
- Text moving upward from a clipped mask.
- A subtitle appearing after the main heading.
- Staggered entrance animations for buttons and supporting content.
- Subtle background parallax or decorative motion where appropriate.
- Smooth transitions between hero content elements.
- An elegant scroll indicator.

The first screen should capture attention immediately without overwhelming visitors.

### B. Text Reveal Animations

Implement sophisticated text animations throughout the page:

- Line-by-line reveal for major headings.
- Word-by-word reveal for selected hero or statement text.
- Fade-up animations for paragraphs.
- Subtle blur-to-sharp transitions where appropriate.
- Mask or clipping animations for important headlines.
- Scroll-scrubbed text animations for selected storytelling sections.

Use readable typography, natural pacing, and smooth easing.

Do not animate every paragraph character by character. Prioritize major headings and important content.

### C. About Section

- Reveal headings and descriptions as they enter the viewport.
- Use staggered text animations.
- Add subtle parallax to existing images or decorative backgrounds.
- Animate statistics or numbers only when meaningful.
- Keep the section readable and visually balanced.

### D. Services Section

For each service card:

- Reveal cards sequentially using staggered animations.
- Add subtle upward movement and opacity transitions.
- Use refined hover interactions, such as a small lift, border transition, or icon movement.
- Maintain consistent card alignment and spacing.
- Avoid excessive rotation, bouncing, or distracting effects.

### E. Portfolio and Projects Section

Create a premium project showcase:

- Reveal project images using clip-path or mask animations.
- Animate project titles and descriptions with a slight stagger.
- Add subtle image scaling on hover.
- Use scroll-based image movement only where it improves the composition.
- Preserve all existing project information, links, and actions.
- Ensure project cards remain responsive and accessible.

If the website has a horizontal project showcase, use a pinned horizontal-scroll effect only when it genuinely improves the desktop experience. Provide a suitable mobile layout.

### F. Technologies and Skills Section

- Reveal technology cards or icons with staggered entrance animations.
- Add subtle hover effects.
- Animate skill indicators only if the existing design uses them.
- Avoid inventing skill percentages or unsupported claims.

### G. Testimonials, Statistics, and Other Sections

- Apply subtle entrance animations to testimonials and supporting content.
- Use count-up effects for meaningful numerical statistics.
- Reveal logos, badges, and visual elements sequentially.
- Respect the existing content and do not invent testimonials, statistics, or business claims.

### H. Contact Section and Footer

- Reveal the main contact heading smoothly.
- Animate contact information and CTA elements with a subtle stagger.
- Add a refined transition into the footer.
- Keep links, forms, buttons, and existing contact functionality working.

## 4. Animation Timing and Motion Quality

Use these values as starting points and adjust them based on the actual layout:

- Text reveal duration: 0.7–1.2 seconds.
- Image reveal duration: 0.9–1.5 seconds.
- Card stagger: approximately 0.08–0.18 seconds.
- Small hover transitions: approximately 0.2–0.35 seconds.
- Preferred easing: `power3.out` or other appropriate smooth easing.
- Typical ScrollTrigger start position: `top 80%`.
- Use scroll scrubbing for selected effects that should follow the user's scroll position.
- Use one-time entrance animations for content that does not need to replay.

Avoid arbitrary delays, excessively slow animations, and animations that make users wait before accessing content.

Animations must feel natural, deliberate, fluid, and premium.

## 5. Smooth Scrolling With Lenis

If Lenis is appropriate for the existing project:

- Initialize one shared Lenis instance.
- Integrate it with GSAP's ticker or the recommended integration approach for the installed versions.
- Synchronize ScrollTrigger updates correctly.
- Ensure scrolling remains natural and responsive.
- Avoid duplicate animation loops or unnecessary ticker callbacks.
- Ensure anchor links and navigation work properly.
- Support browser navigation and normal scrolling behavior.
- Avoid aggressive scroll hijacking.

Do not introduce Lenis if the existing project already has a suitable smooth-scrolling solution that would conflict with it.

## 6. Design and Visual Direction

Follow a modern, premium digital agency aesthetic.

- Preserve the website's existing brand identity.
- Maintain consistent typography, spacing, color usage, and visual hierarchy.
- Use generous whitespace and clear section separation.
- Keep animations subtle enough that the content remains the primary focus.
- Use existing assets and brand colors instead of replacing them without reason.
- Make the result feel cohesive from the hero section to the footer.
- Avoid excessive glowing effects, random floating objects, unnecessary gradients, and distracting animations.

The result must look intentionally designed, not like a collection of unrelated animation effects.

## 7. Performance and Accessibility

Production quality is mandatory.

- Prefer GPU-friendly `transform` and `opacity` animations.
- Avoid unnecessary layout recalculations and expensive scroll handlers.
- Avoid animating large numbers of DOM elements simultaneously.
- Use `prefers-reduced-motion` to reduce or disable nonessential motion.
- Ensure content remains visible and usable if animations fail or JavaScript is unavailable.
- Avoid layout shifts caused by hidden elements or image loading.
- Optimize animations for desktop, tablet, and mobile.
- Do not sacrifice readability, SEO, accessibility, or interaction responsiveness for visual effects.

## 8. Responsive Behavior

Desktop:

- Use richer text reveals, subtle parallax, and selected advanced scroll sequences.

Tablet:

- Reduce animation complexity where necessary.
- Maintain consistent layout and readable typography.

Mobile:

- Use lightweight fade-up and text-reveal animations.
- Avoid heavy pinned sections and long horizontal scrolling experiences.
- Prevent horizontal overflow.
- Ensure touch interactions, navigation, and buttons remain usable.
- Respect reduced-motion preferences on every device.

## 9. Code Quality Requirements

- Use React JSX, not TypeScript.
- Keep components modular and maintainable.
- Reuse animation logic where practical.
- Follow the project's existing naming conventions and folder structure.
- Use `useEffect` and `useRef` appropriately.
- Use `gsap.context()` and proper cleanup where suitable.
- Register ScrollTrigger correctly.
- Prevent memory leaks and duplicate triggers.
- Do not modify backend APIs, authentication, database logic, or environment variables unless strictly required.
- Do not remove existing features or change working functionality.
- Do not leave placeholder implementations, pseudocode, or incomplete components.
- Do not create multiple overlapping animations for the same element.

## 10. Implementation and Testing Workflow

Follow this sequence:

1. Analyze the project and identify its current architecture.
2. Create an animation plan for each existing page and section.
3. Identify compatible dependencies and install only those required.
4. Implement the shared GSAP and optional Lenis setup.
5. Add reusable text, image, card, and section reveal animations.
6. Integrate animations into existing components.
7. Verify all imports, file paths, component names, and dependency APIs.
8. Run the project's existing lint, build, and test commands when available.
9. Fix all errors caused by your changes.
10. Check responsive layouts, navigation, anchor links, and console errors.
11. Verify that animation cleanup works correctly.
12. Provide a concise summary of the completed work.

Do not stop after generating example code. Implement the changes in the actual project files when you have access to the project.

If you cannot access or modify the project files, clearly identify the missing access and provide complete, usable code for the relevant components instead of claiming the website has been updated.

## 11. Final Deliverables

After implementation, provide:

- A summary of the animations added.
- A list of modified and newly created files.
- Any dependencies installed.
- The setup and integration approach for GSAP, ScrollTrigger, and Lenis.
- Instructions to run the website locally.
- Build or test results, including any unresolved issues.
- Any performance or accessibility considerations.

## Final Objective

Transform my existing website into a polished, premium, modern digital experience with smooth scrolling, elegant text reveals, cinematic image transitions, refined card animations, and consistent motion across all sections.

**The most important rule: Make the website visually impressive through purposeful motion, not excessive animation. Preserve the existing functionality and brand identity, prioritize performance and accessibility, and deliver production-ready React JSX code.**
