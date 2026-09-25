import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { company } from '../../content/company';

const nav = [
  { to: '/services', label: 'Services' },
  { to: '/service-areas', label: 'Service Areas' },
  { to: '/our-work', label: 'Our Work' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/about', label: 'About' },
];

function Wordmark() {
  return (
    <Link to="/" className="leading-none" aria-label="Southeast Arbor Care, home">
      <span className="block font-display text-[1.05rem] font-extrabold tracking-[0.3em] text-canopy-700">
        SOUTHEAST
      </span>
      <span className="block font-display text-[1.05rem] font-extrabold tracking-[0.3em] text-bark-900">
        ARBOR CARE
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-bark-950 text-[0.78rem]">
        <div className="shell flex flex-wrap items-center justify-between gap-2 py-2">
          <p className="text-moss-200">
            Family owned in Pasadena since {company.foundedYear} · Free estimates · Fully insured
          </p>
          <p className="text-rigging-200">{company.afterHoursNote}</p>
        </div>
      </div>

      <div className="border-b border-paper-200 bg-paper-50">
        <div className="shell flex items-center gap-8 py-3.5">
          <Wordmark />

          <nav className="ml-6 hidden items-center gap-7 lg:flex" aria-label="Main">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-[0.95rem] font-medium transition-colors ${
                    isActive ? 'text-rigging-600' : 'text-bark-900 hover:text-canopy-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <span className="label block">Talk to {company.owner.split(' ')[0]}</span>
              <a
                href={`tel:${company.phoneHref}`}
                className="mono block text-[1.15rem] font-semibold leading-tight text-canopy-700"
              >
                {company.phone}
              </a>
            </div>
            <Link
              to="/free-estimate"
              className="btn btn-primary hidden py-3 text-[0.95rem] sm:inline-flex"
            >
              Get a Free Estimate
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="rounded border border-paper-200 px-3 py-2 text-sm font-semibold text-bark-900 lg:hidden"
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        <div id="mobile-nav" hidden={!open} className="border-t border-paper-200 lg:hidden">
          <div className="shell flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-paper-100 py-3 font-medium text-bark-900 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/free-estimate"
              onClick={() => setOpen(false)}
              className="btn btn-primary my-3"
            >
              Get a Free Estimate
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
