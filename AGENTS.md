# AGENTS.md — AUVERER Project Constitution

> **Source of truth:** `AUVERER-FULL-SITE-BRIEF.md` supersedes this document wherever the two
> conflict (section order, content, corner-radius and motion rules).

## Mission

Build a luxury skincare e-commerce experience with cinematic scroll-driven hero sequence, editorial typography, and purposeful motion. Prioritize luxury restraint and visual hierarchy.

## Core Principles

1. **Luxury Restraint**: Motion should feel expensive and intentional, not gratuitous.
2. **Hero First**: The cinematic hero sequence is the primary experience.
3. **Performance**: Optimize for smooth 60fps animations.
4. **Accessibility**: Respect `prefers-reduced-motion` and provide alternatives.
5. **Responsive**: Design for all breakpoints, with mobile fallbacks.

## Operating Rules

1. Inspect the existing project before modifying it.
2. Preserve working architecture unless there is a documented reason to change it.
3. Reuse existing dependencies and components when appropriate.
4. Do not add libraries merely because they are popular.
5. Motion must have purpose. Do not fill the page with generic fade-up animations.
6. Use GSAP/ScrollTrigger for the cinematic hero sequence.
7. Use Motion for React/UI-level animation when appropriate.
8. Use Lenis for smooth scrolling where justified.
9. Respect `prefers-reduced-motion`.
10. Keep animation responsive and performant.
11. Never sacrifice usability for visual effects.
12. Do not invent business logic, content, APIs, or brand requirements.
13. Treat references as direction, not as permission to copy protected branding/assets.
14. Explain the purpose of a new dependency before adding it.
15. Test desktop and mobile behavior after major UI changes.
16. **Semantic HTML5**: Always use semantic HTML elements (`<header>`, `<main>`, `<section>`, `<nav>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>`) instead of generic `<div>`/`<span>` for better accessibility and SEO.
17. **8px Grid Spacing**: Maintain consistent spacing throughout the design using an 8px base grid. All spacing values must be multiples of 8px (8, 16, 24, 32, 40, 48, etc.).
18. **Reduced Motion**: All animations must respect `prefers-reduced-motion: reduce`. Provide static or simplified alternatives for users who have requested reduced motion.
19. **CSS Variables for Colors**: Use CSS custom properties for all color values to enable easy theme switching. Never hardcode color hex/rgb values directly in component styles.

## Motion Decision Tree

**Simple component interaction:**
→ CSS or Motion

**React component entrance/state/layout/gesture:**
→ Motion

**Complex multi-step timeline:**
→ GSAP

**Scroll-controlled/pinned/scrubbed sequence:**
→ GSAP + ScrollTrigger

**Smooth scrolling:**
→ Lenis when justified

**3D/WebGL:**
→ Three.js/R3F when justified (not required for initial implementation)

## Design Process

Before implementation:
- Establish page purpose (luxury skincare e-commerce)
- Identify target user (luxury skincare consumers)
- Define visual direction (editorial, cinematic, restrained)
- Define typography hierarchy (Cormorant Garamond display, Inter body)
- Define color roles (deep charcoal, champagne gold, warm amber, warm ivory)
- Define spacing rhythm (8px base grid)
- Identify major interactions (cinematic hero scroll, editorial transitions)
- Identify assets required (120-frame hero sequence)
- Define responsive behavior (mobile fallback for hero)

For motion:
- Identify trigger (scroll position)
- Identify subject (hero canvas)
- Identify start/end states (frame 0 to frame 119)
- Define timing/easing (GSAP ScrollTrigger scrub)
- Define scroll relationship (pinned section)
- Define mobile fallback (simplified animation or static image)
- Define reduced-motion behavior (static image fallback)

## Quality Gate

A page is not considered finished merely because it renders.

Check:
- Visual hierarchy
- Spacing consistency
- Typography
- Responsive layout
- Keyboard accessibility
- Focus states
- Contrast
- Image optimization
- Animation smoothness (60fps)
- Reduced motion behavior
- Console errors
- Overflow
- Loading behavior
- Broken links

## Project Structure

```
auverer/
├── AGENTS.md
├── PRD.md
├── README.md
├── package.json
├── design/
│   ├── design-tokens.json
│   ├── tokens.css
│   ├── tailwind.config.js
│   └── figma-mapping.json
├── public/
│   └── hero-sequence/
│       ├── frame-000.jpg
│       ├── frame-001.jpg
│       ├── ...
│       └── frame-119.jpg
├── app/
├── components/
├── lib/
├── skills/
└── styles/
```

## Dependencies

Required:
- Next.js + React (application framework)
- Tailwind CSS (styling)
- Motion (React/UI animation)
- GSAP + ScrollTrigger (cinematic hero sequence)
- Lenis (smooth scrolling)

Optional (not required for initial implementation):
- Three.js / React Three Fiber / Drei (3D/WebGL)

## Design Tokens

Source of truth: `design/design-tokens.json`

CSS variables: `design/tokens.css`

Tailwind mapping: `design/tailwind.config.js`

Figma mapping: `design/figma-mapping.json`

All visual decisions should reference these tokens. Do not create competing token systems.

## Hero Sequence

Location: `public/hero-sequence/`

Frames: 120 frames (frame-000.jpg to frame-119.jpg)

Naming: Hyphen-separated (frame-000.jpg)

Do not rename, reorder, compress, or modify frames at this stage.

## Animation Architecture

Use the smallest appropriate tool:

- **Motion**: React/UI animation, gestures, layout, component transitions
- **GSAP + ScrollTrigger**: Cinematic hero sequence, complex timelines, scroll choreography
- **Lenis**: Smooth scrolling where justified

Do not use GSAP for a simple button hover just because it is available.

## Responsive Strategy

- Desktop: Full cinematic hero experience
- Tablet: Simplified hero animation
- Mobile: Static image or simplified animation
- All: Respect `prefers-reduced-motion`

## Accessibility

- Provide alt text for hero frames
- Ensure keyboard navigation works
- Respect `prefers-reduced-motion`
- Maintain contrast ratios
- Focus states visible
- Screen reader friendly
