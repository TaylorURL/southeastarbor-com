import { createContext, useContext, useEffect } from 'react';
import { company } from '../content/company.js';

/**
 * Every tag a crawler or a link preview reads is declared by the page it
 * describes: title, description, canonical, robots, Open Graph, the share
 * card and JSON-LD. A page that sets three of them is the failure that is hard
 * to notice, so all of them come from one `useSeo` call per page.
 *
 * The build renders each page once and writes what that call declared into
 * the document's head, so the tags are in the HTML before any script runs. In
 * the browser the same call keeps them current as a visitor moves between
 * pages without a reload.
 *
 * A route's title is used as declared, with no brand appended. A result line is
 * cut around sixty characters, and the old site spent its first eleven on
 * "Call 7134721488", which is not a thing anybody searches for.
 */
const SEO_MARK = 'data-seo';
const DEFAULT_IMAGE = '/og.jpg';

/** Filled by the build while it renders a page; absent in the browser. */
export const HeadContext = createContext(null);

export function headFor({
  title,
  description,
  path = '/',
  robots = 'index,follow',
  image = DEFAULT_IMAGE,
  jsonLd = [],
}) {
  const canonical = `${company.url}${path === '/' ? '' : path}`;
  return {
    title,
    canonical: robots.includes('noindex') ? null : canonical,
    meta: [
      ['name', 'description', description],
      ['name', 'robots', robots],
      ['property', 'og:type', 'website'],
      ['property', 'og:site_name', company.name],
      ['property', 'og:title', title],
      ['property', 'og:description', description],
      ['property', 'og:url', canonical],
      ['property', 'og:image', `${company.url}${image}`],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', title],
      ['name', 'twitter:description', description],
      ['name', 'twitter:image', `${company.url}${image}`],
    ].filter(([, , content]) => content),
    jsonLd: jsonLd.filter(Boolean),
  };
}

function upsertTag(tagName, key, value) {
  let element = document.head.querySelector(`${tagName}[${key}="${value}"]`);
  if (!element) {
    element = document.createElement(tagName);
    element.setAttribute(key, value);
    element.setAttribute(SEO_MARK, '');
    document.head.appendChild(element);
  }
  return element;
}

/** A page that has nothing to describe - an unknown slug - passes null and leaves the head to whatever it renders instead. */
export function useSeo(props) {
  const collect = useContext(HeadContext);
  const head = props ? headFor(props) : null;
  if (collect && head) collect.head = head;

  const signature = JSON.stringify(head);
  useEffect(() => {
    if (!head) return;
    document.title = head.title;
    head.meta.forEach(([key, value, content]) =>
      upsertTag('meta', key, value).setAttribute('content', content),
    );
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (head.canonical) upsertTag('link', 'rel', 'canonical').setAttribute('href', head.canonical);
    else if (canonical) canonical.remove();

    // The build already wrote this page's blocks; replace rather than add to them.
    document.head
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach((script) => script.remove());
    head.jsonLd.forEach((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute(SEO_MARK, '');
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);
}
