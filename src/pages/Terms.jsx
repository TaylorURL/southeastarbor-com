import { useSeo } from '../lib/seo';
import { breadcrumbSchema } from '../lib/structured-data';
import { TERMS_SECTIONS, TERMS_UPDATED } from '../content/legal';
import LegalPage from '../components/legal/LegalPage';

export default function Terms() {
  useSeo({
    title: 'Terms of Use | Southeast Arbor Care',
    description:
      'The terms for using the Southeast Arbor Care website. Tree work itself is governed by the written estimate you accept.',
    path: '/terms',
    jsonLd: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Terms', path: '/terms' },
      ]),
    ],
  });

  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of use"
      intro="These cover the website. The job itself runs on the written estimate you accept."
      updated={TERMS_UPDATED}
      sections={TERMS_SECTIONS}
    />
  );
}
