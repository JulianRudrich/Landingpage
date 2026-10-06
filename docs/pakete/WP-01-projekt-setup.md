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

1. Astro-Projekt im Repo-Root, TypeScript `strict` (`astro/tsconfigs/strict`). Versionen exakt gepinnt.
2. Tailwind CSS über `@tailwindcss/vite`; `src/styles/global.css` mit dem Tailwind-Import als Platzhalter.
3. Sitemap-Integration (`@astrojs/sitemap`) mit Filter, der `/danke` und `/styleguide` ausschließt.
4. i18n in `astro.config.mjs`: `locales: ['de']`, `defaultLocale: 'de'`, `routing: { prefixDefaultLocale: false }`.
5. `site` in `astro.config.mjs` liest `url` aus `src/config/site.ts`. Die Domain wird damit **nur an einer Stelle** gepflegt (Platzhalter `https://example.com`, die echte trägt WP-00 bzw. WP-02 in `site.ts` ein).
6. ESLint 10 (Flat Config) mit `eslint-plugin-astro`, `typescript-eslint` und Barrierefreiheits-Regeln (`jsx-a11y-recommended` aus `eslint-plugin-astro`, über den ESLint-10-kompatiblen Fork `eslint-plugin-jsx-a11y-x`); Prettier mit `prettier-plugin-astro` und `prettier-plugin-tailwindcss`. Markdown ist von Prettier ausgenommen, damit die Spec-Tabellen nicht ständig neu ausgerichtet werden.
7. npm-Skripte (siehe Schnittstellen).
8. `.nvmrc` mit **Node 24 (LTS)**; `engines` in `package.json` entspricht der strengsten Abhängigkeit (`eslint-plugin-astro`: `^22.22.3 || ^24.16.0 || >=26.3.0`).
9. Pfad-Alias `@/*` → `src/*` in `tsconfig.json`.
10. `.editorconfig`, `.gitignore` (`node_modules`, `dist`, `.astro`, `.env*`, `.netlify`), `.vscode/extensions.json` (empfohlene Editor-Erweiterungen).
11. Das **Gerüst mit Platzhaltern** (Tabelle unten).
12. i18n-Grundlage: `src/i18n/index.ts` mit `useTranslations()`, `src/i18n/de/index.ts` als Sammeldatei, eine Platzhalterdatei pro Bereich.
13. `src/config/site.ts` mit Typ und Platzhalterwerten.
14. `README.md` um den Abschnitt „Lokale Entwicklung“ ergänzen (Node-Version, Befehle).

**Gehört nicht dazu**

- Gestaltung, Farben, Schriften (WP-03)
- CI und Deployment (WP-02)
- Echte Inhalte (die jeweiligen Pakete)

## Dateien

**Besitzt dieses Paket:** `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`, `eslint.config.js`, `.prettierrc`, `.prettierignore`, `.editorconfig`, `.nvmrc`, `.gitignore`, `.vscode/extensions.json`, `src/pages/index.astro`, `src/i18n/index.ts`, `src/i18n/de/index.ts`

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

Die Dateien sind umgesetzt; hier steht, was andere Pakete davon wissen müssen. Im Zweifel gilt der Code.

**`src/pages/index.astro`** setzt nur die Sektionen zusammen (Hero, Services, Projects, Process, About, Faq, Contact) und muss danach praktisch nie mehr geändert werden. Jede Sektion ist eine eigene Komponente in `src/components/sections/`.

**`BaseLayout.astro`**, Props (WP-03 gestaltet das Layout, die Props bleiben):

| Prop | Typ | Bedeutung |
|---|---|---|
| `title` | `string` | Seitentitel (den Markennamen ergänzt WP-09 in `SEO.astro`) |
| `description` | `string` | Meta-Description, höchstens 155 Zeichen |
| `noindex` | `boolean`, optional | `true` für `/danke` und die 404-Seite |

Das Layout bindet `SEO`, `Analytics`, `Header`, `Footer` und den Skip-Link ein; der Inhalt landet in `<main id="inhalt">`.

**Texte (i18n):** In jeder Komponente stehen dieselben zwei Zeilen, danach sind alle Texte typisiert verfügbar:

```astro
---
import { useTranslations } from '@/i18n';
const t = useTranslations(Astro.currentLocale);
---
<h2>{t.services.title}</h2>
```

Eine Bereichsdatei sieht so aus. **Kein `as const`**, sonst wären die Typen die deutschen Texte selbst und eine englische Fassung könnte den Typ `Dictionary` nie erfüllen:

```ts
// src/i18n/de/services.ts – gehört WP-05
export const services = {
  title: 'Leistungen',
  items: [{ title: 'Websites & Online-Präsenz', text: '…' }],
};
```

Für Englisch (V2) kommen `'en'` in `locales` (`src/i18n/index.ts` und `astro.config.mjs`) und der Ordner `src/i18n/en/` dazu. Der Typ `Dictionary` erzwingt, dass jeder Schlüssel übersetzt ist.

**`src/config/site.ts`** exportiert `site` mit dem Typ `SiteConfig`: `name`, `url`, `email`, `phone`, `region`, `social`, `bookingUrl`, `analytics.domain`, `features.projectDetails`. Leere Strings bedeuten „nicht anzeigen“. `url` ist gleichzeitig `site` in `astro.config.mjs`.

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
