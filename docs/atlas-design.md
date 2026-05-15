# Atlas — Design Memo

> Status: **Approved for v0.1 implementation**
> Last updated: 2026-05-15
> Audience: implementers (Hayato, Claude Code, future contributors)
> Companion: [`docs/prompts/atlas-implementation.md`](./prompts/atlas-implementation.md)

## 1. Overview

The **Atlas** is a geographic visualization of talks given by hato.GNSS, presented as a world map with hoverable markers. Each marker represents a single talk at its physical venue. Hovering reveals a thumbnail of the venue or city, plus key metadata.

### Why Atlas exists

- A GNSS researcher's work is fundamentally about **location**. The Atlas is meta-appropriate: a researcher of position systems plotting their own research activity by position.
- It records the geography of professional activity **without surfacing vulgar metrics** (talk counts, conference ranks). The map and the list speak quietly.
- It serves as a **personal record** — a way to remember where work has been presented and what those places looked like.
- It is a **design signature** for the site. The Atlas tells visitors "this is not a generic portfolio."

### What Atlas is NOT

- Not a publications visualization. Publications have their own list; pure publications are not geographic in a meaningful way.
- Not a metric showcase. No counts, no ranks, no "most popular."
- Not a real-time activity stream. Data is loaded from `src/content/talks/` at build time.

## 2. Information architecture

- **URL**: `/atlas/`
- **Nav position**: top-level navigation, alongside Research / OSS / Works / Blog
- **Linked from**: homepage (small "see atlas →" link near Talks preview), individual talk detail pages (each shows a tiny inset map of its location)

## 3. Schema changes

The `talks` Content Collection gains four optional fields:

```ts
{
  // existing fields ...

  location?: string,          // "Tokyo, JP" — display label
  lat?: number,               // decimal degrees, e.g., 35.6762
  lng?: number,               // decimal degrees, e.g., 139.6503
  thumbnail?: ImageMetadata   // Astro image() schema for the venue photo
}
```

Talks without `lat`/`lng` **do not appear** on the Atlas map but **do appear** in the page's list section. The map and list are partial mirrors, not strict subsets.

## 4. Directory structure (collocated content)

Talks move from single-file Markdown to per-talk directories with assets collocated:

```
src/content/talks/
├── 2026-05-ipntj-mrtklib/
│   ├── index.md          # frontmatter + body
│   ├── photo.jpg         # Atlas thumbnail
│   ├── slides.pdf        # optional, talk slides
│   └── ...               # any other associated assets
├── 2025-09-iongnss-storm/
│   ├── index.md
│   └── photo.jpg
└── ...
```

Frontmatter references assets by relative path:

```yaml
thumbnail: ./photo.jpg
```

Astro Content Collections natively support this layout when the collection entry is `index.md` inside a directory.

## 5. Photo specifications

| Property | Requirement |
|---|---|
| Aspect ratio | **5:3 preferred**, 3:2 acceptable. Final crop via CSS `object-fit: cover` |
| Source resolution | Short edge ≥ 800px (retina + responsive generation) |
| Format | JPEG (sRGB). Astro generates WebP/AVIF at build time |
| Source file size | Up to ~5MB; Astro optimization produces <100KB output |
| Color profile | sRGB only; no Adobe RGB or wide-gamut |

### Photo selection guidance

Atlas photos communicate **place**, not **person**.

- Good: venue exterior, conference signage, the city or landscape during the trip, audience hall
- Avoid: close-up portraits of the speaker, slide screenshots only, generic airport or transit photos

The principle: a **postcard of the trip**, not a marketing shot of the talk.

## 6. Visual design

### Aesthetic direction: "Almanac"

- Warm off-white background in light mode, deep ink in dark mode
- Single muted accent: **antique brass** (`#854F0B` light, `#EF9F27` dark)
- Bilingual section headers in `JP · EN` pattern (continuity with hato-colle)
- All numerals in monospace (dates, coordinates, year labels)
- Single decorative element discipline — no ornament beyond the markers themselves

### Map

| Element | Specification |
|---|---|
| Projection | `d3.geoNaturalEarth1` |
| Container size | Width 100%, viewBox 680×320 |
| Background | Transparent |
| Land fill | `var(--color-background-secondary)` |
| Land border | `var(--color-border-tertiary)`, 0.5px |
| Graticule | 30° spacing, dashed (1 3), 40% opacity |

### Markers

- 5px filled circle, antique brass color
- 1.5px stroke in page background color (creates a subtle ring)
- Hover state: radius grows to 8px, transition 0.15s
- **Uniform**: no size differentiation, no popularity ranking
- v0.2 may add shape differentiation by talk `type` (oral/poster/invited)

### Tooltip

- Width: 220px fixed
- Image area: 130px height, `object-fit: cover`
- Body padding: 10–12px
- Title: 14px, weight 500
- Meta line: 11px monospace
- Border: 0.5px secondary, radius-md
- **Edge-aware positioning**: flips horizontally if would overflow right; clamps vertically

### List (below map)

Three-column grid: `date | title + venue | location`

- Date: 56px, monospace, secondary color
- Title + venue: main column, title 14px primary + venue 12px secondary
- Location: right-aligned, monospace, secondary color
- 0.5px bottom border per row
- Hover background: `var(--color-background-secondary)`
- Hover-syncs with map markers

## 7. Interaction design

| Interaction | v0.1 behavior |
|---|---|
| Hover marker | Show tooltip, highlight corresponding list row |
| Hover list row | Highlight corresponding marker, but **no** tooltip popup |
| Click marker | Navigate to `/research/talks/{slug}/` |
| Click list row | Navigate to `/research/talks/{slug}/` |
| Touch (mobile) | Tap = click; no hover-equivalent. Tooltip on tap, dismiss by tapping outside |
| Keyboard | Out of scope for v0.1 |

## 8. Technical implementation

### Astro structure

```
src/pages/atlas.astro              # page entry, SSR
src/components/atlas/
  AtlasMap.tsx                     # React island (interactive map)
  AtlasList.astro                  # SSR (no client JS needed)
  TalkTooltip.tsx                  # subcomponent of AtlasMap
src/lib/atlas/
  worldTopology.ts                 # TopoJSON loader (build-time fetch + bundle)
  projection.ts                    # projection helpers
docs/atlas-design.md               # this file
```

### New dependencies

| Package | Purpose | Approx size |
|---|---|---|
| `d3-geo` | Projection math | ~30KB |
| `topojson-client` | TopoJSON → GeoJSON | ~10KB |
| `world-atlas` | 110m world topology data | ~100KB |
| `@types/d3-geo`, `@types/topojson-client` | TypeScript types | dev only |

Use `pnpm add` for production deps, `pnpm add -D` for types.

### Rendering split

- **Astro SSR**: page chrome, header, list, **pre-computed land/graticule SVG paths**. The world topology is processed at build time; the resulting SVG paths are inlined. First paint shows a fully styled map with no JS.
- **React island**: marker hover state, tooltip positioning, list-map hover sync. Hydrates only the interactive layer.

This split keeps initial bundle size minimal and ensures the page is content-complete before JS arrives.

### Image handling

Use Astro's `<Image>` component referenced from the talk's frontmatter:

```astro
---
import { Image } from 'astro:assets';
const thumb = talk.data.thumbnail;
---
<Image
  src={thumb}
  alt={`${talk.data.location} — ${talk.data.venue}`}
  width={220}
  height={130}
  loading="lazy"
/>
```

Specify explicit dimensions so Astro can generate the right responsive variants and avoid CLS.

## 9. v0.1 scope

**In:**
- World map with all talks plotted (talks with `lat`/`lng` only)
- Hover tooltip: title, venue, date, location, thumbnail
- List below the map (all talks, including those without coordinates)
- Hover-sync between map and list
- Click → talk detail page
- Responsive (desktop primary; mobile acceptable downgrade)
- Light + dark mode

**Out:**
- Year filter / range slider
- Talk-type filter (invited / oral / poster)
- Pan / zoom
- Click-to-pin tooltip
- Trajectory lines between sequential talks
- Past/upcoming color differentiation
- Cluster expansion (multiple talks at same city)
- Keyboard navigation

## 10. v0.2+ roadmap

These are flagged for consideration once v0.1 ships and patterns emerge from real use:

1. **Year filter**: range slider or year buttons. Useful when talks span multiple years prominently.
2. **Talk-type filter**: shape differentiation per type (circle = oral, square = poster, diamond = invited).
3. **Mobile-optimized version**: tap-driven tooltip, full-screen toggle, simpler list.
4. **Cross-link to hato-colle**: if pigeons were observed at the same place as a talk, mutual cross-link. Cute and unique.
5. **Publications cross-link**: from a talk, link to the publication it presented; from a publication, link to talks where it appeared.
6. **Past/upcoming differentiation**: subtle visual cue for future talks (lighter fill, dashed ring).

## 11. Open questions

- **Future talks**: include with `(upcoming)` annotation, same color? → **Current direction: include with annotation, revisit if visually crowded.**
- **Online-only talks**: omit from map, include in list with `location: "Online"`? → **Current direction: include in list only, no marker.**
- **Workshop series across multiple cities**: one entry per physical location? → **Current direction: one entry per physical location.**

## 12. Decision log

| Date | Decision | Rationale |
|---|---|---|
| 2026-05-15 | Atlas at `/atlas/`, top-level nav | Avoid burying; preserve URL elegance |
| 2026-05-15 | Talks only (not publications) | Geographic semantics clean only for talks |
| 2026-05-15 | Per-talk directory structure | Collocate assets; future-proof |
| 2026-05-15 | One photo per talk in v0.1 | Avoid carousel complexity |
| 2026-05-15 | Antique brass accent (#854F0B / #EF9F27) | Almanac aesthetic; warm but restrained |
| 2026-05-15 | Natural Earth projection | Standard editorial choice; balanced area/shape |
| 2026-05-15 | SSR land + island markers | Fast first paint, minimal JS |

---

**Version**: 0.1
**Authors**: hato.GNSS
**Status notes**: Implementation planned for hatognss.dev v0.1 launch (target weekend 2026-05-16/17).
