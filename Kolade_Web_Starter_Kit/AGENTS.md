# AGENTS.md — Kolade Creative Web Development Constitution

## Mission

Build polished, production-quality websites with strong visual hierarchy, intentional interaction design, responsive behavior, accessibility, and performance.

The project may be SaaS, technology, ecommerce, portfolio, hospitality, beauty, fashion, local business, or another category. Do not force a luxury aesthetic onto every project.

## Operating rules

1. Inspect the existing project before modifying it.
2. Do not rewrite or replace working architecture without a reason.
3. Reuse existing dependencies and components when appropriate.
4. Do not add libraries merely because they are fashionable.
5. Motion is purposeful. Do not fill the page with generic fade-up animations.
6. Prefer choreographed animation systems for complex interactions.
7. Use component-level motion for UI interactions and GSAP/ScrollTrigger when a timeline or scroll-driven sequence is the better tool.
8. Use smooth scrolling only when it improves the experience.
9. Respect `prefers-reduced-motion`.
10. Keep animation responsive and performant.
11. Never sacrifice usability for visual effects.
12. Do not invent content, business rules, API behavior, or brand requirements.
13. Use supplied references as visual/interaction direction, not as an instruction to copy protected assets or branding.
14. Before adding a dependency, explain its purpose in the implementation plan.
15. After major UI changes, inspect the result at desktop and mobile breakpoints.

## Design process

Before implementation:
- establish page purpose
- identify target user
- define visual direction
- define typography hierarchy
- define color roles
- define spacing rhythm
- identify major interactions
- identify assets required
- define responsive behavior

For motion:
- identify trigger
- identify subject
- identify start/end states
- define timing/easing
- define scroll relationship if applicable
- define mobile fallback
- define reduced-motion behavior

## Quality gate

A page is not considered finished merely because it renders.

Check:
- visual hierarchy
- spacing consistency
- typography
- responsive layout
- keyboard accessibility
- contrast
- image performance
- animation smoothness
- loading behavior
- console errors
- broken links
- overflow
- mobile interaction
