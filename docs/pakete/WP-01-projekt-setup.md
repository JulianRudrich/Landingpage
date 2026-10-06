# WP-01: Projekt-Setup & Gerüst

| | |
|---|---|
| **Owner** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Reviewer** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Release** | V1.0, Phase 0 (Festlegen) |
| **Aufwand** | L (ca. 12–24 h) |
| **Branch** | `julian/wp-01-projekt-setup` |
| **Issue** | [#4](https://github.com/JulianRudrich/Landingpage/issues/4) |
| **Abhängig von** | – |
| **Blockiert** | alle anderen Pakete |
| **Anforderungen** | FA-01, FA-20, NFA-16, NFA-18 aus [SPECS.md](../../SPECS.md) |

## Ziel

Das Projekt aufsetzen und das **vollständige Gerüst** anlegen: **jede Datei von V1.0 und V1.1** existiert, jede mit ihrer endgültigen Schnittstelle (Props, Content-Schema, Textschlüssel, Token-Namen, Icon-Liste). Danach füllen die Pakete ihre Dateien nur noch aus. Niemand muss eine Datei anlegen, die ein anderer auch braucht, und niemand muss Dateien anderer anfassen. TypeScript prüft, dass sich alle an die Schnittstellen halten.

## Umfang

**Gehört dazu**

1. Astro 7, Tailwind CSS 4 (über `@tailwindcss/vite`), TypeScript 6 `strict`, alle Versionen exakt gepinnt.
2. `astro.config.mjs`:
   - `site` aus `src/config/site.ts` (Domain steht nur dort)
   - `trailingSlash: 'always'`
   - i18n (`de` ohne URL-Präfix)
   - Sitemap ohne `/danke/` und `/styleguide/`
   - Skripte werden immer als Datei ausgeliefert, nie inline (für die CSP aus WP-02)
3. ESLint 10 (`eslint-plugin-astro`, `typescript-eslint`, Barrierefreiheits-Regeln über `eslint-plugin-jsx-a11y-x`) und Prettier (Astro- und Tailwind-Plugin; Markdown ausgenommen).
4. npm-Skripte (siehe unten), `.nvmrc` mit Node 24, `engines` passend zur strengsten Abhängigkeit, Alias `@/*` → `src/*`.
5. `.editorconfig`, `.gitignore` (inkl. Ausgaben der Qualitäts-Tools aus WP-14 und `.claude/worktrees/`), `.vscode/extensions.json`.
6. Icon-Paket `@lucide/astro` (für die feste Icon-Liste von WP-03).
7. **Das vollständige Gerüst** (Tabelle unten), mit allen Texten als Vorschlag (Ansprache „Sie“).
8. i18n-Grundlage mit Schutz gegen `as const` (siehe Schnittstellen).
9. `README.md`: Abschnitt „Lokale Entwicklung“.

**Gehört nicht dazu**

- Gestaltung (WP-03) und die eigentliche Umsetzung der Sektionen (WP-04 bis WP-12)
- `netlify.toml` und CI-Workflow (WP-02), Qualitäts-Workflow (WP-14). Das sind reine Konfigurationsdateien ohne Schnittstelle; ihr Inhalt steht in den jeweiligen Specs.

## Dateien

**Besitzt dieses Paket:** `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`, `eslint.config.js`, `.prettierrc`, `.prettierignore`, `.editorconfig`, `.nvmrc`, `.gitignore`, `.vscode/extensions.json`, `src/pages/index.astro`, `src/i18n/index.ts`, `src/i18n/de/index.ts`

**Legt für andere Pakete an** (Stand im Gerüst: „Grundversion“ = funktioniert schlicht und ungestaltet, „Platzhalter“ = nur Schnittstelle bzw. gibt noch nichts aus):

| Datei | Paket | Stand im Gerüst |
|---|---|---|
| `src/styles/global.css` | WP-03 | alle Token-**Namen** mit neutralen Platzhalterwerten, Fokus-Stil, reduzierte Bewegung |
| `src/layouts/BaseLayout.astro` | WP-03 | Grundversion: Props = SEO-Props, Skip-Link, Slot `head` |
| `src/components/ui/Container, Section, SectionHeading, Button, Card, Badge, Icon, Logo, Prose` (`.astro`) | WP-03 | Grundversionen mit endgültigen Props |
| `src/components/ui/icons.ts` | WP-03 | feste Icon-Liste (19 Icons) |
| `src/pages/styleguide.astro` | WP-03 | Grundversion: zeigt alle Bausteine und Icons |
| `src/components/layout/Header.astro`, `Footer.astro` | WP-04 | Grundversion: Navigation bzw. Rechtslinks und © |
| `src/components/layout/MobileNav.astro` | WP-04 | Platzhalter |
| `src/components/sections/Hero.astro` | WP-05 | Grundversion: H1 und Einleitung |
| `src/components/sections/Services.astro` | WP-05 | Grundversion: Überschrift |
| `src/components/sections/Projects.astro`, `src/components/projects/ProjectCard.astro` | WP-06 | Grundversion: Projektliste aus der Collection |
| `src/content.config.ts` | WP-06 | **fertiges** Schema (Vertrag mit WP-12) |
| `src/content/projects/diese-website.md`, `src/assets/projects/diese-website.svg` | WP-06 | erstes Projekt mit Platzhalterbild |
| `src/components/sections/Process.astro`, `About.astro` | WP-07 | Grundversion: Überschrift |
| `src/components/sections/Contact.astro` | WP-08 | Grundversion: Überschrift, bindet `ContactForm` ein |
| `src/components/contact/ContactForm.astro` | WP-08 | Platzhalter |
| `src/pages/danke.astro` | WP-08 | Grundversion, `noindex` |
| `src/components/layout/SEO.astro` | WP-09 | Grundversion: Titel mit Markenname, Description, `noindex`, Favicon; **endgültige Props** |
| `src/pages/robots.txt.ts` | WP-09 | funktioniert bereits |
| `public/favicon.svg` | WP-09 | Platzhalter-Monogramm |
| `src/pages/impressum.astro`, `datenschutz.astro` | WP-10 | Grundversion: H1 + Markdown in `Prose` |
| `src/legal/impressum.md`, `datenschutz.md` | WP-10 | Gliederung mit markierten Lücken |
| `src/pages/404.astro` | WP-10 | Grundversion mit Links zu Start und Kontakt |
| `src/components/sections/Faq.astro` | WP-11 | Platzhalter, gibt nichts aus |
| `src/pages/projekte/[slug].astro` | WP-12 | Platzhalter, erzeugt keine Seiten |
| `src/components/projects/ProjectHeader.astro`, `ProjectGallery.astro` | WP-12 | Platzhalter mit endgültigen Props |
| `src/components/layout/Analytics.astro` | WP-13 | Platzhalter, gibt nichts aus |
| `src/i18n/de/*.ts` (12 Bereiche) | siehe Matrix | **alle Textschlüssel mit Textvorschlägen** |
| `src/config/site.ts` | WP-00 | Typ `SiteConfig` und Platzhalterwerte |
| `src/assets/hero/`, `src/assets/team/` | WP-05, WP-07 | leere Ordner für Bilder |

## Schnittstellen

Der Code ist die Quelle der Wahrheit; hier steht das Wichtigste im Überblick.

**Startseite:** `src/pages/index.astro` setzt nur die Sektionen zusammen (Hero, Services, Projects, Process, About, Faq, Contact) und ändert sich danach nicht mehr.

**`BaseLayout`:** Die Props sind genau die von `SEO.astro` (`export interface Props`, Vertrag von WP-09) und werden unverändert durchgereicht:

| Prop | Typ | Bedeutung |
|---|---|---|
| `title` | `string` | Seitentitel ohne Markennamen (SEO hängt „ \| {Name}“ an) |
| `description` | `string` | höchstens 155 Zeichen |
| `noindex` | `boolean`, optional | `/danke/`, 404, `/styleguide/` |
| `image` | `ImageMetadata`, optional | Social-Media-Vorschaubild, z. B. Projekt-Cover (WP-12) |
| `imageAlt` | `string`, optional | Alt-Text zu `image` |
| `type` | `'website' \| 'article'`, optional | `article` für Projektdetailseiten |

Seitenspezifische Head-Inhalte gehen über `<Fragment slot="head">…</Fragment>`.

**Texte (i18n):** In jeder Komponente:

```astro
---
import { useTranslations } from '@/i18n';
const t = useTranslations(Astro.currentLocale);
---
<h2>{t.services.title}</h2>
```

Bereichsdateien **ohne** `as const`, sonst wären die Typen die deutschen Texte selbst und eine englische Fassung könnte den Typ `Dictionary` nie erfüllen. `src/i18n/index.ts` prüft das: Bei `as const` meldet `npm run check` einen Fehler. Für Englisch (V2) kommen `'en'` in `locales` (`src/i18n/index.ts` und `astro.config.mjs`) und `src/i18n/en/` dazu.

**`src/config/site.ts`:** `site` mit Typ `SiteConfig`: `name`, `url`, `email`, `phone`, `region`, `social`, `bookingUrl`, `analytics.domain`, `features.projectDetails`. Leere Strings bedeuten „nicht anzeigen“.

**Konventionen** (URLs mit `/` am Ende, keine Inline-Skripte, feste Icons, nur Token-Klassen): [SPECS §10](../../SPECS.md#feste-konventionen).

**npm-Skripte:**

| Skript | Befehl |
|---|---|
| `dev` | `astro dev` |
| `build` | `astro build` |
| `preview` | `astro preview` |
| `check` | `astro check` |
| `lint` | `eslint .` |
| `format` | `prettier --write .` |
| `format:check` | `prettier --check .` |

## Akzeptanzkriterien

- [ ] `npm install && npm run dev` startet die Seite lokal; alle Sektionen sind mit ihren Überschriften sichtbar
- [ ] `npm run check`, `npm run lint`, `npm run format:check` und `npm run build` laufen fehlerfrei
- [ ] Jede Datei aus der Tabelle oben existiert mit der beschriebenen Schnittstelle
- [ ] Alle Anker aus [SPECS §6](../../SPECS.md#6-aufbau-der-startseite) funktionieren (z. B. springt `/#kontakt` zur Kontakt-Sektion)
- [ ] Keine sichtbaren Texte fest in Komponenten (Ausnahme: interne Beschriftungen im Styleguide)
- [ ] `as const` in einer Textdatei lässt `npm run check` fehlschlagen
- [ ] Ein Komponenten-`<script>` wird im Build als Datei unter `/_astro/` ausgeliefert, nicht inline
- [ ] Die Sitemap enthält `/`, `/impressum/`, `/datenschutz/`, aber nicht `/danke/`, `/styleguide/` und 404; `/robots.txt` verweist auf die Sitemap
- [ ] Das README erklärt die lokale Entwicklung
