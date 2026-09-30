import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { company } from '../../content/company';
import { services } from '../../content/services';
import Plate from '../art/Plate';

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
      className="pressable flex h-11 flex-col justify-center leading-none hover:opacity-80 active:opacity-70"
      aria-label="Southeast Arbor Care, home"
    >
      <span className="block font-display text-[0.95rem] font-extrabold tracking-[0.3em] text-link">
        SOUTHEAST
      </span>
      <span className="mt-1 block font-display text-[0.95rem] font-extrabold tracking-[0.3em] text-heading">
        ARBOR CARE
      </span>
    </Link>
  );
}

/**
 * Whether anything has scrolled under the bar. The strip above it is in the
 * page's flow and scrolls away with it, so the moment the strip leaves the
 * screen is the moment the bar needs its rule and shadow - an observer on the
 * strip answers that without reading the scroll position at all.
 */
function useStripGone(stripRef) {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return undefined;
    const observer = new IntersectionObserver(([entry]) => setGone(!entry.isIntersecting));
    observer.observe(strip);
    return () => observer.disconnect();
  }, [stripRef]);
  return gone;
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
        <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                to={`/services/${service.slug}`}
                onClick={onNavigate}
                className="pressable group block rounded-[4px] px-3 py-3 hover:bg-raised active:opacity-80"
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
              className="pressable mt-2 inline-block px-3 py-2 text-[0.9rem] font-semibold text-link hover:underline active:opacity-80"
            >
              All Services →
            </Link>
          </li>
        </ul>
        <aside className="rounded-[4px] bg-bark-950 p-6 text-moss-200">
          <Plate name="storm-and-emergency" className="mb-5 w-full" />
          <p className="label !text-rigging-200">Tree on the house?</p>
          <p className="display h3 mt-3 text-paper-50">Call. We answer storm calls after hours.</p>
          <a
            href={`tel:${company.phoneHref}`}
            className="pressable mono mt-4 block text-[1.3rem] font-semibold text-paper-50 hover:text-rigging-200 active:opacity-80"
          >
            {company.phone}
          </a>
          <Link
            to="/services/storm-and-emergency"
            onClick={onNavigate}
            className="pressable mt-3 inline-block text-[0.88rem] text-moss-200 underline underline-offset-4 hover:text-paper-50 active:opacity-80"
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
  const stripRef = useRef(null);
  const scrolled = useStripGone(stripRef);
  const { pathname } = useLocation();
  const barRef = useRef(null);
  const triggerRef = useRef(null);
  const open = menuOpen || panelOpen;

  // A route change closes whatever was open.
  useEffect(() => {
    setMenuOpen(false);
    setPanelOpen(false);
  }, [pathname]);

  // Escape and a click outside the bar close either surface, the way every
  // other disclosure does; Escape hands focus back to the control that opened it.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      setPanelOpen(false);
      triggerRef.current?.focus();
    };
    const onPointer = (event) => {
      if (barRef.current && !barRef.current.contains(event.target)) {
        setMenuOpen(false);
        setPanelOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  const close = () => {
    setMenuOpen(false);
    setPanelOpen(false);
  };

  return (
    <>
      {/* The strip carries what a caller wants before anything else, so the
          bar below it is left with the name, the places to go and one action. */}
      <div ref={stripRef} className="utility-bar">
        <div className="shell flex h-full items-center justify-between gap-4">
          <p className="truncate text-moss-200">
            Family owned in Pasadena since {company.foundedYear} · Free estimates · Fully insured
          </p>
          <p className="hidden shrink-0 items-center gap-3 sm:flex">
            <span className="hidden text-rigging-200 lg:inline">{company.afterHoursNote}</span>
            <a
              href={`tel:${company.phoneHref}`}
              className="pressable mono font-semibold text-paper-50 hover:text-rigging-200 active:opacity-80"
            >
              {company.phone}
            </a>
          </p>
        </div>
      </div>

      <header
        ref={barRef}
        className="site-header"
        data-scrolled={scrolled || open ? 'true' : 'false'}
        data-open={open ? 'true' : 'false'}
      >
        <div className="shell flex h-full items-center gap-8">
          <Wordmark />

          <nav className="ml-4 hidden h-full items-center gap-7 lg:flex" aria-label="Main">
            <button
              ref={triggerRef}
              className={`pressable nav-link flex h-11 items-center gap-1.5 hover:text-link active:opacity-80 ${
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
                className="pressable nav-link inline-flex h-11 items-center text-heading hover:text-link active:opacity-80 aria-[current=page]:text-accent-ink"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/free-estimate"
              className="btn btn-primary hidden h-11 py-0 text-[0.95rem] sm:inline-flex"
            >
              Get a Free Estimate
            </Link>
            <button
              className="btn btn-outline px-4 text-sm hover:bg-raised active:opacity-80 lg:hidden"
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
          <div className="nav-surface hidden lg:block">
            <ServicesPanel id="services-panel" onNavigate={close} />
          </div>
        )}

        {/* A menu taller than a short phone scrolls inside itself rather than
            losing its last rows below the fold. */}
        <div
          id="mobile-nav"
          hidden={!menuOpen}
          className="nav-surface max-h-[calc(100dvh-var(--bar-height))] overflow-y-auto overscroll-contain lg:hidden"
        >
          <div className="shell flex flex-col py-2">
            {[{ to: '/services', label: 'Services' }, ...links].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={close}
                className="pressable flex min-h-12 items-center border-b border-line font-medium text-heading last:border-0 hover:text-link active:opacity-80"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* The page behind an open panel steps back, so the panel reads as the one
          thing in front. A tap on it lands outside the bar and closes the panel. */}
      {open && createPortal(<div className="nav-scrim" aria-hidden="true" />, document.body)}
    </>
  );
}
