# Kolade Creative Web Starter Kit v2

A reusable foundation for AI-assisted, production-quality web projects in Antigravity.

## Core philosophy

This kit separates:
1. AI design/development skills
2. reusable component contracts
3. reusable animation patterns
4. project-specific brand/design tokens
5. technical dependencies

It is intentionally framework-aware but not a complete website.

## Nine reusable skills

- Visual Design
- UI/UX
- Creative Direction
- Motion Design
- Motion for React (Motion / formerly Framer Motion)
- Cinematic Scroll (GSAP + ScrollTrigger)
- Responsive Design
- Accessibility
- Performance

## Animation architecture

Use the smallest appropriate tool:

- Motion: React/UI animation, gestures, layout, component transitions
- GSAP + ScrollTrigger: complex timelines and scroll choreography
- Lenis: smooth scrolling where justified
- Three.js/R3F: optional 3D/WebGL

Do not use GSAP for a simple button hover just because it is available.

## New-project workflow

1. Create a Next.js + React project.
2. Add Tailwind if desired.
3. Install only required project-local dependencies.
4. Select the relevant skills from this kit.
5. Copy/adapt AGENTS.md.
6. Define project-specific brand/design tokens.
7. Select or adapt reusable component contracts.
8. Define motion/interaction direction.
9. Build and visually QA at multiple breakpoints.
10. Check accessibility, performance and reduced-motion behavior.
