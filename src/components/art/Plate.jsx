/**
 * One of the drawn plates under public/art. A plate paints nothing behind its
 * drawing, and its inks are mid and pale tones that read on the light and the
 * dark grounds alike, so it sits straight on whatever surface holds it.
 */
export default function Plate({ name, className = '' }) {
  return (
    <img
      src={`/art/${name}.svg`}
      alt=""
      width="240"
      height="160"
      loading="lazy"
      decoding="async"
      className={`block h-auto ${className}`}
    />
  );
}
