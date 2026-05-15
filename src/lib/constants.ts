export const SITE = {
  title: 'hato.GNSS',
  description: 'Independent GNSS researcher · OSS maintainer',
  url: 'https://hatognss.dev',
  author: 'hato.GNSS',
  locale: 'en',
} as const;

// Fill in handles/URLs before launch.
export const SOCIAL = {
  github: 'https://github.com/h-shiono',
  zenn: 'https://zenn.dev/hatognss',
  x: 'https://x.com/HatoGnss',
  researchgate: '',
  email: '',
} as const;

export const NAV: ReadonlyArray<{ href: string; label: string }> = [
  { href: '/research/', label: 'Research' },
  { href: '/oss/', label: 'OSS' },
  { href: '/works/', label: 'Works' },
  { href: '/atlas/', label: 'Atlas' },
  { href: '/blog/', label: 'Blog' },
];
