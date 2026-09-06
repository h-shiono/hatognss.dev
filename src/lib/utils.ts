export function formatDate(date: Date, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatYearMonth(date: Date, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
  }).format(date);
}

// Detects Japanese text (kana or CJK ideographs) so a JA title can carry
// lang="ja" and the slightly looser line-height it needs.
const JA_RE = /[\u3040-\u30ff\u3400-\u9fff\uff66-\uff9f]/;

export function isJapanese(text: string): boolean {
  return JA_RE.test(text);
}
