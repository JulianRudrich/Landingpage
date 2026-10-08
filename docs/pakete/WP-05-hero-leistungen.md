# WP-05: Hero & Leistungen

| | |
|---|---|
| **Owner** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Reviewer** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Release** | V1.0, Phase 1 (nach Freigabe der Spec v1.0) |
| **Aufwand** | M (ca. 4–12 h) |
| **Branch** | `tony/wp-05-hero-leistungen` |
| **Issue** | [#8](https://github.com/JulianRudrich/Landingpage/issues/8) |
| **Abhängig von** | Freigabe der Spec v1.0 (WP-00 + Design aus WP-03 Teil A); WP-03 |
| **Blockiert** | – |
| **Anforderungen** | FA-05, FA-06, D-06 aus [SPECS.md](../../SPECS.md) |

## Ziel

Der erste Eindruck entscheidet. Wer aus einer Akquise-Mail auf die Seite kommt, soll **in 5 Sekunden** verstehen: Was machen die beiden, für wen, und wie nehme ich Kontakt auf? Die Leistungssektion zeigt danach konkret, womit wir helfen.

## Umfang

**Gehört dazu**

1. **Hero** (`#start`, FA-05)
   - H1 (`t.hero.title`), Einleitung (`t.hero.lead`), `Button` primär „Kostenloses Erstgespräch“ → `/#kontakt`, `Button` sekundär „Projekte ansehen“ → `/#projekte`
   - Vertrauenszeile unter den Buttons aus `t.hero.trustPoints` („Persönlich · Verständlich · Aus der Region“)
   - Visual aus Tonys Design-Entwurf (WP-03 Teil A) in `src/assets/hero/`, Alt-Text `t.hero.imageAlt`. Es ist das LCP-Element: `<Picture>` mit `loading="eager"` und `fetchpriority="high"`.
2. **Leistungen** (`#leistungen`, FA-06)
   - `SectionHeading` mit Dachzeile, Titel und Einleitung
   - 4 Karten aus `t.services.items` (L1–L4, [SPECS §4](../../SPECS.md#4-leistungsangebot)): Icon, Titel, Kurztext, 3 Nutzenpunkte
   - Icons fest nach `id`: L1 `globe`, L2 `tablet-smartphone`, L3 `sparkles`, L4 `code`
   - Unter den Karten ein `Button` „Unverbindlich anfragen“ (`t.services.cta`) → `/#kontakt`
   - Die Karten werden aus dem Array erzeugt, nicht 4× kopiertes Markup
   - Raster und Hintergrund genau nach Tonys Entwurf

**Texte:** stehen vollständig in `src/i18n/de/hero.ts` und `src/i18n/de/services.ts` (in WP-00 bestätigt).

**Gehört nicht dazu**

- Header-Navigation (WP-04)
- Neue UI-Bausteine oder Icons (nur per Spec-Änderung)

## Dateien

> Alle Dateien existieren schon im Gerüst (WP-01) als Grundversion mit fester Schnittstelle; die Texte stehen schon in den Textdateien. Neue gemeinsame Dateien oder Schnittstellen nur per Spec-Änderung ([SPECS §16](../../SPECS.md#16-änderungsregeln)).

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
