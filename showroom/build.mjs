/* Inlines every script and font into one self-contained HTML document, so the
   showroom can be opened from a file:// URL or published as a single page. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const read = (p) => fs.readFileSync(path.join(here, p), 'utf8');

let html = read('index.html');

// fonts -> data URIs
html = html.replace(/url\('(assets\/fonts\/[^']+\.woff2)'\)/g, (_, file) => {
  const b64 = fs.readFileSync(path.join(here, file)).toString('base64');
  return `url('data:font/woff2;base64,${b64}')`;
});

// scripts -> inline, in the order the document lists them
html = html.replace(/<script src="([^"]+)"><\/script>/g, (_, file) => {
  const code = read(file).replace(/<\/script/gi, '<\\/script');
  return `<script>\n${code}\n</script>`;
});

fs.mkdirSync(path.join(here, 'dist'), { recursive: true });
const out = path.join(here, 'dist/hypercar.html');
fs.writeFileSync(out, html);
console.log(`${out}  ${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)} MB`);
