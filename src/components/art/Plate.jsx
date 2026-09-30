/**
 * One of the drawn plates under public/art. The files paint no ground of their
 * own, so the light card behind the drawing is set here, and it stays light on
 * every theme because the inks were chosen against it.
 */
export default function Plate({ name, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-[4px] bg-paper-100 ${className}`}>
      <img
        src={`/art/${name}.svg`}
        alt=""
        width="240"
        height="160"
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
    </div>
  );
}
