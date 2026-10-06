# WP-12: Projektdetailseiten

| | |
|---|---|
| **Owner** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Reviewer** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Release** | V1.1 |
| **Aufwand** | M (ca. 4–12 h) |
| **Branch** | `tony/wp-12-projektdetailseiten` |
| **Issue** | [#15](https://github.com/JulianRudrich/Landingpage/issues/15) |
| **Abhängig von** | WP-06 (Content Collection); Start nach dem Go-live von V1.0 |
| **Blockiert** | – |
| **Anforderungen** | FA-22 aus [SPECS.md](../../SPECS.md) |

## Ziel

Jedes Projekt bekommt eine eigene Seite, die wir einem Interessenten gezielt schicken können („So etwas haben wir für ein Café gebaut“). Die Seite erzählt die Geschichte: Ausgangslage → Lösung → Ergebnis.

## Umfang

**Gehört dazu**

1. **Route** `src/pages/projekte/[slug].astro` mit `getStaticPaths()` aus `getCollection('projects')`; Inhalt über `render(entry)` aus `astro:content`.
2. **Aufbau der Seite**
   - Breadcrumb: Start › Projekte › {Titel}
   - Kopfbereich (`ProjectHeader.astro`): Titel (H1), Branche, Status-`Badge`, Kurzbeschreibung, Buttons „Demo ansehen“ (falls `demoUrl`) und „Ähnliches Projekt anfragen“ → `/#kontakt`
   - Großes Cover-Bild
   - Markdown-Inhalt (Ausgangslage, Lösung, Ergebnis), gut lesbar gestaltet
   - Tech-Stack als Liste
   - „Weitere Projekte“: 2 andere Projektkarten (`ProjectCard` aus WP-06 wiederverwenden)
   - Abschluss-CTA zum Kontakt
3. **Optional:** Bildergalerie (`ProjectGallery.astro`). Dafür braucht das Schema ein Feld `gallery`. Die Schema-Änderung bitte mit Julian (WP-06) absprechen; er ergänzt sie in `content.config.ts`.
4. **SEO pro Projekt:** Title `{Projekt} | {site.name}`, Description = `summary`, OG-Bild = Cover, `type: 'article'`.
5. **Feature-Flag:** `features.projectDetails` in `src/config/site.ts` auf `true` setzen. Dann zeigen die Projektkarten den „Details“-Link.
6. Texte (Breadcrumb, Buttons, Überschriften) in `src/i18n/de/projectDetail.ts`.

**Gehört nicht dazu**

- Schema-Änderungen ohne Absprache (WP-06)
- Neue Projekte anlegen (darf jeder, aber nicht Teil dieses Pakets)

## Dateien

**Besitzt dieses Paket:** `src/pages/projekte/[slug].astro`, `src/components/projects/ProjectHeader.astro`, `src/components/projects/ProjectGallery.astro` (optional), `src/i18n/de/projectDetail.ts`

**Liest/benutzt:** `src/content.config.ts`, `src/content/projects/*`, `src/components/projects/ProjectCard.astro`, `src/components/ui/*`, `src/components/layout/SEO.astro` (über `BaseLayout`)

**Ändert nach Absprache:** `src/config/site.ts` (nur `features.projectDetails`)

## Akzeptanzkriterien

- [ ] Für jedes Projekt entsteht beim Build eine Seite `/projekte/<dateiname>`
- [ ] Die Seite zeigt Titel, Branche, Status, Kurztext, Cover, Markdown-Inhalt, Tech-Stack, Demo-Link (falls vorhanden) und den CTA
- [ ] Jede Projektseite hat eigenen Title, Description und OG-Bild
- [ ] Die Breadcrumb ist eine `<nav aria-label="Brotkrümelnavigation">` mit `aria-current="page"` auf dem letzten Eintrag
- [ ] Die Projektkarten auf der Startseite verlinken auf die Detailseiten (Flag gesetzt)
- [ ] Lighthouse mobil ≥ 95 in allen Kategorien, auch auf einer Detailseite
- [ ] Schema-Änderungen sind mit Julian abgestimmt
