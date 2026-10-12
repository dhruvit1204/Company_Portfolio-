import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion, TRANSITIONS } from './animations';

/**
 * Triggers an Awwwards-grade arrival reveal sequence when navigating to a section.
 * Features a luxury ambient spotlight flash, headline unmasking, and staggered card cascade.
 */
export const triggerSectionArrival = (sectionId: string) => {
  if (typeof window === 'undefined' || isReducedMotion()) return;

  const sectionEl = document.getElementById(sectionId);
  if (!sectionEl) return;

  // Refresh ScrollTrigger to ensure accurate positions
  ScrollTrigger.refresh();

  // 1. Luxury Ambient Spotlight Pulse
  const existingSpotlight = sectionEl.querySelector('.section-arrival-spotlight');
  if (existingSpotlight) {
    existingSpotlight.remove();
  }

  const spotlight = document.createElement('div');
  spotlight.className = 'section-arrival-spotlight absolute inset-0 pointer-events-none z-10';
  spotlight.style.background =
    'radial-gradient(ellipse 75% 55% at 50% 15%, rgba(205, 211, 208, 0.25) 0%, rgba(20, 42, 74, 0.15) 45%, transparent 75%)';
  spotlight.style.opacity = '0';

  // Ensure target container is positioned for absolute child
  const computedStyle = window.getComputedStyle(sectionEl);
  if (computedStyle.position === 'static') {
    sectionEl.style.position = 'relative';
  }
  sectionEl.appendChild(spotlight);

  // Animate spotlight flare
  gsap.fromTo(
    spotlight,
    { opacity: 0, scale: 0.92 },
    {
      opacity: 1,
      scale: 1.04,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(spotlight, {
          opacity: 0,
          scale: 1.08,
          duration: 0.9,
          ease: 'power2.inOut',
          onComplete: () => {
            spotlight.remove();
          },
        });
      },
    }
  );

  // 2. Target Selectors for specific sections
  let headerSelector = '';
  let itemsSelector = '';

  switch (sectionId) {
    case 'projects':
      headerSelector = '#projects .project-header-reveal';
      itemsSelector = '#projects article';
      break;
    case 'services':
      headerSelector = '#services .services-header-reveal';
      itemsSelector = '#services .service-card-item';
      break;
    case 'process':
      headerSelector = '#process .process-header-reveal';
      itemsSelector = '#process .process-step-card';
      break;
    case 'tech-stack':
      headerSelector = '#tech-stack .tech-header-reveal';
      itemsSelector = '#tech-stack .tech-item-card';
      break;
    case 'about':
      headerSelector = '#about .about-narrative-item';
      itemsSelector = '#about .about-principle-card';
      break;
    case 'hero':
      headerSelector = '#hero h1, #hero p';
      itemsSelector = '#hero .story-chapter-card, #hero button';
      break;
    default:
      headerSelector = `#${sectionId} h2, #${sectionId} h3`;
      itemsSelector = `#${sectionId} .card, #${sectionId} article`;
  }

  // 3. Header Unmasking Slide
  if (headerSelector) {
    const headerEls = document.querySelectorAll(headerSelector);
    if (headerEls.length > 0) {
      gsap.fromTo(
        headerEls,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: TRANSITIONS.easePower3,
          clearProps: 'transform,opacity',
        }
      );
    }
  }

  // 4. Content / Card Items Cascade with Micro-Scale
  if (itemsSelector) {
    const itemEls = document.querySelectorAll(itemsSelector);
    if (itemEls.length > 0) {
      gsap.fromTo(
        itemEls,
        {
          y: 45,
          opacity: 0,
          scale: 0.97,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          stagger: 0.07,
          ease: TRANSITIONS.easePower3,
          delay: 0.12,
          clearProps: 'transform,opacity,scale',
        }
      );
    }
  }
};
