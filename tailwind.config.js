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
        // Roles rather than colours: each resolves to a different value per
        // theme. The named colours above are the fixed palette the dark bands
        // and the photographs sit on, which read the same in every theme.
        ground: token('ground'),
        raised: token('raised'),
        surface: token('surface'),
        line: token('line'),
        field: token('field'),
        heading: token('heading'),
        body: token('body'),
        link: token('link'),
        'accent-ink': token('accent-ink'),
      },
      fontFamily: {
        display: ['Archivo', 'Archivo Fallback', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'Inter Fallback', 'system-ui', 'sans-serif'],
      },
      maxWidth: { shell: token('shell-width') },
      // Every transition eases the same way the stylesheet's own do.
      transitionTimingFunction: { DEFAULT: token('ease-out') },
    },
  },
  plugins: [],
};
