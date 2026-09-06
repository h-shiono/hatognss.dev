# Site Layout — Design Memo

> Status: **Approved for v0.1 implementation**
> Last updated: 2026-05-18
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
| Border-bottom | 1px solid `var(--color-border)` |
| Margin-bottom | 3.25rem (52px) |
| Layout | Flex, brand left, nav right, baseline-aligned, wraps |

### Brand (left)

- Text: `hato.GNSS`
- Font: Fraunces (serif display)
- Size: 21px desktop, 19px mobile
- Weight: 600
- Letter-spacing: 0.01em
- Links to: `/`

### Navigation (right)

- Items (in order): `Research`, `OSS`, `Works`, `Atlas`, `Blog`
- Font: JetBrains Mono
- Size: 12px
- Weight: 500
- Letter-spacing: 0.10em
- Case: UPPERCASE
- Gap: 24px desktop, 16px mobile
- Color: `var(--color-text-secondary)` default, `var(--color-text-heading)` on hover
- Current page (`aria-current="page"`): `var(--color-accent)` + 1.5px accent underline
- Transition: color 0.15s, border-color 0.15s

### Mobile behavior

At viewport width < 640px:
- Brand stays on left
- Nav items stay visible (do NOT collapse to hamburger in v0.1)
- Nav gap reduces to 16px
- The masthead wraps: the nav drops to its own line under the brand rather than
  widening the page
- If the nav is still too wide on that line, it scrolls horizontally

Hamburger menu is deferred to v0.2 — at 12px mono with 5 items, the nav fits on
its own line down to 320px.

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
| Display (headings, brand) | **Fraunces** (variable) | Google Fonts via @fontsource | OFL (free) |
| Body | **Noto Sans JP** | Google Fonts via @fontsource | OFL (free) |
| Monospace | **JetBrains Mono** | Google Fonts via @fontsource | OFL (free) |

All three are **self-hosted via `@fontsource` packages** — no external CDN call. This is a privacy and performance decision: no third-party font requests are made from the user's browser.

Body was Fraunces until the readability pass (2026-09). Japanese has no Fraunces
coverage, so JA body text fell back to a system mincho at a serif face's line
height and was the single worst legibility problem on the site. Body is now a
gothic; `--font-display` carries Noto Sans JP as its second fallback, so a mixed
heading renders Latin in Fraunces and Japanese in gothic.

System fallbacks:
- Fraunces fallback: `"Noto Sans JP", "Iowan Old Style", Georgia, serif`
- Noto Sans JP fallback: `system-ui, sans-serif`
- JetBrains Mono fallback: `ui-monospace, "SF Mono", Menlo, monospace`

`--font-display-serif` (`Fraunces` with **no** JP fallback) exists for the one
heading kept deliberately in mincho: the Home hero tagline.

### Type scale

Sizes below are post-readability-pass (2026-09).

| Element | Size | Weight | Line-height |
|---|---|---|---|
| Hero tagline | `clamp(28px, 5vw, 40px)` | 500 | 1.32 |
| Hero tagline EN | 18px | 400 italic | 1.55 |
| Page title (H1) | `clamp(26px, 4vw, 32px)` | 600 | 1.3 |
| Article H1 | `clamp(24px, 3.4vw, 30px)` | 600 | 1.5 |
| Section title (H2) | 22px | 600 | 1.6 |
| Subsection (H3) | 19px | 600 | 1.6 |
| Article body | 16.5px | 400 | 1.9 |
| Card title | 21px | 600 | 1.35 |
| Card / summary text | 14.5px | 400 | 1.75 |
| List entry title | 16.5px | 500 | 1.55 (JA 1.6) |
| List entry meta | 13.5px | 400 | 1.7 |
| Year heading | 15px | 500 | 1.4 |
| Section label | 11px | 500 | 1.0 |
| Nav item | 12px | 500 | — |
| Footer | 11.5px | 400 | 1.6 |

### Section labels

Used as small uppercase markers above content groups (e.g., `LATEST · 最近の記録`):

- Font: JetBrains Mono
- Size: 11px
- Weight: 500
- Letter-spacing: 0.20em
- Text-transform: uppercase
- Color: `var(--color-text-secondary)`
- Separator (`·`): `var(--color-accent)`
- Margin-bottom: 1.125rem
- Padding-bottom: 10px
- Border-bottom: 1px solid `var(--color-border)`

Rules are 1px site-wide. The 0.5px hairlines of the first build vanished on
non-retina displays and read as noise on retina.

**JP · EN bilingual pattern is mandatory** for section labels (continuity with hato-colle).

## 6. Color Palette

### Almanac palette (final)

| Token | Light mode | Dark mode |
|---|---|---|
| `--color-bg` | `#FAF7F0` | `#14130F` |
| `--color-text-primary` | `#1A1A1A` | `#E8E4DA` |
| `--color-text-secondary` | `#55524B` | `#BDB8AB` |
| `--color-text-tertiary` | `#827E75` | `#7E7A72` |
| `--color-border` | `#CFC9BA` | `#3A382F` |
| `--color-accent` | `#854F0B` | `#EF9F27` |

The secondary, tertiary and border values were raised in the readability pass
(design handoff "1c", 2026-09). The originals (`#6B6B6B` / `#9B9890`,
`#9A9A9A` / `#6B6863`, `#E0DCD0` / `#2A2925`) fell below 5:1 at the 13-14px
sizes they are used at, and the border disappeared into the dark background.

### Readability pass additions

Introduced with the same handoff. Surfaces and rules exist so that a card or a
list row can show it is clickable without borrowing the accent.

| Token | Light mode | Dark mode | Used for |
|---|---|---|---|
| `--color-text-heading` | `#111111` | `#F3F0E8` | Headings, card and entry titles, brand |
| `--color-surface` | `#F5F1E7` | `#1C1A15` | Card face |
| `--color-surface-hover` | `#EFE9DD` | `#221F19` | Card face on hover |
| `--color-row-hover` | `#F2ECE1` | `#1A1813` | List row on hover |
| `--color-rule` | `#E2DDD0` | `#2A2925` | Thin rule between list rows |
| `--color-accent-border` | `#C9A05C` | `#6B4E1E` | Chip border (dimmed accent) |
| `--color-prose-fg` | `#26241F` | `#DCD7CC` | Long-form body text |
| `--color-code-fg` | `#6B3F08` | `#EBD9B8` | Inline code |
| `--color-code-bg` | `#F2ECE0` | `#100F0C` | Code block ground |
| `--color-chip-fg` | `#5F5B52` | `#A8A399` | Tech tag label |
| `--color-chip-hover-bg` | `#F0E6D3` | `#2C271C` | Link button fill on hover |
| `--color-map-bg` | `#F6F2E8` | `#17160F` | Atlas map surface and marker stroke |
| `--color-map-land-stroke` | `#BDB5A3` | `#4A473E` | Atlas land outline |
| `--color-map-graticule` | `#D5CEBD` | `#434036` | Atlas graticule |

Light values for `--color-text-heading`, `--color-map-land-stroke` and
`--color-map-graticule` were chosen during implementation; the handoff did not
specify them.

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

Publications display a `type` marker in parentheses at the end of the meta line — e.g., `H. Shiono · Navigation · (journal)` — to distinguish journal / conference / popular / preprint / thesis at a glance. Year grouping remains the primary axis; type is a secondary visual cue, not a grouping dimension.

Future alternative: when publications exceed ~30 items, reconsider grouping by `type` (Journal / Conference / Popular / ...) instead of year, and split into `/research/publications/` and `/research/talks/` if either side grows large.

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

Editorial prose introducing hato.GNSS. Sections:
- Who · 自己紹介
- What I'm thinking about
- Side projects · 寄り道 (lists projects where category === 'hobby')
- Colophon · 製作
- Contact

Uses ArticleLayout with max-width 640px.

Projects with `category: 'hobby'` are rendered as a small list here, 
NOT under /oss/ or /works/. Each entry links externally to its own site/repo.

## 9. Footer

| Property | Value |
|---|---|
| Margin-top | 4.75rem (76px) |
| Padding-top | 18px |
| Border-top | 1px solid `var(--color-border)` |
| Layout | Flex, identity left, links right, baseline-aligned |
| Font | JetBrains Mono, 11.5px, `var(--color-text-secondary)` |

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
| 2026-05-18 | Publications schema extended (`type`, `issue`, `pages`, `notes`, `republished_in`) | Support popular-press writing (magazine columns, technical book chapters) alongside journal/conference output |
| 2026-05-18 | `type` value `magazine` renamed to `popular` | Encompass future technical-book contributions and other writing aimed beyond the specialist community, not just magazine columns |
| 2026-05-18 | Research list keeps year grouping; `type` shown as meta marker | Year remains primary chronological axis; reconsider grouping by `type` when publications exceed ~30 items |

---

**Version**: 0.1
**Author**: hato.GNSS
**Implementation target**: weekend 2026-05-16/17 (alongside or following Atlas)
