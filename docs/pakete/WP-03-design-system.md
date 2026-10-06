# WP-03: Design-System & BaseLayout

| | |
|---|---|
| **Owner** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Reviewer** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Release** | V1.0 |
| **Aufwand** | L (ca. 12–24 h) |
| **Branch** | `tony/wp-03-design-system` |
| **Issue** | [#6](https://github.com/JulianRudrich/Landingpage/issues/6) |
| **Abhängig von** | WP-01 (für den Code). Den Design-Entwurf schon vorher starten. |
| **Blockiert** | WP-04, WP-05, WP-06, WP-07, WP-08, WP-10, WP-11 |
| **Anforderungen** | D-01 bis D-05, D-07 bis D-09, NFA-04, NFA-05, NFA-06, NFA-07, NFA-14, R-05 aus [SPECS.md](../../SPECS.md) |

## Ziel

Das visuelle Fundament, auf dem alle Sektionen aufbauen: Design-Tokens, Schriften, gemeinsame UI-Bausteine und das fertige `BaseLayout`. Wer danach eine Sektion baut, setzt sie nur aus diesen Bausteinen zusammen und muss keine eigenen Farben oder Abstände erfinden.

> ⚠️ Blockiert die meisten Pakete. Den Design-Entwurf darum schon starten, während Julian an WP-01 arbeitet.

## Umfang

**Gehört dazu**

1. **Design-Entwurf (D-09):** Moodboard und Startseite in Mobil- und Desktop-Ansicht (Figma, Penpot oder Papierskizze). Link oder Foto im Issue posten; Julian nimmt ihn ab.
2. **Tokens (D-01, D-02, D-05)** in `src/styles/global.css` über Tailwinds `@theme`:
   - Farben: `primary`, `accent`, Neutraltöne (`surface` = warmes Off-White, `ink` = fast schwarz, Abstufungen)
   - Schriften: `--font-sans`, optional `--font-display`
   - Radien, Schatten; Abstände über Tailwinds Skala, im 8-px-Rhythmus
   - `--header-height` (Wert mit WP-04 abstimmen) und `html { scroll-padding-top: var(--header-height) }`, damit angesprungene Sektionen nicht unter dem Header verschwinden
3. **Schriften (D-03, R-05):** höchstens 2 Familien über Fontsource-Pakete (`@fontsource-variable/…`), selbst gehostet, `font-display: swap`.
4. **Basis-Styles:** Hintergrund und Textfarbe, gut lesbare Zeilenlänge und -höhe, sichtbarer Fokus-Stil (`:focus-visible`) für alle interaktiven Elemente, Smooth Scroll nur bei `prefers-reduced-motion: no-preference`, alle Animationen und Übergänge aus bei `prefers-reduced-motion: reduce` (NFA-06).
5. **Skip-Link** („Zum Inhalt springen“ → `#inhalt`), nur bei Fokus sichtbar.
6. **UI-Bausteine** in `src/components/ui/` (Props siehe Schnittstellen).
7. **`BaseLayout.astro`** fertigstellen (Gerüst aus WP-01 behalten, gestalten).
8. **Icons (D-07):** Lucide-Icons, beim Build als Inline-SVG gerendert (über das Astro-Paket von Lucide oder als kopierte SVG-Dateien), keine Icon-Fonts und kein CDN.
9. **Bild-Muster (NFA-04):** kurze Doku im PR oder in der Styleguide-Seite, wie Bilder eingebunden werden (`<Picture>` aus `astro:assets`, Formate AVIF/WebP, `sizes`, `loading`).
10. **Optional (Could):** `src/pages/styleguide.astro` (`noindex`) zeigt alle Bausteine. Das hilft beim Bauen der Sektionen.

**Gehört nicht dazu**

- Aufbau und Logik von Header und Footer (WP-04)
- Inhalte der Sektionen (WP-05 bis WP-08)

## Dateien

**Besitzt dieses Paket:** `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/ui/*`, `src/i18n/de/common.ts`, `src/pages/styleguide.astro`

**Liest/benutzt:** `src/config/site.ts` (Name für das Logo)

## Schnittstellen

Die Props sind ein **Vertrag** mit allen anderen Paketen. Änderungen danach bitte im Issue ankündigen.

| Baustein | Props | Zweck |
|---|---|---|
| `Container` | `as?: 'div' \| 'section' \| 'header' \| 'footer'`, `class?: string` | Max. Breite (~1200 px) + seitlicher Innenabstand |
| `Section` | `id: string`, `labelledby?: string`, `tone?: 'default' \| 'muted' \| 'inverted'`, `class?: string` | `<section>` mit einheitlichem vertikalem Abstand und `Container` |
| `SectionHeading` | `id?: string`, `eyebrow?: string`, `title: string`, `lead?: string`, `align?: 'left' \| 'center'` | Einheitliche H2 mit optionaler Dachzeile und Einleitung |
| `Button` | `href?: string`, `variant?: 'primary' \| 'secondary' \| 'ghost'`, `size?: 'md' \| 'lg'`, `type?: 'button' \| 'submit'`, `external?: boolean`, `class?: string` | Rendert `<a>` mit `href`, sonst `<button>`; `external` setzt `target="_blank" rel="noopener noreferrer"` und einen Screenreader-Hinweis |
| `Card` | `as?: 'article' \| 'div' \| 'li'`, `class?: string` | Fläche mit Radius, Rahmen/Schatten, Innenabstand |
| `Badge` | `tone?: 'neutral' \| 'success' \| 'warning'` | Kleine Kennzeichnung, z. B. Projektstatus (WP-06) |
| `Icon` | `name: IconName`, `size?: number`, `label?: string` | Inline-SVG; ohne `label` dekorativ (`aria-hidden="true"`) |
| `Logo` | `class?: string` | Text-Wortmarke aus `site.name` (D-04) |

Jede Komponente bekommt `interface Props` mit kurzen Kommentaren, damit die Editor-Autovervollständigung hilft.

## Akzeptanzkriterien

- [ ] Der Design-Entwurf (mobil + Desktop) ist vom Reviewer abgenommen (Link im Issue)
- [ ] Alle Farben, Schriften, Radien und Schatten sind Tokens in `global.css`; die Bausteine nutzen nur Token-Klassen
- [ ] Kontrast aller Text-/Hintergrund-Kombinationen ≥ 4,5 : 1 (kleine Tabelle im PR)
- [ ] Schriften laufen lokal über Fontsource; im Network-Tab gibt es keine Requests an fremde Domains
- [ ] Alle Bausteine aus der Tabelle existieren und haben dokumentierte Props
- [ ] Der Fokus-Stil ist auf allen interaktiven Elementen sichtbar; der Skip-Link funktioniert
- [ ] `prefers-reduced-motion: reduce` schaltet Animationen und Smooth Scroll ab
- [ ] Bei 360 px Breite gibt es kein horizontales Scrollen
- [ ] Das Bild-Muster ist dokumentiert
- [ ] (Could) Die Styleguide-Seite zeigt alle Bausteine
