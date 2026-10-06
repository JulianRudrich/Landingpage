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
2. **`Analytics.astro`** (existiert, ist schon in `BaseLayout` eingebunden): bindet das Skript des Anbieters als externes `<script src="…" defer>` ein, nur im Produktions-Build (`import.meta.env.PROD`) und nur, wenn `site.analytics.domain` gesetzt ist. Kein Inline-Snippet (CSP).
3. **Conversion messen:** Ziel „Anfrage“ = Aufruf von `/danke/` (kein zusätzliches Skript nötig).
4. **CSP** in `netlify.toml` um die Domain des Statistik-Tools ergänzen (`script-src`, `connect-src`).
5. **Terminbuchung (E-11):** Vorschlag Cal.com (kostenloser Tarif); Terminart „Kostenloses Erstgespräch (30 Min.)“ anlegen; beide Kalender verbinden, falls das Tool Team-Termine unterstützt. Die URL in `site.bookingUrl` eintragen. Der Button in der Kontakt-Sektion (WP-08) erscheint dann automatisch: externer Link, **kein Embed**.
6. **Datenschutzerklärung ergänzen:** Die Abschnitte „8. Besucherstatistik“ und „9. Terminbuchung“ in `src/legal/datenschutz.md` ausfüllen (die Überschriften stehen schon). Die Datei gehört WP-10, darum reviewt Tony diesen Teil.
7. **AVV/DPA** mit beiden Anbietern abschließen (R-06).

**Gehört nicht dazu**

- Cookies, Fingerprinting, Werbe-Tracking, Google Analytics
- Eingebettete Kalender-Widgets (würden Drittanbieter-Requests beim Seitenaufruf auslösen)

## Dateien

> `Analytics.astro` existiert schon im Gerüst und ist eingebunden. Neue gemeinsame Dateien oder Schnittstellen nur per Spec-Änderung ([SPECS §16](../../SPECS.md#16-änderungsregeln)).

**Besitzt dieses Paket:** `src/components/layout/Analytics.astro`

**Ändert nach Absprache:** `src/config/site.ts` (`analytics`, `bookingUrl`), `netlify.toml` (CSP), `src/legal/datenschutz.md` (neue Abschnitte, Review durch Tony)

## Akzeptanzkriterien

- [ ] E-10 und E-11 sind entschieden und in SPECS.md eingetragen
- [ ] Die Statistik zählt Seitenaufrufe nur in Produktion; im Application-Tab gibt es keine Cookies und keinen Local Storage
- [ ] Anfragen sind als Ziel messbar (`/danke/`)
- [ ] Die CSP erlaubt zusätzlich nur die Statistik-Domain; die Konsole zeigt keine CSP-Fehler
- [ ] Der Terminbuchungs-Button erscheint in der Kontakt-Sektion und öffnet den Kalender im neuen Tab
- [ ] Die Datenschutzerklärung ist ergänzt und von Tony reviewt
- [ ] AVV/DPA mit beiden Anbietern ist abgeschlossen
