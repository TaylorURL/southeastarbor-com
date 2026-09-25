import { company } from '../content/company';
import { reviews, reviewTotals } from '../content/reviews';
import { useSeo } from '../lib/seo';
import { breadcrumbSchema } from '../lib/structured-data';
import PageHeader from '../components/sections/PageHeader';
import EstimateCta from '../components/sections/EstimateCta';

const profiles = [
  {
    label: 'Google',
    href: company.social.google,
    note: 'only 3 so far, and the one that feeds the map',
  },
  { label: 'Yelp', href: company.social.yelp, note: '29 reviews, 40 photos' },
  { label: 'BBB', href: company.social.bbb, note: 'A+ and accredited since 2016' },
  { label: 'Nextdoor', href: company.social.nextdoor, note: '49 neighborhood faves' },
];

export default function Reviews() {
  useSeo({
    title: 'Reviews — Southeast Arbor Care, Pasadena TX',
    description: `${reviewTotals.label} across ${reviewTotals.sources}, averaging ${reviewTotals.rating} stars. Read them and leave one.`,
    path: '/reviews',
    jsonLd: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Reviews', path: '/reviews' },
      ]),
    ],
  });

  return (
    <>
      <PageHeader
        eyebrow="What neighbors say"
        title={`${reviewTotals.label}, and a five-star average on all of them`}
        intro={`Collected across ${reviewTotals.sources}. If we have worked in your yard, a review is the single most useful thing you can do for us.`}
        crumbs={[{ name: 'Home', path: '/' }]}
      />

      <section className="py-14 md:py-20">
        <div className="shell">
          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <figure key={review.author} className="card flex flex-col p-7">
                <p className="text-[1.05rem] text-rigging-500" aria-label="Five out of five stars">
                  ★★★★★
                </p>
                <blockquote className="mt-4 flex-1 text-[1.02rem] leading-relaxed text-bark-900">
                  {review.quote}
                </blockquote>
                <figcaption className="mt-5 text-[0.85rem] font-medium text-ink-700">
                  {review.author} · {review.where}
                </figcaption>
              </figure>
            ))}
          </div>

          <h2 className="mt-14 display h2 text-bark-900">
            Where to read them, and where to leave one
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {profiles.map((profile) => (
              <div key={profile.label} className="card p-6">
                <h3 className="display h3 text-canopy-700">{profile.label}</h3>
                <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink-700">{profile.note}</p>
                {profile.href ? (
                  <a
                    href={profile.href}
                    className="mt-3 inline-block text-[0.88rem] font-semibold text-canopy-700 underline underline-offset-2"
                  >
                    Open Profile →
                  </a>
                ) : (
                  <p className="mt-3 text-[0.82rem] italic text-ink-700">
                    Profile link added once the listing is claimed.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <EstimateCta
        heading="Had us out before? Leave a review."
        body="It takes a minute and it is worth more to a family business than any advertising we could buy."
      />
    </>
  );
}
