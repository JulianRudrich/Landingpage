# WP-04: Header & Footer

| | |
|---|---|
| **Owner** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Reviewer** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Release** | V1.0 |
| **Aufwand** | M (ca. 4–12 h) |
| **Branch** | `tony/wp-04-header-footer` |
| **Issue** | [#7](https://github.com/JulianRudrich/Landingpage/issues/7) |
| **Abhängig von** | WP-03 |
| **Blockiert** | – |
| **Anforderungen** | FA-02, FA-03, FA-04, FA-16, R-02 aus [SPECS.md](../../SPECS.md) |

## Ziel

Besucher finden sich auf jeder Seite sofort zurecht: Ein schlanker Header bringt sie mit einem Tipp zu jeder Sektion und zum Kontakt, der Footer bündelt Kontakt und Rechtliches.

## Umfang

**Gehört dazu**

1. **Header (FA-02)**
   - `Logo` links (Link auf `/`)
   - Navigation: Leistungen, Projekte, Ablauf, Über uns, Kontakt. Die Links lauten `/#leistungen` usw., damit sie auch von Unterseiten wie `/impressum` funktionieren.
   - CTA-Button „Projekt anfragen“ → `/#kontakt`
   - `position: sticky; top: 0`, Höhe = `--header-height` aus WP-03, Hintergrund deckend (Text darunter darf nicht durchscheinen)
2. **Mobile Navigation (FA-03)** unter 768 px
   - Burger-Button mit `aria-controls`, `aria-expanded` und zugänglichem Namen („Menü öffnen“ / „Menü schließen“)
   - Schließt mit Esc, nach Klick auf einen Link und bei Klick außerhalb
   - Beim Öffnen springt der Fokus auf den ersten Link, beim Schließen zurück auf den Button
   - Kleines `<script>` in der Komponente, ohne Framework (< 2 KB)
3. **Aktiver Menüpunkt (FA-04, Should):** Ein `IntersectionObserver` markiert den Link der sichtbaren Sektion (Stil + `aria-current="true"`).
4. **Footer (FA-16, R-02)**
   - Wortmarke + kurzer Claim
   - Kontakt: E-Mail und Telefon (falls gesetzt) aus `site.ts`
   - Navigation (wie im Header)
   - Rechtliches: Impressum, Datenschutz
   - Social-Links (falls gesetzt) mit zugänglichen Namen
   - © {aktuelles Jahr} {site.name}, Jahr automatisch
5. Alle Texte in `src/i18n/de/navigation.ts`.

**Gehört nicht dazu**

- Design-Tokens, `Logo`, `Button` (WP-03, nur benutzen)
- FAQ-Menüpunkt in V1.0 (FAQ kommt erst mit V1.1; ob es einen Menüpunkt bekommt, mit Julian/WP-11 abstimmen)

## Dateien

**Besitzt dieses Paket:** `src/components/layout/Header.astro`, `src/components/layout/Footer.astro`, optional `src/components/layout/MobileNav.astro`, `src/i18n/de/navigation.ts`

**Liest/benutzt:** `src/components/ui/*`, `src/config/site.ts`, `src/styles/global.css` (Tokens)

## Schnittstellen

- Anker-IDs der Sektionen: siehe [SPECS §6](../../SPECS.md#6-aufbau-der-startseite). Bitte nicht in der Navigation umbenennen, ohne die Sektionen mit anzupassen.
- `--header-height`: Wert gemeinsam mit WP-03 festlegen.

## Akzeptanzkriterien

- [ ] Der Header bleibt beim Scrollen sichtbar und verdeckt beim Anspringen keine Überschriften
- [ ] Alle Links funktionieren auch von Unterseiten aus (`/impressum` → `/#kontakt`)
- [ ] Burger-Menü unter 768 px: Touch und Tastatur funktionieren, `aria-expanded` wechselt, Esc schließt, ein Klick auf einen Link schließt, der Fokus kehrt zum Button zurück
- [ ] (Should) Der aktive Menüpunkt wird beim Scrollen markiert
- [ ] Der Footer zeigt auf jeder Seite Impressum und Datenschutz, Kontakt aus `site.ts` und das aktuelle Jahr
- [ ] Landmarks sind korrekt: `<header>`, `<nav aria-label="Hauptnavigation">`, `<footer>`
- [ ] Ohne JavaScript bleiben Kontakt und Rechtsseiten über den Footer erreichbar
- [ ] Mobil (360 px) und Desktop in der Deploy-Preview geprüft
