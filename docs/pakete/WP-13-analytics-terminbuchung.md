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

1. **Statistik-Tool wählen (E-10):** Plausible (EU-Hosting, kostenpflichtig, sehr einfach) oder Umami (Cloud mit Gratis-Tarif oder selbst gehostet). Kriterien: cookielos, Datenverarbeitung in der EU, AVV verfügbar, Kosten. Die Entscheidung in [SPECS §15](../../SPECS.md#15-offene-entscheidungen) eintragen.
2. **`Analytics.astro`:** bindet das Skript nur im Produktions-Build ein (`import.meta.env.PROD`) und nur, wenn `site.analytics.domain` gesetzt ist; `defer`.
3. **Conversion messen:** Ziel „Anfrage“ = Aufruf von `/danke` (kein zusätzliches Skript nötig).
4. **CSP** in `netlify.toml` um die Domain des Statistik-Tools ergänzen (`script-src`, `connect-src`).
5. **Terminbuchung (E-11):** Cal.com oder Calendly; Terminart „Kostenloses Erstgespräch (30 Min.)“ anlegen; beide Kalender verbinden, falls das Tool Team-Termine unterstützt. Die URL in `site.bookingUrl` eintragen. Der Button in der Kontakt-Sektion (WP-08) erscheint dann automatisch: externer Link, **kein Embed**.
6. **Datenschutzerklärung ergänzen:** Abschnitte für Statistik und Terminbuchungs-Link in `src/legal/datenschutz.md`. Die Datei gehört WP-10, darum reviewt Tony diesen Teil.
7. **AVV/DPA** mit beiden Anbietern abschließen (R-06).

**Gehört nicht dazu**

- Cookies, Fingerprinting, Werbe-Tracking, Google Analytics
- Eingebettete Kalender-Widgets (würden Drittanbieter-Requests beim Seitenaufruf auslösen)

## Dateien

**Besitzt dieses Paket:** `src/components/layout/Analytics.astro`

**Ändert nach Absprache:** `src/config/site.ts` (`analytics`, `bookingUrl`), `netlify.toml` (CSP), `src/legal/datenschutz.md` (neue Abschnitte, Review durch Tony)

## Akzeptanzkriterien

- [ ] E-10 und E-11 sind entschieden und in SPECS.md eingetragen
- [ ] Die Statistik zählt Seitenaufrufe nur in Produktion; im Application-Tab gibt es keine Cookies und keinen Local Storage
- [ ] Anfragen sind als Ziel messbar (`/danke`)
- [ ] Die CSP erlaubt zusätzlich nur die Statistik-Domain; die Konsole zeigt keine CSP-Fehler
- [ ] Der Terminbuchungs-Button erscheint in der Kontakt-Sektion und öffnet den Kalender im neuen Tab
- [ ] Die Datenschutzerklärung ist ergänzt und von Tony reviewt
- [ ] AVV/DPA mit beiden Anbietern ist abgeschlossen
