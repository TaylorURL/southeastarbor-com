import { useCallback, useEffect, useState } from 'react';

/**
 * Three themes, one attribute. `data-theme` on the document element selects the
 * token block in index.css; with nothing set the stylesheet follows the
 * visitor's system, so "no choice made" is a real state rather than a silent
 * default to light. A script in index.html applies a stored choice before the
 * first paint, which is why this reads the attribute rather than setting it on
 * mount.
 */
export const THEME_KEY = 'theme';
export const THEMES = ['light', 'dark', 'gray'];

function syncBrowserChrome() {
  const ground = getComputedStyle(document.documentElement).getPropertyValue('--ground').trim();
  const meta = document.head.querySelector('meta[name="theme-color"]');
  if (meta && ground) meta.setAttribute('content', ground);
}

export function useTheme() {
  const [theme, setThemeState] = useState(null);

  useEffect(() => {
    setThemeState(document.documentElement.getAttribute('data-theme'));
  }, []);

  const setTheme = useCallback((next) => {
    const root = document.documentElement;
    if (next) root.setAttribute('data-theme', next);
    else root.removeAttribute('data-theme');
    try {
      if (next) localStorage.setItem(THEME_KEY, next);
      else localStorage.removeItem(THEME_KEY);
    } catch {
      // Storage blocked: the choice holds for this page and is forgotten after.
    }
    syncBrowserChrome();
    setThemeState(next);
  }, []);

  return [theme, setTheme];
}
