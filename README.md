# AVISHEK KURI ANANDA Portfolio

Modern AI-focused portfolio built with React, Vite, TypeScript, Tailwind CSS, Motion, and Three.js.

## Features

- Responsive cinematic portfolio layout
- Light and dark theme with localStorage persistence
- Project showcase with live demo and GitHub links
- Contact form prepared for Formspree
- Direct contact links for GitHub, LinkedIn, Instagram, and email
- Lightweight 3D contact robot using React Three Fiber
- GitHub Pages deployment workflow

## Contact Form Setup

The contact form uses `@formspree/react`.

In `src/components/Contact.tsx`, replace:

```ts
const formId = 'YOUR_FORM_ID'
```

with the real Formspree form ID from your Formspree dashboard. Configure that Formspree form to forward messages to:

```txt
avishekkuriananda@gmail.com
```

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Deployment

This project includes `.github/workflows/deploy.yml` for GitHub Pages.

After pushing to GitHub:

1. Open the repository settings.
2. Go to `Pages`.
3. Set source to `GitHub Actions`.
4. Run or wait for the deploy workflow.

The custom portfolio domain is:

```txt
https://avishekananda.is-a.dev/
```

Until the custom domain DNS is active, the GitHub Pages URL will usually be:

```txt
https://1avishek.github.io/my_portfolio/
```
