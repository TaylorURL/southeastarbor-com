import { useSeo } from '../lib/seo';
import { breadcrumbSchema } from '../lib/structured-data';
import { PRIVACY_SECTIONS, PRIVACY_UPDATED } from '../content/legal';
import LegalPage from '../components/legal/LegalPage';
import CounterSwitch from '../components/legal/CounterSwitch';

export default function Privacy() {
  useSeo({
    title: 'Privacy Policy | Southeast Arbor Care',
    description:
      'What the Southeast Arbor Care website collects, why, who else sees it, and how to switch the visit counter off.',
    path: '/privacy',
    jsonLd: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Privacy', path: '/privacy' },
      ]),
    ],
  });

  return (
    <LegalPage
      eyebrow="Privacy"
      title="What this site keeps, and why"
      intro="The short version is that it keeps very little: what you type into the estimate form, and anonymous visit counts."
      updated={PRIVACY_UPDATED}
      sections={PRIVACY_SECTIONS}
    >
      <CounterSwitch />
    </LegalPage>
  );
}
