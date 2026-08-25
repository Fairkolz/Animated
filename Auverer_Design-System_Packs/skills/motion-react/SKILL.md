# Motion for React Skill — Motion / Framer Motion

## Purpose

Use Motion (the library formerly known as Framer Motion) for React/UI-level animation.

## Prefer Motion for

- component entrance/exit
- hover/tap interactions
- menus and dialogs
- layout transitions
- list/item transitions
- `AnimatePresence`
- variants
- `whileHover`
- `whileTap`
- `whileInView`
- gesture interactions
- shared layout-style transitions

## Rules

1. Keep variants reusable and semantic.
2. Use AnimatePresence for meaningful mount/unmount transitions.
3. Prefer transform/opacity for performant animation.
4. Avoid unnecessary animation on every element.
5. Respect reduced-motion preferences.
6. Do not use Motion for a complex scroll timeline when GSAP/ScrollTrigger is more appropriate.
7. Keep animation logic close to the component unless it is a shared pattern.
8. Avoid animation that delays essential interaction.

## Tool distinction

Motion = React/UI animation.

GSAP = advanced timeline choreography.

ScrollTrigger = scroll-driven choreography.

They complement each other; Motion is not a replacement for GSAP.
