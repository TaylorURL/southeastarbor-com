import { Link } from 'react-router-dom';
import { useSeo } from '../lib/seo';
import PageHeader from '../components/sections/PageHeader';

export default function NotFound() {
  useSeo({
    title: 'Page not found | Southeast Arbor Care',
    description: 'That page does not exist. The services and service areas are linked below.',
    path: '/404',
    robots: 'noindex,follow',
  });

  return (
    <PageHeader
      eyebrow="404"
      title="That page is not here"
      intro={
        <>
          Try{' '}
          <Link
            to="/services"
            className="font-semibold text-canopy-700 underline underline-offset-2"
          >
            services
          </Link>
          ,{' '}
          <Link
            to="/service-areas"
            className="font-semibold text-canopy-700 underline underline-offset-2"
          >
            service areas
          </Link>
          , or{' '}
          <Link
            to="/free-estimate"
            className="font-semibold text-canopy-700 underline underline-offset-2"
          >
            a free estimate
          </Link>
          .
        </>
      }
    />
  );
}
