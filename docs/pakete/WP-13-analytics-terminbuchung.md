# WP-13: Analytics & Terminbuchung

| | |
|---|---|
| **Owner** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Reviewer** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Release** | V1.1 |
| **Aufwand** | S (bis ca. 4 h) |
| **Branch** | `julian/wp-13-analytics-termin` |
| **Issue** | [#16](https://github.com/JulianRudrich/Landingpage/issues/16) |
| **Abhängig von** | WP-02; Start nach dem Go-live von V1.0 |
| **Blockiert** | – |
| **Anforderungen** | FA-23, FA-24, NFA-13, R-03 (Ergänzung), R-06, E-10, E-11 aus [SPECS.md](../../SPECS.md) |

## Ziel

Messen, ob die Seite wirkt (Besuche, Anfragen, Conversion), **ohne** Cookie-Banner. Außerdem können Interessenten das Erstgespräch direkt selbst buchen, statt Mails hin und her zu schicken.

## Umfang

**Gehört dazu**

1. **Statistik-Tool bestätigen (E-10):** Vorschlag Plausible (EU-Hosting, einfach, kostenpflichtig); kostenlose Alternative Umami. Kriterien: cookielos, Datenverarbeitung in der EU, AVV verfügbar, Kosten. Die Entscheidung in [SPECS §15](../../SPECS.md#15-offene-entscheidungen) eintragen.
2. **`Analytics.astro`** (existiert, ist schon in `BaseLayout` eingebunden): bindet `<script src={site.analytics.scriptUrl} data-…={site.analytics.siteId} defer>` ein (Attributname laut Anbieter: Plausible `data-domain`, Umami `data-website-id`). **Nur auf der Live-Seite:** wenn `process.env.CONTEXT === 'production'` (Netlify setzt das beim Build; `import.meta.env.PROD` reicht nicht, weil es auch für Deploy-Previews und Staging gilt) und `site.analytics.scriptUrl` gesetzt ist. Kein Inline-Snippet (CSP).
3. **Conversion messen:** Ziel „Anfrage“ = Aufruf von `/danke/` (kein zusätzliches Skript nötig).
4. **CSP** in `netlify.toml` um den Host aus `site.analytics.scriptUrl` ergänzen (`script-src`, `connect-src`).
5. **Terminbuchung (E-11):** Vorschlag Cal.com (kostenloser Tarif); Terminart „Kostenloses Erstgespräch (30 Min.)“ anlegen; beide Kalender verbinden, falls das Tool Team-Termine unterstützt. Die URL in `site.bookingUrl` eintragen. Der Button in der Kontakt-Sektion (WP-08) erscheint dann automatisch: externer Link, **kein Embed**.
6. **Datenschutzerklärung anpassen:** In den Abschnitten „8. Besucherstatistik“ und „9. Terminbuchung“ von `src/legal/datenschutz.md` den V1.0-Text („derzeit nicht im Einsatz“) durch die Beschreibung der gewählten Dienste ersetzen. Die Datei gehört WP-10, darum reviewt Tony diesen Teil.
7. **AVV/DPA** mit beiden Anbietern abschließen (R-06).

**Gehört nicht dazu**

- Cookies, Fingerprinting, Werbe-Tracking, Google Analytics
- Eingebettete Kalender-Widgets (würden Drittanbieter-Requests beim Seitenaufruf auslösen)

## Dateien

> `Analytics.astro` existiert schon im Gerüst und ist eingebunden. Neue gemeinsame Dateien oder Schnittstellen nur per Spec-Änderung ([SPECS §16](../../SPECS.md#16-änderungsregeln)).

**Besitzt dieses Paket:** `src/components/layout/Analytics.astro`

**Ändert nach Absprache:** `src/config/site.ts` (`analytics.scriptUrl`, `analytics.siteId`, `bookingUrl`), `netlify.toml` (CSP), `src/legal/datenschutz.md` (Abschnitte 8 und 9, Review durch Tony)

## Akzeptanzkriterien

- [ ] E-10 und E-11 sind entschieden und in SPECS.md eingetragen
- [ ] Das Statistik-Skript erscheint nur im Build der Live-Seite (`CONTEXT=production`), nicht in Deploy-Previews und Staging; im Application-Tab gibt es keine Cookies und keinen Local Storage
- [ ] Anfragen sind als Ziel messbar (`/danke/`)
- [ ] Die CSP erlaubt zusätzlich nur die Statistik-Domain; die Konsole zeigt keine CSP-Fehler
- [ ] Der Terminbuchungs-Button erscheint in der Kontakt-Sektion und öffnet den Kalender im neuen Tab
- [ ] Die Datenschutzerklärung ist ergänzt und von Tony reviewt
- [ ] AVV/DPA mit beiden Anbietern ist abgeschlossen
