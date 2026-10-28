<img src="public/icon-512.png" width="120" alt="">

# Southeast Arbor Care

Website for a family-owned tree service in Pasadena, Texas.

[southeastarbor.com](https://southeastarbor.com)

<img src="https://img.shields.io/badge/version-2026.44.2-1f4a32?style=for-the-badge" alt="Version 2026.44.2" />

Services, the towns it works in, reviews, a gallery and an estimate form. Each page is a finished HTML document before any JavaScript runs, then React hydrates it.

Everything on the site comes from plain modules in `src/content/`. A new town is one more entry in a list, and the JSON-LD is built from the same modules, so the structured data can't drift from the page. If a storm rolls through, set `stormMode` in `src/content/company.js` and every page gets a banner with the phone number.

The estimate form validates in the browser but isn't wired to an endpoint yet.

## Build

`npm run build` does a client build, an SSR build, and then `scripts/prerender.js` writes each route to its own `index.html` with its title, meta, JSON-LD and a preload for the hero image.

Two things worth knowing if you touch it:

- `src/routes.js` wraps each page so it only goes through `React.lazy` until its chunk has loaded. After that it renders straight through, which stops hydration from flashing a fallback over markup that's already on screen.
- The target is `es2019` on purpose. A browser one version short of optional chaining rejects the whole module and the page never hydrates. Compiling it down costs a few hundred bytes.

Photos go through `scripts/photos.sh`, which cuts 640, 1080 and 1600 px WebP, each held under a byte cap rather than a fixed quality. Only the WebP files are committed.

## Running it

```bash
npm install
npm run dev     # http://localhost:5199
npm run build
```

Node 22 or newer. `VITE_SITE_URL` overrides the canonical origin.

React 19, React Router 7, Vite 7, Tailwind CSS 3, on Vercel. Proprietary, see [LICENSE.md](LICENSE.md).

Built and maintained by [TaylorURL](https://www.taylorurl.com).
