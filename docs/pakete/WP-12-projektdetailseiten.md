# WP-12: Projektdetailseiten

| | |
|---|---|
| **Owner** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Reviewer** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Release** | V1.1 |
| **Aufwand** | M (ca. 4–12 h) |
| **Branch** | `tony/wp-12-projektdetailseiten` |
| **Issue** | [#15](https://github.com/JulianRudrich/Landingpage/issues/15) |
| **Abhängig von** | WP-06 (Content Collection), WP-03 inkl. Design V1.1 (Teil A2, [#20](https://github.com/JulianRudrich/Landingpage/issues/20), abgenommen); Start nach dem Go-live von V1.0 |
| **Blockiert** | WP-14 (prüft eine Detailseite) |
| **Anforderungen** | FA-22 aus [SPECS.md](../../SPECS.md) |

## Ziel

Jedes Projekt bekommt eine eigene Seite, die wir einem Interessenten gezielt schicken können („So etwas haben wir für ein Café gebaut“). Die Seite erzählt die Geschichte: Ausgangslage → Lösung → Ergebnis.

## Umfang

**Gehört dazu**

1. **Route** `src/pages/projekte/[slug].astro` (existiert, erzeugt noch keine Seiten): `getStaticPaths()` aus `getCollection('projects')` mit `slug = entry.id`; Inhalt über `render(entry)` aus `astro:content`. URL: `/projekte/<id>/`.
2. **Aufbau der Seite**
   - Breadcrumb (Texte `t.projectDetail`): „Startseite“ → `/` (nicht nur „Start“: Lighthouse wertet das als nichtssagenden Linktext, SEO fällt dann unter 0,95), „Projekte“ → `/#projekte`, dann der Projekttitel ohne Link mit `aria-current="page"`; Trennzeichen „›“ mit `aria-hidden="true"`
   - Kopfbereich (`ProjectHeader.astro`): Titel (H1), Branche, Status-`Badge`, Kurzbeschreibung, Buttons „Demo ansehen“ (falls `demoUrl`) und „Ähnliches Projekt anfragen“ → `/#kontakt`
   - Großes Cover-Bild als `<Picture>`; es ist das LCP-Element der Seite, darum `loading="eager"` und `fetchpriority="high"`
   - Markdown-Inhalt (Ausgangslage, Lösung, Ergebnis) in `<Prose>` aus WP-03
   - Tech-Stack als Liste (`t.projectDetail.techTitle`); Link „Code ansehen“ (`t.projectDetail.repoLink`) als `Button` mit `external`, nur wenn `repoUrl` gesetzt ist
   - „Weitere Projekte“: die ersten 2 Projekte der Startseiten-Sortierung (`featured` zuerst, dann `order`) ohne das aktuelle, als `ProjectCard` aus WP-06; gibt es weniger, entsprechend weniger, gibt es keine, entfällt der Abschnitt
   - Bildergalerie (`ProjectGallery`, nur wenn `gallery` Bilder enthält)
   - Abschluss-CTA zum Kontakt (`t.projectDetail.cta`)
3. **Bildergalerie** `ProjectGallery.astro` (existiert, Props `images: { src: ImageMetadata; alt: string }[]`). Das Feld `gallery` steht schon im Schema.
4. **SEO pro Projekt:** `<BaseLayout title={data.title} description={data.summary} image={data.cover} imageAlt={data.coverAlt} type="article">`. `BaseLayout` reicht das schon an `SEO` durch, dort ist nichts zu ändern.
5. **Feature-Flag:** `features.projectDetails` in `src/config/site.ts` auf `true` setzen. Dann zeigen die Projektkarten den „Details“-Link.
6. Texte (Breadcrumb, Buttons, Überschriften) stehen in `src/i18n/de/projectDetail.ts`.

**Gehört nicht dazu**

- Schema-Änderungen (nur per Spec-Änderung)
- Neue Projekte anlegen (darf jeder, aber nicht Teil dieses Pakets)

## Dateien

> Alle Dateien existieren schon im Gerüst (WP-01) als Grundversion mit fester Schnittstelle; die Texte stehen schon in den Textdateien. Neue gemeinsame Dateien oder Schnittstellen nur per Spec-Änderung ([SPECS §16](../../SPECS.md#16-änderungsregeln)).

**Besitzt dieses Paket:** `src/pages/projekte/[slug].astro`, `src/components/projects/ProjectHeader.astro`, `src/components/projects/ProjectGallery.astro`, `src/i18n/de/projectDetail.ts`

**Liest/benutzt:** `src/content.config.ts`, `src/content/projects/*`, `src/components/projects/ProjectCard.astro`, `src/components/ui/*`, `src/components/layout/SEO.astro` (über `BaseLayout`)

**Ändert nach Absprache:** `src/config/site.ts` (nur `features.projectDetails`)

## Akzeptanzkriterien

- [ ] Für jedes Projekt entsteht beim Build eine Seite `/projekte/<id>/` (`id` = Dateiname ohne `.md`), und sie steht in der Sitemap
- [ ] Die Seite zeigt Titel, Branche, Status, Kurztext, Cover, Markdown-Inhalt, Tech-Stack, Demo-Link (falls vorhanden) und den CTA
- [ ] Jede Projektseite hat eigenen Title, Description und OG-Bild
- [ ] Die Breadcrumb ist eine `<nav aria-label="Brotkrümelnavigation">` mit `aria-current="page"` auf dem letzten Eintrag
- [ ] Die Projektkarten auf der Startseite verlinken auf die Detailseiten (Flag gesetzt)
- [ ] Lighthouse mobil ≥ 95 in allen Kategorien, auch auf einer Detailseite
- [ ] Schema, `BaseLayout` und `SEO.astro` sind unverändert (alles Nötige ist schon da)
