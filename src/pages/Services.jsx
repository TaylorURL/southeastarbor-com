import { Link } from 'react-router-dom';
import { services } from '../content/services';
import { areas } from '../content/areas';
import { useSeo } from '../lib/seo';
import { breadcrumbSchema } from '../lib/structured-data';
import Photo from '../components/Photo';
import PageHeader from '../components/sections/PageHeader';
import EstimateCta from '../components/sections/EstimateCta';

export default function Services() {
  useSeo({
    title: 'Tree Services in Pasadena, TX | Southeast Arbor Care',
    description:
      'Six tree services across Pasadena and southeast Harris County: removal, trimming and pruning, stump grinding, storm response, lot clearing and tree health.',
    path: '/services',
    jsonLd: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
      ]),
    ],
  });

  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Tree work, priced in person and written down"
        intro="Every job gets walked before it gets quoted. Nothing is estimated over the phone from a description, because a tree that sounds simple over the phone is the one that is leaning over a gas meter."
        crumbs={[{ name: 'Home', path: '/' }]}
      />
      <section className="py-14 md:py-20">
        <div className="shell grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="card group flex flex-col overflow-hidden card-link sm:flex-row"
            >
              <div className="aspect-[16/10] overflow-hidden bg-raised sm:aspect-auto sm:w-48 sm:shrink-0">
                <Photo
                  src={service.image}
                  alt={service.alt}
                  sizes="(min-width: 640px) 12rem, 100vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="display h2 text-heading">{service.name}</h2>
                <p className="mt-2 flex-1 text-[0.97rem] leading-relaxed text-body">
                  {service.short}
                </p>
                <span className="mt-4 text-[0.9rem] font-semibold text-link">Read More →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="shell mt-12">
          <p className="text-[0.95rem] text-body">
            Working in{' '}
            {areas.map((area, i) => (
              <span key={area.slug}>
                {i > 0 && ', '}
                <Link to={`/service-areas/${area.slug}`} className="link-inline font-medium">
                  {area.name}
                </Link>
              </span>
            ))}
            .
          </p>
        </div>
      </section>
      <EstimateCta />
    </>
  );
}
