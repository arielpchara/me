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

## Design Theme

**DEV.to (DEV Community) inspired** — clean, minimal, readable. High contrast text on white (light mode) or near-black (dark mode), with an indigo/blue primary and amber accent. No decorative textures, no background gradients, no pseudo-element mountains or waves.

---

## Design System

### Color Tokens

All colors are defined as CSS custom properties on `:root` and automatically switch via `@media (prefers-color-scheme: dark)`. **Never** use raw hex values in HTML or CSS — always reference tokens.

#### Light Mode

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#ffffff` | Page background |
| `--color-bg-secondary` | `#f5f5f5` | Subtle surfaces, code bg, table headers |
| `--color-bg-card` | `#ffffff` | Post cards |
| `--color-border` | `#e8e8e8` | Default borders |
| `--color-border-hover` | `#c5c5c5` | Hover-state borders |
| `--color-text` | `#0d1117` | Body text |
| `--color-text-muted` | `#525252` | Secondary text, excerpts |
| `--color-text-light` | `#737373` | Footer fine print |
| `--color-primary` | `#3b49df` | Links, active states, CTA |
| `--color-primary-hover` | `#2f3ab2` | Hover for primary |
| `--color-primary-light` | `rgba(59,73,223,0.08)` | Active nav bg, blockquote bg |
| `--color-accent` | `#f7a046` | Icons, decorative highlights |
| `--color-tag-bg` | `#f0f0f0` | Tag/skill pill background |
| `--color-tag-text` | `#525252` | Tag/skill pill text |
| `--color-shadow` | `rgba(0,0,0,0.06)` | Default shadow |
| `--color-shadow-hover` | `rgba(0,0,0,0.12)` | Hover shadow |

#### Dark Mode (auto via `prefers-color-scheme: dark`)

| Token | Value |
|---|---|
| `--color-bg` | `#0f0f0f` |
| `--color-bg-secondary` | `#1a1a1a` |
| `--color-bg-card` | `#1a1a1a` |
| `--color-border` | `#2a2a2a` |
| `--color-border-hover` | `#3d3d3d` |
| `--color-text` | `#e4e6eb` |
| `--color-text-muted` | `#a0a0a0` |
| `--color-primary` | `#7b8df8` |
| `--color-primary-hover` | `#9aaafa` |
| `--color-primary-light` | `rgba(123,141,248,0.1)` |
| `--color-tag-bg` | `#2a2a2a` |
| `--color-tag-text` | `#a0a0a0` |
| `--color-shadow` | `rgba(0,0,0,0.3)` |
| `--color-shadow-hover` | `rgba(0,0,0,0.5)` |

Dark mode is **fully automatic** — no JavaScript toggle, no data attribute, no cookie. The browser handles it via the `prefers-color-scheme` media query.

---

## Typography

| Token | Font | Usage |
|---|---|---|
| `--font-sans` | `'Inter'`, system fallbacks | All text — headings, body, nav, tags |
| `--font-mono` | `'JetBrains Mono'`, monospace fallbacks | Code blocks and inline code only |

### Rules
- **Inter** is the only display/body font. Never use Cinzel, Roboto Mono, or Crushed.
- **JetBrains Mono** is used exclusively for `<code>` and `<pre>` elements.
- Heading weights: `h1` → 700, `h2` → 700, `h3` → 700, `h4` → 600.
- Body line-height: `1.75` (base), `1.8` (post content), `1.65` (excerpts).

### Google Fonts Import (all pages)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## Component Patterns

### Navigation
Every page has `<nav class="site-nav">` inside `<header>`:
- Blog link → `href="index.html"` (root) or `href="../index.html"` (posts)
- Profile link → `href="profile.html"` (root) or `href="../profile.html"` (posts)
- Active page gets `class="nav-link nav-link--active"`

```html
<nav class="site-nav">
  <a href="index.html" class="nav-link nav-link--active">Blog</a>
  <a href="profile.html" class="nav-link">Profile</a>
</nav>
```

### Post Cards (blog listing)
Structure: `post-meta` → `post-title` → `post-excerpt` → `post-read-more`.

```html
<article class="post-card">
  <div class="post-meta">
    <span class="post-tag">JavaScript</span>
    <span class="post-tag">Async</span>
  </div>
  <h2 class="post-title"><a href="post-slug/">Post Title</a></h2>
  <p class="post-excerpt">Short excerpt…</p>
  <a href="post-slug/" class="post-read-more">Read more →</a>
</article>
```

### Tags / Pills
- Tags use `<span class="post-tag">` (listing) or `<span class="skill">` (profile).
- Both are pill-shaped (`border-radius: 20px`), muted background by default.
- On hover they shift to a light primary background with a primary border.

### Blog Post Article
```html
<article class="post-article">
  <a href="../index.html" class="back-link">← Back to blog</a>
  <div class="post-article-header">
    <div class="post-meta">…tags…</div>
    <h2 class="post-article-title">Post Title</h2>
  </div>
  <div class="post-content">
    …article body…
  </div>
</article>
```

**Inside `.post-content`:**
- Section headings → `<h3>` (sub-sections → `<h4>`)
- Sections separated by `<hr>`
- Unordered lists → `<ul><li>…</li></ul>` (dash bullet via CSS)
- Ordered lists → `<ol class="post-ol"><li>…</li></ol>`
- Tables → `<div class="post-table-wrap"><table class="post-table">…</table></div>`
- Blockquotes → `<blockquote class="post-blockquote"><p>…</p></blockquote>`
- Closing line → `<p class="post-closing">…</p>`
- ASCII / diagram blocks → `<pre class="post-pyramid"><code>…</code></pre>`

### Blockquotes
Left-border accent (`var(--color-primary)`), light primary-tinted background, italic text. No large decorative quotation mark pseudo-element.

### Code Blocks
Use Prism.js with the `prism-tomorrow` theme (dark). Inline `<code>` uses `var(--color-bg-secondary)` background with `var(--color-primary)` text.

```html
<!-- In <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css">

<!-- Before </body> -->
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-javascript.min.js"></script>
```

Load only the language components the post actually uses.

### Tables
Wrap in `.post-table-wrap` for horizontal scroll. Use `.post-table` on the `<table>`. Headers are uppercase, muted, small. Row hover highlights with `var(--color-bg-secondary)`.

---

## Dark Mode

Dark mode is **automatic** — driven entirely by `@media (prefers-color-scheme: dark)` in `styles.css`. All color tokens are overridden in that media query.

- No JavaScript is needed.
- No `data-theme` attribute or class toggle.
- No cookie or localStorage.
- To test: change your OS appearance setting.

---

## Adding a New Blog Post

1. **Create directory**: `mkdir <post-slug>/`
2. **Create** `<post-slug>/index.html` — copy the structure from an existing post page.
3. **Update CSS path** — use `../styles.css`.
4. **Update back-link** — use `href="../index.html"`.
5. **Update font import** — use the Inter + JetBrains Mono Google Fonts URL above.
6. **Add to listing** — add a new `<article class="post-card">` at the top of `.post-list` in `index.html` (most recent first).
7. **Language** — write posts in English. Set `<html lang="en">`.
8. **Title format** — `<title>Post Title · Ariel Pchara</title>` (no emoji prefix).

---

## What NOT to Do

- **No inline `style=""` attributes** — all styling goes in `styles.css`.
- **No new CSS files or `<style>` blocks** inside HTML.
- **No old fonts** — Cinzel Decorative, Cinzel, Roboto Mono, and Crushed have been removed. Use Inter and JetBrains Mono only.
- **No background gradients on `body`** — the background is a flat `var(--color-bg)`.
- **No decorative pseudo-elements on `body`, `header`, or `footer`** — no mountain silhouettes, no wave dividers, no SVG data URIs for decoration.
- **No background textures** — no `repeating-linear-gradient` wood-grain overlays on cards.
- **No JavaScript beyond** the year setter and Prism.js loader.
- **No external analytics, trackers, or third-party scripts** beyond Google Fonts, remixicon, and Prism.js.
- **Do not rename HTML classes** — the CSS targets existing class names exactly.
- **No `!important`** except inside the `prefers-reduced-motion` block.
