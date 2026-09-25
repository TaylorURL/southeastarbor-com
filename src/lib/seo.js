import { useEffect } from 'react';
import { company } from '../content/company.js';

/**
 * The site renders on the client, so every tag a crawler or a link preview
 * reads has to be written into the document as each route mounts. This owns all
 * six: title, description, canonical, robots, Open Graph and JSON-LD. A page
 * that sets three of the six is the failure that is hard to notice.
 *
 * A route's title is used as declared, with no brand appended. A result line is
 * cut around sixty characters, and the old site spent its first eleven on
 * "Call 7134721488", which is not a thing anybody searches for.
 */
const SEO_MARK = 'data-seo';

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

const setMeta = (key, value, content) => {
  if (content) upsertTag('meta', key, value).setAttribute('content', content);
};

export function useSeo({ title, description, path = '/', robots = 'index,follow', jsonLd = [] }) {
  useEffect(() => {
    const canonical = `${company.url}${path === '/' ? '' : path}`;
    if (title) document.title = title;
    setMeta('name', 'description', description);
    upsertTag('meta', 'name', 'robots').setAttribute('content', robots);
    upsertTag('link', 'rel', 'canonical').setAttribute('href', canonical);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:card', 'summary_large_image');

    const blocks = jsonLd.filter(Boolean).map((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute(SEO_MARK, '');
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
      return script;
    });

    return () => blocks.forEach((script) => script.remove());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, robots]);
}
