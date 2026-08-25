# AUVERER

A luxury fashion e-commerce experience with cinematic scroll-driven hero sequence, editorial typography, and purposeful motion.

## Project Overview

AUVERER prioritizes luxury restraint and visual hierarchy, featuring:

- **Cinematic Hero Sequence**: 75-frame scroll-driven animation
- **Editorial Typography**: Cormorant Garamond display, Inter body
- **Purposeful Motion**: GSAP/ScrollTrigger for hero, Motion for UI
- **Responsive Design**: Desktop, tablet, and mobile experiences

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Project Structure

```
auverer/
├── AGENTS.md                 # Project constitution
├── PRD.md                    # Product requirements
├── README.md                 # This file
├── package.json              # Dependencies
├── design/
│   ├── design-tokens.json    # Source of truth for tokens
│   ├── tokens.css            # CSS variables
│   ├── tailwind.config.js    # Tailwind configuration
│   └── figma-mapping.json    # Figma token mapping
├── public/
│   └── hero-sequence/        # 75-frame animation sequence
│       ├── frame-000.webp
│       ├── frame-001.webp
│       ├── ...
│       └── frame-074.webp
├── app/                      # Next.js app directory
├── components/               # React components
├── lib/                      # Utilities and helpers
├── skills/                   # AI agent skills
└── styles/                   # Global styles
```

## Design System

### Tokens

Source of truth: `design/design-tokens.json`

- **Colors**: Brand, surface, text, border, status
- **Typography**: Display, body, mono fonts
- **Spacing**: 8px base grid
- **Layout**: Container sizes, grid system
- **Radius**: Border radius scale
- **Shadows**: Elevation system
- **Motion**: Duration and easing values
- **Breakpoints**: Responsive breakpoints

### CSS Variables

Available in `design/tokens.css`:

```css
:root {
  --color-brand-primary: #0B1F3A;
  --color-brand-secondary: #CFC3B3;
  --font-display: 'Cormorant Garamond', serif;
  --font-body: 'Inter', sans-serif;
  /* ... */
}
```

### Tailwind

Custom theme available in `design/tailwind.config.js`:

```js
// Usage in components
<div className="bg-brand-primary text-text-primary font-display">
```

## Hero Sequence

### Location

`public/hero-sequence/`

### Format

- **Frames**: 75 WebP images
- **Naming**: `frame-000.webp` to `frame-074.webp`
- **Sequence**: Chronological order

### Animation

- **Trigger**: Scroll position
- **Behavior**: Pinned section with scrubbed timeline
- **Tool**: GSAP ScrollTrigger
- **Performance**: 60fps target

## Animation Architecture

### Tool Selection

- **Motion**: React/UI animation, gestures, layout
- **GSAP + ScrollTrigger**: Cinematic hero, complex timelines
- **Lenis**: Smooth scrolling where justified

### Principles

1. Motion must have purpose
2. Respect `prefers-reduced-motion`
3. Optimize for performance
4. Mobile fallbacks for complex animations

## Development

### Code Style

- Follow existing patterns
- Use design tokens
- Component-based architecture
- TypeScript preferred

### Testing

- Visual QA at multiple breakpoints
- Accessibility testing
- Performance monitoring
- Console error checking

## Accessibility

- `prefers-reduced-motion` support
- Keyboard navigation
- Screen reader friendly
- Focus states visible
- Contrast ratios maintained

## Performance

- Optimized image sequences
- 60fps animation target
- Core Web Vitals optimization
- Lazy loading where appropriate

## License

Private project - All rights reserved.
