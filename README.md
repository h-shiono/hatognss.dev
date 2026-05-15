# hatognss.dev

Personal hub site for **hato.GNSS** — GNSS researcher and OSS maintainer.

Built with [Astro](https://astro.build/) (static-first, Islands Architecture), TypeScript strict, and Tailwind CSS v4.

## Quickstart

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # → ./dist/
pnpm preview      # serve ./dist/
pnpm astro check  # type-check content + .astro files
```

Requires Node 20+.

## Directory layout

```
src/
  assets/         # Astro-optimized images (use Image component)
  components/     # Grouped by role: layout/ hero/ cards/ ui/
  content/        # Type-safe content collections (see content/config.ts)
    publications/
    talks/
    projects/     # OSS + Works + Hobby, discriminated by `category`
    blog/
  layouts/
  lib/            # utils.ts, constants.ts
  pages/          # Routes
  styles/         # global.css (Tailwind v4 @theme), fonts.css
public/           # Unoptimized static assets (images, pdfs, robots.txt)
```

## Content collections

Schemas live in [`src/content/config.ts`](src/content/config.ts). Adding content:

| Type | Location | Filename pattern |
|---|---|---|
| Publication | `src/content/publications/` | `YYYY-short-slug.md` |
| Talk | `src/content/talks/` | `YYYY-MM-event-slug.md` |
| Project (OSS / Work / Hobby) | `src/content/projects/` | `slug.md` |
| Blog post | `src/content/blog/` | `YYYY-MM-DD-slug.md` |

Run `pnpm astro check` before committing.

## Deployment

Cloudflare Pages auto-deploys from `main`. Build command `pnpm build`, output `dist/`, `NODE_VERSION=20`. See [`CLAUDE.md`](CLAUDE.md) §11 for details.

## Operating manual

See [`CLAUDE.md`](CLAUDE.md) for the full operating manual covering identity scope, aesthetic direction, workflow, and pitfalls.

## License

Code (Astro components, TypeScript, styles, config) is licensed under [MIT](LICENSE).
Content (under `src/content/`, including blog posts, publication abstracts, talk summaries) is licensed under [CC BY-NC 4.0](LICENSE-CONTENT) unless otherwise noted.

## Contributing

This is a personal site. Typo fixes, broken-link reports, and obviously-correct bugfixes are welcome via PR or issue. Design, structure, or content changes are not accepted as PRs — feel free to open an issue for discussion instead.
