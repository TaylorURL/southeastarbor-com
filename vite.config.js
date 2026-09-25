import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';

const { version } = JSON.parse(readFileSync('./package.json', 'utf8'));

export default defineConfig({
  plugins: [react()],
  define: { __BUILD_VERSION__: JSON.stringify(version) },
  server: { port: 5199, strictPort: true },
});
