export const SITE = {
  title: 'hato.GNSS',
  description: 'Independent GNSS researcher · OSS maintainer',
  url: 'https://hatognss.dev',
  author: 'hato.GNSS',
  locale: 'en',
} as const;

// Fill in handles/URLs before launch.
export const SOCIAL = {
  github: '',
  zenn: '',
  x: '',
  researchgate: '',
  email: '',
} as const;

export const NAV: ReadonlyArray<{ href: string; label: string }> = [
  { href: '/research/', label: 'Research' },
  { href: '/atlas/', label: 'Atlas' },
  { href: '/oss/', label: 'OSS' },
  { href: '/works/', label: 'Works' },
  { href: '/blog/', label: 'Blog' },
  { href: '/about/', label: 'About' },
];
