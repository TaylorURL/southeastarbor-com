// Writes every route into its own document after the build, so a crawler, a
// link preview and a reader on a slow phone are all served the page itself
// rather than an empty shell waiting on the bundle.
//
//     node scripts/prerender.js      (npm run build runs it)

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = 'dist';
const shell = readFileSync(join(DIST, 'index.html'), 'utf8');
const entry = pathToFileURL(join(process.cwd(), 'dist-ssr/entry-server.js')).href;
const { render, prepare, paths, company } = await import(entry);
await prepare();

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

// JSON inside a script element ends at the first </script, wherever it sits.
const scriptJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

// React writes a preload beside an image it is told to fetch early. Rendered to a
// string there is no head to put it in, so it comes out of the body and a proper
// one goes in the head instead.
const IMAGE_PRELOAD = /<link\s[^>]*rel="preload"[^>]*as="image"[^>]*\/?>/gi;

/** The hero photograph, preloaded with the same candidates the img offers. */
function heroPreload(body) {
  const tag = body.match(/<img\s[^>]*fetchPriority="high"[^>]*>/i)?.[0];
  if (!tag) return null;
  const attr = (name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'))?.[1];
  const srcset = attr('srcSet') || attr('srcset');
  const sizes = attr('sizes');
  if (!srcset)
    return `<link rel="preload" as="image" href="${attr('src')}" fetchpriority="high" />`;
  return `<link rel="preload" as="image" imagesrcset="${srcset}"${
    sizes ? ` imagesizes="${sizes}"` : ''
  } fetchpriority="high" />`;
}

function headTags(head, body) {
  return [
    `<title>${escapeAttr(head.title)}</title>`,
    ...head.meta.map(
      ([key, value, content]) => `<meta ${key}="${value}" content="${escapeAttr(content)}" />`,
    ),
    head.canonical ? `<link rel="canonical" href="${head.canonical}" />` : null,
    heroPreload(body),
    ...head.jsonLd.map((data) => `<script type="application/ld+json">${scriptJson(data)}</script>`),
  ]
    .filter(Boolean)
    .join('\n    ');
}

// Every document is whole before any script runs, so its first frame owes the
// bundle nothing. A module script and its preloads still start downloading as
// soon as the parser meets them, and on a phone connection that download
// competes with the hero photograph and the two faces the headline waits on.
// So the bundle is asked for one frame after the first paint, or 300ms in
// where no frame is drawn, and its chunks are not preloaded ahead of it.
//
// A document held open across a deploy names a bundle the next deploy removed;
// the page it holds still reads perfectly, so a failed load reloads once for
// the current names and a flag stops a build that has moved on from looping.
const MODULE_PRELOAD = /\s*<link rel="modulepreload"[^>]*>/g;
const boot = (src) =>
  `<script type="module">
      const flag = 'bundle-reload';
      const start = () =>
        import(${JSON.stringify(src)}).then(
          () => setTimeout(() => { try { sessionStorage.removeItem(flag); } catch {} }, 10000),
          () => {
            let spent = true;
            try {
              spent = sessionStorage.getItem(flag) === '1';
              sessionStorage.setItem(flag, '1');
            } catch {}
            if (!spent) location.reload();
          },
        );
      // A frame never comes in a tab that opened in the background or a page
      // being throttled, so a timer stands behind it and whichever fires first
      // starts the bundle; the controls are never left waiting on a paint.
      let started = false;
      const once = () => {
        if (started) return;
        started = true;
        start();
      };
      setTimeout(once, 300);
      requestAnimationFrame(() => requestAnimationFrame(once));
    </script>`;

const paintFirst = (html) =>
  html
    .replace(MODULE_PRELOAD, '')
    .replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/, (_tag, src) =>
      boot(src),
    );

function documentFor(url) {
  const { html, head } = render(url);
  if (!head) throw new Error(`${url} rendered without declaring its head`);
  const body = html.replace(IMAGE_PRELOAD, '');
  const out = paintFirst(shell)
    .replace(/<!--route-head-->[\s\S]*?<!--\/route-head-->/, headTags(head, body))
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  return { out, head };
}

const indexed = [];
for (const path of paths) {
  const { out, head } = documentFor(path);
  // `/services` and `/services/tree-removal` both exist, so each page is a file
  // named for its own address and the host serves it without the extension.
  const file = path === '/' ? join(DIST, 'index.html') : join(DIST, `${path}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, out);
  if (head.canonical) indexed.push(head.canonical);
  console.log(`${path.padEnd(44)} ${(out.length / 1024).toFixed(1)} KB`);
}

// Vercel serves this for any address it cannot match, which keeps the status an
// honest 404 rather than the home page answering 200 for a typo.
{
  const { out } = documentFor('/this-page-does-not-exist');
  writeFileSync(join(DIST, '404.html'), out);
  console.log(`${'404'.padEnd(44)} ${(out.length / 1024).toFixed(1)} KB`);
}

// The sitemap is the list of documents just written, so it cannot name a page
// the build did not produce or miss one it did.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexed.map((loc) => `  <url><loc>${loc}</loc></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);
console.log(`sitemap.xml: ${indexed.length} addresses under ${company.url}`);
