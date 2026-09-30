import { useEffect, useState } from 'react';

const KEY = 'visits-uncounted';

function read() {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * Turns the visit counter off in this browser. The loader in index.html reads
 * the same key before it fetches the counter, so the next page is not counted.
 * Until the browser has been read the switch shows nothing it cannot back up.
 */
export default function CounterSwitch() {
  const [off, setOff] = useState(null);
  useEffect(() => setOff(read()), []);

  const toggle = () => {
    const next = !off;
    try {
      if (next) localStorage.setItem(KEY, '1');
      else localStorage.removeItem(KEY);
    } catch {
      return;
    }
    setOff(next);
  };

  return (
    <div className="card mt-8 flex flex-wrap items-center justify-between gap-4 p-6">
      <div>
        <p className="font-semibold text-heading">Visit counter in this browser</p>
        <p className="mt-1 text-[0.92rem] text-body" aria-live="polite">
          {off === null
            ? 'Checking this browser.'
            : off
              ? 'Off. Your visits are not counted.'
              : 'On.'}
        </p>
      </div>
      <button
        type="button"
        onClick={toggle}
        disabled={off === null}
        aria-pressed={off === true}
        className="btn btn-outline"
      >
        {off ? 'Turn Counting Back On' : 'Stop Counting My Visits'}
      </button>
    </div>
  );
}
