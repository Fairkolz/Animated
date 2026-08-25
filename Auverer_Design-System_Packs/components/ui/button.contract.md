# Button Component Contract

Props:
- variant
- size
- disabled
- loading
- icon
- children
- href/action

States:
- default
- hover
- focus-visible
- active
- disabled
- loading

Rules:
- use `<button>` for actions
- use `<a>` for navigation
- visible keyboard focus
- touch-friendly target
- Motion animation must respect reduced motion
- styling comes from semantic design tokens
