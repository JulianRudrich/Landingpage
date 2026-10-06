# WP-09: SEO & Meta

| | |
|---|---|
| **Owner** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Reviewer** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Release** | V1.0 |
| **Aufwand** | M (ca. 4–12 h) |
| **Branch** | `julian/wp-09-seo-meta` |
| **Issue** | [#12](https://github.com/JulianRudrich/Landingpage/issues/12) |
| **Abhängig von** | WP-01; Markenname und Region aus WP-00 |
| **Blockiert** | – |
| **Anforderungen** | NFA-09, NFA-10, NFA-11, NFA-12 aus [SPECS.md](../../SPECS.md) |

## Ziel

Lokale Betriebe sollen uns bei Google finden, und unsere Links sollen in Mails, WhatsApp und LinkedIn eine saubere Vorschau zeigen. Das ist bei Kaltakquise der erste Eindruck, noch bevor jemand klickt.

## Umfang

**Gehört dazu**

1. **`SEO.astro`** mit den Props `title`, `description`, `noindex?`, `image?`, `type?: 'website' | 'article'`
   - `<title>`, `<meta name="description">`, Canonical-URL (aus `Astro.url` und `Astro.site`), `robots`-Meta bei `noindex`
   - Open Graph: `og:title`, `og:description`, `og:url`, `og:image` (absolute URL), `og:type`, `og:locale=de_DE`, `og:site_name`
   - `twitter:card=summary_large_image`
   - Favicon-Links, `theme-color`, Web-Manifest
2. **Title-Muster:** `{Seitentitel} | {site.name}`, höchstens 60 Zeichen. Startseite z. B. „Websites, Apps & KI für Gastronomie in {Region} | {Name}“.
3. **`src/i18n/de/seo.ts`:** Titel und Descriptions für `home`, `impressum`, `datenschutz`, `danke`, `notFound` (Detailseiten setzt WP-12 aus den Projektdaten).
4. **JSON-LD (NFA-10)** auf der Startseite: `ProfessionalService` mit `name`, `url`, `email`, `telephone` (falls öffentlich), `areaServed` (Region), `address` (nur wenn öffentlich, z. B. aus dem Impressum), `founder` (Tony, Julian als `Person`), `sameAs` (Profil-Links).
5. **`src/pages/robots.txt.ts`:** erzeugt `robots.txt` dynamisch mit dem Sitemap-Link aus `site` (keine fest eingetragene Domain).
6. **Sitemap prüfen:** Die Integration aus WP-01 erzeugt `sitemap-index.xml`; `/danke` und `/styleguide` fehlen darin.
7. **Favicons & OG-Bild** in `public/`: `favicon.svg`, `favicon.ico`, `apple-touch-icon.png` (180 × 180), `site.webmanifest`, `og-image.png` (1200 × 630). Die Gestaltung stimmst du mit Tony ab (Farben und Schrift aus WP-03).
8. **Nach dem Go-live:** Google Search Console einrichten (Domain per DNS bestätigen), Sitemap einreichen, Google-Unternehmensprofil mit der Website verknüpfen.

**Gehört nicht dazu**

- FAQ-Strukturdaten (WP-11)
- SEO der Detailseiten (WP-12 nutzt `SEO.astro` mit eigenen Werten)

## Dateien

**Besitzt dieses Paket:** `src/components/layout/SEO.astro`, `src/i18n/de/seo.ts`, `src/pages/robots.txt.ts`, `public/favicon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png`, `public/site.webmanifest`, `public/og-image.png`

**Liest/benutzt:** `src/config/site.ts`, `astro.config.mjs` (`site`)

## Schnittstellen

- `BaseLayout` (WP-03) reicht `title`, `description` und `noindex` an `SEO` durch. Zusätzliche Props (z. B. `image` für Detailseiten) werden in Absprache mit Tony durchgereicht.

## Akzeptanzkriterien

- [ ] Jede Seite hat einen eigenen Title (≤ 60 Zeichen), eine Description (≤ 155 Zeichen), eine Canonical-URL, `og:*`-Tags und `twitter:card`
- [ ] `/danke`, die 404-Seite und `/styleguide` haben `noindex`
- [ ] JSON-LD `ProfessionalService` ist auf der Startseite eingebunden; der Schema-Validator bzw. Rich Results Test zeigt keine Fehler
- [ ] `sitemap-index.xml` enthält nur indexierbare Seiten; `robots.txt` verweist darauf
- [ ] Die Link-Vorschau (z. B. in WhatsApp oder auf opengraph.xyz) zeigt Titel, Text und Bild
- [ ] Das Favicon erscheint im Browser-Tab und als Homescreen-Icon
- [ ] Lighthouse SEO ≥ 95
- [ ] Nach dem Go-live: Search Console eingerichtet, Sitemap eingereicht
