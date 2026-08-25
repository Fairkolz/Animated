# UI/UX Pro Max Skill

Advanced UI/UX patterns combining Motion (Framer Motion), GSAP/ScrollTrigger, and luxury design principles for high-end e-commerce experiences.

## Motion Library Stack

| Layer | Tool | Use For |
|-------|------|---------|
| React/UI | Motion (Framer Motion) | Component enter/exit, hover/tap, layout, gestures, AnimatePresence |
| Timeline | GSAP | Complex multi-step sequences, scrubbed animations, staggered reveals |
| Scroll | ScrollTrigger | Pinned sections, scroll-driven timelines, parallax, scrubbed progress |
| Smooth | Lenis | Smooth scroll feel (use only when justified — avoid floaty UX) |

## Motion Patterns — Motion (Framer Motion)

### Entry/Exit
```tsx
import { AnimatePresence, motion } from 'framer-motion'

<AnimatePresence mode="wait">
  {isOpen && (
    <motion.div
      key="modal"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
    />
  )}
</AnimatePresence>
```

### Hover/Tap
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
>
  Discover
</motion.button>
```

### Scroll-triggered enter
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
/>
```

### Stagger children
```tsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

<motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
  {items.map(i => <motion.li key={i.id} variants={item}>{i.label}</motion.li>)}
</motion.ul>
```

### Layout animation
```tsx
<motion.div layout layoutId={`card-${id}`} />
```

### Reduced motion
```tsx
const prefersReduced = useReducedMotion()

<motion.div
  initial={prefersReduced ? false : { opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: prefersReduced ? 0 : 0.6 }}
/>
```

## Motion Patterns — GSAP + ScrollTrigger

### Pinned scroll sequence
```ts
ScrollTrigger.create({
  trigger: sectionRef.current,
  start: 'top top',
  end: () => `+=${window.innerHeight * 2}`,
  scrub: 0.3,
  pin: wrapperRef.current,
  anticipatePin: 1,
  onUpdate: (self) => drawFrame(Math.floor(self.progress * TOTAL_FRAMES)),
})
```

### Scroll scrubbed text
```ts
gsap.fromTo('.title', { opacity: 0, y: 40 }, {
  opacity: 1, y: 0, ease: 'power3.out',
  scrollTrigger: { trigger: '.title', start: 'top 75%', end: 'top 25%', scrub: 1 },
})
```

### Parallax layers
```ts
gsap.to('.bg', {
  y: -100,
  ease: 'none',
  scrollTrigger: { trigger: '.section', start: 'top bottom', end: 'bottom top', scrub: true },
})
```

### Batch stagger reveal
```ts
ScrollTrigger.batch('.product-card', {
  onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }),
  start: 'top 85%',
})
```

## UI/UX Patterns — Luxury E-Commerce

### Color tokens (never hardcode)
```tsx
style={{ color: 'var(--color-text-primary)', backgroundColor: 'var(--color-brand-primary)' }}
```

### Typography hierarchy
| Role | Font | Weight | Tracking |
|------|------|--------|----------|
| Display | Cormorant Garamond | 300–400 | 0.15em–0.3em |
| Body | Inter | 300–400 | 0.05em–0.12em |
| Label | Inter | 400 | 0.2em uppercase |

### Spacing (8px grid)
```css
--spacing-1: 8px;   --spacing-2: 16px;  --spacing-3: 24px;
--spacing-4: 32px;  --spacing-5: 40px;  --spacing-6: 48px;
--spacing-8: 64px;  --spacing-10: 80px; --spacing-12: 96px;
```

### Semantic HTML
```html
<header>   <!-- brand mark, nav -->
<main>     <!-- primary content -->
<section>  <!-- content groups -->
<aside>    <!-- editorial overlays, side content -->
<footer>   <!-- site footer -->
<figure>   <!-- hero canvas, product images -->
<nav>      <!-- navigation -->
<article>  <!-- self-contained content blocks -->
```

### Button hover pattern (luxury)
```tsx
<button
  style={{
    border: '1px solid var(--color-brand-secondary)',
    backgroundColor: 'transparent',
    color: 'var(--color-text-inverse)',
    transition: 'background-color 0.4s ease, color 0.4s ease',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = 'var(--color-text-inverse)'
    e.currentTarget.style.color = 'var(--color-brand-primary)'
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = 'transparent'
    e.currentTarget.style.color = 'var(--color-text-inverse)'
  }}
/>
```

### Reduced motion fallback
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```tsx
useEffect(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    // Show final state without animation
    drawFrame(TOTAL_FRAMES - 1)
    updateOverlays(1)
    return
  }
  // ... normal ScrollTrigger setup
}, [])
```

## Rules

1. Motion = React component-level animation. GSAP = timeline/scroll choreography. Do not mix carelessly.
2. Always use CSS variables for colors — never hex/rgb literals in components.
3. Always use semantic HTML5 elements.
4. All spacing on 8px grid.
5. Always respect `prefers-reduced-motion`.
6. Luxury restraint: motion must feel intentional, not decorative.
7. Do not animate elements that delay essential interaction.
8. Prefer transform/opacity for 60fps performance.
9. Use `scrub: 0.3` for responsive scroll feel; avoid high scrub values that feel laggy.
10. Lenis is optional — remove it if it makes scroll feel floaty.
