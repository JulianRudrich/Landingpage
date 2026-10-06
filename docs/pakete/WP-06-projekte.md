# WP-06: Projekte (Content Collection & Sektion)

| | |
|---|---|
| **Owner** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Reviewer** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Release** | V1.0 |
| **Aufwand** | M (ca. 4–12 h) |
| **Branch** | `julian/wp-06-projekte` |
| **Issue** | [#9](https://github.com/JulianRudrich/Landingpage/issues/9) |
| **Abhängig von** | WP-03; erstes Projekt aus WP-00 |
| **Blockiert** | WP-12 |
| **Anforderungen** | FA-07, FA-08, NFA-18, D-06, R-07 aus [SPECS.md](../../SPECS.md) |

## Ziel

Unsere Arbeit sichtbar machen, und zwar so, dass ein neues Projekt **nur eine neue Markdown-Datei** braucht. Die Karten auf der Startseite sind der Einstieg zu Demos und später zu den Detailseiten (WP-12).

## Umfang

**Gehört dazu**

1. **Content Collection** `projects` in `src/content.config.ts` mit dem Schema unten.
2. **Sektion** `Projects.astro` (`#projekte`): `SectionHeading` + Kartenraster, `featured` zuerst, dann nach `order` sortiert, max. 6 Karten. Ohne Projekte erscheint ein kurzer Text („Erste Projekte folgen in Kürze“).
3. **`ProjectCard.astro`**
   - Cover-Bild (`<Picture>`, lazy, feste Maße)
   - Status-`Badge`: `live` → „Live“, `prototyp` → „Prototyp“, `konzept` → „Konzept“ (R-07: Demos ehrlich kennzeichnen)
   - Titel, Branche, Kurzbeschreibung, Tech-Tags
   - Link „Demo ansehen“ (extern: neuer Tab, `rel="noopener noreferrer"`, Screenreader-Hinweis)
   - Link „Details“ → `/projekte/<slug>` **nur**, wenn `site.features.projectDetails` `true` ist (das Flag setzt WP-12)
4. **Erstes Projekt** anlegen, z. B. diese Website selbst (Status `live`) und/oder das erste Gastro-Demo aus WP-00.
5. Abschnitt **„Neues Projekt hinzufügen“** (unten) aktuell halten.

**Gehört nicht dazu**

- Detailseiten `/projekte/<slug>` (WP-12)
- Die Demos selbst (eigene Repos)

## Dateien

**Besitzt dieses Paket:** `src/content.config.ts`, `src/content/projects/*.md`, `src/assets/projects/*`, `src/components/sections/Projects.astro`, `src/components/projects/ProjectCard.astro`, `src/i18n/de/projects.ts`

**Liest/benutzt:** `src/components/ui/*` (u. a. `Card`, `Badge`, `Button`), `src/config/site.ts`

## Schnittstellen

Das Schema ist ein **Vertrag mit WP-12** (Detailseiten). Änderungen bitte mit Tony absprechen.

```ts
// src/content.config.ts – Beispiel, an die aktuelle Astro-Version anpassen
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(160),                  // Kartentext + Meta-Description
      industry: z.string(),                          // z. B. "Gastronomie"
      services: z.array(z.enum(['L1', 'L2', 'L3', 'L4'])).min(1),
      tech: z.array(z.string()),
      status: z.enum(['live', 'prototyp', 'konzept']),
      cover: image(),
      coverAlt: z.string(),
      demoUrl: z.string().url().optional(),
      repoUrl: z.string().url().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(100),
      publishedAt: z.coerce.date(),
    }),
});

export const collections = { projects };
```

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

- [ ] Das Schema ist wie oben umgesetzt (oder begründet erweitert); ein fehlendes Pflichtfeld lässt `npm run build` fehlschlagen (im PR kurz demonstrieren)
- [ ] Mindestens ein echtes Projekt ist angelegt; Demos und Konzepte sind deutlich gekennzeichnet
- [ ] Jede Karte zeigt Bild, Titel, Branche, Kurztext, Tech-Tags, Status-Badge und Demo-Link (falls vorhanden)
- [ ] Externe Links öffnen im neuen Tab mit `rel="noopener noreferrer"` und einem Hinweis für Screenreader
- [ ] Bilder werden lazy geladen, als AVIF/WebP, mit festen Maßen
- [ ] Sortierung: `featured` zuerst, dann `order`
- [ ] Der Details-Link erscheint nur bei `site.features.projectDetails = true`
- [ ] Die Anleitung „Neues Projekt hinzufügen“ stimmt mit dem Code überein
