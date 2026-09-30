import { company } from '../content/company';
import { areas } from '../content/areas';
import { useSeo } from '../lib/seo';
import { breadcrumbSchema, treeServiceSchema } from '../lib/structured-data';
import PageHeader from '../components/sections/PageHeader';
import EstimateForm from '../components/forms/EstimateForm';

export default function FreeEstimate() {
  useSeo({
    title: 'Free Tree Estimate in Pasadena, TX | Southeast Arbor Care',
    description:
      'Send a photo and an address and get a real number back the same day. Free estimates, no obligation, and nothing charged until the work is finished.',
    path: '/free-estimate',
    jsonLd: [
      treeServiceSchema(areas.map((a) => a.name)),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Free Estimate', path: '/free-estimate' },
      ]),
    ],
  });

  return (
    <>
      <PageHeader
        eyebrow="Free estimate"
        title="Tell us what the tree is doing"
        intro="Four fields and a photo. Terry calls back with a number, or comes out and walks it with you — whichever the job needs."
        crumbs={[{ name: 'Home', path: '/' }]}
      />

      <section className="py-14 md:py-20">
        <div className="shell grid gap-12 lg:grid-cols-[440px_1fr] lg:items-start">
          <EstimateForm compact />

          <div className="space-y-8">
            <div>
              <h2 className="display h2 text-heading">Or just call. It is usually faster.</h2>
              <a
                href={`tel:${company.phoneHref}`}
                className="pressable mt-3 block py-1 mono text-[2.1rem] font-semibold leading-tight text-link hover:text-accent-ink"
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
              <p className="mt-3 text-[0.95rem] font-medium text-accent-ink">
                {company.afterHoursNote}
              </p>
            </div>

            <div className="card p-7">
              <h2 className="display h3 text-heading">What happens next</h2>
              <ol className="mt-4 space-y-4">
                {[
                  [
                    'You send it',
                    'Photo and address is enough. Most jobs can be priced from that.',
                  ],
                  ['We walk it', 'If the job needs eyes on it, we come out. No charge either way.'],
                  ['You get it in writing', 'A written number before anybody starts a saw.'],
                  [
                    'You pay at the end',
                    'After the work is done and you have walked the yard with us.',
                  ],
                ].map(([step, detail], i) => (
                  <li key={step} className="flex gap-4">
                    <span className="mono text-[0.78rem] font-semibold text-rigging-500">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <span className="block font-semibold text-heading">{step}</span>
                      <span className="mt-0.5 block text-[0.92rem] leading-relaxed text-body">
                        {detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-l-4 border-line pl-5">
              <h2 className="display h3 text-heading">Where to find us</h2>
              <address className="mt-2 not-italic leading-relaxed text-body">
                {company.address.street}
                <br />
                {company.address.city}, {company.address.state} {company.address.zip}
              </address>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
