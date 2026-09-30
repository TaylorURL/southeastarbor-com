import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { company } from '../../content/company';
import { services } from '../../content/services';

const links = [
  { to: '/service-areas', label: 'Service Areas' },
  { to: '/our-work', label: 'Our Work' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/about', label: 'About' },
];

function Wordmark() {
  return (
    <Link
      to="/"
      className="pressable -my-1.5 py-1.5 leading-none hover:opacity-80"
      aria-label="Southeast Arbor Care, home"
    >
      <span className="block font-display text-[1.05rem] font-extrabold tracking-[0.3em] text-link">
        SOUTHEAST
      </span>
      <span className="block font-display text-[1.05rem] font-extrabold tracking-[0.3em] text-heading">
        ARBOR CARE
      </span>
    </Link>
  );
}

/**
 * The status strip above the bar. It says the two things a caller wants to know
 * before anything else, and it gets out of the way on the way down the page:
 * scrolling down slides the whole header up by the strip's height so only the
 * bar stays docked, and the first scroll back up brings it back.
 */
function useScrollState() {
  const [state, setState] = useState({ scrolled: false, compact: false });
  useEffect(() => {
    // Sliding the strip away is motion; a visitor who asked for less keeps it.
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let last = window.scrollY;
    let frame = 0;
    const read = () => {
      frame = 0;
      const y = window.scrollY;
      const down = y > last;
      last = y;
      const scrolled = y > 8;
      const compact = !still && y > 48 && down;
      // Two flags rather than the offset, and a render only when one flips.
      setState((prev) =>
        prev.scrolled === scrolled && prev.compact === compact ? prev : { scrolled, compact },
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return state;
}

/**
 * The services panel: the six services as rows on the left, and on the right
 * the one thing the bar wants a worried homeowner to see, which is the number
 * that answers after hours.
 */
function ServicesPanel({ id, onNavigate }) {
  return (
    <div id={id} className="nav-panel">
      <div className="shell grid gap-8 py-8 lg:grid-cols-[1fr_20rem]">
        <ul className="grid gap-x-8 sm:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                to={`/services/${service.slug}`}
                onClick={onNavigate}
                className="pressable group block rounded-[4px] px-3 py-3 hover:bg-raised"
              >
                <span className="display h3 block text-heading group-hover:text-link">
                  {service.name}
                </span>
                <span className="mt-1 block text-[0.88rem] leading-snug text-body">
                  {service.short}
                </span>
              </Link>
            </li>
          ))}
          <li className="sm:col-span-2">
            <Link
              to="/services"
              onClick={onNavigate}
              className="pressable mt-2 inline-block px-3 py-2 text-[0.9rem] font-semibold text-link hover:underline"
            >
              All Services →
            </Link>
          </li>
        </ul>
        <aside className="rounded-[4px] bg-bark-950 p-6 text-moss-200">
          <p className="label !text-rigging-200">Tree on the house?</p>
          <p className="display h3 mt-3 text-paper-50">
            Call. Storm calls are answered after hours.
          </p>
          <a
            href={`tel:${company.phoneHref}`}
            className="pressable mono mt-4 block text-[1.3rem] font-semibold text-paper-50 hover:text-rigging-200"
          >
            {company.phone}
          </a>
          <Link
            to="/services/storm-and-emergency"
            onClick={onNavigate}
            className="pressable mt-3 inline-block text-[0.88rem] text-moss-200 underline underline-offset-4 hover:text-paper-50"
          >
            Storm and Emergency Work
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const { scrolled, compact } = useScrollState();
  const { pathname } = useLocation();
  const panelRoot = useRef(null);

  // A route change closes whatever was open.
  useEffect(() => {
    setMenuOpen(false);
    setPanelOpen(false);
  }, [pathname]);

  // Escape and a click outside close the panel, the way every other disclosure does.
  useEffect(() => {
    if (!panelOpen) return undefined;
    const onKey = (event) => event.key === 'Escape' && setPanelOpen(false);
    const onPointer = (event) => {
      if (panelRoot.current && !panelRoot.current.contains(event.target)) setPanelOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [panelOpen]);

  const close = () => {
    setMenuOpen(false);
    setPanelOpen(false);
  };

  return (
    <header
      className="site-header"
      data-scrolled={scrolled || menuOpen || panelOpen ? 'true' : 'false'}
      data-compact={compact && !menuOpen && !panelOpen ? 'true' : 'false'}
    >
      <div className="site-header__strip">
        <div className="shell flex items-center justify-between gap-4">
          <p className="truncate text-moss-200">
            Family owned in Pasadena since {company.foundedYear} · Free estimates · Fully insured
          </p>
          <p className="hidden shrink-0 text-rigging-200 md:block">{company.afterHoursNote}</p>
        </div>
      </div>

      <div ref={panelRoot} className="site-header__bar">
        <div className="shell flex items-center gap-8 py-3.5">
          <Wordmark />

          <nav className="ml-6 hidden items-center gap-7 lg:flex" aria-label="Main">
            <button
              className={`pressable nav-link flex items-center gap-1.5 hover:text-link active:opacity-80 ${
                panelOpen || pathname.startsWith('/services') ? 'text-accent-ink' : 'text-heading'
              }`}
              type="button"
              aria-expanded={panelOpen}
              aria-controls="services-panel"
              onClick={() => setPanelOpen((v) => !v)}
            >
              Services
              <svg viewBox="0 0 12 12" className="nav-caret h-3 w-3" aria-hidden="true">
                <path
                  d="M2.5 4.5 6 8l3.5-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </button>
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="pressable nav-link text-heading hover:text-link active:opacity-80 aria-[current=page]:text-accent-ink"
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
                className="pressable mono block text-[1.15rem] font-semibold leading-tight text-link hover:text-accent-ink"
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
              className="btn btn-outline px-3 py-2 text-sm hover:bg-raised active:opacity-80 lg:hidden"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {panelOpen && (
          <div className="hidden lg:block">
            <ServicesPanel id="services-panel" onNavigate={close} />
          </div>
        )}

        {/* A menu taller than a short phone scrolls inside itself rather than
            losing its last rows below the fold. */}
        <div
          id="mobile-nav"
          hidden={!menuOpen}
          className="mobile-nav max-h-[calc(100dvh-var(--header-height))] overflow-y-auto overscroll-contain lg:hidden"
        >
          <div className="shell flex flex-col py-2">
            {[{ to: '/services', label: 'Services' }, ...links].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={close}
                className="pressable border-b border-line py-3 font-medium text-heading last:border-0 hover:text-link"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
