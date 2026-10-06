# WP-06: Projekte (Content Collection & Sektion)

| | |
|---|---|
| **Owner** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Reviewer** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Release** | V1.0, Phase 1 (nach Freigabe der Spec v1.0) |
| **Aufwand** | M (ca. 4–12 h) |
| **Branch** | `julian/wp-06-projekte` |
| **Issue** | [#9](https://github.com/JulianRudrich/Landingpage/issues/9) |
| **Abhängig von** | Freigabe der Spec v1.0 (WP-00 + Design aus WP-03 Teil A); WP-03; erstes Projekt aus WP-00 |
| **Blockiert** | WP-12 |
| **Anforderungen** | FA-07, FA-08, NFA-18, D-06, R-07 aus [SPECS.md](../../SPECS.md) |

## Ziel

Unsere Arbeit sichtbar machen, und zwar so, dass ein neues Projekt **nur eine neue Markdown-Datei** braucht. Die Karten auf der Startseite sind der Einstieg zu Demos und später zu den Detailseiten (WP-12).

## Umfang

**Gehört dazu**

1. **Content Collection** `projects`: Schema ist im Gerüst fertig (siehe Schnittstellen), nichts zu ändern.
2. **Sektion** `Projects.astro` (`#projekte`): `SectionHeading` + Kartenraster nach Tonys Entwurf, `featured` zuerst, dann nach `order` sortiert, max. 6 Karten. Ohne Projekte erscheint `t.projects.empty`.
3. **`ProjectCard.astro`**
   - Cover-Bild (`<Picture>`, lazy, feste Maße)
   - Status-`Badge` (Ton und Text siehe Schnittstellen; R-07: Demos ehrlich kennzeichnen)
   - Titel, Branche, Kurzbeschreibung, Tech-Tags
   - Link „Demo ansehen“ als `Button` mit `external` und Icon `external-link`
   - Link „Details“ → `/projekte/<id>/` **nur**, wenn `site.features.projectDetails` `true` ist (das Flag setzt WP-12)
4. **Erstes Projekt** `src/content/projects/diese-website.md` (existiert): Texte für Ausgangslage und Lösung schreiben; nach dem Go-live `status: live` und das Platzhalter-Cover durch einen Screenshot ersetzen. Das erste Gastro-Demo (E-08) kommt als weitere Datei dazu, sobald es existiert.
5. Abschnitt **„Neues Projekt hinzufügen“** (unten) aktuell halten.

**Gehört nicht dazu**

- Detailseiten `/projekte/<id>/` (WP-12)
- Die Demos selbst (eigene Repos)

## Dateien

> Alle Dateien existieren schon im Gerüst (WP-01) als Grundversion mit fester Schnittstelle; die Texte stehen schon in den Textdateien. Neue gemeinsame Dateien oder Schnittstellen nur per Spec-Änderung ([SPECS §16](../../SPECS.md#16-änderungsregeln)).

**Besitzt dieses Paket:** `src/content.config.ts`, `src/content/projects/*.md`, `src/assets/projects/*`, `src/components/sections/Projects.astro`, `src/components/projects/ProjectCard.astro`, `src/i18n/de/projects.ts`

**Liest/benutzt:** `src/components/ui/*` (u. a. `Card`, `Badge`, `Button`), `src/config/site.ts`

## Schnittstellen

Das Schema steht **fertig** in `src/content.config.ts` (Astro 7: `z` aus `astro/zod`, URLs mit `z.url()`). Es ist ein **Vertrag mit WP-12** (Detailseiten) und ändert sich nur per Spec-Änderung.

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `title` | Text | ja | Projektname (Karte, Detailseite) |
| `summary` | Text, ≤ 160 Zeichen | ja | Kartentext und Meta-Description |
| `industry` | Text | ja | Branche, z. B. „Gastronomie“ |
| `services` | Liste aus `L1`–`L4` | ja, mind. 1 | gezeigte Leistungen |
| `tech` | Liste von Texten | ja, mind. 1 | eingesetzte Technik |
| `status` | `live`, `prototyp` oder `konzept` | ja | ehrliche Kennzeichnung (R-07) |
| `cover` | Bild in `src/assets/projects/` | ja | Vorschaubild, mind. 1600 px breit |
| `coverAlt` | Text | ja | Alt-Text zum Cover |
| `gallery` | Liste aus `{ src: Bild, alt: Text }` | nein (Standard: leer) | Galerie der Detailseite (WP-12) |
| `demoUrl` | URL | nein | laufende Demo |
| `repoUrl` | URL | nein | öffentlicher Code |
| `featured` | ja/nein | nein (Standard: nein) | steht vorn |
| `order` | ganze Zahl | nein (Standard: 100) | kleinere Zahl = weiter vorn |
| `publishedAt` | Datum | ja | Veröffentlichung |

**`ProjectCard`-Props** (Vertrag mit WP-12, das die Karte in „Weitere Projekte“ nutzt): `project: CollectionEntry<'projects'>`.

**Status → `Badge`-Ton:** `live` → `success`, `prototyp` → `warning`, `konzept` → `neutral`. Beschriftung aus `t.projects.status`.

Der **Markdown-Inhalt** eines Projekts gliedert sich in `## Ausgangslage`, `## Lösung`, `## Ergebnis`. WP-12 zeigt ihn auf der Detailseite an.

## Neues Projekt hinzufügen

1. Bild nach `src/assets/projects/<slug>.png` (mind. 1600 px breit).
2. Datei `src/content/projects/<slug>.md` anlegen:

   ```markdown
   ---
   title: Trattoria Demo – Online-Reservierung
   summary: Reservierungs-Web-App für ein Restaurant, auf Tablet und Handy nutzbar.
   industry: Gastronomie
   services: [L2]
   tech: [Astro, TypeScript, Supabase]
   status: prototyp
   cover: ../../assets/projects/trattoria-demo.png
   coverAlt: Tablet mit geöffneter Tischübersicht der Reservierungs-App
   demoUrl: https://demo-trattoria.example.com
   order: 10
   publishedAt: 2026-11-01
   ---

   ## Ausgangslage
   …
   ## Lösung
   …
   ## Ergebnis
   …
   ```

3. `npm run build`: Fehlt ein Pflichtfeld, bricht der Build mit einer Meldung ab.
4. PR öffnen. Neue Projektdateien darf jeder anlegen.

## Akzeptanzkriterien

- [ ] Das Schema ist unverändert; ein fehlendes Pflichtfeld lässt `npm run build` fehlschlagen (im PR kurz demonstrieren)
- [ ] Mindestens ein echtes Projekt ist angelegt; Demos und Konzepte sind deutlich gekennzeichnet
- [ ] Jede Karte zeigt Bild, Titel, Branche, Kurztext, Tech-Tags, Status-Badge und Demo-Link (falls vorhanden)
- [ ] Externe Links öffnen im neuen Tab mit `rel="noopener noreferrer"` und einem Hinweis für Screenreader
- [ ] Bilder werden lazy geladen, als AVIF/WebP, mit festen Maßen
- [ ] Sortierung: `featured` zuerst, dann `order`
- [ ] Der Details-Link erscheint nur bei `site.features.projectDetails = true`
- [ ] Die Anleitung „Neues Projekt hinzufügen“ stimmt mit dem Code überein
