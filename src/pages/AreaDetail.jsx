import { Link, useParams } from 'react-router-dom';
import NotFound from './NotFound';
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

  useSeo(
    area && {
      title: `${area.name}, TX Tree Service | Southeast Arbor Care`,
      description: `Tree removal, trimming, stump grinding and storm cleanup in ${area.name}, Texas. ${area.lede}`,
      path: `/service-areas/${area.slug}`,
      jsonLd: [
        treeServiceSchema([area.name]),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Service Areas', path: '/service-areas' },
          { name: area.name, path: `/service-areas/${area.slug}` },
        ]),
      ],
    },
  );

  if (!area) return <NotFound />;

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
            <h2 className="display h2 text-heading">What {area.name} trees actually need</h2>
            <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-body">{area.local}</p>

            <h2 className="mt-10 display h2 text-heading">Services we run in {area.name}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="card p-5 card-link"
                >
                  <span className="display h3 text-heading">{service.name}</span>
                  <span className="mt-1.5 block text-[0.9rem] leading-relaxed text-body">
                    {service.short}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-10 border-l-4 border-moss-500 bg-raised p-6">
              <p className="leading-relaxed text-body">
                Based at {company.address.street} in {company.address.city}, which is why{' '}
                {area.name} calls get looked at quickly rather than fitted in around a route from
                the other side of Houston.
              </p>
            </div>

            <h2 className="mt-12 display h2 text-heading">Nearby towns</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {areas
                .filter((a) => a.slug !== area.slug)
                .map((a) => (
                  <Link
                    key={a.slug}
                    to={`/service-areas/${a.slug}`}
                    className="rounded border border-line bg-surface px-3 py-1.5 text-[0.88rem] font-medium text-link card-link"
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
