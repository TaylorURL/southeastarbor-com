import { Link } from 'react-router-dom';

export default function PageHeader({ eyebrow, title, intro, crumbs = [] }) {
  return (
    <section className="border-b border-line bg-raised">
      <div className="shell flex flex-col gap-4 py-12 md:py-16">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="text-[0.82rem] text-body">
            {crumbs.map((crumb, i) => (
              <span key={crumb.path}>
                {i > 0 && <span className="px-2 text-body opacity-50">/</span>}
                <Link to={crumb.path} className="pressable hover:text-link">
                  {crumb.name}
                </Link>
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="max-w-3xl display h1 text-heading">{title}</h1>
        {intro && <p className="max-w-2xl text-lg leading-relaxed text-body">{intro}</p>}
      </div>
    </section>
  );
}
