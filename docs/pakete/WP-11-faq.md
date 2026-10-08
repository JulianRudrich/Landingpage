# WP-11: FAQ

| | |
|---|---|
| **Owner** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Reviewer** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Release** | V1.1 |
| **Aufwand** | S (bis ca. 4 h) |
| **Branch** | `julian/wp-11-faq` |
| **Issue** | [#14](https://github.com/JulianRudrich/Landingpage/issues/14) |
| **Abhängig von** | WP-03 inkl. Design V1.1 (Teil A2, [#20](https://github.com/JulianRudrich/Landingpage/issues/20), abgenommen); Antworten aus WP-00; Start nach dem Go-live von V1.0 |
| **Blockiert** | – |
| **Anforderungen** | FA-21 aus [SPECS.md](../../SPECS.md) |

## Ziel

Die typischen Bedenken kleiner Betriebe beantworten, bevor sie zur Hürde werden: Kosten, Aufwand, Technik, Abhängigkeit. Jede beantwortete Frage ist ein Grund weniger, **nicht** anzufragen.

## Umfang

**Gehört dazu**

1. **`Faq.astro`** (`#faq`): `<Section id="faq" labelledby="faq-titel">` + `SectionHeading` (`t.faq.eyebrow`, `title`, `lead`) + Liste aus `<details>`/`<summary>` aus `t.faq.items`, mit gemeinsamem `name`-Attribut (es ist immer nur eine Antwort offen). Icon `chevron-down` als Pfeil, gestaltet nach Tonys Entwurf.
2. **8 Fragen und Antworten** stehen in `src/i18n/de/faq.ts` (in WP-00 bestätigt, abhängig von E-06, E-12, E-13).
3. **Festgelegt:** kein `FAQPage`-JSON-LD (Google zeigt FAQ-Rich-Results kaum noch an) und kein Menüpunkt für die FAQ (siehe WP-04).

**Gehört nicht dazu**

- Preisangaben, die E-06 widersprechen

## Dateien

> Alle Dateien existieren schon im Gerüst (WP-01) als Grundversion mit fester Schnittstelle; die Texte stehen schon in den Textdateien. Neue gemeinsame Dateien oder Schnittstellen nur per Spec-Änderung ([SPECS §16](../../SPECS.md#16-änderungsregeln)).

**Besitzt dieses Paket:** `src/components/sections/Faq.astro`, `src/i18n/de/faq.ts`

**Liest/benutzt:** `src/components/ui/*`, `src/config/site.ts`

## Akzeptanzkriterien

- [ ] Alle 8 Fragen aus `faq.ts` werden angezeigt; die Antworten sind in WP-00 bestätigt
- [ ] Per Tastatur bedienbar (Enter/Leertaste), der Zustand ist für Screenreader erkennbar
- [ ] Funktioniert ohne JavaScript
- [ ] Keine Versprechen zu Preisen oder Fristen, die wir nicht halten können (E-06 beachtet)
