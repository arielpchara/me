# AGENTS.md — Design & Development Contract

This file defines the conventions, design system, and rules for AI-assisted work on this project. Follow these instructions strictly.

---

## Stack

React + TypeScript + React Router (`react-router-dom`), built with Vite and prerendered to static HTML. No test suite.

```bash
npm run dev      # dev server at http://localhost:4173
npm run build    # type-check, build, prerender every route into dist/
npm run preview  # serve dist/ at http://localhost:4173
```

Pushing to `main` builds the site and deploys `dist/` to GitHub Pages (`.github/workflows/deploy.yml`).

---

## Project Structure

```
me/
├── content/
│   ├── posts/<file>.md          # Blog posts
│   ├── profile.md               # Profile: data in frontmatter, About text in the body
│   └── site.md                  # Site-wide data in frontmatter (footer tags)
├── public/                      # Copied as is: CNAME, resumes, post images, old-URL redirects
├── scripts/prerender.mjs        # Writes one HTML file per route
├── src/
│   ├── app/                     # App routes, client and server entries, page titles
│   ├── assets/                  # Images imported by components
│   ├── styles/global.css        # The single stylesheet
│   ├── modules/
│   │   ├── blog/                # components/ data/ pages/ types.ts
│   │   └── profile/             # components/ data/ pages/ types.ts
│   └── shared/
│       ├── components/          # layout/ (Header, Footer, Layout, ThemeSwitch), markdown/ (Markdown)
│       ├── data/                # site (footer tags)
│       ├── hooks/               # useHeroMorph, useTheme
│       ├── lib/                 # analytics
│       └── pages/               # NotFoundPage
└── AGENTS.md
```

### Rules
- A feature belongs to a module: `src/modules/<module>/{pages,components,hooks,data}`, with `types.ts` beside them. Group by type inside the module.
- Only code used by more than one module goes in `src/shared`, grouped by type. Modules never import from each other.
- Import across folders with the `@/` alias; use relative imports inside a module.
- Content lives in Markdown under `content/`, never in components.
- One function component per file, as a named export. No default exports.
- Tests are out of scope for this project.

---

## Content

Posts are Markdown with YAML frontmatter, typed by `PostAttributes` in `src/modules/blog/types.ts`:

```markdown
---
title: Post Title
slug: post-slug
tags:
  - JavaScript
excerpt: Short excerpt for the blog listing.
order: 9
---

Article body…
```

Optional fields: `pageTitle`, `cardTitle`, `listed`, `lang`, `translation`, `medium`.

### Adding a post
1. Create `content/posts/<post-slug>.md`. Write in English unless it is a translation.
2. Set `slug` to the URL path, and `order` to one above the current highest (the listing is highest first).
3. Put images in `public/posts/<post-slug>/` and reference them as `/posts/<post-slug>/name.png`.

Routes, the listing, titles and prerendering all pick the post up from its frontmatter. Nothing else needs changing.

### Inside a post
Rendered by `shared/components/markdown/Markdown.tsx`, which maps Markdown onto the post styles:
- Section headings → `###` (sub-sections → `####`), sections separated by `---`.
- Lists, tables and blockquotes → plain Markdown; they get their classes automatically.
- Code → fenced blocks with a language. Highlighting is limited to `bash`, `javascript`, `json` and `typescript`; register more in `Markdown.tsx` only when a post needs one.
- Links to other pages use absolute paths with a trailing slash: `/post-slug/`.
- Raw HTML is allowed for what Markdown can't express:
  - Closing line → `<p class="post-closing">…</p>`
  - Diagrams → `<pre class="post-pyramid"><code>…</code></pre>`
  - Images with captions → `<figure class="post-figure"><img …><figcaption>…</figcaption></figure>`

---

## Design Theme

Two themes, dark and light, in the charcoal, tan, taupe and marsala palette. Dark is deep charcoal, never black; light is a soft taupe white. Both have gradients on a fixed background layer, a tan primary and a marsala accent. Boxless: sections are separated by space and hairlines, not rounded cards.

### Themes
- Dark tokens are on `:root`; light tokens override them in `:root[data-theme='light']`, both in `src/styles/global.css`. A new color token needs a value in both.
- A script in the root `index.html` sets `data-theme` on `<html>` before the first paint: the saved choice (`localStorage` key `theme`), else the system's `prefers-color-scheme`, else dark.
- `useTheme` reads and sets it; `ThemeSwitch` (in the header menu) is `[moon] [switch] [sun]`, a `role="switch"` button that is on for light. On phones ≤400px the moon and sun hide in the bar.
- Code blocks stay dark in every theme.
- Light-theme text colors must keep at least 4.5:1 contrast against the light background.

All design tokens (color, gradient, space, layout, type) are custom properties on `:root` in `src/styles/global.css`. **Never** use raw color values outside `:root`; always reference a token.

### Typography
- **Inter** for all text. **JetBrains Mono** only for `<code>` and `<pre>`.
- Fonts and Remix Icon load from the links in the root `index.html`.

---

## Header

`shared/components/layout/Header.tsx` has two variants, chosen by the route's `Layout`:

- **`hero`** (blog and profile): name on the left, bordered circular picture centered in the right half, 60% of the viewport tall, menu centered below it. On phones (≤768px) it stacks: picture centered on top, then role, name and subtitle as a box centered on the page with its text aligned left.
- **`compact`** (posts and 404): sticky translucent bar with avatar, `[name] [role]` on the first line (role in the accent color at half the name's size, on the same baseline), subtitle below, and menu. On phones the role takes the second line instead of the subtitle.

`useHeroMorph` drives the hero on scroll by setting CSS variables, and CSS does the rest (`header.header--live` in `global.css`):
- `--p` runs from 0 (hero) to 1 (bar); the hook measures both ends from the real CSS.
- The name, role and subtitle travel into the bar in view. The subtitle dips out only while its line break switches.
- The morph ends (`--p` = 1) when the page content sits `--bar-gap` (3rem) below the bar, the same gap post pages have.
- The picture fades and leaves upward at 1.5× scroll speed, the menu moves up and fades, then returns in the bar.
- The page below sits at 60% opacity while the hero is fully visible, clearing to 100% in the bar.
- A click on the hero's menu scrolls until the hero is gone and the bar is on, including on the current page's link (`hideHero` in the location state).
- Scroll snap: 50ms after the last scroll movement, a half-morphed hero finishes in the reader's direction at their speed. Any new input stops it.

The hook owns the header's morph classes and inline variables, so React must not render them. Programmatic scrolling must pass `behavior: 'instant'`, because `html` sets `scroll-behavior: smooth`.

---

## What NOT to Do

- **No inline `style` props** — all styling goes in `global.css`. The only inline values are the CSS variables set by `useHeroMorph`.
- **No new stylesheets or CSS-in-JS.**
- **No other fonts** besides Inter and JetBrains Mono.
- **No other inline scripts** besides the theme script in `index.html`.
- **No external scripts** beyond Google Fonts, Remix Icon and the existing Google Analytics (`shared/lib/analytics.ts`, production only, not on localhost).
- **Do not put `clip-path`, `filter` or `opacity` on `header`**: they stop its `backdrop-filter` from blurring the page behind the bar.
- **Do not rename CSS classes** without updating `global.css` and any raw HTML in `content/`.
- **No `!important`** except inside the `prefers-reduced-motion` block.
- **No browser-only APIs during render** — every page is rendered in Node at build time. Use effects.
