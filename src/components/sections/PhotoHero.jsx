import { Link } from 'react-router-dom';
import Photo from '../Photo';

/**
 * A photograph carries the page rather than sitting beside it. The scrim is two
 * gradients rather than one flat tint: a vertical one so the header clears the
 * sky, and a horizontal one so the copy column stays legible without dimming
 * the half of the frame the photograph is actually doing its work in.
 */
export default function PhotoHero({
  image,
  alt,
  eyebrow,
  title,
  intro,
  children,
  crumbs = [],
  compact = false,
  focus = 'center 42%',
}) {
  return (
    <section
      data-hero
      className={`relative isolate flex flex-col justify-center overflow-hidden bg-bark-900 ${
        compact ? 'min-h-[380px] md:min-h-[440px]' : 'min-h-[540px] md:min-h-[680px]'
      }`}
    >
      <Photo
        src={image}
        alt={alt}
        priority
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: focus }}
      />
      {/* The scrim clears the copy column and then gets out of the way fast, so
          the half of the frame the photograph is working in stays a photograph. */}
      <div className="scrim-hero-across absolute inset-0" />
      <div className="scrim-hero-down absolute inset-0" />

      <div
        className={`shell relative flex flex-col gap-5 ${compact ? 'py-16 md:py-20' : 'py-20 md:py-24'}`}
      >
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="text-[0.82rem] text-moss-200">
            {crumbs.map((crumb, i) => (
              <span key={crumb.path}>
                {i > 0 && <span className="px-2 opacity-50">/</span>}
                <Link to={crumb.path} className="pressable hover:text-paper-50">
                  {crumb.name}
                </Link>
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-8 shrink-0 bg-rigging-500" />
            <p className="label !text-moss-200">{eyebrow}</p>
          </div>
        )}

        <h1 className={`display max-w-4xl text-paper-50 ${compact ? 'h1' : 'h-hero'}`}>{title}</h1>

        {intro && <p className="max-w-xl text-lg leading-relaxed text-moss-200">{intro}</p>}
        {children && <div className="pt-3">{children}</div>}
      </div>
    </section>
  );
}
