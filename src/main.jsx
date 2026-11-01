import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { routeFor } from './routes';
import { recoverFromChunkFailure } from './lib/route-recovery.js';
import './index.css';

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// The page already holds its prerendered markup. Its own chunk is loaded first
// so the first render matches that markup rather than a loading state.
routeFor(location.pathname)
  .preload()
  .then(
    () => (root.hasChildNodes() ? hydrateRoot(root, app) : createRoot(root).render(app)),
    // Without this the page kept its prerendered markup and silently never
    // hydrated, so nothing on it worked. See src/lib/route-recovery.js.
    (error) =>
      recoverFromChunkFailure(error, {
        storage: window.sessionStorage,
        reload: () => location.reload(),
        hidden: document.visibilityState === 'hidden',
        reporter: window.__reporter,
      }),
  );
