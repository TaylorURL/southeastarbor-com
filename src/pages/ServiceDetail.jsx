import { Link, Navigate, useParams } from 'react-router-dom';
import { serviceBySlug, services } from '../content/services';
import { areas } from '../content/areas';
import { company } from '../content/company';
import { useSeo } from '../lib/seo';
import { breadcrumbSchema, serviceSchema } from '../lib/structured-data';
import PhotoHero from '../components/sections/PhotoHero';
import EstimateForm from '../components/forms/EstimateForm';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = serviceBySlug(slug);

  useSeo({
    title: service ? `${service.name} in Pasadena, TX | Southeast Arbor Care` : 'Not found',
    description: service ? service.short : '',
    path: `/services/${slug}`,
    jsonLd: service
      ? [
          serviceSchema(service),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        ]
      : [],
  });

  if (!service) return <Navigate to="/services" replace />;

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
            <div className="prose-body max-w-2xl text-[1.05rem] leading-relaxed text-ink-700">
              {service.detail.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-10 display h2 text-bark-900">What the job includes</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-ink-700">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rigging-500"
                    aria-hidden="true"
                  />
                  {bullet}
                </li>
              ))}
            </ul>

            {service.urgent && (
              <div className="mt-9 border-l-4 border-rigging-500 bg-paper-100 p-6">
                <p className="font-display text-lg font-bold text-bark-900">
                  If the tree is already on the house, call.
                </p>
                <p className="mt-2 leading-relaxed text-ink-700">
                  Do not wait on a form.{' '}
                  <a
                    href={`tel:${company.phoneHref}`}
                    className="font-semibold text-canopy-700 underline underline-offset-2"
                  >
                    {company.phone}
                  </a>{' '}
                  reaches somebody after hours.
                </p>
              </div>
            )}

            <h2 className="mt-12 display h2 text-bark-900">Where we do this work</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {areas.map((area) => (
                <Link
                  key={area.slug}
                  to={`/service-areas/${area.slug}`}
                  className="rounded border border-paper-200 bg-white px-3 py-1.5 text-[0.88rem] font-medium text-canopy-700 hover:border-moss-500"
                >
                  {service.name} in {area.name}
                </Link>
              ))}
            </div>

            <h2 className="mt-12 display h2 text-bark-900">Other services</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {services
                .filter((s) => s.slug !== service.slug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="card p-4 hover:border-moss-500"
                  >
                    <span className="font-display font-bold text-bark-900">{s.name}</span>
                    <span className="mt-1 block text-[0.88rem] leading-snug text-ink-700">
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
