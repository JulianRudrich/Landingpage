// Gehört WP-09 (SEO & Meta). Erzeugt /site.webmanifest aus src/config/site.ts, damit Name und Farbe
// nicht doppelt gepflegt werden. WP-09 ergänzt die Icons, sobald sie nach Tonys Design existieren.
import type { APIRoute } from 'astro';

import { site } from '@/config/site';
import { useTranslations } from '@/i18n';

export const GET: APIRoute = () => {
  const t = useTranslations();
  const manifest = {
    name: site.name,
    short_name: site.name,
    description: t.seo.organizationDescription,
    lang: 'de',
    start_url: '/',
    display: 'browser',
    background_color: site.themeColor,
    theme_color: site.themeColor,
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
};
