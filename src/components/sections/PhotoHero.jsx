import { Link } from 'react-router-dom';

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
      className={`relative isolate flex flex-col justify-center overflow-hidden bg-bark-900 ${
        compact ? 'min-h-[380px] md:min-h-[440px]' : 'min-h-[540px] md:min-h-[680px]'
      }`}
    >
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: focus }}
        fetchPriority="high"
        decoding="async"
      />
      {/* The scrim clears the copy column and then gets out of the way fast, so
          the half of the frame the photograph is working in stays a photograph. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(17,26,20,0.95) 0%, rgba(17,26,20,0.88) 26%, rgba(17,26,20,0.42) 54%, rgba(17,26,20,0.06) 80%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(17,26,20,0.6) 0%, rgba(17,26,20,0) 26%, rgba(17,26,20,0) 72%, rgba(17,26,20,0.45) 100%)',
        }}
      />

      <div className={`shell relative ${compact ? 'py-16 md:py-20' : 'py-20 md:py-32'}`}>
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5 text-[0.82rem] text-moss-200">
            {crumbs.map((crumb, i) => (
              <span key={crumb.path}>
                {i > 0 && <span className="px-2 opacity-50">/</span>}
                <Link to={crumb.path} className="hover:text-paper-50">
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

        <h1 className={`display mt-5 max-w-3xl text-paper-50 ${compact ? 'h1' : 'h-hero'}`}>
          {title}
        </h1>

        {intro && <p className="mt-6 max-w-xl text-lg leading-relaxed text-moss-200">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
