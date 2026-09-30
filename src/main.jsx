import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { routeFor } from './routes';
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
  .then(() => (root.hasChildNodes() ? hydrateRoot(root, app) : createRoot(root).render(app)));
