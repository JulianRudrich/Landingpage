# WP-04: Header & Footer

| | |
|---|---|
| **Owner** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Reviewer** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Release** | V1.0, Phase 1 (nach Freigabe der Spec v1.0) |
| **Aufwand** | M (ca. 4–12 h) |
| **Branch** | `tony/wp-04-header-footer` |
| **Issue** | [#7](https://github.com/JulianRudrich/Landingpage/issues/7) |
| **Abhängig von** | Freigabe der Spec v1.0 (WP-00 + Design aus WP-03 Teil A); WP-03 |
| **Blockiert** | – |
| **Anforderungen** | FA-02, FA-03, FA-04, FA-16, R-02 aus [SPECS.md](../../SPECS.md) |

## Ziel

Besucher finden sich auf jeder Seite sofort zurecht: Ein schlanker Header bringt sie mit einem Tipp zu jeder Sektion und zum Kontakt, der Footer bündelt Kontakt und Rechtliches.

## Umfang

**Gehört dazu**

1. **Header (FA-02)**
   - `Logo` links (Link auf `/`)
   - Navigation: Leistungen, Projekte, Ablauf, Über uns, Kontakt. Die Links lauten `/#leistungen` usw. (aus `t.navigation.items`, Feld `anchor`), damit sie auch von Unterseiten wie `/impressum/` funktionieren.
   - CTA-Button „Projekt anfragen“ → `/#kontakt`
   - `position: sticky; top: 0`, Höhe = `--header-height` aus WP-03, Hintergrund deckend (Text darunter darf nicht durchscheinen)
2. **Mobile Navigation (FA-03)** unter 768 px
   - Burger-Button mit `aria-controls`, `aria-expanded` und zugänglichem Namen („Menü öffnen“ / „Menü schließen“)
   - Schließt mit Esc, nach Klick auf einen Link und bei Klick außerhalb
   - Beim Öffnen springt der Fokus auf den ersten Link, beim Schließen zurück auf den Button
   - Kleines normales `<script>` in `MobileNav.astro`, ohne Framework (< 2 KB). **Kein** `is:inline`, **kein** `define:vars` ([SPECS §10](../../SPECS.md#feste-konventionen)).
3. **Aktiver Menüpunkt (FA-04, Should):** Ein `IntersectionObserver` markiert den Link der sichtbaren Sektion (Stil + `aria-current="true"`).
4. **Footer (FA-16, R-02)**
   - `Logo` + Claim (`t.navigation.footer.claim`)
   - Kontakt: E-Mail und Telefon (falls gesetzt) aus `site.ts`
   - Navigation (wie im Header)
   - Rechtliches: `/impressum/`, `/datenschutz/`
   - Profile (nur gesetzte Links aus `site.social`), Texte aus `t.navigation.footer.social`
   - © {aktuelles Jahr} {site.name}. {`t.navigation.footer.copyright`}
5. Alle Texte in `src/i18n/de/navigation.ts`.

**Gehört nicht dazu**

- Design-Tokens, `Logo`, `Button` (WP-03, nur benutzen)
- Ein Menüpunkt für die FAQ (festgelegt: die Navigation bleibt bei 5 Punkten, die FAQ erreicht man über die Startseite)

## Dateien

> Alle Dateien existieren schon im Gerüst (WP-01) als Grundversion mit fester Schnittstelle; die Texte stehen schon in den Textdateien. Neue gemeinsame Dateien oder Schnittstellen nur per Spec-Änderung ([SPECS §16](../../SPECS.md#16-änderungsregeln)).

**Besitzt dieses Paket:** `src/components/layout/Header.astro`, `src/components/layout/MobileNav.astro`, `src/components/layout/Footer.astro`, `src/i18n/de/navigation.ts`

**Liest/benutzt:** `src/components/ui/*`, `src/config/site.ts`, `src/styles/global.css` (Tokens)

## Schnittstellen

- Anker-IDs der Sektionen: siehe [SPECS §6](../../SPECS.md#6-aufbau-der-startseite). Bitte nicht in der Navigation umbenennen, ohne die Sektionen mit anzupassen.
- `--header-height` kommt aus Tonys Design-Entwurf (WP-03 Teil A) und steht in `global.css`.
- Texte: `t.navigation` (`mainLabel`, `items`, `cta`, `menuOpen`, `menuClose`, `footer.*`). Icons für das Burger-Menü: `menu` und `x`.

## Akzeptanzkriterien

- [ ] Der Header bleibt beim Scrollen sichtbar und verdeckt beim Anspringen keine Überschriften
- [ ] Alle Links funktionieren auch von Unterseiten aus (`/impressum/` → `/#kontakt`); interne Links enden mit `/`
- [ ] Burger-Menü unter 768 px: Touch und Tastatur funktionieren, `aria-expanded` wechselt, Esc schließt, ein Klick auf einen Link schließt, der Fokus kehrt zum Button zurück
- [ ] (Should) Der aktive Menüpunkt wird beim Scrollen markiert
- [ ] Der Footer zeigt auf jeder Seite Impressum und Datenschutz, Kontakt aus `site.ts` und das aktuelle Jahr
- [ ] Landmarks sind korrekt: `<header>`, `<nav aria-label="Hauptnavigation">`, `<footer>`
- [ ] Ohne JavaScript bleiben Kontakt und Rechtsseiten über den Footer erreichbar
- [ ] Mobil (360 px) und Desktop in der Deploy-Preview geprüft
