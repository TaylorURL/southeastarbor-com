/**
 * The ballpark the estimator quotes. These are RANGES, not prices, and they are
 * Terry's to set -- the numbers below are placeholders drawn from what tree work
 * in the Houston market generally runs, and every one of them should be replaced
 * with his own before this goes live. Publishing somebody else's pricing as
 * though it were theirs is the fastest way to lose a job on the doorstep.
 *
 * The tool exists because the single question every caller asks first is "what
 * does that cost", and every competitor in Pasadena answers it with "we'd have
 * to come look". Answering it on the page, honestly, as a range that the site
 * says out loud is a range, is the thing that gets the phone call.
 */
export const sizes = [
  { id: 'small', label: 'Under 30 ft', hint: 'Crape myrtle, young pine, big shrub', factor: 1 },
  { id: 'medium', label: '30 – 60 ft', hint: 'Typical yard oak or pecan', factor: 2.1 },
  { id: 'large', label: '60 – 80 ft', hint: 'Mature pine or water oak', factor: 3.4 },
  { id: 'xlarge', label: 'Over 80 ft', hint: 'Heritage live oak, multi-day', factor: 4.8 },
];

export const jobs = [
  { id: 'removal', label: 'Tree removal', base: [420, 680], slug: 'tree-removal' },
  { id: 'trim', label: 'Trimming & pruning', base: [240, 400], slug: 'tree-trimming-and-pruning' },
  { id: 'stump', label: 'Stump grinding', base: [140, 240], slug: 'stump-grinding' },
  { id: 'storm', label: 'Storm damage', base: [380, 720], slug: 'storm-and-emergency' },
];

export const access = [
  { id: 'open', label: 'Open yard', hint: 'Truck and chipper can get to it', factor: 1 },
  { id: 'gate', label: 'Through a gate', hint: 'Carried out to the street', factor: 1.22 },
  { id: 'tight', label: 'Over the house', hint: 'Rigged out piece by piece', factor: 1.55 },
];

/** Rounded to the nearest $10 so a range never reads like a quote. */
export function estimate({ job, size, accessId }) {
  const j = jobs.find((x) => x.id === job);
  const s = sizes.find((x) => x.id === size);
  const a = access.find((x) => x.id === accessId);
  if (!j || !s || !a) return null;
  const round = (n) => Math.round((n * s.factor * a.factor) / 10) * 10;
  return { low: round(j.base[0]), high: round(j.base[1]), slug: j.slug, job: j.label };
}
