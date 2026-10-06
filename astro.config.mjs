// @ts-check
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import { site } from './src/config/site.ts';

/** Seiten, die nicht in die Sitemap gehören (sie haben auch `noindex`). */
const EXCLUDED_FROM_SITEMAP = ['/danke/', '/styleguide/'];

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Die Domain wird nur in src/config/site.ts gepflegt (E-02).
  site: site.url,

  // Einheitliche URLs: Jede Seite endet mit "/", z. B. /impressum/. Interne Links bitte genau so schreiben.
  trailingSlash: 'always',

  i18n: {
    locales: ['de'],
    defaultLocale: 'de',
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
        return !EXCLUDED_FROM_SITEMAP.includes(normalized);
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    build: {
      // Skripte nie inline ins HTML schreiben, sondern immer als Datei unter /_astro/ ausliefern.
      // Nur so bleibt die Content-Security-Policy "script-src 'self'" aus netlify.toml (WP-02) gültig.
      // Deshalb in Komponenten auch kein `is:inline` und kein `define:vars` verwenden.
      assetsInlineLimit: (filePath) => (filePath.endsWith('.js') ? false : undefined),
    },
  },
});
