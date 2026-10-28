<img src="public/icon-512.png" width="120" alt="">

# Southeast Arbor Care

Website for a family-owned tree service in Pasadena, Texas.

[southeastarbor.com](https://southeastarbor.com)

<img src="https://img.shields.io/badge/version-2026.44.0-1f4a32?style=for-the-badge" alt="Version 2026.44.0" />

Services, the towns it works in, reviews, a gallery and an estimate form. React, prerendered to static HTML at build time, then hydrated. Every page is a full document before any JavaScript runs.

## How it's built

- **Content is data.** Services, towns, reviews and the gallery are plain modules in `src/content/`. Pages are templates over them. A new town is a new entry, not a new page.
- **Prerendered.** `npm run build` does a client build, an SSR build, then `scripts/prerender.js` writes each route to its own `index.html` with its title, meta, JSON-LD and a hero image preload.
- **One chunk per page.** A small wrapper in `src/routes.js` only goes through `React.lazy` until a chunk is loaded. After that it renders directly, so hydration never flashes a fallback over markup that's already there.
- **Framework in its own chunk.** React and the router change a few times a year. Site code changes every release. Splitting them means a deploy doesn't bust the framework cache.

<details>
<summary>Decisions and tradeoffs</summary>

- Targets `es2019`. A browser one version short of optional chaining rejects the whole module and the page never hydrates. Compiling it down costs a few hundred bytes.
- Structured data comes from the same content modules as the pages, so the two can't disagree.
- Light, dark and gray themes. A head script applies the saved choice before first paint. No choice means follow the system.
- `middleware.js` checks a TaylorURL status endpoint and shows a holding page if the site is paused. It waits 1.5 seconds at most, caches the answer for a minute, and fails open.
- `api/version.js` returns the deployed commit, uncached.
- `scripts/photos.sh` cuts photos to 640, 1080 and 1600 px WebP, each held under a byte cap instead of a fixed quality. Only the WebP files are committed.
- The estimate form validates in the browser, but the submit isn't wired to an endpoint yet.
- Set `stormMode` in `src/content/company.js` and a storm banner with the phone number goes on every page.

</details>

## Running it locally

Needs Node 22 or newer.

```bash
npm install
npm run dev     # http://localhost:5199
npm run build   # client build, SSR build, then prerender into dist/
npm run lint
npm run format:check
```

`VITE_SITE_URL` overrides the canonical origin, which defaults to `https://southeastarbor.com`.

<details>
<summary>CI</summary>

Every pull request runs one `check` job: an attribution check, then `format:check`, `lint` and `build`. A release into `main` also has to move the version in `package.json`, `public/release.json` and the README badge together.

</details>

## Built with

React 19, React Router 7, Vite 7 and Tailwind CSS 3. Hosted on Vercel.

<details>
<summary>License</summary>

Proprietary. Copyright (c) 2026 TaylorURL LLC, all rights reserved. See [LICENSE.md](LICENSE.md).

</details>

Built and maintained by [TaylorURL](https://www.taylorurl.com).
