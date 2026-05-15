# CLAUDE.md — hato-portfolio

> Operating manual for Claude Code (Opus 4.7+) working on this repository.
> Read this fully before any non-trivial change.

## 1. Project Overview

**hato-portfolio** is the personal hub site for **hato.GNSS** — an independent GNSS researcher and OSS maintainer.

This site is the **brand**. Every external reference — paper footnotes, README links, talk slides, social bios — points here. URL stability and content quality are first-class concerns.

### Five content pillars

1. **Identity (top)** — Hero + social links (GitHub, Zenn, X, ResearchGate)
2. **Research** — Publications and talks (academic output)
3. **OSS** — Open source projects (MRTKLIB, mrtklib-docker-ui, ...)
4. **Works** — Services and applications (pntmoni, CLAS Summary Dashboard, ...)
5. **Personal** — Blog and hobby projects (hato-colle, ...)

## 2. Identity Scope

This site is operated under a **layered identity model**:

- The display identity is **hato.GNSS** (handle). All editorial copy, headings, bios, blog post bylines, and general content use this name.
- Academic citations and publication records retain their **published author format** (e.g., "H. Shiono"). This is not anonymization; it is faithful reproduction of citation records.
- The site does **not** proactively foreground the underlying legal name in editorial copy. The connection between hato.GNSS, the GitHub handle (`h-shiono`), and the academic name in publications is **discoverable through publication metadata and GitHub profile** — not asserted on this site.

Specific content-scope rules — what entities, projects, and naming patterns may or may not appear — are defined in **`CLAUDE.local.md`** (not committed to this repository).

Read `CLAUDE.local.md` before authoring or modifying content that involves:

- Biographical statements and affiliations
- Employment history or organizational contexts
- Project descriptions and their origins
- Author names, attribution, or identity references
- Any content that could be interpreted as representing entities beyond the independent researcher persona

**If `CLAUDE.local.md` is not present in the working tree, STOP and ask the user before proceeding with content that touches the above categories.**

The technical guidance below (Sections 3–13) is safe to apply without consulting `CLAUDE.local.md`.

## 3. Tech Stack

| Layer | Choice | Notes |
|------|--------|-------|
| Framework | **Astro** (latest stable) | Static-first, Islands Architecture |
| Language | **TypeScript** strict mode | All `.ts` and `.astro` script blocks |
| Styling | **Tailwind CSS v4** | + CSS variables for theme tokens |
| Content | **Markdown / MDX** via Content Collections | Type-safe frontmatter |
| Interactive | **React** (only when needed) | Per-component island, not whole-page |
| Hosting | **Cloudflare Pages** (preferred) or GitHub Pages | Custom domain |
| Analytics | **Cloudflare Web Analytics** | Cookieless, GDPR-friendly |
| Search | **Pagefind** | Static full-text search, Astro integration |
| RSS | `@astrojs/rss` | Generated at `/rss.xml` |
| Icons | **Lucide** or **Iconify** | No emoji as UI icons |

**Forbidden by default** (require explicit user approval):

- Any client-side framework other than React in islands
- localStorage / sessionStorage / IndexedDB (no use case yet justifies it)
- External UI kits or component libraries (build native)
- Third-party trackers, ad networks, or analytics beyond CF Web Analytics

## 4. Directory Structure

See `README.md` for the canonical tree. Key invariants:

- All long-lived content lives under `src/content/{collection}/`
- All routes live under `src/pages/`
- Components are grouped by **role**, not by page (`layout/`, `cards/`, `ui/`, etc.)
- Static assets that should NOT be optimized by Astro live in `public/`
- Images that should be optimized live in `src/assets/`

## 5. Content Collections Schema

Defined in `src/content/config.ts`. **All schema changes require updating this file AND this section together.**

### `publications` collection

```ts
{
  title: string,
  authors: string[],              // ["H. Shiono", "N. Kubo"]  — use published author format
  venue: string,                  // "NAVIGATION" | "ION GNSS+ 2025" | ...
  year: number,
  status: 'published' | 'accepted' | 'submitted' | 'in-revision' | 'in-prep',
  doi?: string,
  url?: string,                   // external link (journal, conference)
  pdf?: string,                   // path in /public/pdfs/ or external URL
  abstract: string,
  tags: string[],                 // ["PPP-RTK", "QZSS CLAS", ...]
  featured?: boolean,             // show on homepage
  date: Date,                     // publication or acceptance date
  presented_at?: Reference<'talks'>  // optional cross-link to the talk that presented this work
}
```

**Author field rule**: Use the format as published. Do NOT modify or expand author names to forms that differ from the citation record. When uncertain about the published format, ask the user.

**Status semantics:**
- `published` — DOI/proceedings finalized
- `accepted` — accepted, awaiting publication
- `submitted` — under review
- `in-revision` — revise & resubmit cycle
- `in-prep` — actively drafting (show only if user explicitly opts in)

**Do not invent statuses.** When uncertain, ask.

### `talks` collection

```ts
{
  title: string,
  event: string,                  // "IPNTJ 2026 全国大会" | "ION GNSS+ 2025" | ...
  date: Date,
  location?: string,
  type: 'invited' | 'oral' | 'poster' | 'tutorial' | 'seminar',
  slides_url?: string,            // GitHub Pages URL or PDF link
  slides_pdf?: string,            // path in /public/pdfs/
  video_url?: string,
  url?: string,                   // event/conference page URL
  abstract: string,
  tags: string[],
  featured?: boolean,
  lat?: number,                   // venue latitude (decimal degrees, for Atlas)
  lng?: number,                   // venue longitude (decimal degrees, for Atlas)
  thumbnail?: ImageMetadata,      // venue/city photo, collocated as ./photo.jpg
  related_publication?: Reference<'publications'>  // optional cross-link to the paper this talk presented
}
```

**Cross-references**: When a talk presents a paper, set `related_publication` on the talk AND `presented_at` on the paper, pointing at each other's slug. The detail pages render the back-link in both directions.

### `projects` collection

Unified collection for OSS, Works, and Hobby projects, discriminated by `category`.

```ts
{
  title: string,
  category: 'oss' | 'work' | 'hobby',
  status: 'active' | 'maintenance' | 'archived' | 'alpha' | 'beta' | 'planning',
  summary: string,                // one-line description
  description: string,            // full markdown body
  repo?: string,                  // GitHub URL
  demo?: string,                  // live demo URL
  docs?: string,
  tech: string[],                 // ["C", "Python", "React", ...]
  tags: string[],
  highlights?: string[],          // bullet points for cards
  featured?: boolean,
  startDate: Date,
  updatedDate?: Date
}
```

**Category routing:**
- `oss` → listed on `/oss/`
- `work` → listed on `/works/`
- `hobby` → listed on `/blog/` sidebar or `/about` (not its own section)

### `blog` collection

```ts
{
  title: string,
  description: string,
  date: Date,
  updatedDate?: Date,
  tags: string[],
  draft?: boolean,
  featured?: boolean,
  language: 'ja' | 'en'           // primary language of the post
}
```

**Byline convention**: Blog posts are signed as **hato.GNSS**. Do not add a real-name byline unless the user explicitly requests one for a specific post.

## 6. Adding New Content — Workflow

When the user asks to add a publication, talk, project, or blog post:

1. **Check `CLAUDE.local.md` first** if the content involves biography, affiliations, project origins, or identity references.
2. **Read the existing files in that collection** to match conventions (filename pattern, frontmatter shape, prose style).
3. **Create a new file** under the correct collection with kebab-case filename:
   - Publications: `YYYY-short-slug.md` (e.g., `2025-navigating-the-storm.md`)
   - Talks: `YYYY-MM-event-slug.md` (e.g., `2026-05-ipntj-mrtklib.md`)
   - Projects: `slug.md` (e.g., `mrtklib.md`)
   - Blog: `YYYY-MM-DD-slug.md`
4. **Fill ALL required frontmatter fields.** Do not guess values. Ask for unknowns.
5. **Run a typecheck** (`pnpm astro check`) before declaring done.
6. **For featured items**, confirm with the user — featured content appears on the homepage and competes for attention.

## 7. Aesthetic Direction

This site is for a **GNSS researcher**. The visual language should evoke **precision, technical depth, and quiet confidence** — not flash, not generic SaaS.

### Style principles

- **Avoid generic AI-design aesthetics.** No Inter for everything. No purple gradients. No vague glassmorphism.
- **Typography**: Pair a distinctive display face with a refined body face. Suggested directions: a geometric or scientific display font (e.g., JetBrains Mono, IBM Plex Mono, or a humanist sans like Söhne, Untitled Sans, Geist) + a comfortable reading face (Source Serif, IBM Plex Serif, or a clean sans like Geist Sans). **Confirm font choice with user before installing.**
- **Color**: Restrained palette. Monochrome base + one accent. Possible inspirations: ink-on-paper, terminal phosphor green, signal blue, GNSS constellation gold. **No more than 3 hues total.**
- **Layout**: Editorial/scientific. Generous whitespace. Strong typographic hierarchy. Asymmetry is welcome but must be purposeful.
- **Motion**: Sparing. One well-orchestrated page-load reveal beats scattered micro-interactions. No autoplaying anything.
- **Visual motif (optional, ambitious)**: Subtle GNSS-themed background elements — orbital arcs, constellation dots, ionospheric grid — used as texture, never as decoration. Implement only if user opts in; v0.1 should ship without it.

### Dark mode

Implement from v0.1. Use CSS custom properties driven by `data-theme` on `<html>`. No FOUC.

### Internationalization

Site chrome is in English. Blog posts may be in Japanese or English (per `language` frontmatter). Do NOT force translation; mixed-language sites are common for bilingual researchers and are acceptable here.

## 8. Working Style — Plan-First with Balanced Autonomy

Adopted from MRTKLIB CLAUDE.md v2 conventions.

### Before non-trivial changes

For any task touching more than ~3 files OR changing structure/schemas/build config:

1. **Read** the current state of the relevant files.
2. **Plan** in prose: what will change, why, what could break.
3. **Confirm** with the user if any of these apply:
   - Schema change to a Content Collection
   - New dependency added to `package.json`
   - Change to routing (`src/pages/` structure)
   - Change to deployment configuration
   - Anything touching identity/branding/colors/fonts
   - Anything that might intersect with `CLAUDE.local.md` scope
4. **Execute** in small, reviewable steps.

For trivial changes (typo fix, single-content edit, single-component style tweak), proceed directly.

### Todo and lessons (local-only working memory)

Two files may exist locally during work, both gitignored:

- **`todo.md`** — current session task list, checkbox-tracked
- **`lessons.md`** — accumulated debugging insights and pitfalls

These are session/working memory and never committed. Re-read `lessons.md` at the start of any major task if present.

## 9. Top Pitfalls

Seed entries; expand based on `lessons.md` over time.

- **L-S01**: Astro `Image` component requires images under `src/assets/`, NOT `public/`. Importing from `public/` silently disables optimization.
- **L-S02**: Content Collections schema errors fail at build time, not dev time, if the offending file is not loaded. Always run `pnpm astro check` before commit.
- **L-S03**: Tailwind v4 uses CSS-first configuration (`@theme` directive), not `tailwind.config.js`. Migration guides for v3 are misleading.
- **L-S04**: Cloudflare Pages deployment needs `NODE_VERSION` env var set (Astro requires Node 20+).
- **L-S05**: Frontmatter `date` fields are parsed as UTC. Use ISO-8601 strings (`2026-05-13`) not locale strings.
- **L-S06**: MDX components imported into MDX files must be **default** exports or aliased; named imports in MDX have edge cases.

## 10. Development Workflow

### Commands

```bash
pnpm install              # install deps
pnpm dev                  # local dev server
pnpm build                # production build → ./dist/
pnpm preview              # preview production build locally
pnpm astro check          # type-check content + .astro files
pnpm lint                 # (if configured)
pnpm format               # (if configured)
```

### Branching

- `main` is the deployed branch. Cloudflare Pages auto-deploys from `main`.
- Feature work on `feat/<short-slug>` branches. Open PR, self-review, merge.
- For content-only updates (new blog post, talk entry), direct commits to `main` are acceptable.

### Commit messages

Use conventional commits prefix:
- `feat:` new feature or content type
- `content:` adding/editing content entries (publications, talks, etc.)
- `fix:` bug fix
- `style:` visual/CSS only
- `docs:` documentation including this file
- `chore:` deps, config, tooling

## 11. Deployment

### Cloudflare Pages (preferred)

- Build command: `pnpm build`
- Build output directory: `dist`
- Root directory: `/`
- Environment: `NODE_VERSION=20` (or current LTS)
- Custom domain: configured via Cloudflare DNS

### Domain

The custom domain is the **brand asset**. Treat domain-level changes with extreme care:
- Never change the apex domain without explicit user confirmation
- Maintain 301 redirects for any URL pattern that has ever been published externally
- Track all published URLs in `docs/published-urls.md` (create if missing)

## 12. Out-of-Scope (for now)

To prevent scope creep on v0.1:

- Comments system (none)
- Newsletter / mailing list (none)
- Contact form (use email link in footer)
- Internationalized routing (`/ja/`, `/en/`) — defer until justified
- CMS / admin UI (content is files in Git)
- Server-side rendering (static-only)
- E-commerce, paywalls, member areas

## 13. Versioning of This Document

This `CLAUDE.md` is itself a tracked artifact. Update version and date at the bottom when meaningfully changed.

---

**Version**: 0.4 (talks ↔ publications cross-references; talks gain `url`, `lat`/`lng`, `thumbnail`)
**Last updated**: 2026-05-15
