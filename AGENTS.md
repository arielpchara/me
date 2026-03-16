# AGENTS.md — Design & Development Contract

This file defines the conventions, design system, and rules for AI-assisted work on this project. Follow these instructions strictly.

---

## Project Structure

```
me/
├── index.html                  # Blog listing (home page)
├── profile.html                # Profile / résumé page
├── styles.css                  # Single shared stylesheet
├── me.jpeg                     # Profile photo
├── <post-slug>/
│   └── index.html              # Individual blog post
└── AGENTS.md                   # This file
```

### Rules
- One `styles.css` for the entire site — no per-page stylesheets.
- Post directories use `kebab-case` English slugs.
- All pages share the same `<header>`, `<footer>`, and font imports.
- No build step, no bundler, no frameworks — pure HTML/CSS/JS.

---

## Design System

### Color Palette

| Token | Value | Role |
|---|---|---|
| `--color-text` | `#2e2b25` | Body text |
| `--color-text-muted` | `#6b6456` | Secondary text, excerpts |
| `--color-background` | `#F8F4E3` | Page background (cream white) |
| `--color-background-alt` | `#f0ead0` | Subtle alternate surfaces |
| `--color-background-card` | `#f4f0de` | Post cards |
| `--color-primary` | `#6B8E23` | Sage green — headings, links, tags |
| `--color-primary-dark` | `#4f6a1a` | Hover state for primary |
| `--color-accent` | `#CC7722` | Terracotta — icons, underlines, CTAs |
| `--color-accent-dark` | `#a85e17` | Hover state for accent |
| `--color-charcoal` | `#333333` | High-contrast text, post titles |
| `--color-border` | `rgba(107,100,86,0.18)` | Subtle borders |
| `--color-border-strong` | `rgba(107,142,35,0.35)` | Hover borders |

**Never** use raw hex values in HTML or CSS — always reference tokens.

### Typography

| Token | Font | Usage |
|---|---|---|
| `--font-heading` | Cinzel Decorative | Page `<h1>`, post article titles |
| `--font-sub` | Cinzel | Section h2/h3/h4, nav, tags, table headers |
| `--font-body` | Roboto Mono | All body text, code |
| `--font-detail` | Crushed | Subtitles, footer, blog intro, blockquotes, closing lines |

**Rules:**
- `h1` → `font-family: var(--font-heading)` — only for the site name and post article title
- `h2`, `h3`, `h4` → `font-family: var(--font-sub)`
- Never use JetBrains Mono — it has been replaced
- Code blocks use Roboto Mono via `--font-body` (inherited)

### Spacing Scale

Use only these tokens: `--space-1` (0.25rem), `--space-2` (0.5rem), `--space-3` (0.75rem), `--space-4` (1rem), `--space-6` (1.5rem), `--space-8` (2rem), `--space-12` (3rem), `--space-16` (4rem).

---

## Component Patterns

### Navigation
Every page has the same `<nav class="site-nav">` inside `<header>`:
- Blog link → `href="../index.html"` (or `index.html` if at root)
- Profile link → `href="../profile.html"` (or `profile.html` if at root)
- Active page gets `class="nav-link nav-link--active"`

### Post Tags
Use `<span class="post-tag">` — white text on sage green background. Keep tags short (1–2 words, Title Case).

### Post Cards (blog listing)
Structure: `post-meta` → `post-title` → `post-excerpt` → `post-read-more`.

### Blog Post Page

```html
<article class="post-article">
  <a href="../index.html" class="back-link">← Back to blog</a>
  <div class="post-article-header">
    <div class="post-meta">…tags…</div>
    <h2 class="post-article-title">…title…</h2>
  </div>
  <div class="post-content">
    …article body…
  </div>
</article>
```

**Inside `.post-content`:**
- Sections separated by `<hr>`
- Section headings → `<h3>` (sub-sections → `<h4>`)
- Unordered lists → `<ul>` with `<li>`
- Ordered lists → `<ol class="post-ol">` with `<li>`
- Tables → `<div class="post-table-wrap"><table class="post-table">…</table></div>`
- Blockquotes → `<blockquote class="post-blockquote"><p>…</p></blockquote>`
- Closing sentence → `<p class="post-closing">…</p>`
- ASCII diagrams → `<pre class="post-pyramid"><code>…</code></pre>`

### Syntax Highlighting
Use Prism.js from CDN (`prism-tomorrow` theme — dark blocks contrast well on cream background).

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css">
…
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-javascript.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-typescript.min.js"></script>
```

Load only the language components the post actually uses.

---

## Adding a New Blog Post

1. **Create directory**: `mkdir <post-slug>/`
2. **Create** `<post-slug>/index.html` — copy the structure from an existing post page.
3. **Update** `index.html` — add a new `<article class="post-card">` at the top of `.post-list` (most recent first).
4. **Font imports** — use the shared Google Fonts URL (Cinzel Decorative + Cinzel + Roboto Mono + Crushed).
5. **Relative paths** — CSS and back-link use `../` prefix.
6. **Language** — write posts in English unless the source is explicitly in another language.
7. **`<html lang="…">`** — set to `"en"` for English posts.

---

## What Not to Do

- Do not add inline `style=""` attributes.
- Do not add new CSS files or `<style>` blocks inside HTML.
- Do not use the old JetBrains Mono font.
- Do not use dark backgrounds for page content (only code blocks are dark).
- Do not change the color tokens — they define the brand.
- Do not add JavaScript beyond the year setter and Prism.js loader.
- Do not add external analytics, trackers, or third-party scripts beyond fonts, remixicon, and prism.
