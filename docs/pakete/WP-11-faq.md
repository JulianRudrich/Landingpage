# WP-11: FAQ

| | |
|---|---|
| **Owner** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Reviewer** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Release** | V1.1 |
| **Aufwand** | S (bis ca. 4 h) |
| **Branch** | `julian/wp-11-faq` |
| **Issue** | [#14](https://github.com/JulianRudrich/Landingpage/issues/14) |
| **Abhängig von** | WP-03; Antworten aus WP-00; Start nach dem Go-live von V1.0 |
| **Blockiert** | – |
| **Anforderungen** | FA-21 aus [SPECS.md](../../SPECS.md) |

## Ziel

Die typischen Bedenken kleiner Betriebe beantworten, bevor sie zur Hürde werden: Kosten, Aufwand, Technik, Abhängigkeit. Jede beantwortete Frage ist ein Grund weniger, **nicht** anzufragen.

## Umfang

**Gehört dazu**

1. **`Faq.astro`** (`#faq`): `SectionHeading` + Liste aus `<details>`/`<summary>`-Elementen, erzeugt aus einem Array in `faq.ts`. Optional mit gemeinsamem `name`-Attribut, damit immer nur eine Antwort offen ist.
2. **6–8 Fragen**, die Antworten stimmt ihr gemeinsam ab (Entwürfe):
   1. Was kostet eine Website oder App?
   2. Wie lange dauert ein Projekt?
   3. Brauche ich technisches Wissen?
   4. Kann ich Inhalte später selbst ändern?
   5. Wem gehören Website und Code nach dem Projekt?
   6. Was passiert nach dem Start – Hosting, Wartung, Updates?
   7. Arbeiten Sie nur in {Region}?
   8. Wie steht es um Datenschutz und DSGVO?
3. **Optional:** `FAQPage`-JSON-LD. Google zeigt FAQ-Rich-Results inzwischen nur noch eingeschränkt an, der Nutzen ist also gering.
4. **Menüpunkt:** Ob „FAQ“ in Header oder Footer verlinkt wird, mit Tony (WP-04) abstimmen. Tony ändert dann seine Datei.

**Gehört nicht dazu**

- Preisangaben, die E-06 widersprechen

## Dateien

**Besitzt dieses Paket:** `src/components/sections/Faq.astro`, `src/i18n/de/faq.ts`

**Liest/benutzt:** `src/components/ui/*`, `src/config/site.ts`

## Akzeptanzkriterien

- [ ] 6–8 Fragen mit Antworten, die von beiden abgestimmt sind
- [ ] Per Tastatur bedienbar (Enter/Leertaste), der Zustand ist für Screenreader erkennbar
- [ ] Funktioniert ohne JavaScript
- [ ] Keine Versprechen zu Preisen oder Fristen, die wir nicht halten können (E-06 beachtet)
- [ ] (Optional) JSON-LD ist valide
