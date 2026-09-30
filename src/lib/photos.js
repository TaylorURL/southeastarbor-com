/**
 * Every photograph ships as WebP at three widths, and the browser picks the one
 * the slot it lands in can use: a phone takes the 640 file, a desktop hero the
 * 1600. The width and height are the photograph's own proportions, so the box
 * is reserved before a byte of it arrives.
 *
 * The files are cut by scripts/photos.sh from the original photographs; a
 * photograph added to the site is added to this table in the same change.
 */
const SIZES = {
  'chainsaw-trunk': [1800, 1200],
  chipper: [1800, 1318],
  'climber-2': [1800, 1350],
  'hero-topping': [1800, 1200],
  'oak-canopy': [1204, 1600],
  rigging: [1800, 1200],
  storm: [1800, 1200],
  stump: [1800, 1200],
  trimming: [1314, 1600],
};

const WIDTHS = [640, 1080, 1600];

export function photoSet(src) {
  const name = src.replace(/^\/photos\//, '').replace(/\.\w+$/, '');
  const size = SIZES[name];
  if (!size) throw new Error(`No sizes on file for ${src}`);
  const [width, height] = size;
  const candidates = WIDTHS.map((w) => `/photos/${name}-${w}.webp ${Math.min(w, width)}w`);
  return { src: `/photos/${name}-1080.webp`, srcSet: candidates.join(', '), width, height };
}
