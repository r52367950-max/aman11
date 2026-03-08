const SAFE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ALLOWED_TAGS = new Set(['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'h2', 'h3', 'h4', 'a']);
const ALLOWED_HREF_PATTERN = /^(https?:\/\/|\/|#)/i;

export function sanitizeRichText(html: string): string {
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return escapeHtml(html);
  }

  const parser = new DOMParser();
  const document = parser.parseFromString(html, 'text/html');
  const fragment = document.createDocumentFragment();

  for (const node of Array.from(document.body.childNodes)) {
    const sanitized = sanitizeNode(node, document);
    if (sanitized) {
      fragment.appendChild(sanitized);
    }
  }

  const container = document.createElement('div');
  container.appendChild(fragment);
  return container.innerHTML;
}

function sanitizeNode(node: Node, document: Document): Node | null {
  if (node.nodeType === Node.TEXT_NODE) {
    return document.createTextNode(node.textContent ?? '');
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const element = node as Element;
  const tag = element.tagName.toLowerCase();
  if (!ALLOWED_TAGS.has(tag)) {
    const passthrough = document.createDocumentFragment();
    for (const child of Array.from(element.childNodes)) {
      const sanitizedChild = sanitizeNode(child, document);
      if (sanitizedChild) {
        passthrough.appendChild(sanitizedChild);
      }
    }
    return passthrough;
  }

  const cleanElement = document.createElement(tag);

  if (tag === 'a') {
    const href = element.getAttribute('href') ?? '#';
    const safeHref = ALLOWED_HREF_PATTERN.test(href.trim()) ? href.trim() : '#';
    cleanElement.setAttribute('href', safeHref);
    cleanElement.setAttribute('rel', 'noopener noreferrer');
  }

  for (const child of Array.from(element.childNodes)) {
    const sanitizedChild = sanitizeNode(child, document);
    if (sanitizedChild) {
      cleanElement.appendChild(sanitizedChild);
    }
  }

  return cleanElement;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
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
