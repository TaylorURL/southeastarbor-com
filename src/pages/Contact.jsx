import { Link } from 'react-router-dom';
import { company } from '../content/company';
import { areas } from '../content/areas';
import { useSeo } from '../lib/seo';
import { breadcrumbSchema, treeServiceSchema } from '../lib/structured-data';
import PageHeader from '../components/sections/PageHeader';
import BrandMark from '../components/brand/BrandMark';

const profiles = [
  ['Facebook', company.social.facebook],
  ['Nextdoor', company.social.nextdoor],
  ['Yelp', company.social.yelp],
  ['BBB', company.social.bbb],
].filter(([, href]) => href);

export default function Contact() {
  useSeo({
    title: 'Contact Southeast Arbor Care | Pasadena, TX',
    description: `Call Southeast Arbor Care at ${company.phone}, Monday to Saturday 8 to 6. The shop is at ${company.address.street} in Pasadena, Texas. ${company.afterHoursNote}`,
    path: '/contact',
    jsonLd: [
      treeServiceSchema(areas.map((a) => a.name)),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ]),
    ],
  });

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="The phone is the fastest way to reach us"
        intro="Call during the hours below. For a quote in writing, use the estimate form."
        crumbs={[{ name: 'Home', path: '/' }]}
      />

      <section className="py-14 md:py-20">
        <div className="shell grid gap-6 md:grid-cols-3">
          <div className="card p-7">
            <h2 className="display h3 text-heading">Call</h2>
            <a
              href={`tel:${company.phoneHref}`}
              className="pressable mono mt-3 block py-1 text-[1.6rem] font-semibold text-link hover:text-accent-ink"
            >
              {company.phone}
            </a>
            <dl className="mt-4 space-y-1.5 text-[0.95rem] text-body">
              {company.hours.map((entry) => (
                <div key={entry.days} className="flex gap-3">
                  <dt className="font-semibold">{entry.days}</dt>
                  <dd>{entry.hours}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[0.92rem] font-medium text-accent-ink">
              {company.afterHoursNote}
            </p>
          </div>

          <div className="card p-7">
            <h2 className="display h3 text-heading">Get a quote in writing</h2>
            <p className="mt-3 leading-relaxed text-body">
              Tell us where the tree is and what it is doing. We call back with a number or a time
              to come look.
            </p>
            <Link to="/free-estimate" className="btn btn-primary mt-5">
              Get a Free Estimate
            </Link>
          </div>

          <div className="card p-7">
            <h2 className="display h3 text-heading">The shop</h2>
            <address className="mt-3 not-italic leading-relaxed text-body">
              {company.address.street}
              <br />
              {company.address.city}, {company.address.state} {company.address.zip}
            </address>
            <h3 className="mt-6 label">Find Us on</h3>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {profiles.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="link-inline inline-flex min-h-11 items-center gap-2">
                    <BrandMark name={label} className="h-5 w-5 shrink-0" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
