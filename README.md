<h1 align="center">Southeast Arbor Care</h1>

<p align="center">
  <b>Tree removal, trimming and stump grinding in Pasadena, Texas</b>
</p>
<p align="center">
  Family owned since 2000, serving Pasadena, Deer Park, La Porte and Clear Lake. Call (713) 472-1488.<br />
  Live at <a href="https://southeastarbor.com">southeastarbor.com</a>.
</p>
<p align="center">
  <sub>Published for reading. Proprietary — see <a href="LICENSE.md">LICENSE.md</a>. Outside contributions are not accepted.</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2026.40.1-1f4a32?style=for-the-badge" alt="Version 2026.40.1" />
  <img src="https://img.shields.io/badge/React-19-1f4a32?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-7-1f4a32?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 7" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-1f4a32?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 3" />
  <img src="https://img.shields.io/badge/Vercel-111a14?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<br />

## Pages

| Route                  | Holds                          |
| :--------------------- | :----------------------------- |
| `/`                    | Hero, services, reviews, areas |
| `/services`            | Every service                  |
| `/services/:slug`      | One service in detail          |
| `/service-areas`       | Every town served              |
| `/service-areas/:slug` | One town                       |
| `/about`               | Terry and the company          |
| `/our-work`            | Photos from the job            |
| `/reviews`             | Published customer reviews     |
| `/free-estimate`       | The estimate request form      |

## Stack

| Layer       | Technology                                   |
| :---------- | :------------------------------------------- |
| UI          | React 19 + React Router 7                    |
| Build & dev | Vite 7                                       |
| Styling     | Tailwind CSS 3, on tokens in `src/index.css` |
| Footer bar  | `@taylorurl/split-rail`                      |
| Hosting     | Vercel                                       |
| Versioning  | CalVer                                       |

## Getting started

```bash
npm install
npm run dev           # Vite dev server on port 5199
npm run build         # production build to dist
```

Node 22 or newer. `VITE_SITE_URL` sets the origin the canonical tags and structured data are built from, and falls back to `https://southeastarbor.com`.

Every business fact the site states lives in `src/content/company.js`: phone, address, hours, owner, credentials and profile links. An empty value there is how a fact that is not established yet is held. Services, towns, reviews and gallery photos live beside it in `src/content/`.

### Scripts

| Script                 | Does                                         |
| :--------------------- | :------------------------------------------- |
| `npm run dev`          | Start the Vite dev server.                   |
| `npm run build`        | Production build to `dist`.                  |
| `npm run preview`      | Serve the built output.                      |
| `npm run lint`         | Lint with ESLint.                            |
| `npm run lint:fix`     | Lint and fix what ESLint can fix on its own. |
| `npm run format`       | Format the repo with Prettier.               |
| `npm run format:check` | Check formatting without writing.            |

## How it works

- **Every route writes its own head.** The site renders in the browser, so `src/lib/seo.js` sets the title, description, canonical, robots, Open Graph and JSON-LD as each route mounts.
- **Storm mode is one switch.** `stormMode` in `company.js` puts the emergency bar above every page.
- **Search engines are kept off for now.** `vercel.json` sends `X-Robots-Tag: noindex` on every response. Remove that header when the site launches.
- **Browser errors reach the studio's monitoring.** A snippet in `index.html` reports uncaught errors, rejections, failed resource loads and 5xx responses, capped at ten per page.
- **Traffic is counted without cookies.** The analytics tracker loads after the page does and carries this site's public key.

## Project structure

```
southeastarbor-com/
├── api/
│   └── version.js          the commit the running deployment was built from
├── public/
│   ├── fonts/              Archivo, Inter and IBM Plex Mono (woff2)
│   ├── photos/             job photos
│   ├── video/              the hero loop
│   └── release.json        the version and branch this build reports
├── src/
│   ├── components/
│   │   ├── forms/          EstimateForm
│   │   ├── layout/         Header, Footer, Layout, CallRail, StormBanner
│   │   └── sections/       PhotoHero, EstimateCta, PageHeader
│   ├── content/            company, services, areas, reviews, gallery
│   ├── lib/                seo.js, structured-data.js
│   ├── pages/              one file per route
│   ├── App.jsx             the route table
│   ├── main.jsx            browser entry
│   └── index.css           fonts, tokens, base layer
├── index.html              head metadata, the error reporter, the tracker
└── vercel.json             caching, the SPA fallback, the noindex header
```
