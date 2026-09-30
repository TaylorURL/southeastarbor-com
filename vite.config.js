import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';

const { version } = JSON.parse(readFileSync('./package.json', 'utf8'));

// React and the router change a few times a year and the site's own code
// changes every release, so they ship as separate files: a returning visitor
// keeps the framework cached across a deploy and downloads only what moved.
const VENDOR = /node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//;

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  define: { __BUILD_VERSION__: JSON.stringify(version) },
  server: { port: 5199, strictPort: true },
  build: {
    // Every browser that can reach the site has had these features for years,
    // so nothing is transpiled down or polyfilled for one that cannot.
    target: 'es2022',
    rollupOptions: isSsrBuild
      ? {}
      : { output: { manualChunks: (id) => (VENDOR.test(id) ? 'vendor' : undefined) } },
  },
}));
