# WP-07: Ablauf & Über uns

| | |
|---|---|
| **Owner** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Reviewer** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Release** | V1.0 |
| **Aufwand** | M (ca. 4–12 h) |
| **Branch** | `tony/wp-07-ablauf-ueber-uns` |
| **Issue** | [#10](https://github.com/JulianRudrich/Landingpage/issues/10) |
| **Abhängig von** | WP-03; Fotos, Rollen und Bios aus WP-00 |
| **Blockiert** | – |
| **Anforderungen** | FA-09, FA-10, D-06 aus [SPECS.md](../../SPECS.md) |

## Ziel

Kleine Betriebe kaufen bei Menschen, nicht bei Firmen. **Ablauf** nimmt die Angst vor dem Unbekannten („Was passiert, wenn ich mich melde?“), **Über uns** zeigt, wer dahintersteht.

## Umfang

**Gehört dazu**

1. **Ablauf** (`#ablauf`, FA-09): `SectionHeading` + 4 Schritte als `<ol>`, jeder mit Nummer, Titel, 1–2 Sätzen und optional einem Icon.
2. **Über uns** (`#ueber-uns`, FA-10)
   - Kurze Einleitung (2–3 Sätze: wer wir sind, was uns antreibt)
   - Zwei gleichwertige Karten für Tony und Julian: Foto, Name, Rolle, Kurzbio, Profil-Links
   - Optional ein gemeinsames Foto
   - Die Teamdaten stehen als Array in `about.ts`
3. Fotos aus WP-00 nach `src/assets/team/` übernehmen und über `<Picture>` einbinden.

**Textentwürfe: Ablauf** (zum Anpassen; „Festpreis“ nur, wenn ihr das so anbieten wollt, siehe E-06)

| # | Titel | Text |
|---|---|---|
| 1 | Kostenloses Erstgespräch | Wir hören zu: Was läuft gut, was kostet Sie Zeit? 30 Minuten, unverbindlich. |
| 2 | Konzept & Angebot | Sie bekommen einen klaren Vorschlag mit transparentem Preis, ohne versteckte Kosten. |
| 3 | Umsetzung | Wir bauen, Sie sehen regelmäßig Zwischenstände und geben Feedback. |
| 4 | Start & Betreuung | Wir bringen alles online, zeigen Ihnen die Bedienung und bleiben ansprechbar. |

**Textentwurf: Über uns, Einleitung**

> Wir sind Tony und Julian, zwei Entwickler mit einem Ziel: Technik, die kleinen Betrieben wirklich hilft. Bei uns haben Sie feste Ansprechpartner, die zuhören, verständlich erklären und Lösungen bauen, die im Alltag funktionieren.

**Gehört nicht dazu**

- Kundenstimmen (erst V2, nur echte)

## Dateien

**Besitzt dieses Paket:** `src/components/sections/Process.astro`, `src/components/sections/About.astro`, `src/i18n/de/process.ts`, `src/i18n/de/about.ts`, `src/assets/team/*`

**Liest/benutzt:** `src/components/ui/*`, `src/config/site.ts` (Social-Links)

## Akzeptanzkriterien

- [ ] Der Ablauf ist ein `<ol>` mit 4 Schritten; die Nummern sind visuell und semantisch vorhanden
- [ ] Beide Personen werden gleichwertig dargestellt (gleiche Bildgröße, ähnliche Textlänge)
- [ ] Die Fotos sind echt, optimiert (AVIF/WebP, lazy) und haben Alt-Texte („Porträt von Tony“); keine Stockfotos
- [ ] Profil-Links haben einen zugänglichen Namen („Tony auf LinkedIn“) und öffnen im neuen Tab
- [ ] Die Texte passen zu E-04 und sind vom Reviewer gegengelesen
- [ ] Es steht nur drin, was öffentlich sein darf (das Repo ist öffentlich)
