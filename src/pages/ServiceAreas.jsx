import { Link } from 'react-router-dom';
import { areas } from '../content/areas';
import { useSeo } from '../lib/seo';
import { breadcrumbSchema } from '../lib/structured-data';
import PageHeader from '../components/sections/PageHeader';
import EstimateCta from '../components/sections/EstimateCta';

export default function ServiceAreas() {
  useSeo({
    title: 'Service Areas — Pasadena, Deer Park, La Porte, Clear Lake, Baytown',
    description:
      'Southeast Arbor Care works Pasadena, Deer Park, La Porte, Clear Lake and Webster, Baytown and southeast Houston. One page for each, with what the trees there actually need.',
    path: '/service-areas',
    jsonLd: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Service Areas', path: '/service-areas' },
      ]),
    ],
  });

  return (
    <>
      <PageHeader
        eyebrow="Where we work"
        title="Six towns, and we have been driving to all of them for years"
        intro="The shop is on Thornwood Drive in Pasadena. Everything below is inside a comfortable morning of it, which is why the trucks get there when we say they will."
        crumbs={[{ name: 'Home', path: '/' }]}
      />
      <section className="py-14 md:py-20">
        <div className="shell grid gap-5 md:grid-cols-2">
          {areas.map((area) => (
            <Link
              key={area.slug}
              to={`/service-areas/${area.slug}`}
              className="card group flex flex-col overflow-hidden hover:border-moss-500"
            >
              <div className="aspect-[16/9] overflow-hidden bg-paper-100">
                <img
                  src={area.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="display h2 text-canopy-700">{area.name}</h2>
                  <span className="text-[0.82rem] text-ink-700">{area.zips}</span>
                </div>
                <p className="mt-2 flex-1 leading-relaxed text-ink-700">{area.lede}</p>
                <span className="mt-4 text-[0.9rem] font-semibold text-canopy-700">
                  Tree Service in {area.name} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <EstimateCta />
    </>
  );
}
