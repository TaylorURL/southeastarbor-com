import { Link, useParams } from 'react-router-dom';
import NotFound from './NotFound';
import { serviceBySlug, services } from '../content/services';
import { areas } from '../content/areas';
import { company } from '../content/company';
import { useSeo } from '../lib/seo';
import { breadcrumbSchema, serviceSchema } from '../lib/structured-data';
import PhotoHero from '../components/sections/PhotoHero';
import EstimateForm from '../components/forms/EstimateForm';
import Plate from '../components/art/Plate';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = serviceBySlug(slug);

  useSeo(
    service && {
      title: `${service.name} in Pasadena, TX | Southeast Arbor`,
      description: service.short,
      path: `/services/${service.slug}`,
      jsonLd: [
        serviceSchema(service),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.name, path: `/services/${service.slug}` },
        ]),
      ],
    },
  );

  if (!service) return <NotFound />;

  return (
    <>
      <PhotoHero
        compact
        image={service.image}
        alt={service.alt}
        eyebrow={service.urgent ? 'Answered after hours' : 'Service'}
        title={`${service.name} in Pasadena and southeast Harris County`}
        intro={service.intro}
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      />

      <section className="py-14 md:py-20">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_420px]">
          <div>
            <div className="prose-body max-w-2xl text-[1.05rem] leading-relaxed text-body">
              {service.detail.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <Plate name={service.slug} className="mt-10 w-full max-w-md" />

            <h2 className="mt-10 display h2 text-heading">What the job includes</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-body">
                  <svg
                    viewBox="0 0 16 16"
                    className="mt-1 h-4 w-4 shrink-0 text-moss-500"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8.5 6.5 12 13 4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  {bullet}
                </li>
              ))}
            </ul>

            {service.urgent && (
              <div className="mt-10 border-l-4 border-rigging-500 bg-raised p-6">
                <p className="font-display text-lg font-bold text-heading">
                  If the tree is already on the house, call.
                </p>
                <p className="mt-2 leading-relaxed text-body">
                  Do not wait on a form.{' '}
                  <a href={`tel:${company.phoneHref}`} className="link-inline">
                    {company.phone}
                  </a>{' '}
                  reaches somebody after hours.
                </p>
              </div>
            )}

            <h2 className="mt-12 display h2 text-heading">Where we do this work</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {areas.map((area) => (
                <Link
                  key={area.slug}
                  to={`/service-areas/${area.slug}`}
                  className="rounded border border-line bg-surface px-3 py-1.5 text-[0.88rem] font-medium text-link card-link"
                >
                  {service.name} in {area.name}
                </Link>
              ))}
            </div>

            <h2 className="mt-12 display h2 text-heading">Other services</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {services
                .filter((s) => s.slug !== service.slug)
                .map((s) => (
                  <Link key={s.slug} to={`/services/${s.slug}`} className="card p-4 card-link">
                    <span className="font-display font-bold text-heading">{s.name}</span>
                    <span className="mt-1 block text-[0.88rem] leading-snug text-body">
                      {s.short}
                    </span>
                  </Link>
                ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <EstimateForm />
          </aside>
        </div>
      </section>
    </>
  );
}
