# AGENTS.md

## Coding Style

- Use React, Vite, TypeScript, Tailwind CSS, Motion, and Lucide React.
- Keep components typed, focused, and reusable. Shared content belongs in `src/data`.
- Prefer semantic HTML and clear component boundaries over broad abstractions.
- Keep comments rare and useful; let names and structure explain ordinary code.
- Use `src/assets/profile-art.png` sparingly as the main hero identity image; avoid repeating it across sections.
- Keep the current visual identity centered on neon pink, lime green, off-white, and cinematic dark surfaces.

## Animation Rules

- Use Motion for entrance, hover, and interactive animation.
- Keep animation subtle, smooth, and purposeful. Avoid distracting loops.
- Respect `prefers-reduced-motion`; the app uses `MotionConfig` and CSS reduction rules.
- Avoid heavy canvas/WebGL work unless there is a clear portfolio benefit.
- The scroll car is atmospheric background motion only; keep it behind content and non-interactive.

## Responsiveness Rules

- Design mobile-first, then enhance for tablets and desktops.
- Use responsive grid tracks, stable dimensions, and readable text sizes.
- Test navigation, buttons, forms, and project cards at phone, tablet, and desktop widths.
- Do not allow buttons, tags, or cards to overflow their containers.

## Accessibility Expectations

- Use semantic sections, headings, labels, alt text, and aria labels.
- Preserve keyboard access for navigation, menus, form controls, and contact/social actions.
- Maintain strong contrast on dark surfaces.
- Do not rely on color alone to communicate form or interaction state.
- Theme mode must remain keyboard-accessible, visible in the navbar, and persisted with `localStorage`.

## Component Structure

- `src/components`: UI sections and reusable visual units.
- `src/data`: project, skill, and social-link content.
- `src/hooks`: reusable browser interaction hooks.
- `src/utils`: navigation and small helpers.
- `src/assets`: local bitmap/vector assets used by the app.

## Future Development Notes

- Replace `YOUR_FORM_ID` in `Contact.tsx` with the live Formspree form ID.
- The contact email is `avishekkuriananda@gmail.com`.
- Keep the 3D robot purposeful as a contact greeting, not a standalone novelty section.
- Keep GitHub Pages deployment in sync with the repository location.
- Add project screenshots or short case-study pages when the portfolio grows.
- Do not add fake skill percentages; use grouped skill tags instead.
