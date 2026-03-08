const SAFE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ALLOWED_TAGS = new Set([
  'p',
  'br',
  'strong',
  'em',
  'ul',
  'ol',
  'li',
  'blockquote',
  'h2',
  'h3',
  'h4',
  'a',
]);

const ALLOWED_HREF_PATTERN = /^(https?:\/\/|\/|#)/i;

export function sanitizeRichText(html: string): string {
  return html.replace(/<\/?([a-zA-Z0-9-]+)([^>]*)>/g, (fullMatch, rawTag, rawAttrs = '') => {
    const tag = String(rawTag).toLowerCase();

    if (!ALLOWED_TAGS.has(tag)) {
      return '';
    }

    if (fullMatch.startsWith('</')) {
      return `</${tag}>`;
    }

    if (tag === 'a') {
      const hrefMatch = rawAttrs.match(/href\s*=\s*['"]([^'"]+)['"]/i);
      const href = hrefMatch?.[1] ?? '#';
      const safeHref = ALLOWED_HREF_PATTERN.test(href) ? href : '#';
      return `<a href="${safeHref}" rel="noopener noreferrer">`;
    }

    return `<${tag}>`;
  });
}

export function isSafeSlug(slug: string): boolean {
  return SAFE_SLUG_PATTERN.test(slug);
}

export function sanitizeCssToken(token: string): string {
  return token.replace(/[^a-zA-Z0-9_-]/g, '');
}

export function sanitizeCssVariableValue(value: string): string | null {
  const normalized = value.trim();

  if (/^#[0-9a-fA-F]{3,8}$/.test(normalized)) {
    return normalized;
  }

  if (/^(rgb|hsl)a?\([^\n\r;{}]+\)$/.test(normalized)) {
    return normalized;
  }

  if (/^var\(--[a-zA-Z0-9_-]+\)$/.test(normalized)) {
    return normalized;
  }

  return null;
}
