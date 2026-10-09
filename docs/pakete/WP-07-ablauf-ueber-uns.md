# WP-07: Ablauf & Über uns

| | |
|---|---|
| **Owner** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Reviewer** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Release** | V1.0, Phase 1 (nach Freigabe der Spec v1.0) |
| **Aufwand** | M (ca. 4–12 h) |
| **Branch** | `tony/wp-07-ablauf-ueber-uns` |
| **Issue** | [#10](https://github.com/JulianRudrich/Landingpage/issues/10) |
| **Abhängig von** | Freigabe der Spec v1.0 (WP-00 + Design aus WP-03 Teil A); WP-03; Fotos, Rollen und Bios aus WP-00 |
| **Blockiert** | – |
| **Anforderungen** | FA-09, FA-10, D-06 aus [SPECS.md](../../SPECS.md) |

## Ziel

Kleine Betriebe kaufen bei Menschen, nicht bei Firmen. **Ablauf** nimmt die Angst vor dem Unbekannten („Was passiert, wenn ich mich melde?“), **Über uns** zeigt, wer dahintersteht.

## Umfang

**Gehört dazu**

1. **Ablauf** (`#ablauf`, FA-09): `SectionHeading` + 4 Schritte aus `t.process.steps` als `<ol>`, jeder mit Nummer, Titel, Text und Icon. Icons fest nach Reihenfolge: `message-circle`, `clipboard-list`, `hammer`, `rocket`.
2. **Über uns** (`#ueber-uns`, FA-10)
   - `SectionHeading` mit `t.about.eyebrow`, `title`, `lead`
   - Zwei gleichwertige Karten aus `t.about.team`: Foto, Name, Rolle, Kurzbio, LinkedIn-Link (Text `linkedinLabel`, URL aus `site.social.linkedinTony` bzw. `linkedinJulian`; nur anzeigen, wenn gesetzt)
3. Fotos aus WP-00 als `src/assets/team/tony.jpg` und `src/assets/team/julian.jpg` ablegen und über `<Picture>` einbinden (Zuordnung über `id`).

**Texte:** stehen vollständig in `src/i18n/de/process.ts` und `src/i18n/de/about.ts`. In `about.ts` sind Rollen und Bios als Lücken `[…]` markiert; sie kommen aus WP-00 (E-14). „Festpreis“ in Schritt 2 hängt an E-13.

**Gehört nicht dazu**

- Kundenstimmen (erst V2, nur echte)
- Ein gemeinsames Foto (nicht geplant)

## Dateien

> Alle Dateien existieren schon im Gerüst (WP-01) als Grundversion mit fester Schnittstelle; die Texte stehen schon in den Textdateien. Neue gemeinsame Dateien oder Schnittstellen nur per Spec-Änderung ([SPECS §16](../../SPECS.md#16-änderungsregeln)).

**Besitzt dieses Paket:** `src/components/sections/Process.astro`, `src/components/sections/About.astro`, `src/i18n/de/process.ts`, `src/i18n/de/about.ts`, `src/assets/team/*`

**Liest/benutzt:** `src/components/ui/*`, `src/config/site.ts` (Social-Links)

## Akzeptanzkriterien

- [ ] Der Ablauf ist ein `<ol>` mit 4 Schritten; die Nummern sind visuell und semantisch vorhanden
- [ ] Beide Personen werden gleichwertig dargestellt (gleiche Bildgröße, ähnliche Textlänge)
- [ ] Die Fotos sind echt, optimiert (AVIF/WebP, lazy) und haben Alt-Texte („Porträt von Tony“); keine Stockfotos
- [ ] Profil-Links haben einen zugänglichen Namen („Tony auf LinkedIn“) und öffnen im neuen Tab
- [ ] Die Texte passen zu E-04 und sind vom Reviewer gegengelesen
- [ ] Es steht nur drin, was öffentlich sein darf (das Repo ist öffentlich)
