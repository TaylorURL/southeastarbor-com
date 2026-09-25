import { Link } from 'react-router-dom';
import SplitRail from '@taylorurl/split-rail';
import { company } from '../../content/company';
import { services } from '../../content/services';
import { areas } from '../../content/areas';

function Column({ heading, children }) {
  return (
    <div>
      <h2 className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-rigging-200">
        {heading}
      </h2>
      <ul className="space-y-2 text-[0.92rem] text-moss-200">{children}</ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-bark-950 text-moss-200">
      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-base font-bold tracking-[0.22em] text-paper-50">
            SOUTHEAST ARBOR CARE
          </p>
          <address className="mt-4 not-italic leading-relaxed">
            {company.address.street}
            <br />
            {company.address.city}, {company.address.state} {company.address.zip}
            <br />
            <a href={`tel:${company.phoneHref}`} className="font-medium text-paper-50">
              {company.phone}
            </a>
          </address>
          <dl className="mt-4 text-[0.88rem] text-tan-300">
            {company.hours.map((entry) => (
              <div key={entry.days} className="flex gap-2">
                <dt>{entry.days}</dt>
                <dd>{entry.hours}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[0.85rem] text-tan-300">{company.afterHoursNote}</p>
        </div>

        <Column heading="Services">
          {services.map((service) => (
            <li key={service.slug}>
              <Link to={`/services/${service.slug}`} className="hover:text-paper-50">
                {service.name}
              </Link>
            </li>
          ))}
        </Column>

        <Column heading="Service Areas">
          {areas.map((area) => (
            <li key={area.slug}>
              <Link to={`/service-areas/${area.slug}`} className="hover:text-paper-50">
                {area.name}
              </Link>
            </li>
          ))}
        </Column>

        <Column heading="Company">
          <li>
            <Link to="/about" className="hover:text-paper-50">
              About {company.owner}
            </Link>
          </li>
          <li>
            <Link to="/our-work" className="hover:text-paper-50">
              Our Work
            </Link>
          </li>
          <li>
            <Link to="/reviews" className="hover:text-paper-50">
              Reviews
            </Link>
          </li>
          <li>
            <Link to="/free-estimate" className="hover:text-paper-50">
              Free Estimate
            </Link>
          </li>
          <li>
            <a href={company.social.bbb} className="hover:text-paper-50">
              BBB Profile
            </a>
          </li>
          <li>
            <a href={company.social.facebook} className="hover:text-paper-50">
              Facebook
            </a>
          </li>
          <li>
            <a href={company.social.nextdoor} className="hover:text-paper-50">
              Nextdoor
            </a>
          </li>
        </Column>
      </div>

      <div className="border-t border-canopy-800">
        <div className="shell py-5 text-[0.8rem] text-ink-700">
          © {new Date().getFullYear()} {company.legalName} · Family owned and operated in{' '}
          {company.address.city}, Texas since {company.foundedYear} · Fully insured
        </div>
      </div>
      <SplitRail version={__BUILD_VERSION__} />
    </footer>
  );
}
