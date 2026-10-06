# WP-09: SEO & Meta

| | |
|---|---|
| **Owner** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Reviewer** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Release** | V1.0, Phase 0 (Festlegen; Favicon und OG-Bild nach Tonys Design) |
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

1. **`SEO.astro`** ausbauen. Die Props stehen fest (`export interface Props`, siehe Schnittstellen).
   - `<title>` (Muster siehe 2.), `<meta name="description">`, Canonical-URL (`new URL(Astro.url.pathname, Astro.site)`, endet mit `/`), `robots`-Meta bei `noindex`. **Seiten mit `noindex` bekommen weder Canonical noch `og:url`** (die 404-Seite hätte sonst die nicht existierende URL `/404/`).
   - Open Graph: `og:title`, `og:description`, `og:url`, `og:image` (absolute URL; aus `image` über `getImage()`, sonst `/og-image.png`), `og:image:alt` (`imageAlt` bzw. `t.seo.defaultImageAlt`), `og:type` (`type`, Standard `website`), `og:locale=de_DE`, `og:site_name`
   - `twitter:card=summary_large_image`
   - Favicon-Links, `apple-touch-icon`, `<meta name="theme-color" content={site.themeColor}>`; der Link auf das Web-Manifest steht schon
2. **Title-Muster** (die Grundversion setzt es schon um): `fill(title)` + „ | {site.name}“. Wird das länger als 60 Zeichen, entfällt der Markenname. Die Startseite nimmt `seo.home.titleWithRegion`, sobald `site.region` gesetzt ist (entscheidet `index.astro` schon), sonst `seo.home.title`. Markenname und Region stehen in Texten nur als `{name}` / `{region}`.
3. **`src/i18n/de/seo.ts`** (existiert): Titel und Descriptions für `home`, `impressum`, `datenschutz`, `danke`, `notFound`, `styleguide`; dazu `defaultImageAlt` und `organizationDescription`. Detailseiten setzt WP-12 aus den Projektdaten.
4. **JSON-LD (NFA-10)**, gerendert von `SEO.astro` selbst, nur wenn `Astro.url.pathname === '/'` (so muss weder `index.astro` noch `BaseLayout` geändert werden): `ProfessionalService` mit diesen Feldern, alle aus `src/config/site.ts` bzw. `seo.ts`: `name` (`site.name`), `legalName` (`site.legalName`), `description` (`t.seo.organizationDescription`), `url`, `email`, `telephone` (nur wenn `site.phone` gesetzt), `areaServed` (`site.region`, nur wenn gesetzt), `address` als `PostalAddress` (`site.address`, Land `DE`; die Anschrift steht laut R-01 ohnehin im Impressum), `founder` als `Person` je Eintrag in `site.founders`, `sameAs` (alle gesetzten Links aus `site.social`).
5. **`src/pages/robots.txt.ts`** funktioniert bereits (Sitemap-Link aus `site`); nur prüfen.
6. **Sitemap prüfen:** Die Integration aus WP-01 erzeugt `sitemap-index.xml`; `/danke/` und `/styleguide/` fehlen darin.
7. **Favicons & OG-Bild** in `public/`: `favicon.svg` (Platzhalter ersetzen), `favicon.ico`, `apple-touch-icon.png` (180 × 180), `og-image.png` (1200 × 630), alles nach der Vorlage aus Tonys Design-Entwurf (WP-03 Teil A, Punkt 4); die Icons auch in `src/pages/site.webmanifest.ts` eintragen. Bis der Entwurf abgenommen ist, kann der Rest von WP-09 schon fertig werden.
8. **Nach dem Go-live** (steht in der Release-Checkliste, [SPECS §14](../../SPECS.md#14-definition-of-done), damit dieses Paket vorher schließen kann): Google Search Console einrichten (Domain per DNS bestätigen), Sitemap einreichen, Google-Unternehmensprofil mit der Website verknüpfen.

**Gehört nicht dazu**

- FAQ-Strukturdaten (festgelegt: keine, siehe WP-11)
- SEO der Detailseiten (WP-12 nutzt `SEO.astro` mit eigenen Werten)

## Dateien

> Alle Dateien existieren schon im Gerüst (WP-01) als Grundversion mit fester Schnittstelle; die Texte stehen schon in den Textdateien. Neue gemeinsame Dateien oder Schnittstellen nur per Spec-Änderung ([SPECS §16](../../SPECS.md#16-änderungsregeln)).

**Besitzt dieses Paket:** `src/components/layout/SEO.astro`, `src/i18n/de/seo.ts`, `src/pages/robots.txt.ts`, `src/pages/site.webmanifest.ts`, `public/favicon.svg`, später `public/favicon.ico`, `public/apple-touch-icon.png`, `public/og-image.png`

**Liest/benutzt:** `src/config/site.ts`, `src/i18n` (`fill`), `astro.config.mjs` (`site`)

## Schnittstellen

- `SEO.astro` exportiert `interface Props`: `title`, `description`, `noindex?`, `image?: ImageMetadata`, `imageAlt?`, `type?: 'website' | 'article'`. **Das ist der Vertrag für alle Seiten:** `BaseLayout` (WP-03) übernimmt genau diese Props und reicht sie unverändert durch. Neue Props nur per Spec-Änderung.
- `title` kommt immer **ohne** Markennamen an; `SEO.astro` hängt ihn an.

## Akzeptanzkriterien

- [ ] Jede Seite hat einen eigenen Title (≤ 60 Zeichen), eine Description (≤ 155 Zeichen), `og:*`-Tags und `twitter:card`; indexierbare Seiten zusätzlich eine Canonical-URL
- [ ] `/danke/`, die 404-Seite und `/styleguide/` haben `noindex`
- [ ] JSON-LD `ProfessionalService` ist auf der Startseite eingebunden; der Schema-Validator bzw. Rich Results Test zeigt keine Fehler
- [ ] `sitemap-index.xml` enthält nur indexierbare Seiten; `robots.txt` verweist darauf
- [ ] Die Link-Vorschau (z. B. in WhatsApp oder auf opengraph.xyz) zeigt Titel, Text und Bild
- [ ] Das Favicon erscheint im Browser-Tab und als Homescreen-Icon
- [ ] Lighthouse SEO ≥ 95
