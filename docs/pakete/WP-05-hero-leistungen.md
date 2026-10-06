# WP-05: Hero & Leistungen

| | |
|---|---|
| **Owner** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Reviewer** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Release** | V1.0 |
| **Aufwand** | M (ca. 4–12 h) |
| **Branch** | `tony/wp-05-hero-leistungen` |
| **Issue** | [#8](https://github.com/JulianRudrich/Landingpage/issues/8) |
| **Abhängig von** | WP-03 |
| **Blockiert** | – |
| **Anforderungen** | FA-05, FA-06, D-06 aus [SPECS.md](../../SPECS.md) |

## Ziel

Der erste Eindruck entscheidet. Wer aus einer Akquise-Mail auf die Seite kommt, soll **in 5 Sekunden** verstehen: Was machen die beiden, für wen, und wie nehme ich Kontakt auf? Die Leistungssektion zeigt danach konkret, womit wir helfen.

## Umfang

**Gehört dazu**

1. **Hero** (`#start`, FA-05)
   - H1 (Kernbotschaft), Subline, primärer CTA „Kostenloses Erstgespräch“ → `#kontakt`, sekundärer CTA „Projekte ansehen“ → `#projekte`
   - Optional eine Vertrauenszeile unter den Buttons (z. B. „Persönlich · Verständlich · Aus der Region“)
   - Visual: Mockup eines Gastro-Projekts im Geräterahmen oder ein echtes Foto (D-06). Es ist das LCP-Element: `<Picture>` mit `loading="eager"` und `fetchpriority="high"`.
2. **Leistungen** (`#leistungen`, FA-06)
   - `SectionHeading` mit Dachzeile, Titel und Einleitung
   - 4 Karten (L1–L4 aus [SPECS §4](../../SPECS.md#4-leistungsangebot)): Icon, Titel, Kurztext, 3 Nutzenpunkte, optional Link „Anfragen“ → `#kontakt`
   - Die Karten werden aus einem Array in `services.ts` erzeugt, nicht 4× kopiertes Markup
   - Raster: mobil 1 Spalte, Tablet 2, Desktop 2 oder 4
3. Texte finalisieren, passend zu E-04 (Sie/du) aus WP-00.

**Textentwürfe** (zum Anpassen)

| Element | Entwurf |
|---|---|
| H1 | Digitale Lösungen für Gastronomie und lokale Betriebe |
| Subline | Wir sind Tony und Julian. Wir bauen Websites, Apps und KI-Lösungen, die Ihnen Zeit sparen und mehr Gäste bringen – persönlich, verständlich und aus einer Hand. |
| CTA 1 | Kostenloses Erstgespräch |
| CTA 2 | Projekte ansehen |
| Leistungen, Dachzeile | Leistungen |
| Leistungen, Titel | Was wir für Sie tun |
| Leistungen, Einleitung | Vom ersten Online-Auftritt bis zur eigenen App: Wir kümmern uns um die Technik, Sie sich um Ihre Gäste. |

**Gehört nicht dazu**

- Header-Navigation (WP-04)
- Neue UI-Bausteine. Fehlt einer, in WP-03 ergänzen (Tony ist Owner von beiden).

## Dateien

**Besitzt dieses Paket:** `src/components/sections/Hero.astro`, `src/components/sections/Services.astro`, `src/i18n/de/hero.ts`, `src/i18n/de/services.ts`, `src/assets/hero/*`

**Liest/benutzt:** `src/components/ui/*`, `src/config/site.ts`

## Akzeptanzkriterien

- [ ] Bei 360 × 640 px sind Headline, Subline und primärer CTA ohne Scrollen sichtbar
- [ ] Die Startseite hat genau eine H1 (im Hero)
- [ ] Das Hero-Bild ist LCP-optimiert (eager, `fetchpriority="high"`, AVIF/WebP, feste Maße); Lighthouse mobil zeigt LCP < 2,5 s
- [ ] Vier Leistungskarten entstehen aus den Daten in `services.ts`
- [ ] Das Raster passt sich an: mobil 1 Spalte, ab Tablet mehrspaltig
- [ ] Icons sind dekorativ (`aria-hidden`), die Information steckt im Text
- [ ] Die Texte sind vom Reviewer gegengelesen (E-04 beachtet, kein Fachjargon)
