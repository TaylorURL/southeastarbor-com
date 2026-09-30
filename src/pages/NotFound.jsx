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
          <Link to="/services" className="link-inline">
            services
          </Link>
          ,{' '}
          <Link to="/service-areas" className="link-inline">
            service areas
          </Link>
          , or{' '}
          <Link to="/free-estimate" className="link-inline">
            a free estimate
          </Link>
          .
        </>
      }
    />
  );
}
