<p align="center"><img src="public/icon-512.png" width="120" alt=""></p>
<h1 align="center">Southeast Arbor Care</h1>
<p align="center">Website for a family-owned tree service in Pasadena, Texas.</p>
<p align="center"><a href="https://southeastarbor.com">southeastarbor.com</a></p>
<p align="center">
  <img src="https://img.shields.io/badge/version-2026.44.0-1f4a32?style=for-the-badge" alt="Version 2026.44.0" />
</p>

Southeast Arbor Care has been taking down, trimming and grinding out trees around Pasadena since 1991. Terry Lloyd runs it, and the crew works Pasadena, Deer Park, La Porte, Clear Lake, Webster, Baytown and southeast Houston. The site puts the phone number and a free estimate form within reach on every page.

<details>
<summary>What's on the site</summary>

- A page for each service: tree removal, trimming and pruning, stump grinding, storm and emergency work, lot clearing, and tree health
- A page for each town the crew serves, linking to the nearby towns and the services offered there
- A free estimate form that asks for the address and an optional photo of the tree
- A bar pinned to the bottom of the screen on phones with "Call" and "Free Estimate"
- A storm banner with the phone number that goes up on every page when `stormMode` is turned on in `src/content/company.js`
- Customer reviews from BBB, Yelp and Nextdoor, and a gallery of tree work

</details>

<details>
<summary>Running it locally</summary>

You need Node 22 or newer.

```bash
npm install
npm run dev     # http://localhost:5199
npm run build   # builds to dist/ and prerenders every page
```

The phone number, hours, address and other business details are in `src/content/company.js`. Services, towns, reviews and gallery photos are next to it in `src/content/`. Set `VITE_SITE_URL` if you need the canonical links to point somewhere other than `https://southeastarbor.com`.

</details>

## Built with

React 19, React Router 7, Vite 7 and Tailwind CSS 3. Hosted on Vercel.

<details>
<summary>License</summary>

Proprietary. Copyright (c) 2026 TaylorURL LLC, all rights reserved. See [LICENSE.md](LICENSE.md).

</details>

Built and maintained by [TaylorURL](https://www.taylorurl.com).
