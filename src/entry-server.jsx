import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { HeadContext } from './lib/seo';
import { notFound, routes } from './routes';

export { paths } from './routes';
export { company } from './content/company';

/** Every page chunk in hand, so nothing renders as a loading state. */
export async function prepare() {
  await Promise.all([...routes, notFound].map((route) => route.preload()));
}

/** One page's markup and the head its `useSeo` call declared. */
export function render(url) {
  const collect = { head: null };
  const html = renderToString(
    <HeadContext.Provider value={collect}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HeadContext.Provider>,
  );
  return { html, head: collect.head };
}
