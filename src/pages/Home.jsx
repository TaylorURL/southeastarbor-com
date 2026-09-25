import { Link } from 'react-router-dom';
import { company, yearsInBusiness } from '../content/company';
import { services } from '../content/services';
import { areas } from '../content/areas';
import { reviews, reviewTotals } from '../content/reviews';
import { gallery } from '../content/gallery';
import { useSeo } from '../lib/seo';
import { treeServiceSchema } from '../lib/structured-data';
import PhotoHero from '../components/sections/PhotoHero';
import Estimator from '../components/sections/Estimator';
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
  useSeo({
    title: 'Tree Removal & Tree Service in Pasadena, TX | Southeast Arbor Care',
    description:
      'Family-owned tree removal, trimming, stump grinding and storm cleanup in Pasadena, Deer Park, La Porte and Clear Lake. See a Ballpark Price before you call. Since 2000.',
    path: '/',
    jsonLd: [treeServiceSchema(areas.map((a) => a.name))],
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
          <a href="#ballpark" className="btn btn-ghost text-[1.05rem]">
            See a Ballpark Price
          </a>
        </div>
      </PhotoHero>

      <section className="border-b border-canopy-800 bg-canopy-700">
        <div className="shell grid grid-cols-2 gap-x-6 gap-y-7 py-9 md:grid-cols-5">
          {proof.map(([figure, unit, note]) => (
            <div key={note}>
              <p className="flex items-baseline gap-1.5">
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

      {/* ---- the thing nobody else in Pasadena does ---- */}
      <section
        id="ballpark"
        className="contours border-b border-paper-200 bg-paper-100 py-16 md:py-24"
      >
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Before you even call</p>
            <h2 className="display h1 mt-3 text-bark-900">What is this going to cost?</h2>
            <p className="mt-5 text-[1.08rem] leading-relaxed text-ink-700">
              Everybody asks it first and nobody answers it. Pick the three things that actually
              move the price and we will show you the range we work in — then come out and put a
              real number in writing, for free.
            </p>
          </div>
          <div className="mt-10">
            <Estimator />
          </div>
        </div>
      </section>

      {/* ---- services ---- */}
      <section className="py-16 md:py-24">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 className="display h1 mt-3 max-w-xl text-bark-900">
                Six services, and a page for each one
              </h2>
            </div>
            <p className="text-[1.05rem] leading-relaxed text-ink-700">
              Every job is quoted in person, in writing, before anybody starts a saw. If a tree can
              be saved we will tell you so — we would rather trim it twice than take it down once.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {featured.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group relative isolate flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[4px] bg-bark-900 p-7"
              >
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0 -z-10"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(17,26,20,0.93) 0%, rgba(17,26,20,0.6) 42%, rgba(17,26,20,0.1) 100%)',
                  }}
                />
                {service.urgent && (
                  <span className="mono absolute left-0 top-6 bg-rigging-500 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white">
                    Answered after hours
                  </span>
                )}
                <h3 className="display h2 text-paper-50">{service.name}</h3>
                <p className="mt-2.5 max-w-sm text-[0.98rem] leading-relaxed text-moss-200">
                  {service.short}
                </p>
                <span className="mono mt-4 text-[0.78rem] uppercase tracking-[0.12em] text-rigging-200">
                  See {service.name} →
                </span>
              </Link>
            ))}
          </div>

          <ul className="mt-5 divide-y divide-paper-200 border-y border-paper-200">
            {rest.map((service, i) => (
              <li key={service.slug}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-1 py-5 sm:grid-cols-[auto_minmax(0,14rem)_1fr_auto]"
                >
                  <span className="mono text-[0.78rem] text-rigging-500">
                    {String(i + 3).padStart(2, '0')}
                  </span>
                  <span className="display h3 text-bark-900 group-hover:text-canopy-700">
                    {service.name}
                  </span>
                  <span className="col-span-2 text-[0.95rem] leading-relaxed text-ink-700 sm:col-span-1">
                    {service.short}
                  </span>
                  <span className="mono hidden text-[0.78rem] text-canopy-700 sm:block">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- how the day goes ---- */}
      <section className="relative isolate overflow-hidden bg-bark-950">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          src="/video/tree-work.mp4"
          poster="/photos/chainsaw-trunk.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-bark-950/60" />
        <div className="shell relative grid gap-10 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow eyebrow-light">How the day goes</p>
            <h2 className="display h1 mt-4 text-paper-50">
              We show up, it comes down, the yard gets raked.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-moss-200">
              No subcontractors, no second trip for the brush, no invoice with a line on it that was
              not in the quote. {yearsInBusiness} years of doing it the same way.
            </p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[4px] bg-canopy-800 sm:grid-cols-2">
            {[
              ['Walk it', 'We look at the tree, the access and what is under it.'],
              ['Quote it', 'A written number, on the spot, that does not move.'],
              ['Rig it', 'Roped down in sections wherever a free drop is not safe.'],
              ['Clear it', 'Chipper on site. Brush and rounds leave with us.'],
            ].map(([step, detail], i) => (
              <li key={step} className="bg-bark-950/85 p-6">
                <span className="mono text-[0.76rem] font-semibold text-rigging-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="display h3 mt-2 text-paper-50">{step}</h3>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-moss-200">{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- the work ---- */}
      <section className="py-16 md:py-24">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Our work</p>
              <h2 className="display h1 mt-3 text-bark-900">What the jobs actually look like</h2>
            </div>
            <Link to="/our-work" className="btn btn-outline">
              See the Full Gallery
            </Link>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.slice(0, 4).map((shot) => (
              <figure key={shot.src} className="group">
                <div className="aspect-[4/5] overflow-hidden bg-paper-100">
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mt-3">
                  <span className="display h3 block text-bark-900">{shot.caption}</span>
                  <span className="mt-1 block text-[0.88rem] leading-relaxed text-ink-700">
                    {shot.note}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---- where we work ---- */}
      <section className="border-y border-paper-200 bg-paper-100 py-16 md:py-24">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Where we work</p>
            <h2 className="display h1 mt-3 text-bark-900">
              Everything inside a morning of the Thornwood yard
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-700">
              Six towns, and a page for each one. The shop is on Thornwood Drive, which is why
              Pasadena and Deer Park calls usually get looked at the same week.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <Link
                key={area.slug}
                to={`/service-areas/${area.slug}`}
                className="group relative isolate flex min-h-[270px] flex-col justify-end overflow-hidden rounded-[4px] bg-bark-900 p-6"
              >
                <img
                  src={area.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0 -z-10"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(17,26,20,0.92) 0%, rgba(17,26,20,0.5) 48%, rgba(17,26,20,0.05) 100%)',
                  }}
                />
                <p className="mono text-[0.72rem] uppercase tracking-[0.14em] text-rigging-200">
                  {area.zips}
                </p>
                <h3 className="display h2 mt-1.5 text-paper-50">{area.name}</h3>
                <p className="mt-1.5 text-[0.88rem] leading-snug text-moss-200">{area.lede}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- reviews ---- */}
      <section className="py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow">What neighbors say</p>
          <h2 className="display h1 mt-3 max-w-3xl text-bark-900">
            A hundred reviews, and a five-star average on every one of them.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-700">
            {reviewTotals.breakdown.map((b) => `${b.count} on ${b.source}`).join(', ')}. The three
            below are the Google ones, word for word — and three is the number that has to grow,
            because Google is the only one of them that feeds the map.
          </p>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <figure key={review.author} className="card flex flex-col p-7">
                <p className="text-[1.05rem] text-rigging-500" aria-label="Five out of five stars">
                  ★★★★★
                </p>
                <blockquote className="mt-4 flex-1 text-[1.02rem] leading-relaxed text-bark-900">
                  {review.quote}
                </blockquote>
                <figcaption className="mono mt-5 text-[0.78rem] uppercase tracking-[0.1em] text-ink-700">
                  {review.author} · {review.where}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---- estimate ---- */}
      <section className="relative isolate overflow-hidden bg-canopy-800">
        <img
          src="/photos/rigging.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="shell relative grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_440px] lg:items-center">
          <div>
            <h2 className="display h1 text-paper-50">
              Send a photo of the tree. Get a number back the same day.
            </h2>
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
