import { Link } from 'react-router-dom';
import SplitRail from '@taylorurl/split-rail';
import { company } from '../../content/company';
import { THEMES, useTheme } from '../../lib/theme';

const profiles = [
  ['BBB', company.social.bbb],
  ['Facebook', company.social.facebook],
  ['Nextdoor', company.social.nextdoor],
  ['Yelp', company.social.yelp],
].filter(([, href]) => href);

function ThemeSwitch() {
  const [theme, setTheme] = useTheme();
  const options = [[null, 'Auto'], ...THEMES.map((t) => [t, t[0].toUpperCase() + t.slice(1)])];
  return (
    <div role="group" aria-label="Colour Theme" className="flex gap-1">
      {options.map(([value, label]) => (
        <button
          key={label}
          className={`pressable inline-flex min-h-11 items-center rounded-[4px] px-3 text-[0.75rem] font-medium hover:text-paper-50 active:opacity-80 ${
            theme === value ? 'bg-canopy-800 text-paper-50' : 'text-tan-300 hover:bg-canopy-800/60'
          }`}
          type="button"
          aria-pressed={theme === value}
          onClick={() => setTheme(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

/**
 * A quiet footer: the name and what the company does, the number, and the few
 * links a visitor comes to the bottom of a page to find. The services and the
 * towns are one tap away in the header, so they are not listed twice here.
 */
export default function Footer() {
  return (
    <footer className="bg-bark-950 pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] text-moss-200 sm:pb-0">
      <div className="shell py-14">
        <div className="flex flex-col gap-8 border-b border-canopy-800 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-display text-[1.6rem] font-extrabold tracking-[0.22em] text-paper-50">
              SOUTHEAST ARBOR CARE
            </p>
            <p className="mt-2 max-w-md text-[1rem] leading-relaxed">{company.tagline}.</p>
          </div>
          <a
            href={`tel:${company.phoneHref}`}
            className="pressable mono inline-flex min-h-11 items-center text-[1.6rem] font-semibold text-paper-50 hover:text-rigging-200"
          >
            {company.phone}
          </a>
        </div>

        <div className="grid gap-8 pt-8 text-[0.9rem] sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
          <address className="not-italic leading-relaxed">
            {company.address.street}
            <br />
            {company.address.city}, {company.address.state} {company.address.zip}
          </address>
          <div>
            <dl className="text-tan-300">
              {company.hours.map((entry) => (
                <div key={entry.days} className="flex gap-2">
                  <dt>{entry.days}</dt>
                  <dd>{entry.hours}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-tan-300">{company.afterHoursNote}</p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {profiles.map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  className="pressable inline-flex min-h-11 min-w-11 items-center justify-center hover:text-paper-50"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-canopy-800">
        <div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5 text-[0.8rem] text-tan-300">
          <p>
            © {new Date().getFullYear()} {company.legalName} · Family owned in{' '}
            {company.address.city}, Texas since {company.foundedYear}
          </p>
          <nav aria-label="Legal" className="flex gap-5">
            <Link
              to="/contact"
              className="pressable inline-flex min-h-11 min-w-11 items-center justify-center hover:text-paper-50"
            >
              Contact
            </Link>
            <Link
              to="/privacy"
              className="pressable inline-flex min-h-11 min-w-11 items-center justify-center hover:text-paper-50"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="pressable inline-flex min-h-11 min-w-11 items-center justify-center hover:text-paper-50"
            >
              Terms
            </Link>
          </nav>
          <ThemeSwitch />
        </div>
      </div>
      <SplitRail version={__BUILD_VERSION__} />
    </footer>
  );
}
