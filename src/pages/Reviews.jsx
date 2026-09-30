import { company } from '../content/company';
import { reviews, reviewTotals } from '../content/reviews';
import { useSeo } from '../lib/seo';
import { breadcrumbSchema } from '../lib/structured-data';
import PageHeader from '../components/sections/PageHeader';
import ReviewCard from '../components/reviews/ReviewCard';
import EstimateCta from '../components/sections/EstimateCta';

const profiles = [
  { label: 'Google', href: company.social.google, note: 'The reviews on our map listing' },
  { label: 'Yelp', href: company.social.yelp, note: '29 reviews, 40 photos' },
  { label: 'BBB', href: company.social.bbb, note: 'A+ and accredited since 2016' },
  { label: 'Nextdoor', href: company.social.nextdoor, note: '49 neighborhood faves' },
].filter((profile) => profile.href);

export default function Reviews() {
  useSeo({
    title: 'Reviews of Southeast Arbor Care | Pasadena, TX',
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
              <ReviewCard key={review.author} review={review} />
            ))}
          </div>

          <h2 className="mt-14 display h2 text-heading">
            Where to read them, and where to leave one
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {profiles.map((profile) => (
              <div key={profile.label} className="card p-6">
                <h3 className="display h3 text-link">{profile.label}</h3>
                <p className="mt-1.5 text-[0.88rem] leading-relaxed text-body">{profile.note}</p>
                <a href={profile.href} className="link-inline mt-3 inline-block text-[0.88rem]">
                  Read Them on {profile.label} →
                </a>
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
