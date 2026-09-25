/**
 * The palette lives in src/index.css as custom properties. This file is the
 * Tailwind view of that same source rather than a second copy of it, so every
 * utility resolves to a token a theme can rewrite. Nothing here holds a colour.
 */
const token = (name) => `var(--${name})`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bark: { 950: token('bark-950'), 900: token('bark-900') },
        canopy: { 800: token('canopy-800'), 700: token('canopy-700') },
        moss: { 600: token('moss-600'), 500: token('moss-500'), 200: token('moss-200') },
        rigging: {
          600: token('rigging-600'),
          500: token('rigging-500'),
          200: token('rigging-200'),
        },
        paper: { 50: token('paper-50'), 100: token('paper-100'), 200: token('paper-200') },
        tan: { 300: token('tan-300') },
        ink: { 700: token('ink-700') },
        surface: token('surface'),
      },
      fontFamily: {
        display: ['Archivo', 'Archivo Fallback', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'Inter Fallback', 'system-ui', 'sans-serif'],
      },
      maxWidth: { shell: '1280px' },
    },
  },
  plugins: [],
};
