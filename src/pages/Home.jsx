import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { company, yearsInBusiness } from '../content/company';
import { services } from '../content/services';
import { areas } from '../content/areas';
import { reviews, reviewTotals } from '../content/reviews';
import { gallery } from '../content/gallery';
import { useSeo } from '../lib/seo';
import { treeServiceSchema, websiteSchema } from '../lib/structured-data';
import PhotoHero from '../components/sections/PhotoHero';
import Photo from '../components/Photo';
import { photoSet } from '../lib/photos';
import ReviewCard from '../components/reviews/ReviewCard';
import EstimateForm from '../components/forms/EstimateForm';

const proof = [
  [`${yearsInBusiness}`, 'years', 'same family, same trucks'],
  ['5.0', 'stars', 'across every review site'],
  ['A+', 'bbb', 'accredited since 2016'],
  ['$0', 'up front', 'you pay when the yard is clean'],
  ['24', 'hours', 'storm and emergency calls'],
];

/** Removal and storm carry the photographs; the rest read as a list. */
const featured = services.filter((s) => ['tree-removal', 'storm-and-emergency'].includes(s.slug));
const rest = services.filter((s) => !['tree-removal', 'storm-and-emergency'].includes(s.slug));

export default function Home() {
  // The footage behind "how the day goes" is decoration, and it is heavier than
  // every photograph on this page put together. Left to load with them it takes
  // the larger share of one connection and the photographs queue behind it,
  // which is how a visitor ends up looking at empty frames on a page whose files
  // are all present. A poster is fetched the moment the element exists, however
  // far down the page it sits, so the poster waits with the footage: the section
  // is dark bark until the page is otherwise done, and both arrive afterwards.
  const [playFootage, setPlayFootage] = useState(false);
  useEffect(() => {
    if (document.readyState === 'complete') {
      setPlayFootage(true);
      return undefined;
    }
    const start = () => setPlayFootage(true);
    window.addEventListener('load', start);
    return () => window.removeEventListener('load', start);
  }, []);

  useSeo({
    title: 'Tree Removal & Trimming, Pasadena TX | Southeast Arbor Care',
    description:
      'Family-owned tree removal, trimming, stump grinding and storm cleanup in Pasadena, Deer Park, La Porte and Clear Lake. Since 1991.',
    path: '/',
    jsonLd: [websiteSchema(), treeServiceSchema(areas.map((a) => a.name))],
  });

  return (
    <>
      <PhotoHero
        image="/photos/hero-topping.jpg"
        alt="A climber roped into the spar of a tall trunk, cutting a section away against a clear blue sky"
        eyebrow="Pasadena · Deer Park · La Porte · Clear Lake · Houston"
        title="The tree guys your neighbors already call."
        intro={`Removal, trimming, stump grinding and storm cleanup across southeast Harris County. Family owned since ${company.foundedYear}, fully insured, and we do not take a dollar until the job is done and the yard is clean.`}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/free-estimate" className="btn btn-primary text-[1.05rem]">
            Get a Free Estimate
          </Link>
        </div>
      </PhotoHero>

      <section className="border-y border-canopy-800 bg-canopy-700">
        <div className="shell grid grid-cols-2 gap-x-6 gap-y-7 py-9 md:grid-cols-5">
          {proof.map(([figure, unit, note]) => (
            <div key={note}>
              <p className="flex items-baseline gap-2">
                <span className="mono text-[1.85rem] font-semibold leading-none text-paper-50">
                  {figure}
                </span>
                <span className="label !text-moss-200">{unit}</span>
              </p>
              <p className="mt-2 text-[0.83rem] leading-snug text-moss-200">{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- services ---- */}
      <section className="py-16 md:py-24">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 className="display h1 mt-3 max-w-xl text-heading">
                Six services, and a page for each one
              </h2>
            </div>
            <p className="text-[1.05rem] leading-relaxed text-body">
              Every job is quoted in person, in writing, before a saw starts. We would rather trim a
              tree twice than take it down once.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              {featured.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="scrim-card pressable group relative isolate flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[4px] bg-bark-900 p-7 hover:ring-2 hover:ring-rigging-500 active:opacity-90"
                >
                  <Photo
                    src={service.image}
                    alt={service.alt}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.05]"
                  />
                  {service.urgent && (
                    <span className="mono absolute left-0 top-6 bg-rigging-500 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white">
                      Answered after hours
                    </span>
                  )}
                  <h3 className="display h2 text-paper-50">{service.name}</h3>
                  <p className="mt-2 max-w-sm text-[0.98rem] leading-relaxed text-moss-200">
                    {service.short}
                  </p>
                  <span className="mono mt-4 text-[0.78rem] uppercase tracking-[0.12em] text-rigging-200">
                    See {service.name} →
                  </span>
                </Link>
              ))}
            </div>

            <ul className="divide-y divide-line border-y border-line">
              {rest.map((service, i) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="pressable group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-1 py-5 hover:bg-raised active:opacity-90 sm:grid-cols-[auto_minmax(0,14rem)_1fr_auto]"
                  >
                    <span className="mono text-[0.78rem] text-rigging-500">
                      {String(i + 3).padStart(2, '0')}
                    </span>
                    <span className="display h3 text-heading group-hover:text-link">
                      {service.name}
                    </span>
                    <span className="col-span-2 text-[0.95rem] leading-relaxed text-body sm:col-span-1">
                      {service.short}
                    </span>
                    <span className="mono hidden text-[0.78rem] text-link sm:block">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---- how the day goes ---- */}
      <section className="below-fold relative isolate overflow-hidden bg-bark-950">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          src={playFootage ? '/video/tree-work.mp4' : undefined}
          poster={playFootage ? photoSet('/photos/chainsaw-trunk.jpg').src : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-bark-950/60" />
        <div className="shell relative grid gap-10 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p className="eyebrow eyebrow-light">How the day goes</p>
              <h2 className="display h1 text-paper-50">It comes down, and the yard gets raked.</h2>
            </div>
            <p className="max-w-lg text-lg leading-relaxed text-moss-200">
              No subcontractors, no second trip for the brush, no invoice line that was not quoted.{' '}
              {yearsInBusiness} years of doing it the same way.
            </p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[4px] bg-canopy-800 sm:grid-cols-2">
            {[
              ['Walk it', 'We look at the tree, the access and what is under it.'],
              ['Quote it', 'A written number, on the spot, that does not move.'],
              ['Rig it', 'Roped down in sections wherever a free drop is not safe.'],
              ['Clear it', 'Chipper on site. Brush and rounds leave with us.'],
            ].map(([step, detail], i) => (
              <li key={step} className="flex flex-col gap-2 bg-bark-950/85 p-6">
                <span className="mono text-[0.76rem] font-semibold leading-none text-rigging-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="display h3 text-paper-50">{step}</h3>
                <p className="text-[0.9rem] leading-relaxed text-moss-200">{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- the work ---- */}
      <section className="below-fold py-16 md:py-24">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Our work</p>
              <h2 className="display h1 mt-3 text-heading">What the jobs actually look like</h2>
            </div>
            <Link to="/our-work" className="btn btn-outline">
              See the Full Gallery
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.slice(0, 4).map((shot) => (
              <figure key={shot.src} className="group">
                <div className="aspect-[4/5] overflow-hidden bg-raised">
                  <Photo
                    src={shot.src}
                    alt={shot.alt}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mt-3">
                  <span className="display h3 block text-heading">{shot.caption}</span>
                  <span className="mt-1 block text-[0.88rem] leading-relaxed text-body">
                    {shot.note}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---- where we work ---- */}
      <section className="below-fold border-y border-line bg-raised py-16 md:py-24">
        <div className="shell">
          <div className="flex max-w-2xl flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p className="eyebrow">Where we work</p>
              <h2 className="display h1 text-heading">
                Everything inside a morning of the Thornwood yard
              </h2>
            </div>
            <p className="text-[1.05rem] leading-relaxed text-body">
              Six towns, and a page for each one. The shop is on Thornwood Drive, so Pasadena and
              Deer Park get a visit the same week.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <Link
                key={area.slug}
                to={`/service-areas/${area.slug}`}
                className="scrim-card-soft pressable group relative isolate flex min-h-[270px] flex-col justify-end overflow-hidden rounded-[4px] bg-bark-900 p-6 hover:ring-2 hover:ring-rigging-500 active:opacity-90"
              >
                <Photo
                  src={area.image}
                  aria-hidden="true"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.05]"
                />
                <p className="mono text-[0.72rem] uppercase tracking-[0.14em] text-rigging-200">
                  {area.zips}
                </p>
                <h3 className="display h2 mt-2 text-paper-50">{area.name}</h3>
                <p className="mt-2 text-[0.88rem] leading-snug text-moss-200">{area.lede}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- reviews ---- */}
      <section className="below-fold py-16 md:py-24">
        <div className="shell flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p className="eyebrow">What neighbors say</p>
              <h2 className="display h1 max-w-3xl text-heading">
                {reviewTotals.label}, every one of them five stars.
              </h2>
            </div>
            <p className="max-w-2xl leading-relaxed text-body">
              Three of them, in their own words.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.author} review={review} short />
            ))}
          </div>
        </div>
      </section>

      {/* ---- estimate ---- */}
      <section className="below-fold relative isolate overflow-hidden bg-canopy-800">
        <Photo
          src="/photos/rigging.jpg"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="shell relative grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_440px] lg:items-center">
          <div>
            <h2 className="display h1 text-paper-50">Send a photo. We quote it same day.</h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-moss-200">
              Estimates are free and there is no charge until the work is finished and the yard is
              clean. {company.afterHoursNote}
            </p>
          </div>
          <EstimateForm />
        </div>
      </section>
    </>
  );
}
