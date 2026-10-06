# WP-01: Projekt-Setup & Gerüst

| | |
|---|---|
| **Owner** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Reviewer** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Release** | V1.0 |
| **Aufwand** | L (ca. 12–24 h) |
| **Branch** | `julian/wp-01-projekt-setup` |
| **Issue** | [#4](https://github.com/JulianRudrich/Landingpage/issues/4) |
| **Abhängig von** | – |
| **Blockiert** | WP-02, WP-03, WP-09 und damit indirekt alle anderen Pakete |
| **Anforderungen** | FA-01, FA-20, NFA-16, NFA-18 aus [SPECS.md](../../SPECS.md) |

## Ziel

Astro + Tailwind + TypeScript aufsetzen und das **komplette Gerüst mit Platzhaltern** anlegen: alle Seiten, Sektionen, Layout-Komponenten und Textdateien, die in der [Zuständigkeitsmatrix](README.md#zuständigkeitsmatrix) stehen. Danach bearbeitet jedes Paket nur noch seine eigenen Dateien, und es entstehen keine Konflikte in gemeinsamen Dateien wie `index.astro`.

> ⚠️ Dieses Paket blockiert alle anderen. Lieber schnell ein solides Gerüst mergen als lange perfektionieren.

## Umfang

**Gehört dazu**

1. Astro-Projekt im Repo-Root (Vorlage „minimal“, TypeScript `strict`).
2. Tailwind CSS einbinden (`npx astro add tailwind`); `src/styles/global.css` mit dem Tailwind-Import als Platzhalter.
3. Sitemap-Integration (`npx astro add sitemap`) mit Filter, der `/danke` und `/styleguide` ausschließt.
4. i18n in `astro.config.mjs`: `locales: ['de']`, `defaultLocale: 'de'`, `routing: { prefixDefaultLocale: false }`.
5. `site` in `astro.config.mjs` als Platzhalter (`https://example.com`); die echte Domain setzt WP-02.
6. ESLint (Flat Config) mit `eslint-plugin-astro`, `typescript-eslint` und Barrierefreiheits-Regeln (`jsx-a11y`-Konfiguration aus `eslint-plugin-astro`); Prettier mit `prettier-plugin-astro` und `prettier-plugin-tailwindcss`.
7. npm-Skripte (siehe Schnittstellen).
8. `.nvmrc` mit der aktuellen Node-LTS-Hauptversion, passendes `engines`-Feld in `package.json`.
9. Pfad-Alias `@/*` → `src/*` in `tsconfig.json`.
10. `.editorconfig`, `.gitignore` (`node_modules`, `dist`, `.astro`, `.env*`, `.netlify`).
11. Das **Gerüst mit Platzhaltern** (Tabelle unten).
12. i18n-Grundlage: `src/i18n/index.ts` mit `useTranslations()`, `src/i18n/de/index.ts` als Sammeldatei, eine Platzhalterdatei pro Bereich.
13. `src/config/site.ts` mit Typ und Platzhalterwerten.
14. `README.md` um den Abschnitt „Lokale Entwicklung“ ergänzen (Node-Version, Befehle).

**Gehört nicht dazu**

- Gestaltung, Farben, Schriften (WP-03)
- CI und Deployment (WP-02)
- Echte Inhalte (die jeweiligen Pakete)

## Dateien

**Besitzt dieses Paket:** `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`, `eslint.config.js`, `.prettierrc`, `.prettierignore`, `.editorconfig`, `.nvmrc`, `.gitignore`, `src/pages/index.astro`, `src/i18n/index.ts`, `src/i18n/de/index.ts`

**Legt als Platzhalter an** (gehören danach dem genannten Paket):

| Platzhalter | Übernimmt | Inhalt des Platzhalters |
|---|---|---|
| `src/layouts/BaseLayout.astro` | WP-03 | Grundgerüst wie unten |
| `src/styles/global.css` | WP-03 | nur Tailwind-Import |
| `src/components/ui/` (leer, `.gitkeep`) | WP-03 | – |
| `src/components/layout/Header.astro`, `Footer.astro` | WP-04 | `<header>`/`<footer>` mit Platzhaltertext |
| `src/components/layout/SEO.astro` | WP-09 | `<title>` und Description aus Props |
| `src/components/layout/Analytics.astro` | WP-13 | rendert nichts |
| `src/components/sections/Hero.astro` | WP-05 | `<section id="start">` mit H1-Platzhalter |
| `src/components/sections/Services.astro` | WP-05 | `<section id="leistungen">` |
| `src/components/sections/Projects.astro` | WP-06 | `<section id="projekte">` |
| `src/components/sections/Process.astro` | WP-07 | `<section id="ablauf">` |
| `src/components/sections/About.astro` | WP-07 | `<section id="ueber-uns">` |
| `src/components/sections/Faq.astro` | WP-11 | rendert bis V1.1 nichts |
| `src/components/sections/Contact.astro` | WP-08 | `<section id="kontakt">` |
| `src/pages/impressum.astro`, `datenschutz.astro`, `404.astro` | WP-10 | Seite mit Überschrift |
| `src/pages/danke.astro` | WP-08 | Seite mit Überschrift, `noindex` |
| `src/i18n/de/common.ts`, `navigation.ts`, `hero.ts`, `services.ts`, `projects.ts`, `process.ts`, `about.ts`, `faq.ts`, `contact.ts`, `seo.ts`, `legal.ts`, `projectDetail.ts` | siehe Matrix | je ein Objekt mit Platzhaltertexten |
| `src/config/site.ts` | WP-00 | Platzhalterwerte |

Jede Platzhalter-Sektion rendert schon ihr `<section id="…">` mit einer H2 aus ihrer Textdatei. So funktionieren alle Anker (FA-01) vom ersten Tag an.

## Schnittstellen

**`src/pages/index.astro`** (danach praktisch nie mehr ändern):

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import Hero from '@/components/sections/Hero.astro';
import Services from '@/components/sections/Services.astro';
import Projects from '@/components/sections/Projects.astro';
import Process from '@/components/sections/Process.astro';
import About from '@/components/sections/About.astro';
import Faq from '@/components/sections/Faq.astro';
import Contact from '@/components/sections/Contact.astro';
import { useTranslations } from '@/i18n';

const t = useTranslations('de');
---

<BaseLayout title={t.seo.home.title} description={t.seo.home.description}>
  <Hero />
  <Services />
  <Projects />
  <Process />
  <About />
  <Faq />
  <Contact />
</BaseLayout>
```

**`BaseLayout.astro`, Props und Grundgerüst** (WP-03 gestaltet es danach):

```astro
---
import SEO from '@/components/layout/SEO.astro';
import Analytics from '@/components/layout/Analytics.astro';
import Header from '@/components/layout/Header.astro';
import Footer from '@/components/layout/Footer.astro';
import '@/styles/global.css';

interface Props {
  title: string;
  description: string;
  noindex?: boolean;
}
const { title, description, noindex = false } = Astro.props;
---

<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <SEO title={title} description={description} noindex={noindex} />
    <Analytics />
  </head>
  <body>
    <!-- Skip-Link (Text aus common.ts) -->
    <Header />
    <main id="inhalt"><slot /></main>
    <Footer />
  </body>
</html>
```

**i18n:**

```ts
// src/i18n/de/hero.ts – eine Datei pro Bereich, gehört dem jeweiligen Paket
export const hero = {
  title: 'Platzhalter: Headline (WP-05)',
} as const;

// src/i18n/de/index.ts – Sammeldatei (WP-01)
export { common } from './common';
export { hero } from './hero';
// … alle Bereiche

// src/i18n/index.ts
import * as de from './de';
export type Locale = 'de';
export type Dictionary = typeof de;
const dictionaries: Record<Locale, Dictionary> = { de };
export function useTranslations(locale: Locale = 'de'): Dictionary {
  return dictionaries[locale];
}
```

Für Englisch (V2) kommen `'en'` und `src/i18n/en/` dazu; der Typ `Dictionary` erzwingt vollständige Übersetzungen.

**`src/config/site.ts`:**

```ts
export const site = {
  name: 'Tony & Julian',            // E-01
  url: 'https://example.com',        // E-02
  email: 'hallo@example.com',        // E-03
  phone: '',                         // E-09, leer = nicht anzeigen
  region: '',                        // E-05
  social: { linkedinTony: '', linkedinJulian: '', github: '' },
  bookingUrl: '',                    // WP-13, leer = Button ausblenden
  analytics: { domain: '' },         // WP-13
  features: { projectDetails: false }, // WP-12 setzt auf true
} as const;
```

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

- [ ] `npm install && npm run dev` startet die Seite lokal; alle Sektionen sind als Platzhalter sichtbar
- [ ] `npm run check`, `npm run lint`, `npm run format:check` und `npm run build` laufen fehlerfrei
- [ ] TypeScript `strict` ist aktiv, der Alias `@/` funktioniert
- [ ] Alle Dateien aus der Platzhalter-Tabelle existieren
- [ ] Alle Anker aus [SPECS §6](../../SPECS.md#6-aufbau-der-startseite) funktionieren (z. B. springt `/#kontakt` zur Kontakt-Sektion)
- [ ] Keine sichtbaren Texte fest in Komponenten; alle kommen aus `src/i18n/de/*`
- [ ] i18n ist in `astro.config.mjs` konfiguriert (`de`, ohne URL-Präfix)
- [ ] Die Sitemap schließt `/danke` und `/styleguide` aus
- [ ] Das README erklärt die lokale Entwicklung (Node-Version, Befehle)
