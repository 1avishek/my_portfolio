# Building and Maintaining My Portfolio Website

*A practical learning guide to the architecture, frontend, contact form, SEO, Google tools, deployment, and future expansion of the project.*

## 1. Document purpose

This guide explains the portfolio as it exists in this repository. It is written for the owner of the site: someone who used Codex heavily while building it and now wants to understand, maintain, and extend the result independently.

After working through the guide, you should understand:

- how the website was planned and why it uses a minimal editorial design;
- how React, Vite, TypeScript, CSS, components, and data files work together;
- where to update personal information, projects, skills, links, and images;
- how the current direct-email contact action works;
- how metadata, Open Graph, JSON-LD, `sitemap.xml`, and `robots.txt` work;
- which Google services are part of the code and which require an external account;
- how to run, test, build, commit, and deploy changes safely;
- how to diagnose common problems; and
- how to expand the portfolio only when a real need appears.

The site does not need an admin panel. Its content changes infrequently, and the owner already controls the Git repository. Editing the small TypeScript data files is simpler, cheaper, and safer than maintaining a database, authentication system, and admin interface.

### Important current-state corrections

This guide follows the code, not older plans or comments:

- The current site has a direct `mailto:` contact link. It does **not** contain a contact form or Formspree integration.
- Google Analytics is installed with an opt-in consent component.
- Google Tag Manager is not installed. Loading Google's `gtag.js` from `googletagmanager.com` is not the same as using a GTM container.
- There is no `.env` or `.env.example` file, and the current app does not read any Vite environment variables.
- Abel is loaded from Google Fonts. Optician Sans and CodeMan38 are named in the CSS stacks, but their local font files and `@font-face` rules are absent, so fallback fonts are used.
- JRK additional-experience content is not currently visible or stored in the site data.

## 2. Project overview

The final website is a single-page personal portfolio. “Single-page” means that About, Projects, Skills, and Contact all live in one HTML document and are reached with anchor links such as `#projects`.

The visible order is:

1. sticky Header;
2. Hero;
3. About;
4. Projects;
5. Skills;
6. Contact;
7. Footer.

The site includes:

- a minimal editorial visual style;
- responsive desktop, tablet, and mobile layouts;
- black, white, off-white, grey, and mint colours;
- a personal Hero with a black-and-white photograph;
- a Bangladesh-to-Finland About story;
- a featured Bachelor’s thesis published in Theseus;
- normal editorial project rows;
- grouped skills and capabilities;
- direct email and social links;
- a favicon, Apple touch icon, and social-sharing image;
- search metadata and JSON-LD structured data;
- `robots.txt`, `sitemap.xml`, and Google Search Console verification;
- opt-in Google Analytics; and
- GitHub Actions deployment to GitHub Pages.

It deliberately does not include Three.js, a theme switcher, an admin panel, a custom backend, a client-side router, a loading screen, fake skill percentages, or a large animation library.

### Design principles

- **Content before decoration:** project evidence and clear writing carry the site.
- **Evidence before claims:** Projects appears before Skills.
- **Minimal JavaScript:** JavaScript handles React rendering, the mobile menu, and analytics consent. CSS handles layout and visual transitions.
- **Fast loading:** only the images used by the app are imported into the production bundle; optimized WebP/JPG assets are used.
- **Responsive typography:** `clamp()` allows headings to grow between sensible minimum and maximum sizes.
- **Reusable components:** repeated behaviour such as social links and project rows is implemented once.
- **Central content:** projects, skills, personal links, and key Hero text are kept in `src/data`.
- **Low maintenance:** content updates do not require a backend or layout rewrite.

## 3. How the design was planned

The original layout was planned in draw.io before implementation. No `.drawio` file is stored in this repository, so the guide can document the planning decision but cannot inspect the original diagram.

The plan established the main sections before coding. This avoided creating components first and trying to find a purpose for them later.

Important decisions included:

- no Home link, because the avatar already returns to the top and the Hero is the homepage;
- a circular 3D-style avatar in the Header and favicon;
- a black-and-white personal photograph on the left of the Hero;
- a Bangladesh-to-Finland illustration supporting the About story;
- editorial project rows instead of repeated generic cards;
- the Bachelor’s thesis as the first, featured case study;
- grouped skill labels without percentages or proficiency ratings; and
- a strong dark Contact section as the final call to action.

Planning first helped prevent random components, duplicated text, inconsistent typography, overcrowded skill cards, unnecessary animations, repeated large images, and performance-heavy visual experiments.

## 4. Technology stack

The installed packages are defined in `package.json`. The current application stack is intentionally small.

### Production dependencies

| Technology | Installed role |
|---|---|
| React 19 | Builds the component-based user interface. |
| React DOM 19 | Mounts React into the browser DOM. |
| React Icons 5 | Supplies LinkedIn, GitHub, and Instagram icons. |

### Development dependencies

| Technology | Installed role |
|---|---|
| Vite 8 | Development server and production bundler. |
| TypeScript 6 | Type checking for `.ts` and `.tsx` files. |
| `@vitejs/plugin-react` | Connects React to Vite and Fast Refresh. |
| ESLint and TypeScript ESLint | Find likely code-quality problems. |
| React Hooks/Refresh ESLint plugins | Check React-specific rules. |
| React/Node type packages | Supply TypeScript definitions. |

There is no Formspree React package, Tailwind CSS, Motion, Three.js, React Router, Google Analytics package, or state-management library.

### React

React divides the page into components. A component is a function that returns JSX, which looks like HTML but can use JavaScript values.

For example, `src/sections/Contact.tsx` reads the email address from `site`:

```tsx
<a className="contact-strip" href={`mailto:${site.email}`}>
  Get in touch
</a>
```

React is suitable here because the page has repeated data-driven structures, a mobile dialog, and an analytics consent state. It also keeps each section understandable without placing the whole site in one file.

### Vite

Vite provides:

- a fast local development server;
- Fast Refresh when a component changes;
- TypeScript and React asset processing;
- hashed production filenames for imported CSS, JavaScript, and images; and
- the final `dist/` production directory.

The commands are:

```bash
npm run dev      # local development server
npm run build    # TypeScript check and optimized production build
npm run preview  # serve dist/ locally for final checking
```

`npm run dev` is convenient for editing. `npm run build` proves the production bundle can be created. `npm run preview` displays that production bundle rather than the development version.

### TypeScript

TypeScript is JavaScript with static type checking. It catches some mistakes before the browser runs the code.

The project defines a `Project` type in `src/data/projects.ts`:

```ts
export type Project = {
  title: string
  category: string
  description: string
  technologies: string[]
  publicationUrl?: string
  publicationLabel?: string
  publicationAriaLabel?: string
  github?: string
  live?: string
}
```

The `?` means a field is optional. A project can therefore omit `live` without inventing a demo link, while the thesis can provide a separate publication link. Plain JavaScript would allow any shape and might only reveal a mistake while the site is running.

### CSS

The project uses ordinary CSS split by responsibility:

- `src/styles/tokens.css`: colours, fonts, container width, and header height;
- `src/styles/global.css`: resets, body rules, focus, shared containers, headings, and reduced motion;
- `src/styles/sections.css`: Header, Hero, About, Projects, Skills, Contact, Footer, and analytics consent;
- `src/styles/responsive.css`: width- and height-based media queries.

CSS Grid creates the main columns. Flexbox handles rows of links and tags. CSS transitions provide the small underline and arrow effects.

### React Icons

`src/components/SocialLinks.tsx` imports three brand icons from `react-icons/fa6`. Icon-only links receive `aria-label` text so a screen reader can announce “LinkedIn” instead of an unexplained graphic.

### Contact service: current reality

Formspree is **not currently implemented**. The Contact CTA opens the visitor’s email application through `mailto:`. There are no form fields, submission states, Formspree endpoint, or environment variable in the current code.

This is a valid minimal choice. A static portfolio does not require a server merely to let visitors send email. Formspree remains an optional future improvement if an on-page form becomes important.

## 5. Project structure

The important current structure is:

```text
my_portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── docs/
│   └── PORTFOLIO_LEARNING_GUIDE.md
├── public/
│   ├── CNAME
│   ├── apple-touch-icon.png
│   ├── googlefa90682449b5a0e5.html
│   ├── robots.txt
│   ├── sitemap.xml
│   └── social-preview.jpg
├── src/
│   ├── assets/
│   │   ├── avatar.png
│   │   ├── avatar.webp
│   │   ├── bangladesh-finland-story.png
│   │   ├── bangladesh-finland-story.webp
│   │   └── home-profile.jpg
│   ├── components/
│   │   ├── AnalyticsConsent.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── ProjectRow.tsx
│   │   ├── SectionHeading.tsx
│   │   └── SocialLinks.tsx
│   ├── data/
│   │   ├── projects.ts
│   │   ├── site.ts
│   │   └── skills.ts
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── styles/
│   │   ├── global.css
│   │   ├── responsive.css
│   │   ├── sections.css
│   │   └── tokens.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.app.json
└── vite.config.ts
```

### Folder responsibilities

- `src/assets/` contains source-controlled images imported by TypeScript or referenced by `index.html`. Imported assets are fingerprinted by Vite.
- `src/components/` contains reusable or supporting UI units.
- `src/data/` contains central personal, project, navigation, media, and skill data.
- `src/sections/` contains the five main page sections.
- `src/styles/` contains the visual system.
- `public/` contains files that Vite copies to the root of `dist/` without hashing.
- `.github/workflows/` contains deployment automation.

### Important files

- `src/main.tsx`: imports CSS and mounts React.
- `src/App.tsx`: defines the page order.
- `src/components/Header.tsx`: sticky header, avatar, desktop navigation, and menu state.
- `src/components/MobileMenu.tsx`: native dialog and mobile links.
- `src/sections/Hero.tsx`: portrait, only `<h1>`, summary, and Contact CTA.
- `src/sections/About.tsx`: About copy and journey image.
- `src/sections/Projects.tsx`: maps project data into rows.
- `src/components/ProjectRow.tsx`: renders standard projects and the featured case study.
- `src/sections/Skills.tsx`: maps skill groups into editorial rows.
- `src/sections/Contact.tsx`: direct email CTA.
- `src/components/AnalyticsConsent.tsx`: stores consent and conditionally loads Google Analytics.
- `src/components/Footer.tsx`: identity, social links, analytics settings, year, and scroll-to-top link.
- `src/data/site.ts`: name, headline, availability, email, Analytics ID, social URLs, navigation, and media imports.
- `src/data/projects.ts`: project type and all project content.
- `src/data/skills.ts`: skill-group type and labels.
- `index.html`: metadata, fonts, icons, Open Graph, Twitter card, and JSON-LD.
- `.github/workflows/deploy.yml`: GitHub Pages build and deployment.

## 6. How React renders the website

The loading sequence is:

1. The browser requests `index.html`.
2. `index.html` provides metadata, an empty `<div id="root">`, and the entry module `/src/main.tsx`.
3. Vite serves or bundles `main.tsx` and its imports.
4. `main.tsx` finds the `root` DOM element and calls `createRoot(...).render(...)`.
5. React renders `App`.
6. `App.tsx` composes Header, Hero, About, Projects, Skills, Contact, and Footer.
7. Sections and components read data imported from `src/data`.
8. The imported CSS controls layout and appearance.
9. React creates and updates the browser DOM.

### Core terms

- **Component:** a reusable React function returning UI.
- **Prop:** a value passed from a parent component to a child.
- **State:** a value that can change and cause React to render again.
- **Data file:** a module containing content rather than layout.
- **Import/export:** JavaScript syntax for sharing values between files.
- **JSX/TSX:** HTML-like syntax used inside React; TSX adds TypeScript checking.
- **DOM:** the browser’s in-memory tree of HTML elements.

`Projects.tsx` uses:

```tsx
{projects.map((project) => (
  <ProjectRow key={project.title} project={project} />
))}
```

`.map()` visits every item in the `projects` array and returns one `ProjectRow` for it. `project={project}` passes the object as a prop. `key={project.title}` gives React a stable identity for that row.

The Header uses state:

```tsx
const [menuOpen, setMenuOpen] = useState(false)
```

`menuOpen` is the current value. `setMenuOpen(true)` opens the menu; `setMenuOpen(false)` closes it. Only this interactive behaviour needs local React state.

## 7. Content and presentation separation

The project separates three concerns:

- **Content/data:** words, URLs, categories, and arrays in `src/data`.
- **Structure:** React components deciding which HTML elements appear.
- **Presentation:** CSS deciding size, colour, spacing, layout, and responsive behaviour.

For example, `src/data/projects.ts` contains “Glaucoma Screening CNN,” while `ProjectRow.tsx` decides that the title belongs in an `<h3>`, and `sections.css` decides its font size.

Benefits:

- one project can be added without rewriting the Projects section;
- project links follow the same safe external-link component logic;
- skills wrap automatically after data changes;
- social URLs remain consistent across Header, mobile menu, and Footer; and
- wording edits are less likely to damage layout code.

### Where to update content

| Content | Current location |
|---|---|
| Name | `src/data/site.ts` → `site.name` |
| Hero professional statement | `src/data/site.ts` → `site.headline` |
| Availability | `src/data/site.ts` → `site.availability` and `site.shortAvailability` |
| Email | `src/data/site.ts` → `site.email` |
| Social URLs | `src/data/site.ts` → `site.links` |
| Navigation | `src/data/site.ts` → `navigation` |
| About story and qualification | `src/sections/About.tsx` |
| Projects | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Contact supporting text | `src/sections/Contact.tsx` |
| Footer identity/availability | name and short availability come from `src/data/site.ts` |
| Page metadata | `index.html` |
| JRK additional experience | not currently present; if restored, add a small block in `src/sections/About.tsx` or centralize it in `src/data/site.ts` |

Some personal content is central, but About and Contact paragraphs are still written directly in their section components. That is acceptable at the current size. A larger content system would add complexity without a clear benefit.

## 8. Header and navigation

There is no Home navigation item because:

- the site opens at the Hero by default;
- the avatar links to `#top`; and
- a separate Home label would duplicate that behaviour.

Each internal link matches a section ID:

```ts
{ label: 'Projects', href: '#projects' }
```

```tsx
<section id="projects" ...>
```

The `#projects` fragment tells the browser to scroll to the element with `id="projects"`. `html { scroll-behavior: smooth; }` supplies native smooth scrolling, and reduced-motion CSS disables it for visitors who request less motion.

### Desktop

At widths above `56rem`, the Header displays the avatar, centred navigation, and LinkedIn/GitHub links. The links have generous clickable areas and an underline hover/focus effect.

### Mobile

At `56rem` and below, desktop navigation and header socials are hidden. A Menu button opens the native `<dialog>` in `MobileMenu.tsx` with `showModal()`.

The dialog:

- contains all internal navigation links;
- includes LinkedIn, GitHub, and Instagram labels;
- closes after a navigation choice;
- closes with its Close button or Escape (`onCancel`);
- traps focus using native dialog behaviour; and
- prevents background scrolling through `body:has(.mobile-menu[open])`.

External social links use:

```tsx
target="_blank"
rel="noopener noreferrer"
```

The first opens a new tab. The second prevents the new page from controlling the original tab and avoids sending unnecessary referrer information.

## 9. Hero section

The desktop Hero is a two-column CSS Grid:

- left: the personal photograph;
- right: black typography panel.

It contains the only page-level `<h1>`, which identifies the person. Supporting text explains the work without repeating the full About story. The “Let’s talk” link points to `#contact`.

The Hero image is rendered with:

```tsx
<img
  src={media.homeProfile}
  width="900"
  height="1100"
  loading="eager"
  decoding="async"
  fetchPriority="high"
  alt="Black-and-white portrait of Avishek Kuri Ananda"
/>
```

- `loading="eager"` loads it immediately because it is above the fold.
- `fetchPriority="high"` tells the browser it is important.
- explicit dimensions help the browser reserve space.
- `decoding="async"` avoids blocking other rendering work.
- `alt` describes the meaningful image.
- CSS `object-fit: cover` crops without stretching.

At `56rem` and below, the Grid becomes one column. The image and black panel stack while remaining visually connected.

## 10. About section

The About section pairs narrative text with `bangladesh-finland-story.webp`. The image gives an emotional and geographic story; the HTML provides the factual meaning.

Important information should remain in HTML rather than being permanently embedded in an image because HTML can be:

- read by screen readers;
- indexed by search engines;
- translated or copied;
- resized responsively; and
- edited without regenerating artwork.

### Qualification wording

A readable public wording is:

> Bachelor of Engineering in Artificial Intelligence (Data Engineering)

The more precise interpretation used by the live site is:

- **Degree:** Bachelor of Engineering
- **Programme/field:** Artificial Intelligence (Data Engineering)
- **Institution:** Satakunta University of Applied Sciences (SAMK)

`src/sections/About.tsx` currently explains this as graduating with a Bachelor of Engineering from the Artificial Intelligence (Data Engineering) programme.

### JRK positioning

JRK additional experience is not present in the current implementation. If it is restored later, keep it as a small secondary block in About—not a new navigation section or primary professional identity. The layout can be preserved by adding concise semantic HTML inside `.about-narrative` and styling it with existing typography and borders.

To update About later, edit only the paragraphs in `src/sections/About.tsx`. Keep the section ID, heading ID, `about-layout` classes, and image component unchanged unless the layout itself needs revision.

## 11. Projects section

`src/sections/Projects.tsx` imports the `projects` array and maps every object to `ProjectRow`. The component has two render paths:

- a featured case study when `project.caseStudy` exists;
- a standard row otherwise.

### Featured published Bachelor’s thesis

The first object contains `caseStudy`, so `FeaturedCaseStudy` renders:

- “Bachelor’s thesis · Published in Theseus” label;
- title and category;
- SAMK supporting line;
- concise introduction;
- Challenge, Built, and Outcome blocks;
- technology labels;
- a “Read published thesis” action; and
- a separate “No public application demo” status.

In plain language, the thesis investigated very short Finnish spoken responses. The work covered browser audio collection, consent/session metadata, backend validation, processed storage, human review, dataset export, a Python loader, and audio-classification evaluation tooling.

The evaluation compared a specialised direct classifier with a general Whisper speech-to-text baseline. Training augmentation was tested to make the classifier more robust. The public-safe result is:

- Whisper performed best overall in the limited pilot.
- Augmentation improved the direct classifier.
- The direct classifier did not outperform Whisper.
- These limited-pilot results are not production-level proof.

The completed written thesis is publicly available in the Theseus open repository at its permanent URN:

```text
https://urn.fi/URN:NBN:fi:amk-2026071425874
```

The portfolio stores this link in the first project object as `publicationUrl` in `src/data/projects.ts`. `ProjectRow.tsx` renders the publication action only when that field exists. The URN is a permanent resolver: it can continue identifying the publication even if Theseus changes the final page address.

Publication and application access are different. The published thesis document is public; the underlying collection application is not a public demo. The portfolio must not expose the collection URL, recordings, participant metadata, private repositories, commissioner identity, credentials, database/storage details, or production infrastructure.

### Standard projects

Each normal row shows category, title, description, up to five technology labels, and whichever links exist. The component omits absent actions instead of displaying a broken button.

Current projects include Glaucoma Screening CNN, Django Chatbot, Knee Osteoarthritis Classification, Taxi Fare Prediction Pipeline, Student Advisor Reinforcement Learning, and Sherlock Holmes Semantic Search.

### Add a project

Add one object to the array in `src/data/projects.ts`:

```ts
{
  title: 'Project title',
  category: 'Backend / Data',
  description: 'One concise explanation of the work.',
  technologies: ['Python', 'FastAPI'],
  live: 'https://public-demo.example',
  github: 'https://github.com/username/repository',
}
```

Rules:

- omit `live` when there is no working public demo;
- omit `github` when the repository is private;
- use `publicationUrl` only for a public report, thesis, paper, or similar publication;
- do not place a private URL in either field;
- use no more than four or five relevant technology labels;
- verify every public link before publishing;
- use `caseStudy` only when structured Challenge/Built/Outcome detail is justified; and
- remove an unavailable link immediately rather than leaving a broken action.

## 12. Skills / capabilities section

The current categories and items in `src/data/skills.ts` are:

### AI & Machine Learning

Machine Learning, Deep Learning, PyTorch, scikit-learn, Computer Vision, OpenCV, Speech & Audio Processing, Audio Classification, Reinforcement Learning, Q-Learning, Natural Language Processing, Sentence Transformers, Vector Embeddings, Semantic Search, and Model Evaluation.

### Backend, APIs & Data

Python, FastAPI, Django, REST API Design, Pydantic, Uvicorn, SQL, PostgreSQL, SQLite, SQLAlchemy, Database Design, Authentication & Authorization, File Upload Workflows, PySpark, Pandas, NumPy, LangChain, and ChromaDB.

### Systems, Evaluation & Delivery

System Design Fundamentals, API Architecture, Service & Repository Patterns, Environment Configuration, Docker, Nginx & Reverse Proxy, HTTPS & Request Routing, Deployment Workflows, Logging & Error Handling, Monitoring Fundamentals, API Testing, Data Collection, Data Validation, Dataset Preparation, Experiment Design, Baseline Comparison, Technical Documentation, and MCP Integration Concepts.

The section avoids percentages, stars, progress bars, and beginner/intermediate/expert labels because those measurements are subjective. Projects provide stronger evidence than “85% Python.”

Some labels describe tools demonstrated in projects. Others describe methods learned through structured study and practical exercises. “Fundamentals” and “Concepts” deliberately avoid claiming expert-level professional experience.

### MCP in simple language

MCP means Model Context Protocol. It defines a controlled way for an AI application to discover and call tools or access data sources. A normal REST API defines web endpoints for general clients. MCP adds conventions that help AI clients understand available tools, their inputs, and their outputs. The portfolio correctly says “MCP Integration Concepts,” not “MCP Expert.”

To add or remove a skill, edit the relevant `skills` array in `src/data/skills.ts`. Keep labels concise, avoid duplicates between categories, then check wrapping at phone and desktop widths.

## 13. Contact method

The current site has one contact method in the Contact section:

```text
mailto:avishekkuriananda@gmail.com
```

Clicking “Get in touch” asks the browser or operating system to open the visitor’s configured email application. It does not automatically send a message. If the visitor has no default mail application, the action may appear to do nothing or may ask them to choose an application.

The Footer provides social links, but it does not repeat the email address.

### Formspree status

Formspree is not installed or connected. Therefore the following do not currently exist:

- Name, Email, and Message form fields;
- browser form validation;
- a Formspree POST endpoint;
- loading, success, or error states;
- `VITE_FORMSPREE_FORM_ID`;
- `.env.example`; or
- a receiving-email setting in this repository.

If an on-page form is required later, Formspree can avoid building a custom email backend. The minimal reconnection process would be:

1. Create or reopen a Formspree form externally.
2. Verify the receiving address in the Formspree dashboard.
3. Add `VITE_FORMSPREE_FORM_ID=...` to a local `.env.local`.
4. Add a placeholder to a committed `.env.example`.
5. Implement an accessible form that reads `import.meta.env.VITE_FORMSPREE_FORM_ID`.
6. Handle required fields, pending state, success, and readable errors.
7. Configure the same environment variable in the deployment environment.
8. Test locally and on the deployed site.

Do this only when visitors genuinely need an embedded form. The current `mailto:` solution has less code and no third-party submission dependency.

## 14. Environment variables

An environment variable is configuration supplied outside normal source code. It lets the same build use different values in different environments.

Vite exposes client variables only when their names begin with `VITE_`:

```ts
const formId = import.meta.env.VITE_FORMSPREE_FORM_ID
```

Anything exposed this way becomes readable in the browser bundle. It must not contain a private server key.

Common files are:

- `.env`: local values, normally ignored;
- `.env.local`: machine-specific local values, ignored by this repository’s `*.local` rule;
- `.env.example`: committed placeholders without real credentials.

The current repository contains none of these files and does not call `import.meta.env`. The Google Analytics measurement ID is stored directly as `site.googleAnalyticsId` in `src/data/site.ts`. Measurement IDs are public identifiers, not backend secrets.

After changing a Vite environment variable, restart `npm run dev`; Vite reads environment files when the server starts.

### Future Formspree troubleshooting

If a future form does not send:

- confirm the variable exists and begins with `VITE_`;
- restart the development server;
- confirm the deployed environment also has the value;
- confirm the Formspree receiving email is verified;
- inspect the browser Network and Console panels;
- verify the request uses the correct form ID; and
- remember that a local `.env.local` is not automatically uploaded to GitHub Pages.

## 15. Images and assets

### Images used by the built site

| File | Purpose | Verified information |
|---|---|---|
| `src/assets/avatar.webp` | Header avatar and WebP favicon source | about 79 KB; imported by `site.ts` and referenced by `index.html` |
| `src/assets/home-profile.jpg` | Hero photograph | 1200 × 1200, about 118 KB |
| `src/assets/bangladesh-finland-story.webp` | About illustration | about 282 KB; lazy-loaded |
| `public/social-preview.jpg` | Open Graph/Twitter sharing image | 1200 × 630, about 103 KB |
| `public/apple-touch-icon.png` | Apple home-screen icon | 180 × 180, about 51 KB |

### Source backups not imported by the app

- `src/assets/avatar.png`: 1254 × 1254, about 1.63 MB.
- `src/assets/bangladesh-finland-story.png`: 972 × 1619, about 2.85 MB.

The PNG originals remain useful as source assets, but exact imports in `src/data/site.ts` ensure the production bundle uses the smaller WebP versions.

### File formats

- **PNG:** lossless and supports transparency; often larger.
- **JPG:** efficient for photographs; does not support transparency.
- **WebP:** modern compression for photos and graphics; usually much smaller than PNG.

Compression reduces download size. Aspect ratio is the width-to-height relationship. CSS `object-fit: cover` preserves proportions while cropping excess edges.

The Hero uses eager loading because it is immediately visible. About uses lazy loading because it is below the fold. The social image lives in `public/` because metadata needs a stable root URL. Imported UI images live in `src/assets/` so Vite can hash and optimize their references.

### Replace images safely

1. Keep the same filename when possible, or update the exact import in `src/data/site.ts`.
2. Preserve an appropriate aspect ratio.
3. Compress the file before committing it.
4. Confirm the component’s `width`, `height`, and `alt` remain accurate enough.
5. Run `npm run build`.
6. Inspect the production page at phone and desktop widths.

Replacing `public/social-preview.jpg` should preserve 1200 × 630. Replacing the Apple icon should preserve 180 × 180. Do not overwrite the Hero image merely to update the link preview; they serve different compositions.

## 16. Typography

The CSS defines three font roles in `src/styles/tokens.css`:

```css
--font-display: 'Optician Sans', 'Arial Narrow', 'Helvetica Neue', sans-serif;
--font-body: 'Abel', 'Helvetica Neue', Arial, sans-serif;
--font-accent: 'CodeMan38', 'Courier New', monospace;
```

### What is actually loaded

- Abel is loaded from Google Fonts in `index.html` and is the body/interface font.
- Optician Sans is not stored locally and has no `@font-face`, so the browser uses Arial Narrow, Helvetica Neue, or another sans-serif fallback.
- CodeMan38 is also absent and has no `@font-face`, so the browser normally uses Courier New or another monospace fallback.

The display stack is used for the Hero name, large section headings, project titles, contact heading, and some Footer text. Abel is used for body copy and navigation. The accent stack is used for small labels and the Contact strip.

`font-display: swap` would belong inside a future `@font-face` rule. It shows fallback text immediately while a font downloads. Google’s Abel stylesheet is requested with `display=swap`.

Too many font files add network requests and slow the first render. Add local fonts only when the real licensed WOFF2 files are available. Both the file and a correct `@font-face` declaration are required; merely naming the font in a stack does not load it.

## 17. Responsive design

Responsive design means the same content adapts to different screen sizes. This project is mainly desktop-first: section layouts are defined first for large screens, then simplified with `max-width` media queries.

Important breakpoints are:

- `70rem`: adjusts Hero proportions and stacks case-study detail;
- `56rem`: switches to mobile navigation, one-column Hero/About, and stacked skill rows;
- `40rem`: reduces container gutters and typography for phones;
- height queries: compact Hero, Contact, and Footer spacing on shorter laptop/mobile screens.

Example:

```css
.about-layout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (max-width: 56rem) {
  .about-layout {
    grid-template-columns: 1fr;
  }
}
```

The site uses:

- CSS Grid for page columns;
- Flexbox for link and tag rows;
- `clamp()` for fluid font sizes and spacing;
- `minmax(0, 1fr)` to prevent Grid content from forcing overflow;
- `flex-wrap: wrap` for skills and technologies;
- `max-width: 100%` for images;
- comfortable touch targets around 44 pixels; and
- `overflow-x: hidden` as an additional body safeguard.

### Test responsive behaviour

In Chrome:

1. Run `npm run dev`.
2. Open the local URL.
3. Open Developer Tools (`F12`).
4. Select the device toolbar.
5. Test custom widths of 320, 375, 768, 1024, and a desktop width such as 1440 pixels.
6. Check Header/menu, Hero text, About image, project links, skill wrapping, Contact CTA, analytics banner, and Footer.
7. Confirm there is no horizontal scrollbar or clipped text.

## 18. Accessibility

Accessibility means building the site so people with different devices and abilities can use it.

The current implementation includes:

- semantic `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>` elements;
- one main `<h1>` in the Hero;
- section headings connected through `aria-labelledby`;
- a skip-to-content link for keyboard users;
- descriptive alt text for the Hero and About images;
- `aria-label` text on icon-only links and buttons;
- visible mint focus outlines using `:focus-visible`;
- a native keyboard-accessible `<dialog>` for mobile navigation;
- labelled navigation regions;
- external-link text or accessible names;
- reduced-motion handling;
- strong black/white contrast; and
- touch targets generally at least `2.75rem` high or wide.

The skip link is visually hidden above the screen until it receives keyboard focus. It lets a keyboard or screen-reader user bypass repeated Header links and jump directly to `#main-content`.

The avatar image has `alt=""` because its link already has the accessible name “Scroll to the top.” Repeating both descriptions would be noisy.

Accessibility helps keyboard users, screen-reader users, people using zoom, mobile users, and people with motion sensitivity. Clear semantic structure can also help search engines understand the page, but accessibility should be treated as a user requirement—not merely an SEO technique.

### Current limitation

There is no contact form, so there are no form labels to audit. If a form is added later, every field needs a visible `<label>`, clear required/error information, and keyboard-friendly status updates.

## 19. SEO basics

SEO means search engine optimization: making a public page understandable, crawlable, useful, and technically reliable. SEO metadata helps Google interpret the page, but it cannot guarantee a ranking.

The current metadata is in `index.html`:

- page title: “Avishek Kuri Ananda | Bachelor of Engineering”;
- meta description describing the SAMK programme and work areas;
- responsive viewport tag;
- canonical URL `https://avishekananda.is-a.dev/`;
- WebP favicon and Apple touch icon;
- Open Graph title, description, URL, image, type, dimensions, and alt text;
- Twitter large-image card metadata;
- `ProfilePage` and `Person` JSON-LD;
- theme colour.

Other crawl files are:

- `public/sitemap.xml`;
- `public/robots.txt`;
- `public/googlefa90682449b5a0e5.html`.

Search engines also use visible content, links from other public sites, page quality, performance, mobile usability, and their own stored history. Indexing may take days or weeks after a change. Old LinkedIn, Facebook, university, or other public profiles can continue influencing search results until they are updated and recrawled.

Use the full name consistently across the portfolio and public profiles. Consistency helps search systems connect those sources to the same person.

## 20. Google Tools and Properties Used with the Portfolio

Some items below are Google products; others are general web standards.

| Item | Google product? | Current repository status |
|---|---|---|
| Google Fonts | Yes | Abel is loaded. |
| Google Search | Yes | The deployed public page is crawlable. |
| Google Search Console | Yes | Verification HTML file exists; external dashboard settings are not stored in Git. |
| Google Lighthouse | Yes | Available through Chrome; not part of the source code. |
| PageSpeed Insights | Yes | External test; not part of the source code. |
| Google Analytics | Yes | Implemented with opt-in consent and measurement ID `G-BMN58BKD61`. |
| Google Tag Manager | Yes | Not installed; there is no `GTM-...` container. |
| `sitemap.xml` | No, open web protocol | Present. |
| `robots.txt` | No, web crawler convention | Present. |
| Open Graph | No, originally introduced by Facebook/Meta | Present. |
| Schema.org/JSON-LD | General standards/ecosystem | Present. |

### 20.1 Google Fonts

Google Fonts hosts font files and CSS. `index.html` uses two `preconnect` links before requesting Abel:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Abel&display=swap"
  rel="stylesheet"
/>
```

Preconnect lets the browser prepare the network connection early. `display=swap` shows a fallback immediately and replaces it when Abel arrives. Loading an external font adds a network request and shares the visitor’s connection with Google’s font servers.

To replace Abel, change both the `<link>` in `index.html` and `--font-body` in `src/styles/tokens.css`. Test line wrapping because different fonts have different character widths.

### 20.2 Google Search

Google discovers pages through crawling public links, sitemaps, and known URLs. A development address such as `http://localhost:5173` exists only on your computer and cannot appear in public search. A private GitHub repository also cannot be crawled.

The deployed URL is public:

```text
https://avishekananda.is-a.dev/
```

You can check whether Google knows pages on a domain with:

```text
site:avishekananda.is-a.dev
```

This is a useful check, but it is not a complete or exact index report. Search Console is more reliable for the verified owner.

### 20.3 Google Search Console

Search Console is an external Google service, not a React component. It can:

- verify site ownership;
- inspect a URL and show indexing status;
- test the live URL;
- request indexing after an important change;
- accept and monitor a sitemap;
- show search queries, impressions, clicks, and average positions; and
- report some crawl, mobile, and indexing problems.

The repository contains `public/googlefa90682449b5a0e5.html`, which is an HTML-file verification method. Its presence proves that the verification file is deployed; the current property permissions and dashboard status must still be checked in Search Console itself.

Basic workflow:

1. Open Google Search Console.
2. Select or add the final domain/URL-prefix property.
3. Complete ownership verification.
4. Inspect `https://avishekananda.is-a.dev/`.
5. Use “Test live URL” when diagnosing access.
6. Request indexing after an important public content or metadata change.
7. Submit `sitemap.xml` in the Sitemaps report.
8. Revisit Indexing and Performance reports later.

Common verification methods are DNS records, an HTML file, an HTML meta tag, or an eligible connected Google Analytics property. DNS verification is managed with the domain/DNS provider, not in React.

Do not repeatedly request indexing. A successful request is only a signal; Google decides when to crawl and update results.

### 20.4 `sitemap.xml`

`public/sitemap.xml` currently contains one absolute canonical URL:

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://avishekananda.is-a.dev/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

One URL is correct because this is one indexable page; `#about` and other fragments are positions inside the same document, not separate pages. Vite copies the file from `public/` to `dist/sitemap.xml` during a build.

A sitemap helps discovery but does not guarantee indexing. Google ignores `changefreq` and `priority`, though they do not make this sitemap invalid. If real case-study pages are added later, list their canonical URLs and keep the final domain accurate.

### 20.5 `robots.txt`

`public/robots.txt` contains:

```text
User-agent: *
Allow: /

Sitemap: https://avishekananda.is-a.dev/sitemap.xml
```

This permits crawlers to access the site and advertises the sitemap location. `Disallow` asks compliant crawlers not to visit a path. A `noindex` directive tells a search engine not to index a page; it is a different concept.

Do not accidentally add:

```text
Disallow: /
```

or this page metadata:

```html
<meta name="robots" content="noindex" />
```

Either could prevent or undermine public discovery.

### 20.6 Google Lighthouse

Lighthouse is a Google-developed auditing tool available in Chrome DevTools. It reports on:

- Performance;
- Accessibility;
- Best Practices; and
- SEO.

To run it:

1. Open the deployed site in Chrome.
2. Open Developer Tools.
3. Select Lighthouse.
4. Choose mobile or desktop.
5. Run the analysis in a clean/incognito session when possible.

Important metrics include:

- **Largest Contentful Paint (LCP):** when the main visible content finishes appearing.
- **Cumulative Layout Shift (CLS):** unexpected movement while loading.
- **Interaction to Next Paint (INP):** responsiveness after user interaction.
- **Total Blocking Time (TBT):** lab estimate of time the main thread is blocked.

This site already helps those metrics with optimized images, explicit image dimensions, limited JavaScript, no heavy animation framework, exact asset imports, and a small font setup.

### 20.7 Google PageSpeed Insights

PageSpeed Insights is a web service that tests a deployed public URL. It provides mobile and desktop lab tests and, when enough real traffic exists, field data from real Chrome users.

A score is diagnostic guidance, not the sole measurement of quality. Test more than once, inspect individual findings, and prioritize real user problems over chasing a perfect number.

### 20.8 Google Analytics

Google Analytics **is currently installed** without an npm package. `src/components/AnalyticsConsent.tsx` creates the `gtag` function and loads Google’s script only after acceptance.

The flow is:

1. `Footer.tsx` renders `AnalyticsConsent`.
2. The component reads `analytics-consent` from `localStorage`.
3. No analytics script loads while the choice is pending or rejected.
4. Accepting stores `accepted` and loads `gtag.js` for `site.googleAnalyticsId`.
5. Rejecting stores `rejected`; if Analytics was active, consent is denied, known `_ga` cookies are cleared, and the page reloads.
6. The Footer’s “Analytics” button allows the visitor to reopen the choice.

Analytics can provide visitor counts, traffic sources, devices, locations at an approximate level, and configured events. The Google Analytics property itself is external and must remain available under the owner’s Google account.

Privacy and consent requirements depend on configuration and jurisdiction. The current implementation defaults advertising storage and personalization to denied. A small portfolio does not strictly require Analytics; Search Console may be enough for search visibility. If Analytics produces no useful decisions, removing it is simpler than maintaining tracking.

### 20.9 Google Tag Manager

Google Tag Manager is not installed. There is no `GTM-...` container ID or GTM initialization snippet.

The Analytics script URL contains `googletagmanager.com`, but it loads `gtag.js` directly for the `G-...` Analytics measurement ID. That does not make the project a Tag Manager implementation.

Tag Manager can centrally manage many analytics and marketing tags. That is unnecessary for this simple portfolio unless future tracking becomes significantly more complex.

## 21. Open Graph and link previews

Open Graph is not a Google product. It is metadata used by LinkedIn, WhatsApp, Facebook, Discord, Slack, and many other sharing platforms.

The important tags are:

- `og:title`: preview headline;
- `og:description`: preview summary;
- `og:image`: preview image;
- `og:url`: canonical shared URL;
- `og:type`: content type.

The current image is an absolute URL:

```html
<meta
  property="og:image"
  content="https://avishekananda.is-a.dev/social-preview.jpg"
/>
```

Absolute URLs include scheme, domain, and path. Social crawlers cannot reliably resolve a local or build-time source path.

`public/social-preview.jpg` is 1200 × 630, the common large link-card ratio. It differs from:

- the favicon, which must remain recognizable at tiny sizes;
- the avatar, which is square and circularly cropped in the Header;
- the Hero image, which is designed for an on-page column.

Social networks cache previews. After changing metadata or the image, an old card may remain until the platform recrawls the URL or its preview-debugging tool requests a refresh.

## 22. X/Twitter card metadata

The project keeps `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, and `twitter:image:alt` in `index.html`.

These tags:

- do not require an X/Twitter account;
- do not connect to a personal account;
- do not post anything; and
- only influence link-preview formatting on compatible platforms.

The selected card is `summary_large_image`. Open Graph is more important for the portfolio’s LinkedIn/WhatsApp use case, but the small Twitter metadata block costs almost nothing to maintain and reuses the same image.

## 23. Structured data / JSON-LD

JSON-LD is JSON embedded in a `<script type="application/ld+json">` block. Schema.org supplies shared vocabulary that helps search engines interpret entities and relationships.

The current shortened structure is:

```json
{
  "@type": "ProfilePage",
  "url": "https://avishekananda.is-a.dev/",
  "mainEntity": {
    "@type": "Person",
    "name": "Avishek Kuri Ananda",
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Satakunta University of Applied Sciences (SAMK)"
    },
    "sameAs": ["GitHub URL", "LinkedIn URL", "Instagram URL"],
    "knowsAbout": ["Machine learning", "Backend APIs", "Data engineering"]
  }
}
```

Fields in the real block include `name`, `url`, `image`, `alumniOf`, `sameAs`, `knowsAbout`, and `subjectOf`. The `subjectOf` creative work connects the Person to the published thesis and uses the permanent Theseus URN. The thesis URL is not placed in `sameAs`, because a publication is not another profile representing the same person. There is currently no `hasCredential` field. If added later, it must accurately describe the Bachelor of Engineering credential and should match visible wording.

`sameAs` connects the portfolio identity to public profiles. This does not prove ownership to users, guarantee a knowledge panel, or force a rich result. Structured data only gives search systems a clearer machine-readable description.

Update the JSON-LD whenever the final domain, profile links, institution wording, or public identity changes. Validate its JSON syntax after editing.

## 24. Search indexing and old information

Google may continue displaying “student” or other old wording because:

- older LinkedIn, Facebook, university, and directory pages were crawled earlier;
- Google stores previous versions until recrawling;
- a new or recently changed portfolio may not yet carry strong search signals;
- AI Overviews combine information from several sources; and
- Search Console requests do not update all Google systems immediately.

Action checklist:

- [x] Deploy the site publicly.
- [x] Connect the final domain.
- [x] Use the final domain in the canonical URL.
- [x] Use the final domain in Open Graph and JSON-LD.
- [x] Use the final domain in `sitemap.xml` and `robots.txt`.
- [x] Include a Search Console verification file.
- [ ] Confirm the external Search Console property and sitemap status in the Google dashboard.
- [ ] Request indexing after important public changes.
- [ ] Add the portfolio link to LinkedIn and the GitHub profile.
- [ ] Replace old student wording on every public profile the owner controls.
- [ ] Wait for recrawling; do not expect immediate replacement.

## 25. Building and running the project

Open PowerShell or another terminal in:

```text
C:\Users\avish\my_portfolio
```

Install exactly what the lockfile defines:

```bash
npm install
```

For automated/clean installs, the deployment workflow uses:

```bash
npm ci
```

Start development:

```bash
npm run dev
```

Vite prints a local URL, normally `http://localhost:5173/`. Press `Ctrl+C` to stop it.

Run code-quality checks:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

This runs `tsc -b` first, then `vite build`. A successful result creates `dist/`.

Preview the production build:

```bash
npm run preview
```

Development prioritizes quick editing and debugging. Production minifies files, fingerprints assets, and represents what will be deployed. Always run the production build before publishing.

## 26. Git and GitHub workflow

### Terms

- **Repository:** the project plus its version history.
- **Commit:** a named snapshot of selected changes.
- **Branch:** an independent line of work.
- **Remote:** a linked copy, here GitHub `origin`.
- **Push:** send local commits to the remote.
- **Pull:** retrieve and integrate remote changes.
- **`.gitignore`:** patterns Git should not track, such as `node_modules`, `dist`, `.env`, and `*.local`.

Basic commands are:

```bash
git status
git add README.md docs/PORTFOLIO_LEARNING_GUIDE.md
git commit -m "Add portfolio learning guide"
git push
```

`git add .` stages every current change. It is convenient but risky in a mixed working tree. Prefer explicit paths after reading `git status` and `git diff`.

### Safer workflow

1. Run `git status`.
2. Pull the latest remote changes when the worktree is clean.
3. Create a branch for a significant change.
4. Edit and test locally.
5. Run `npm run lint` and `npm run build`.
6. Review `git diff`.
7. Stage only intended files.
8. Commit with a clear message.
9. Push the branch.
10. Review/merge it into `main`.
11. Watch the deployment workflow.
12. Verify the public site.

This guide creation does not commit, push, merge, or deploy anything.

## 27. Deployment

Deployment is already configured with GitHub Pages and GitHub Actions.

`.github/workflows/deploy.yml` runs when a commit reaches `main` or when manually dispatched. It:

1. checks out the repository;
2. sets up Node 24;
3. runs `npm ci`;
4. runs `npm run build`;
5. publishes `./dist` to the `gh-pages` branch with `peaceiris/actions-gh-pages@v4`.

The build output directory is `dist/`. `vite.config.ts` sets `base: './'`, so built asset URLs are relative and work on GitHub Pages.

`public/CNAME` contains `avishekananda.is-a.dev`. Vite copies it into `dist`, and GitHub Pages uses it as the custom domain. GitHub Pages supplies HTTPS after the domain is correctly configured.

To update the live site safely:

1. merge a tested change into `main`;
2. open the repository’s Actions tab;
3. confirm “Deploy to GitHub Pages” succeeds;
4. open the live domain with a normal and mobile-sized viewport; and
5. hard-refresh if a browser cache briefly shows the old build.

## 28. Domain and DNS

A platform subdomain is supplied by a hosting platform. A custom domain is a domain name configured to point at that host.

- **DNS:** the system that maps names to services.
- **CNAME record:** maps one hostname to another hostname.
- **A record:** maps a hostname to an IPv4 address.
- **HTTPS certificate:** allows encrypted `https://` connections.
- **Propagation:** the delay while DNS resolvers update cached records.

This repository proves the chosen custom hostname through `public/CNAME`, but it does not store the external DNS provider’s records. Manage those records wherever `is-a.dev` configuration is controlled.

The final domain must remain consistent in:

- `public/CNAME`;
- canonical link in `index.html`;
- `og:url`;
- absolute `og:image` and `twitter:image`;
- JSON-LD IDs, URL, and image;
- `public/sitemap.xml`;
- the sitemap line in `public/robots.txt`; and
- the Search Console property.

## 29. How to expand the site

### 29.1 Add a new project

1. Open `src/data/projects.ts`.
2. Add an object matching `Project`.
3. Include `live` only for a working public demo.
4. Include `github` only for a public repository.
5. Select four or five evidence-relevant technologies.
6. Run `npm run dev` and inspect the row.
7. Test link behaviour and mobile wrapping.
8. Run `npm run lint` and `npm run build`.
9. Review, commit, and publish through the normal workflow.

No component change is needed for a normal project.

### 29.2 Add a new skill

Open `src/data/skills.ts`, choose the closest category, and add one concise string. Do not list a tool merely because you read one article about it. Distinguish project experience, studied methods, and concept-level knowledge honestly. Keep qualifiers such as “Fundamentals” or “Concepts” where appropriate, and test tag wrapping at 320 pixels.

### 29.3 Update personal information

- Summary, availability, name, email, social links: `src/data/site.ts`.
- About story, location, and education: `src/sections/About.tsx`.
- Contact paragraph: `src/sections/Contact.tsx`.
- Search/social wording: `index.html`.

Search the full repository for the old phrase after a major identity change:

```bash
rg -n "old wording" src public index.html README.md docs
```

### 29.4 Add a CV download

This is optional. Store an optimized PDF in `public/` and add an accessible link such as “Download CV (PDF).” Keep it updated and avoid publishing a private home address, personal phone number, signatures, identification numbers, or unnecessary personal data.

Do not add the link until a public-safe CV is ready.

### 29.5 Add project detail pages

If case studies become too detailed for rows, multiple pages could use React Router or another routing solution. Each project would need a stable slug such as `/projects/taxi-fare-pipeline`, a challenge, approach, architecture, evaluation, lessons learned, and public-safe screenshots.

Routing would also require hosting fallback configuration, internal links, metadata per page, and new sitemap URLs. Confidential projects must still exclude private data and infrastructure. Do not install routing while the current one-page structure remains sufficient.

### 29.6 Add a blog or lab notes

Markdown posts could record project lessons and create more indexable material. This also creates an ongoing writing and maintenance obligation. A migration to Astro, Next.js, or a Markdown pipeline is justified only when the number of posts makes manual handling genuinely painful.

### 29.7 Analytics choices

Current choice: opt-in Google Analytics.

Future options:

- keep it when the reports guide real portfolio decisions;
- replace it with privacy-friendly analytics if simpler privacy handling matters;
- remove analytics entirely and rely on Search Console and direct feedback.

No analytics is often enough for a small personal site.

### 29.8 Add a backend

The current site does not need a custom backend. A backend becomes reasonable only for requirements such as a custom contact API, dynamic CMS, authentication, private administration, or database-backed posts.

Possible learning technologies include FastAPI, PostgreSQL, Docker, and Nginx:

```text
Browser → React frontend → API → database or email service
```

That architecture introduces security, validation, hosting, backups, monitoring, and maintenance. Add it only for a real feature—not to make a static portfolio look more technical.

### 29.9 Add an admin panel

An admin panel is unnecessary while one technical owner makes occasional updates. It becomes useful with frequent non-technical edits, several editors, many posts/projects, or database content.

Simpler intermediate choices are editing data files, Markdown, a headless CMS, or a Git-based CMS. Each should solve an observed maintenance problem before adoption.

## 30. Maintenance checklist

For every update:

- [ ] Run `git status` before editing.
- [ ] Pull the latest changes when safe.
- [ ] Edit content in the central data file where possible.
- [ ] Check every changed external link.
- [ ] Confirm images are compressed and correctly referenced.
- [ ] Test desktop and mobile layouts.
- [ ] Test Header and mobile navigation.
- [ ] Test the Contact `mailto:` action.
- [ ] Test analytics consent/settings if related code changed.
- [ ] Check the browser Console for errors.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Review metadata if identity, domain, or major content changed.
- [ ] Review `git diff`.
- [ ] Commit with a clear message.
- [ ] Push/merge through the intended branch.
- [ ] Verify the deployment workflow and live site.
- [ ] Request indexing only for important public changes.

## 31. Troubleshooting

### Site does not start

- Confirm the terminal is in `C:\Users\avish\my_portfolio`.
- Run `npm install` if `node_modules` is missing.
- Check `node --version` and `npm --version`.
- Read the first terminal error rather than only the final summary.
- If port 5173 is busy, use the alternate URL Vite prints or stop the other process.

### Build fails

- TypeScript errors usually name the file and line.
- Remove unused imports/variables when `noUnusedLocals` reports them.
- Check import filename casing; GitHub Actions runs Linux, where `Hero.tsx` and `hero.tsx` differ.
- Confirm a statically imported asset exists.
- Run `npm run lint` separately for additional clues.

### Image does not appear

- For `src/assets`, import the file from TypeScript.
- For `public`, reference it from the site root, such as `/social-preview.jpg`.
- Check exact filename casing and extension.
- Confirm the image exists in `dist/` after building.
- Remember that deleting a statically imported asset causes a build failure; the current `media` imports are not dynamic placeholders.

### Font does not load

- Abel requires access to Google Fonts.
- Optician Sans and CodeMan38 are currently fallbacks only.
- A local font needs both the actual file and an accurate `@font-face` URL.
- Check the browser Network panel for 404 or CORS errors.
- Keep fallback fonts so text remains visible.

### Contact action does not open email

- Confirm `site.email` is correct.
- Test the generated `mailto:` URL.
- Confirm the device has a default email application or browser mail handler.
- Offer the visible email address elsewhere if many visitors report difficulty.

There is no Formspree form to troubleshoot in the current site.

### Analytics does not record visits

- Accept Analytics in the consent banner.
- Confirm `analytics-consent` is `accepted` in browser local storage.
- Check that `gtag.js` loads in the Network panel.
- Confirm `site.googleAnalyticsId` matches the external GA property.
- Remember that ad blockers can block analytics.
- Check the GA Realtime report; standard reports may be delayed.

### Social preview is missing or old

- Use an absolute deployed URL for `og:image`.
- Confirm `public/social-preview.jpg` exists in `dist` and returns HTTP 200.
- Keep the final domain consistent.
- Validate 1200 × 630 dimensions.
- Ask the sharing platform to refresh its cached preview when a debugger is available.

### Google does not show the site

- Confirm the site is deployed and publicly reachable.
- Check there is no `noindex` metadata.
- Confirm `robots.txt` does not block `/`.
- Submit/monitor the sitemap in Search Console.
- Inspect and request indexing for the canonical homepage.
- Add links from LinkedIn and GitHub.
- Allow time for crawling and ranking.
- A Search Console “temporary processing error” can be Google-side when the sitemap itself returns valid XML and HTTP 200; wait and resubmit only if it persists.

### Changes do not appear after deployment

- Confirm the commit reached `main`.
- Check the GitHub Actions run.
- Confirm deployment published `dist` to `gh-pages`.
- Hard-refresh or test in a private window.
- Check whether a service worker exists (this project currently has none).
- Verify `base: './'` remains correct for GitHub Pages.
- Compare the live HTML/assets with the latest build rather than assuming the push deployed.

## 32. Glossary

| Term | Practical definition |
|---|---|
| API | A defined interface that lets software exchange data or actions. |
| Backend | Server-side code handling data, rules, storage, or external services. |
| Browser | Software such as Chrome or Safari that loads and renders the site. |
| Build | Process that checks and converts source files into deployable files. |
| Canonical URL | Preferred public URL for a page. |
| Component | Reusable React function that returns UI. |
| CSS | Language controlling layout and visual styling. |
| Deployment | Publishing a tested build to a public host. |
| DNS | System connecting domain names to hosting services. |
| DOM | Browser’s object tree representing the HTML page. |
| Environment variable | Configuration supplied outside normal source code. |
| Favicon | Small image shown in browser tabs and bookmarks. |
| Frontend | Code and interface running in the visitor’s browser. |
| Git | Version-control system tracking file history. |
| GitHub | Hosted service for Git repositories and collaboration. |
| GitHub Actions | Automated workflows triggered by repository events. |
| Google Search Console | External Google service for ownership, indexing, sitemap, and search reports. |
| HTML | Markup defining page structure and metadata. |
| HTTPS | Encrypted web connection. |
| JSON | Text format for structured data. |
| JSON-LD | JSON format for linked structured data embedded in a page. |
| Lighthouse | Google-developed browser audit for performance, accessibility, best practices, and SEO. |
| Metadata | Information describing the page to browsers, search engines, and sharing platforms. |
| MCP | Model Context Protocol for connecting AI clients to controlled tools/data interfaces. |
| Nginx | Web server and reverse proxy often placed in front of backend services. |
| Open Graph | General social-sharing metadata standard; not a Google product. |
| Prop | Value passed from one React component to another. |
| React | Library for building component-based interfaces. |
| Repository | Project files plus their Git history. |
| Responsive design | Layout that adapts across device sizes. |
| REST | Common style for resource-oriented HTTP APIs. |
| `robots.txt` | Root text file giving crawler access guidance. |
| SEO | Work that helps search engines crawl, understand, and present useful pages. |
| Sitemap | Machine-readable list of preferred indexable URLs. |
| Social-preview image | Image used in shared link cards. |
| TypeScript | JavaScript with static type checking. |
| Vite | Development server and production build tool. |
| WebP | Modern compressed image format. |

## 33. What I Should Be Able to Explain After Reading This

- [ ] I can explain how the browser loads the portfolio.
- [ ] I understand the role of React, Vite, TypeScript, and CSS.
- [ ] I know where personal information, projects, and skills are stored.
- [ ] I can add a project without rebuilding the Projects component.
- [ ] I understand that the current Contact action opens email and is not Formspree.
- [ ] I understand how the opt-in Google Analytics component works.
- [ ] I understand what Open Graph and the social-preview image do.
- [ ] I understand what Search Console, `sitemap.xml`, and `robots.txt` do.
- [ ] I understand that Open Graph is not a Google product.
- [ ] I can distinguish Google Analytics from Google Tag Manager.
- [ ] I know how to run, lint, build, preview, commit, and deploy updates.
- [ ] I know when a backend or admin panel would actually be necessary.
- [ ] I can expand the website without damaging the existing structure.

## 34. Verified configuration summary

### Currently implemented

- React/Vite/TypeScript single-page frontend.
- Ordinary modular CSS and responsive media queries.
- Data-driven projects and skills.
- Direct email CTA and social links.
- Opt-in Google Analytics consent.
- Google Fonts Abel.
- Open Graph and Twitter card metadata.
- ProfilePage/Person JSON-LD.
- Search Console HTML verification file.
- Valid `sitemap.xml` and `robots.txt`.
- GitHub Actions deployment to GitHub Pages.
- Custom domain through `public/CNAME`.

### External services requiring manual account-side setup

- Google Analytics property must match `G-BMN58BKD61` and remain accessible to the owner.
- Google Search Console property, sitemap submission, and indexing requests are managed in Google’s dashboard.
- DNS records and domain ownership are managed outside this repository.
- GitHub repository permissions and Pages/Actions settings are managed on GitHub.

### Optional improvements not installed

- Formspree or another embedded contact form service.
- Google Tag Manager.
- React Router and project detail pages.
- Blog/Markdown pipeline.
- CV download.
- Custom backend, database, CMS, or admin panel.
- Local Optician Sans and CodeMan38 font files.

### Incomplete or stale configuration/documentation found

- `.env.example` is absent because no environment variable is currently used.
- Formspree is mentioned in `AGENTS.md`, but there is no Formspree implementation.
- The main README mentions `home-profile.webp`, but the actual used file is `src/assets/home-profile.jpg`.
- The README says missing images use placeholders, but the current static imports require the three used files to exist for the build to succeed.
- The README mentions future local font files, but no `public/fonts/` directory or `@font-face` declaration currently exists.
- JRK additional-experience content is absent from the visible implementation.
- JSON-LD has no `hasCredential` property; this is not required, but documentation should not claim it exists.

These findings do not prevent the current site from building or deploying. They identify where future maintenance should follow the real code rather than older instructions.
