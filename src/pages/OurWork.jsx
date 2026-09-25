import { gallery, photoCredit } from '../content/gallery';
import { useSeo } from '../lib/seo';
import { breadcrumbSchema } from '../lib/structured-data';
import PhotoHero from '../components/sections/PhotoHero';
import EstimateCta from '../components/sections/EstimateCta';

export default function OurWork() {
  useSeo({
    title: 'Our Work — Tree Removal & Trimming Photos | Southeast Arbor Care',
    description:
      'Photographs of the work: sectional takedowns, rigging over structures, storm response, stump grinding and clearance pruning across southeast Harris County.',
    path: '/our-work',
    jsonLd: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Our Work', path: '/our-work' },
      ]),
    ],
  });

  return (
    <>
      <PhotoHero
        compact
        image="/photos/climber-2.jpg"
        alt="An arborist high in a tree working on a limb"
        eyebrow="Our work"
        title="The jobs, not the brochure"
        intro="A tree company is worth exactly what its photographs show. These are the kinds of jobs that go out of the Thornwood yard every week."
        crumbs={[{ name: 'Home', path: '/' }]}
      />

      <section className="py-14 md:py-20">
        <div className="shell grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((shot, i) => (
            <figure
              key={shot.src}
              className={`group ${i % 5 === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}`}
            >
              <div
                className={`overflow-hidden bg-paper-100 ${
                  i % 5 === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-3">
                <span className="block display h3 text-bark-900">{shot.caption}</span>
                <span className="mt-1 block text-[0.92rem] leading-relaxed text-ink-700">
                  {shot.note}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="shell mt-10 text-[0.8rem] italic text-ink-700">{photoCredit}</p>
      </section>

      <EstimateCta />
    </>
  );
}
