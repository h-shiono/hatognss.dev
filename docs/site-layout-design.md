# Site Layout — Design Memo

> Status: **Approved for v0.1 implementation**
> Last updated: 2026-05-15
> Audience: implementers (Hayato, Claude Code, future contributors)
> Companion: [`docs/prompts/site-layout-implementation.md`](./prompts/site-layout-implementation.md)
> Related: [`docs/atlas-design.md`](./atlas-design.md)

## 1. Overview

hatognss.dev uses an **editorial layout** rather than an app-shell pattern. Every page is a standalone document with consistent chrome (a minimal masthead and footer) but flexible internal structure.

### Why editorial over app-shell

- Matches **almanac aesthetic** — almanacs are document collections, not apps
- Allows each section to have its own optimal layout (Atlas wants a map; Publications want a long list; Blog wants article view)
- Reads as "long-running record" rather than "interactive tool"
- Eliminates cognitive overhead of tab/state management
- Each URL is a real page with semantic meaning

### Reference comparison

| App-shell | Editorial (chosen) |
|---|---|
| Persistent nav, switching content | Consistent thin chrome, full page swaps |
| Feels like a tool/dashboard | Feels like a publication |
| Common in SaaS | Common in research/editorial sites |
| Examples: Notion, Linear, Slack | Examples: NYT, Edward Tufte, Maggie Appleton |

## 2. Layout Skeleton

Every page follows this skeleton:

```
┌──────────────────────────────────────────┐
│ Masthead                                  │
│ ─────────────────────────────────────     │
│                                           │
│ Page-specific content                     │
│ (varies completely per page type)         │
│                                           │
│                                           │
│ ─────────────────────────────────────     │
│ Footer                                    │
└──────────────────────────────────────────┘
```

The masthead and footer are **shared across all pages**. The middle is determined by page type.

## 3. Masthead

### Visual specification

| Property | Value |
|---|---|
| Position | Static (not sticky in v0.1) |
| Height | Auto, content-driven |
| Padding-bottom | 14px |
| Border-bottom | 0.5px solid `var(--color-border)` |
| Margin-bottom | 3.5rem (56px) |
| Layout | Flex, brand left, nav right, baseline-aligned |

### Brand (left)

- Text: `hato.GNSS`
- Font: Fraunces (serif display)
- Size: 20px desktop, 18px mobile
- Weight: 500
- Letter-spacing: 0.01em
- Links to: `/`

### Navigation (right)

- Items (in order): `Research`, `OSS`, `Works`, `Atlas`, `Blog`
- Font: JetBrains Mono
- Size: 11px
- Weight: 400
- Letter-spacing: 0.10em
- Case: UPPERCASE
- Gap: 22px desktop, 14px mobile
- Color: `var(--color-text-secondary)` default, `var(--color-text-primary)` on hover
- Transition: color 0.15s

### Mobile behavior

At viewport width < 640px:
- Brand stays on left
- Nav items stay visible (do NOT collapse to hamburger in v0.1)
- Nav gap reduces to 14px
- If any nav item would overflow, allow horizontal scroll on the nav element

Hamburger menu is deferred to v0.2 — at 11px mono with 5 items, all fit even on 320px viewports.

## 4. Container and Vertical Rhythm

### Container

| Property | Value |
|---|---|
| Max-width | 920px |
| Margin | 0 auto (centered) |
| Padding (desktop) | 2.5rem 2rem 4rem |
| Padding (mobile, <640px) | 2rem 1.25rem 3rem |

920px allows comfortable reading line lengths for body text while supporting two-column TOC grids without cramping.

The Atlas page (already implemented at 680px content) will scale up to fill 920px — the SVG viewBox stays `0 0 680 320` and the rendered width adapts. No code change required for Atlas.

### Vertical rhythm

| Spacing | Use case |
|---|---|
| 5rem (80px) | Above footer |
| 3rem (48px) | Between major sections within a page |
| 2.5rem (40px) | After masthead, before hero |
| 1.5rem (24px) | Within a section, between subsections |
| 1rem (16px) | Between paragraphs |
| 0.5rem (8px) | Tight pairings (label + value) |

## 5. Typography

### Fonts (final decision)

| Role | Font | Source | License |
|---|---|---|---|
| Display + body | **Fraunces** (variable) | Google Fonts via @fontsource | OFL (free) |
| Monospace | **JetBrains Mono** | Google Fonts via @fontsource | OFL (free) |

Both are **self-hosted via `@fontsource` packages** — no external CDN call. This is a privacy and performance decision: no third-party font requests are made from the user's browser.

System fallbacks:
- Fraunces fallback: `"Iowan Old Style", Georgia, serif`
- JetBrains Mono fallback: `ui-monospace, "SF Mono", Menlo, monospace`

### Type scale

| Element | Size | Weight | Line-height |
|---|---|---|---|
| Hero tagline | 34px | 400 | 1.3 |
| Hero tagline (mobile) | 26px | 400 | 1.3 |
| Hero tagline EN | 18px | 400 italic | 1.5 |
| Page title (H1) | 28px | 500 | 1.3 |
| Section title (H2) | 22px | 500 | 1.3 |
| Subsection (H3) | 18px | 500 | 1.4 |
| Body | 16px | 400 | 1.6 |
| Card title | 19px | 500 | 1.35 |
| Latest item | 15px | 400 | 1.5 |
| Section label | 10px | 400 | 1.0 |
| Footer | 11px | 400 | 1.0 |
| Code/mono inline | 14px | 400 | 1.5 |

### Section labels

Used as small uppercase markers above content groups (e.g., `LATEST · 最近の記録`):

- Font: JetBrains Mono
- Size: 10px
- Weight: 400
- Letter-spacing: 0.20em
- Text-transform: uppercase
- Color: `var(--color-text-secondary)`
- Margin-bottom: 14px
- Padding-bottom: 8px
- Border-bottom: 0.5px solid `var(--color-border)`

**JP · EN bilingual pattern is mandatory** for section labels (continuity with hato-colle).

## 6. Color Palette

### Almanac palette (final)

| Token | Light mode | Dark mode |
|---|---|---|
| `--color-bg` | `#FAF7F0` | `#14130F` |
| `--color-text-primary` | `#1A1A1A` | `#E8E4DA` |
| `--color-text-secondary` | `#6B6B6B` | `#9B9890` |
| `--color-text-tertiary` | `#9A9A9A` | `#6B6863` |
| `--color-border` | `#E0DCD0` | `#2A2925` |
| `--color-accent` | `#854F0B` | `#EF9F27` |

### Accent usage rules

- Use sparingly: links (`a` default state), kind tags (TALK / PAPER / OSS), hover states, marker fills on Atlas
- **NEVER** as background fill except for small markers
- **NEVER** for body text (only labels < 14px)
- **NEVER** stack two accent-colored elements adjacent
- **NEVER** introduce a second accent color

## 7. Dark Mode

- Auto-detection via `prefers-color-scheme` media query (system preference)
- No manual toggle in v0.1 (deferred to v0.2)
- All colors defined as CSS custom properties on `:root` and overridden in `@media (prefers-color-scheme: dark)`
- Test before commit: every text element must be legible in both modes

## 8. Per-page Layouts

Each page composes the BaseLayout (masthead + slot + footer) with its own middle section.

### Home (`/`)

Sections in order:
1. **Hero**: role line + JP tagline + EN subtitle
2. **Sections TOC**: 4 cards (Research, OSS, Atlas, Blog)

No "Latest" or activity feed on the home page — the almanac aesthetic 
prioritizes timeless content. Recent activity is available at `/log/`, 
discoverable via the footer.

### Log (`/log/`)

A chronological log of recent activity across talks, publications, OSS 
releases, and blog posts. Auto-generated from Content Collections.

- Items grouped by year, reverse-chronological within each year
- Entry format: date (mono) | kind tag | title | venue/context
- Footer link only; not in top navigation
- No manual maintenance — updates automatically with new content

### Research (`/research/`)

Single page combining publications and talks, **divided by year**. Each year has subsections for Publications and Talks within it.

Future alternative: split into `/research/publications/` and `/research/talks/` if either grows beyond ~30 items. For v0.1, combined view.

### OSS (`/oss/`)

Project cards grid:
- 2 columns on desktop, 1 column on mobile
- Per card: title (Fraunces 19px 500), status badge (alpha/beta/active/maintenance), brief description, tech stack tags (mono 11px), links to repo/demo/docs

### Works (`/works/`)

Same card structure as OSS. Filtered via `category === 'work'` in the projects collection.

### Atlas (`/atlas/`)

Already implemented per `docs/atlas-design.md`. Wrap with BaseLayout. Map content scales up to 920px container width automatically via SVG viewBox.

### Blog (`/blog/` and `/blog/{slug}/`)

**Index page**:
- Year-grouped reverse-chronological list
- Each entry: date (mono), title, language tag, brief description

**Article page** (uses ArticleLayout):
- Tight max-width: 640px (better reading line length than 920px)
- Article title + date + language tag at top
- Body in Fraunces serif at 17px / line-height 1.7
- Code blocks in JetBrains Mono

### About (`/about/`)

Editorial prose. Single column, max-width 640px. Fraunces body. Section labels as needed.

## 9. Footer

| Property | Value |
|---|---|
| Margin-top | 5rem (80px) |
| Padding-top | 18px |
| Border-top | 0.5px solid `var(--color-border)` |
| Layout | Flex, identity left, links right, baseline-aligned |
| Font | JetBrains Mono, 11px, `var(--color-text-secondary)` |

### Left side

`hato.GNSS · {year}` — year auto-updates via build-time evaluation

### Right side

Social links: `GitHub · Zenn · X · ResearchGate`

Separator: `·` in `var(--color-text-tertiary)`, 2px horizontal margin around each separator.

## 10. Implementation Approach

### Astro structure

```
src/layouts/
  BaseLayout.astro             # masthead + slot + footer (the skeleton)
  ArticleLayout.astro          # wraps BaseLayout, tightens max-width to 640px

src/components/layout/
  Masthead.astro
  Footer.astro
  PageHeader.astro             # consistent page-title treatment (non-home pages)
  SectionLabel.astro           # the bilingual JP · EN label component

src/styles/
  global.css                   # CSS variable definitions, base typography, resets
  fonts.css                    # @font-face declarations (or @fontsource imports)
```

### Layout composition

Every page uses `BaseLayout`:

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
---
<BaseLayout title="Research" description="Publications and talks">
  <!-- page-specific content -->
</BaseLayout>
```

Blog article pages use `ArticleLayout`, which extends `BaseLayout` and constrains the content slot to 640px.

### View Transitions

Astro's View Transitions API enabled for smooth cross-page transitions. Reinforces the "single publication, multiple pages" feel.

Add to `BaseLayout.astro` head:

```astro
import { ViewTransitions } from 'astro:transitions';

<head>
  ...
  <ViewTransitions />
</head>
```

Mark the masthead and footer with `transition:persist` so they don't flash during navigation.

### Font loading

Self-host via `@fontsource` packages:

```bash
pnpm add @fontsource-variable/fraunces @fontsource/jetbrains-mono
```

Import in `src/styles/fonts.css` (loaded by BaseLayout):

```css
@import '@fontsource-variable/fraunces/wght.css';
@import '@fontsource/jetbrains-mono/400.css';
@import '@fontsource/jetbrains-mono/500.css';
```

## 11. v0.1 Scope

**In:**
- BaseLayout (masthead + footer)
- Home page (hero + latest + sections TOC)
- Research, OSS, Works, Blog index pages
- About page
- Atlas page wrapped in BaseLayout (no rework, just composition)
- ArticleLayout for blog posts
- Light + dark mode auto-switching
- Responsive (mobile-friendly without hamburger)
- View Transitions

**Out (v0.2+):**
- Manual dark/light toggle
- Hamburger menu (or any mobile-specific nav collapse)
- Search (Pagefind)
- RSS feed
- Article TOC sidebar
- Reading time estimates
- Animated section reveals on scroll
- Print stylesheet

## 12. v0.2+ Roadmap

1. **Pagefind search integration** — adds a small search icon to the masthead
2. **Manual dark/light toggle** — single button next to nav, persists via localStorage (the only feature that would justify localStorage)
3. **RSS for blog**
4. **Reading time estimates on articles**
5. **Article TOC sidebar** for long-form posts
6. **Footnotes / marginalia** for academic-style essays
7. **Print stylesheet** — important for academic readers who print papers

## 13. Decision Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-05-15 | Editorial over app-shell | Matches almanac aesthetic; allows per-page layout freedom |
| 2026-05-15 | Static (not sticky) masthead | Document-like feel; no chrome distraction |
| 2026-05-15 | Fraunces + JetBrains Mono | Free, distinctive, fits editorial-scientific aesthetic |
| 2026-05-15 | 920px container width | Comfortable reading + 2-column TOC grid support |
| 2026-05-15 | Article max-width 640px (separate) | Better reading line length for long-form prose |
| 2026-05-15 | Self-hosted fonts via @fontsource | Privacy + performance, no third-party CDN |
| 2026-05-15 | Auto dark mode only in v0.1 | Defer toggle complexity |
| 2026-05-15 | All nav items visible on mobile | 5 mono 11px items fit even on 320px |
| 2026-05-15 | View Transitions enabled | Smooth nav reinforces "single publication" feel |
| 2026-05-15 | Antique brass accent (#854F0B / #EF9F27) | Consistent with Atlas accent; warm-restrained |

---

**Version**: 0.1
**Author**: hato.GNSS
**Implementation target**: weekend 2026-05-16/17 (alongside or following Atlas)
