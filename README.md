# Avishek Kuri Ananda — Portfolio

Minimal single-page portfolio built with React, Vite, TypeScript, and ordinary CSS.

Live site: [avishekananda.is-a.dev](https://avishekananda.is-a.dev/)

## Learning Documentation

[Read the complete portfolio learning guide](docs/PORTFOLIO_LEARNING_GUIDE.md)

## Update the content

- Personal information and social links: `src/data/site.ts`
- Projects: `src/data/projects.ts`
- Skills: `src/data/skills.ts`
- Homepage portrait: `src/assets/home-profile.webp` or `src/assets/home-profile.jpg`
- Header avatar and browser icon: add `src/assets/avatar.png`
- Journey artwork: add an image whose filename contains both `bangladesh` and `finland` to `src/assets/`
- Optician Sans: add `public/fonts/optician-sans.woff2`
- CodeMan38: add `public/fonts/codeman38.woff2`

Missing images use neutral CSS/SVG placeholders, so the project still builds. The avatar is used as the favicon automatically when present.

Only add project demo or repository URLs after they are publicly reachable; omitted URLs render as unavailable instead of creating broken links.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```
