/**
 * Every built chunk carries a content hash in its name, and a release deletes
 * the set the release before it built, so a document that has been open across
 * one asks for a file that is no longer on the server. The same request is also
 * simply dropped whenever a visit is torn down with requests still open, or
 * refused by a crawler that has spent its budget for the page. None of those is
 * a fault in the page, and all of them arrive as one rejected import.
 *
 * What that rejection used to do was nothing, which was the worst of the
 * options: the promise that loads the landing route's chunk had no rejection
 * handler, so the page kept the prerendered markup it was served and never
 * hydrated. The menu, the forms and the router were dead on a page that looked
 * entirely normal, and the only notice of it was an unhandled rejection in the
 * console.
 *
 * So, in order: ask again, because a request dropped on its own usually answers
 * on the attempt after it; then reload once, because a document holding stale
 * chunk names is put right by fetching the current document; then stop and
 * report, because a second reload off the same failure is a loop a reader
 * cannot escape. Stopping leaves the prerendered markup where it is, which
 * still reads correctly, rather than replacing a readable page with a blank one
 * or an error screen.
 */

/** One reload per tab, and the flag is what makes it one rather than a loop. */
export const RELOAD_KEY = 'route-chunk-reload';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Runs `load` again when it rejects, up to `attempts` times. A chunk request
 * that was merely abandoned comes back on one of these; one whose file is gone
 * fails every time and the last failure is passed on to the caller.
 */
export function retrying(load, { attempts = 3, delayMs = 300, wait = sleep } = {}) {
  const ask = (left) =>
    load().catch((error) => {
      if (left <= 1) throw error;
      return wait(delayMs).then(() => ask(left - 1));
    });
  return ask(attempts);
}

/**
 * Decides what is left to try after the retries are spent. Returns what it did,
 * so it can be tested without a browser.
 */
export function recoverFromChunkFailure(error, environment) {
  const { storage, reload, hidden = false, reporter } = environment;
  let reloaded = true;
  try {
    reloaded = storage.getItem(RELOAD_KEY) === '1';
    if (!reloaded) storage.setItem(RELOAD_KEY, '1');
  } catch {
    // No session storage means no way to know whether this is the second time,
    // and an unbounded reload is worse than no reload.
    reloaded = true;
  }
  // A hidden page is a page nobody is reading - a crawler that screenshots and
  // exits, or a backgrounded tab - and reloading one buys the reader nothing
  // while costing the request.
  if (!reloaded && !hidden) {
    reload();
    return 'reload';
  }
  // Out of options, so this is worth reporting: the chunk is either genuinely
  // gone or was refused every time it was asked for. It goes through the
  // reporter's asset path rather than straight out, so it is still settled
  // against a request for the file itself and stays silent under a teardown.
  if (reporter && typeof reporter.asset === 'function') {
    reporter.asset('rejection', (error && error.message) || String(error));
  }
  return 'reported';
}
