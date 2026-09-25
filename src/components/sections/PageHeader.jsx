import { Link } from 'react-router-dom';

export default function PageHeader({ eyebrow, title, intro, crumbs = [] }) {
  return (
    <section className="border-b border-paper-200 bg-paper-100">
      <div className="shell py-12 md:py-16">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5 text-[0.82rem] text-ink-700">
            {crumbs.map((crumb, i) => (
              <span key={crumb.path}>
                {i > 0 && <span className="px-2 text-tan-300">/</span>}
                <Link to={crumb.path} className="hover:text-canopy-700">
                  {crumb.name}
                </Link>
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl display h1 text-bark-900">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-700">{intro}</p>}
      </div>
    </section>
  );
}
