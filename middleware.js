/**
 * Holds the site offline while TaylorURL has it paused, and lets every page
 * through the rest of the time.
 *
 * TaylorURL pauses a client's site once an invoice is a week past due and
 * lifts the pause a few minutes after it is paid. The answer comes from its
 * own endpoint, and anything short of a clear yes from there - an error, a
 * slow reply, no reply - leaves the site up, so trouble on that side never
 * takes this site down with it.
 */

const SITE = 'southeastarbor.com';
const STATUS_URL = `https://www.taylorurl.com/api/site-status?site=${SITE}`;

/** How long a page waits on the answer before it loads anyway. */
const WAIT_MS = 1500;

/** How long an answer is trusted before the question is asked again. */
const REMEMBER_MS = 60 * 1000;

export const config = {
  // Pages, not files: a path ending in an extension is a script, a style, an
  // image or a font, and none of those needs the question asked.
  matcher: ['/((?!.*\\.[^/]*$).*)'],
};

let answer = { paused: false, until: 0 };

async function isPaused() {
  const now = Date.now();
  if (now < answer.until) return answer.paused;
  let paused = false;
  try {
    const response = await fetch(STATUS_URL, { signal: AbortSignal.timeout(WAIT_MS) });
    if (response.ok) paused = (await response.json()).paused === true;
  } catch {
    // Unreachable or too slow to wait for: the site stays up.
  }
  answer = { paused, until: now + REMEMBER_MS };
  return paused;
}

const PAGE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Temporarily Unavailable | Southeast Arbor Care</title>
    <style>
      @font-face { font-family: 'Archivo'; font-weight: 100 900; font-display: swap; src: url('/fonts/archivo-latin-variable.woff2') format('woff2'); }
      @font-face { font-family: 'Inter'; font-weight: 100 900; font-display: swap; src: url('/fonts/inter-latin-variable.woff2') format('woff2'); }
      :root {
        color-scheme: light dark;
        --ground: #faf8f3;
        --heading: #16201a;
        --body: #3c4640;
        --faint: #5d665f;
      }
      @media (prefers-color-scheme: dark) {
        :root { --ground: #0e1511; --heading: #f2efe6; --body: #c3cfc6; --faint: #9aa79e; }
      }
      body { margin: 0; min-height: 100dvh; display: grid; place-items: center; gap: 1rem; background: var(--ground); color: var(--heading); font-family: 'Inter', sans-serif; }
      main { max-width: 32rem; padding: 2rem 1.5rem; text-align: center; display: flex; flex-direction: column; gap: 1rem; }
      h1 { margin: 0; font-family: 'Archivo', sans-serif; font-weight: 800; letter-spacing: -0.02em; font-size: 1.6rem; line-height: 1.2; overflow-wrap: anywhere; }
      p { margin: 0; color: var(--body); line-height: 1.6; }
      .owner { font-size: 0.875rem; color: var(--faint); }
      a { color: inherit; }
    </style>
  </head>
  <body>
    <main>
      <h1>Southeast Arbor Care is temporarily unavailable</h1>
      <p>Please check back soon.</p>
      <p class="owner">If this is your website, call TaylorURL at <a href="tel:+12818628687">(281) 862-8687</a>.</p>
    </main>
  </body>
</html>
`;

export default async function middleware() {
  if (!(await isPaused())) return;
  return new Response(PAGE, {
    status: 503,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Retry-After': '3600',
      // How TaylorURL's own monitoring tells a pause from an outage.
      'X-Site-Paused': '1',
    },
  });
}
