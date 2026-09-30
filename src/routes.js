import { createElement, lazy } from 'react';
import { services } from './content/services.js';
import { areas } from './content/areas.js';

/**
 * Each page is its own chunk, so a visitor landing on a town page does not
 * download the home page's video section first. A chunk that is already in
 * hand renders directly rather than through `lazy`: the browser loads the
 * landing route's chunk before hydrating, and the build loads every chunk
 * before prerendering, so neither ever renders a suspended fallback over
 * markup that is already on the screen.
 */
function page(load) {
  let loaded = null;
  const preload = () =>
    loaded ? Promise.resolve(loaded) : load().then((module) => (loaded = module.default));
  const Lazy = lazy(() => preload().then((Component) => ({ default: Component })));
  const Component = (props) => createElement(loaded || Lazy, props);
  return { preload, Component };
}

export const routes = [
  { path: '/', ...page(() => import('./pages/Home.jsx')) },
  { path: '/services', ...page(() => import('./pages/Services.jsx')) },
  { path: '/services/:slug', ...page(() => import('./pages/ServiceDetail.jsx')) },
  { path: '/service-areas', ...page(() => import('./pages/ServiceAreas.jsx')) },
  { path: '/service-areas/:slug', ...page(() => import('./pages/AreaDetail.jsx')) },
  { path: '/about', ...page(() => import('./pages/About.jsx')) },
  { path: '/our-work', ...page(() => import('./pages/OurWork.jsx')) },
  { path: '/reviews', ...page(() => import('./pages/Reviews.jsx')) },
  { path: '/free-estimate', ...page(() => import('./pages/FreeEstimate.jsx')) },
  { path: '/contact', ...page(() => import('./pages/Contact.jsx')) },
  { path: '/privacy', ...page(() => import('./pages/Privacy.jsx')) },
  { path: '/terms', ...page(() => import('./pages/Terms.jsx')) },
];

export const notFound = page(() => import('./pages/NotFound.jsx'));

/** Every address the site answers, with the slugs filled in, for the build. */
export const paths = routes.flatMap((route) => {
  if (route.path === '/services/:slug') return services.map((s) => `/services/${s.slug}`);
  if (route.path === '/service-areas/:slug') return areas.map((a) => `/service-areas/${a.slug}`);
  return [route.path];
});

/** The route an address lands on, so its chunk can be loaded before hydrating. */
export function routeFor(pathname) {
  const parts = (pathname.replace(/\/+$/, '') || '/').split('/');
  const match = routes.find((route) => {
    const pattern = route.path.split('/');
    return (
      pattern.length === parts.length &&
      pattern.every((part, i) => part.startsWith(':') || part === parts[i])
    );
  });
  return match || notFound;
}
