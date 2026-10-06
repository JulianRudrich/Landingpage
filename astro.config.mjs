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
  },
});
