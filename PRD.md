# AUVERER Product Requirements Document

> **Source of truth:** `AUVERER-FULL-SITE-BRIEF.md` supersedes this document wherever the two
> conflict (landing page structure, content, corner-radius and motion rules).

## Project Overview

AUVERER is a luxury skincare e-commerce experience featuring a cinematic scroll-driven hero sequence, editorial typography, and purposeful motion. The project prioritizes luxury restraint and visual hierarchy.

## Core Experience

### Hero Sequence
- **Frame Sequence**: 120 frames (frame-000.jpg to frame-119.jpg)
- **Scroll Behavior**: Pinned section with scroll-controlled frame progression
- **Color Grade**: Deep charcoal (#0A0A0A) with champagne gold (#B79A63) and warm amber highlights
- **Animation**: GSAP ScrollTrigger with scrubbed timeline
- **Performance**: 60fps target, optimized image loading

### Editorial Typography
- **Display Font**: Cormorant Garamond (headlines, hero text)
- **Body Font**: Inter (body copy, UI elements)
- **Hierarchy**: Clear visual distinction between display and body text

### Philosophy Section
- **Animation**: Text enters with directional motion (Right → Left → Right → Left → Center)
- **Purpose**: Communicate brand philosophy after hero sequence
- **Motion**: Use Motion for React component animations

## Technical Requirements

### Dependencies
- **Framework**: Next.js + React
- **Styling**: Tailwind CSS
- **Animation**: 
  - Motion (React/UI animation)
  - GSAP + ScrollTrigger (cinematic hero sequence)
  - Lenis (smooth scrolling)
- **Performance**: Optimized for 60fps animations

### Design System
- **Source of Truth**: `design/design-tokens.json`
- **CSS Variables**: `design/tokens.css`
- **Tailwind Mapping**: `design/tailwind.config.js`
- **Figma Mapping**: `design/figma-mapping.json`

### Color Palette
- **Primary**: Deep Charcoal (#0A0A0A)
- **Accent**: Champagne Gold (#B79A63)
- **Highlights**: Warm Amber
- **Text**: Warm Ivory (#EFE9DD)

### Corner System
- Sharp corners (0px border-radius) everywhere
- Single exception: filter/tag pills (`--radius-pill`, 9999px) — functional UI convention only

### Typography
- **Display**: Cormorant Garamond (serif)
- **Body**: Inter (sans-serif)
- **Mono**: SF Mono (monospace)

### Spacing
- Base grid: 8px
- Scale: 0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem, 4rem, 6rem, 8rem

## User Experience

### Target User
- Luxury skincare consumers
- Design-conscious individuals
- High-end retail customers

### Key Interactions
1. **Cinematic Hero Scroll**: Primary interaction, frames advance with scroll
2. **Editorial Transitions**: Smooth section-to-section transitions
3. **Philosophy Reveal**: Text animation after hero sequence
4. **Navigation**: Minimal, elegant navigation

### Responsive Behavior
- **Desktop**: Full cinematic hero experience
- **Tablet**: Simplified hero animation
- **Mobile**: Static image or simplified animation
- **All**: Respect `prefers-reduced-motion`

## Performance Requirements

- **Animation**: 60fps target
- **Loading**: Optimized image sequences
- **Accessibility**: `prefers-reduced-motion` support
- **Core Web Vitals**: Optimized for LCP, FID, CLS

## Success Metrics

- Smooth 60fps hero animation
- Proper scroll-based frame progression
- Responsive across all breakpoints
- Accessibility compliance
- Performance optimization

## Out of Scope (Initial Implementation)

- Three.js / React Three Fiber / Drei (3D/WebGL)
- Complex product catalogs
- User authentication
- Payment processing
- Backend APIs

## Future Considerations

- Product showcase sections
- Editorial content sections
- Advanced animations
- 3D/WebGL experiences
