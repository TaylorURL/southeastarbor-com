import { Link, Navigate, useParams } from 'react-router-dom';
import { areaBySlug, areas } from '../content/areas';
import { services } from '../content/services';
import { company } from '../content/company';
import { useSeo } from '../lib/seo';
import { breadcrumbSchema, treeServiceSchema } from '../lib/structured-data';
import PhotoHero from '../components/sections/PhotoHero';
import EstimateForm from '../components/forms/EstimateForm';

export default function AreaDetail() {
  const { slug } = useParams();
  const area = areaBySlug(slug);

  useSeo({
    title: area ? `Tree Service in ${area.name}, TX | Southeast Arbor Care` : 'Not found',
    description: area
      ? `Tree removal, trimming, stump grinding and storm cleanup in ${area.name}, Texas. ${area.lede}`
      : '',
    path: `/service-areas/${slug}`,
    jsonLd: area
      ? [
          treeServiceSchema([area.name]),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Service Areas', path: '/service-areas' },
            { name: area.name, path: `/service-areas/${area.slug}` },
          ]),
        ]
      : [],
  });

  if (!area) return <Navigate to="/service-areas" replace />;

  return (
    <>
      <PhotoHero
        compact
        image={area.image}
        alt=""
        eyebrow={`${area.name} · ${area.zips}`}
        title={`Tree service in ${area.name}, Texas`}
        intro={area.lede}
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Service Areas', path: '/service-areas' },
        ]}
      />

      <section className="py-14 md:py-20">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_420px]">
          <div>
            <h2 className="display h2 text-bark-900">What {area.name} trees actually need</h2>
            <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-ink-700">
              {area.local}
            </p>

            <h2 className="mt-10 display h2 text-bark-900">Services we run in {area.name}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="card p-5 hover:border-moss-500"
                >
                  <span className="display h3 text-bark-900">{service.name}</span>
                  <span className="mt-1.5 block text-[0.9rem] leading-relaxed text-ink-700">
                    {service.short}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-10 border-l-4 border-moss-500 bg-paper-100 p-6">
              <p className="leading-relaxed text-ink-700">
                Based at {company.address.street} in {company.address.city}, which is why{' '}
                {area.name} calls get looked at quickly rather than fitted in around a route from
                the other side of Houston.
              </p>
            </div>

            <h2 className="mt-12 display h2 text-bark-900">Nearby towns</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {areas
                .filter((a) => a.slug !== area.slug)
                .map((a) => (
                  <Link
                    key={a.slug}
                    to={`/service-areas/${a.slug}`}
                    className="rounded border border-paper-200 bg-white px-3 py-1.5 text-[0.88rem] font-medium text-canopy-700 hover:border-moss-500"
                  >
                    {a.name}
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
