import { company, yearsInBusiness } from '../content/company';
import { useSeo } from '../lib/seo';
import { breadcrumbSchema } from '../lib/structured-data';
import PageHeader from '../components/sections/PageHeader';
import EstimateCta from '../components/sections/EstimateCta';

export default function About() {
  useSeo({
    title: `About Southeast Arbor Care — Family Owned in Pasadena Since ${company.foundedYear}`,
    description: `${company.owner} has run Southeast Arbor Care out of Pasadena for ${yearsInBusiness} years. Fully insured, BBB accredited, and paid only when the work is finished.`,
    path: '/about',
    jsonLd: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ]),
    ],
  });

  return (
    <>
      <PageHeader
        eyebrow="About"
        title={`${yearsInBusiness} years, one family, the same trucks`}
        intro={`${company.owner} started Southeast Arbor Care in ${company.foundedYear} and still walks most of the estimates himself.`}
        crumbs={[{ name: 'Home', path: '/' }]}
      />

      <section className="py-14 md:py-20">
        <div className="shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="prose-body max-w-2xl text-[1.05rem] leading-relaxed text-ink-700">
            <p>
              We are not a franchise and we are not a call centre that subcontracts the work out.
              The person who quotes the job is on site the day it happens, and the crew has been
              together long enough that nobody needs telling twice.
            </p>
            <p>
              What that buys you is boring in the best way. The truck arrives when it was supposed
              to. The tree comes down in the direction we said it would. The yard gets raked.
              Nothing gets left for a second trip, and nothing gets invoiced that was not quoted.
            </p>
            <p>
              We work in heavy clay and a high water table, under hurricane season, in neighborhoods
              where the houses went up around trees that are now much bigger than anyone planned
              for. That is a specific set of problems, and {yearsInBusiness} years of it is most of
              what you are paying for.
            </p>
            <p>
              You do not pay anything until the work is finished and you have walked it with us.
              That has been the arrangement since {company.foundedYear} and it is not changing.
            </p>
          </div>

          <aside className="space-y-5">
            <div className="card p-7">
              <h2 className="display h3 text-bark-900">The facts</h2>
              <dl className="mt-4 space-y-3 text-[0.95rem]">
                <div>
                  <dt className="font-semibold text-ink-700">Owner</dt>
                  <dd className="text-bark-900">{company.owner}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink-700">Founded</dt>
                  <dd className="text-bark-900">{company.foundedYear}, Pasadena, Texas</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink-700">Shop</dt>
                  <dd className="text-bark-900">
                    {company.address.street}, {company.address.city}, {company.address.state}{' '}
                    {company.address.zip}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink-700">Hours</dt>
                  <dd className="text-bark-900">
                    {company.hours.map((h) => `${h.days}: ${h.hours}`).join(' · ')}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="card p-7">
              <h2 className="display h3 text-bark-900">Licensing & insurance</h2>
              <ul className="mt-4 space-y-2.5">
                {company.credentials.map((credential) => (
                  <li key={credential} className="flex gap-3 text-ink-700">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss-500"
                      aria-hidden="true"
                    />
                    {credential}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.88rem] leading-relaxed text-ink-700">
                Certificates are available on request before work starts. Ask — an uninsured crew in
                your yard is your liability, not theirs.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <EstimateCta />
    </>
  );
}
