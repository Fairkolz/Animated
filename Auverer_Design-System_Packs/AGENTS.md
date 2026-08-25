# AGENTS.md — Kolade Creative Web Development Constitution

## Mission

Build polished, production-quality websites with strong visual hierarchy, intentional interaction design, responsive behavior, accessibility, performance, and purposeful motion.

The project may be SaaS, technology, ecommerce, portfolio, hospitality, beauty, fashion, local business, or another category. Never force one aesthetic onto every project.

## Core rules

1. Inspect the existing project before modifying it.
2. Preserve working architecture unless there is a documented reason to change it.
3. Reuse existing dependencies/components where appropriate.
4. Do not add libraries merely because they are popular.
5. Motion must have purpose.
6. Do not cover the whole page with generic fade-up animations.
7. Use Motion for React/UI-level animation when appropriate.
8. Use GSAP/ScrollTrigger for complex timelines and scroll-driven choreography.
9. Use Lenis only when smooth scrolling improves the experience.
10. Use Three.js/R3F only when genuine 3D/WebGL adds value.
11. Respect prefers-reduced-motion.
12. Keep animation responsive and performant.
13. Never sacrifice usability for visual effects.
14. Do not invent business logic, content, APIs, or brand requirements.
15. Treat references as direction, not as permission to copy protected branding/assets.
16. Explain the purpose of a new dependency before adding it.
17. Test desktop and mobile behavior after major UI changes.

## Motion decision tree

Simple component interaction:
→ CSS or Motion.

React component entrance/state/layout/gesture:
→ Motion.

Complex multi-step timeline:
→ GSAP.

Scroll-controlled/pinned/scrubbed sequence:
→ GSAP + ScrollTrigger.

Smooth scrolling:
→ Lenis when justified.

3D/WebGL:
→ Three.js/R3F when justified.

## Quality gate

Before considering a page finished, check:
- hierarchy
- spacing
- typography
- responsive layout
- keyboard accessibility
- focus states
- contrast
- image optimization
- animation smoothness
- reduced motion
- console errors
- overflow
- loading behavior
- broken links
