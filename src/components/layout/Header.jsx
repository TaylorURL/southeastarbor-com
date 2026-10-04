import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { company } from '../../content/company';
import { serviceBySlug } from '../../content/services';
import { areaBySlug } from '../../content/areas';
import Plate from '../art/Plate';

// useLayoutEffect warns when the page is rendered to a string at build time.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const service = (slug) => {
  const s = serviceBySlug(slug);
  return { to: `/services/${s.slug}`, label: s.name, line: s.short };
};
const area = (slug) => {
  const a = areaBySlug(slug);
  return { to: `/service-areas/${a.slug}`, label: a.name, line: a.lede };
};

/**
 * The three top-level groups. Each opens the one panel under the bar; its
 * destinations sit in columns under a heading, each with a line saying where
 * it leads, and the last cell is the one thing that group wants to promote.
 */
const GROUPS = [
  {
    id: 'services',
    label: 'Services',
    match: '/services',
    columns: [
      {
        heading: 'Taking It Down',
        items: ['tree-removal', 'stump-grinding', 'lot-clearing', 'storm-and-emergency'].map(
          service,
        ),
      },
      {
        heading: 'Keeping It Standing',
        items: ['tree-trimming-and-pruning', 'tree-health-and-feeding'].map(service),
      },
    ],
    more: { to: '/services', label: 'All Services' },
    feature: 'storm',
  },
  {
    id: 'areas',
    label: 'Service Areas',
    match: '/service-areas',
    columns: [
      { heading: 'Near the Shop', items: ['pasadena', 'deer-park', 'southeast-houston'].map(area) },
      {
        heading: 'Toward the Bay',
        items: ['la-porte', 'clear-lake-and-webster', 'baytown'].map(area),
      },
    ],
    more: { to: '/service-areas', label: 'All Service Areas' },
    feature: 'estimate',
  },
  {
    id: 'company',
    label: 'Company',
    match: ['/about', '/our-work', '/reviews', '/contact'],
    columns: [
      {
        heading: 'The Business',
        items: [
          {
            to: '/about',
            label: 'About',
            line: `Family owned in Pasadena since ${company.foundedYear}.`,
          },
          {
            to: '/our-work',
            label: 'Our Work',
            line: 'Photographs from jobs across southeast Harris County.',
          },
        ],
      },
      {
        heading: 'Get in Touch',
        items: [
          {
            to: '/reviews',
            label: 'Reviews',
            line: 'What neighbors say, and where to read the rest.',
          },
          { to: '/contact', label: 'Contact', line: 'Hours, the shop on Thornwood and the phone.' },
        ],
      },
    ],
    feature: 'estimate',
  },
];

const isCurrent = (group, pathname) =>
  [].concat(group.match).some((path) => pathname.startsWith(path));

function Wordmark() {
  return (
    <Link
      to="/"
      className="pressable flex h-11 shrink-0 flex-col justify-center whitespace-nowrap leading-none hover:opacity-80 active:opacity-70"
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
 * screen is the moment the bar needs its rule and shadow.
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

function Feature({ kind, onNavigate }) {
  if (kind === 'storm') {
    return (
      <aside className="flex flex-col gap-3 rounded-[4px] bg-bark-950 p-6 text-moss-200 md:col-span-2 lg:col-span-1">
        <Plate name="storm-and-emergency" className="hidden w-full lg:block" />
        <p className="label !text-rigging-200">Tree on the house?</p>
        <p className="display h3 text-paper-50">Call. We answer storm calls after hours.</p>
        <a
          href={`tel:${company.phoneHref}`}
          className="pressable mono text-[1.3rem] font-semibold text-paper-50 hover:text-rigging-200 active:opacity-80"
        >
          {company.phone}
        </a>
      </aside>
    );
  }
  return (
    <aside className="flex flex-col gap-3 rounded-[4px] bg-bark-950 p-6 text-moss-200 md:col-span-2 lg:col-span-1">
      <Plate name="tree-removal" className="hidden w-full lg:block" />
      <p className="label !text-rigging-200">Free estimates</p>
      <p className="display h3 text-paper-50">A quote in writing, before anyone starts a saw.</p>
      <Link
        to="/free-estimate"
        onClick={onNavigate}
        className="btn btn-ghost self-start text-[0.95rem]"
      >
        Get a Free Estimate
      </Link>
    </aside>
  );
}

/** One group's columns and its promoted cell, the content the panel swaps. */
function GroupPanel({ group, onNavigate }) {
  return (
    <div className="nav-swap shell grid gap-10 py-10 md:grid-cols-2 lg:grid-cols-[1fr_1fr_18rem]">
      {group.columns.map((column) => (
        <section key={column.heading} className="flex flex-col gap-3">
          <h3 className="label">{column.heading}</h3>
          <ul className="flex flex-col gap-1">
            {column.items.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onNavigate}
                  className="pressable group -mx-3 flex flex-col gap-1 rounded-[4px] px-3 py-3 hover:bg-raised active:opacity-80"
                >
                  <span className="font-display text-[1.05rem] font-bold text-heading group-hover:text-link">
                    {item.label}
                  </span>
                  <span className="text-[0.88rem] leading-snug text-body">{item.line}</span>
                </Link>
              </li>
            ))}
          </ul>
          {group.more && column === group.columns[group.columns.length - 1] && (
            <Link
              to={group.more.to}
              onClick={onNavigate}
              className="pressable inline-flex min-h-11 items-center self-start text-[0.9rem] font-semibold text-link hover:underline active:opacity-80"
            >
              {group.more.label} →
            </Link>
          )}
        </section>
      ))}
      <Feature kind={group.feature} onNavigate={onNavigate} />
    </div>
  );
}

export default function Header() {
  const [active, setActive] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const stripRef = useRef(null);
  const barRef = useRef(null);
  const bodyRef = useRef(null);
  const triggers = useRef({});
  const closeTimer = useRef(0);
  const [panelHeight, setPanelHeight] = useState(null);
  const scrolled = useStripGone(stripRef);
  const { pathname } = useLocation();
  const open = Boolean(active) || menuOpen;
  const group = GROUPS.find((g) => g.id === active);

  const close = () => {
    setActive(null);
    setMenuOpen(false);
  };

  // A route change closes whatever was open.
  useEffect(close, [pathname]);

  // The panel stays mounted while it moves between groups, so its ground is
  // carried from one group's height to the next rather than snapping.
  useIsoLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body) {
      setPanelHeight(null);
      return undefined;
    }
    // The height is read directly rather than through a ResizeObserver. An
    // observer delivers inside the browser's own observation loop, and this
    // box's height depends on the width it is laid out in - a panel tall
    // enough to bring in the vertical scrollbar narrows the page and rewraps
    // its own columns - so the box changes size again while that loop is still
    // settling and the browser reports an observation it could not deliver.
    // Nothing here needs to run in that loop: the panel changes height when a
    // group opens, when the viewport changes and when the fonts arrive, and
    // each of those is readable on its own.
    let frame = 0;
    let last = null;
    const write = () => {
      const height = body.offsetHeight;
      if (height === last) return;
      last = height;
      setPanelHeight(height);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(write);
    };
    write();
    let dropped = false;
    window.addEventListener('resize', schedule);
    window.addEventListener('orientationchange', schedule);
    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (!dropped) schedule();
      });
    }
    return () => {
      dropped = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('orientationchange', schedule);
    };
  }, [active]);

  // Escape closes and hands focus back to the trigger that opened the panel;
  // a press anywhere outside the bar closes it too.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key !== 'Escape') return;
      const trigger = triggers.current[active] || triggers.current.menu;
      close();
      trigger?.focus();
    };
    const onPointer = (event) => {
      if (barRef.current && !barRef.current.contains(event.target)) close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open, active]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // A mouse opens a group by resting on its trigger and moves the panel
  // straight to the next one. Leaving the whole bar closes after a short
  // grace, so the pointer can cross from a trigger into the panel on any path.
  const hoverOpen = (id) => (event) => {
    if (event.pointerType !== 'mouse') return;
    clearTimeout(closeTimer.current);
    setActive(id);
  };
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return undefined;
    const leave = (event) => {
      if (event.pointerType !== 'mouse') return;
      clearTimeout(closeTimer.current);
      closeTimer.current = setTimeout(() => setActive(null), 160);
    };
    const stay = () => clearTimeout(closeTimer.current);
    bar.addEventListener('pointerleave', leave);
    bar.addEventListener('pointerenter', stay);
    return () => {
      bar.removeEventListener('pointerleave', leave);
      bar.removeEventListener('pointerenter', stay);
    };
  }, []);

  // Each trigger is kept so Escape can hand focus back to the one that opened.
  const keep = (id) => (node) => {
    triggers.current[id] = node;
  };

  return (
    <>
      {/* The strip carries what a caller wants before anything else, so the
          bar below it is left with the name, the groups and one action. */}
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

          <nav className="ml-2 hidden h-full items-center gap-6 md:flex" aria-label="Main">
            {GROUPS.map((g) => (
              <button
                key={g.id}
                ref={keep(g.id)}
                className={`pressable nav-link flex h-11 items-center gap-1.5 whitespace-nowrap hover:text-link active:opacity-80 ${
                  active === g.id || isCurrent(g, pathname) ? 'text-accent-ink' : 'text-heading'
                }`}
                type="button"
                aria-expanded={active === g.id}
                aria-controls="site-panel"
                onPointerEnter={hoverOpen(g.id)}
                onClick={() => setActive((current) => (current === g.id ? null : g.id))}
              >
                {g.label}
                <svg viewBox="0 0 12 12" className="nav-caret h-3 w-3" aria-hidden="true">
                  <path
                    d="M2.5 4.5 6 8l3.5-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/free-estimate"
              className="btn btn-primary hidden h-11 whitespace-nowrap py-0 text-[0.95rem] sm:inline-flex md:hidden lg:inline-flex"
            >
              Get a Free Estimate
            </Link>
            <button
              ref={keep('menu')}
              className="btn btn-outline px-4 text-sm hover:bg-raised active:opacity-80 md:hidden"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {/* One panel for every group: it opens once, and moving to another
            trigger changes its height and crossfades what is inside it. */}
        {group && (
          <div id="site-panel" className="nav-panel hidden md:block">
            <div
              className="nav-panel-ground"
              style={{ transform: `scaleY(${(panelHeight ?? 0) / 100})` }}
            />
            <div
              className="nav-panel-rule"
              style={{ transform: `translateY(${panelHeight ?? 0}px)` }}
            />
            <div ref={bodyRef} className="relative">
              <GroupPanel key={group.id} group={group} onNavigate={close} />
            </div>
          </div>
        )}

        {/* The phone menu: every group under its heading, rows a thumb can hit,
            scrolling inside itself on a short screen. */}
        <div
          id="mobile-nav"
          hidden={!menuOpen}
          className="nav-surface max-h-[calc(100dvh-var(--bar-height)-var(--strip-height))] overflow-y-auto overscroll-contain md:hidden"
        >
          <div className="shell flex flex-col gap-6 pt-6 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] sm:pb-6">
            {GROUPS.map((g) => (
              <section key={g.id} className="flex flex-col gap-2">
                <h2 className="label">{g.label}</h2>
                <ul className="flex flex-col">
                  {g.columns
                    .flatMap((column) => column.items)
                    .map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={close}
                          className="pressable flex min-h-12 items-center border-b border-line font-medium text-heading hover:text-link active:opacity-80"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </header>

      {/* The page behind an open panel steps back, so the panel reads as the one
          thing in front. A tap on it lands outside the bar and closes it. */}
      {open && createPortal(<div className="page-scrim" aria-hidden="true" />, document.body)}
    </>
  );
}
