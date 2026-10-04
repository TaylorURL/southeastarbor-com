import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';

const { version } = JSON.parse(readFileSync('./package.json', 'utf8'));

// The browser's own chrome takes its colour from a meta tag that cannot read a
// custom property, so the build copies the value out of the token block.
const themeColor = readFileSync('./src/index.css', 'utf8').match(/--bark-950:\s*([^;]+);/)[1];
const tokenColor = {
  name: 'token-colour',
  transformIndexHtml: (html) => html.replace('%THEME_COLOR%', themeColor),
};

// React and the router change a few times a year and the site's own code
// changes every release, so they ship as separate files: a returning visitor
// keeps the framework cached across a deploy and downloads only what moved.
const VENDOR = /node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//;

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tokenColor],
  define: { __BUILD_VERSION__: JSON.stringify(version) },
  server: { port: 5199, strictPort: true },
  build: {
    // Optional chaining and the nullish operators arrived in Chrome 80, and a
    // browser one release older cannot parse a file carrying them at all: the
    // module is refused whole, so the page answers with its prerendered markup
    // and then never becomes a site. Lowering the target hands those operators
    // to the compiler for a few hundred bytes; everything else the site uses
    // has been in every engine for years.
    target: 'es2019',
    rollupOptions: isSsrBuild
      ? {}
      : { output: { manualChunks: (id) => (VENDOR.test(id) ? 'vendor' : undefined) } },
  },
}));
