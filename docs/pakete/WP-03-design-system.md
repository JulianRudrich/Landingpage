# WP-03: Design-System & BaseLayout

| | |
|---|---|
| **Owner** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Reviewer** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Release** | V1.0. **Teil A (Design-Entwurf): Phase 0**, Teil B (Umsetzung): Phase 1 |
| **Aufwand** | L (ca. 12–24 h) |
| **Branch** | `tony/wp-03-design-system` (für Teil B; Teil A wird im Issue abgegeben) |
| **Issue** | [#6](https://github.com/JulianRudrich/Landingpage/issues/6) |
| **Abhängig von** | Teil A: nichts, kann sofort starten. Teil B: WP-01 und Freigabe der Spec v1.0. Teil A2 (Design V1.1): Go-live von V1.0 |
| **Blockiert** | Teil A: die Freigabe der Spec v1.0 und damit alle Sektions-Pakete (WP-04 bis WP-08, WP-10), außerdem Favicon und Vorschaubild in WP-09. Teil A2: WP-11 und WP-12 |
| **Anforderungen** | D-01 bis D-05, D-07 bis D-09, NFA-04, NFA-05, NFA-06, NFA-07, NFA-14, R-05 aus [SPECS.md](../../SPECS.md) |

## Ziel

Tony legt das **komplette Aussehen** der Website fest, bevor programmiert wird (Teil A), und setzt es danach als Design-System um (Teil B). Wer eine Sektion baut, setzt sie nur aus den Bausteinen und Token-Klassen zusammen und muss nichts selbst entscheiden.

Leitbild ([SPECS §9](../../SPECS.md#9-design-anforderungen)): **modern, warm, vertrauenswürdig**, mit Gastro-Nähe durch warme Farben, echte Fotos und appetitliche Screenshots. Kein Konzern-IT- und kein Hacker-Look.

## Teil A: Design-Abgabe (Phase 0)

Werkzeug frei wählbar (Figma, Penpot, Papier + Fotos). Abgabe als Link oder Bilder im Issue [#6](https://github.com/JulianRudrich/Landingpage/issues/6). Julian nimmt ab; danach ist das Design fest (Änderungen nur nach [SPECS §16](../../SPECS.md#16-änderungsregeln)).

### 1. Werte für alle Tokens

Die **Namen** stehen fest in `src/styles/global.css`. Für jeden Namen einen Wert liefern:

| Gruppe | Tokens |
|---|---|
| Flächen | `surface`, `surface-muted`, `surface-inverted` |
| Text | `ink`, `ink-muted`, `ink-inverted` |
| Marke | `primary`, `primary-hover`, `on-primary`, `accent`, `on-accent` |
| Linien, Zustände | `border`, `success`, `warning`, `focus` |
| Schriften | `font-sans` (Text), `font-display` (Überschriften; darf dieselbe sein). Höchstens 2 Familien, beide müssen bei [Fontsource](https://fontsource.org) verfügbar sein. Benötigte Schriftstärken angeben. |
| Formen | `radius-control` (Buttons, Felder), `radius-card` (Karten), `shadow-card` |
| Raster | `container-site` (max. Inhaltsbreite), `spacing-section` (Abstand je Sektion), `--header-height` |
| Browserleiste | `themeColor` (Hex-Wert für `theme-color` und Web-Manifest; Tony trägt ihn in Teil B in `src/config/site.ts` ein) |

**Pflicht-Kontraste ≥ 4,5 : 1** (mit einem Kontrast-Checker prüfen und in der Abgabe nennen):

- auf `surface` **und** auf `surface-muted`: `ink`, `ink-muted`, `primary` (Links), `warning` (Fehlertexte), `success` (Badge „Live“)
- auf `surface-inverted`: `ink-inverted` (Text **und** Links, z. B. im Footer)
- `on-primary` auf `primary` und auf `primary-hover`, `on-accent` auf `accent`
- `focus` muss sich von allen Flächen deutlich abheben (≥ 3 : 1)

Festgelegt: Links und Nebentext auf dunklen Flächen (`surface-inverted`) verwenden `ink-inverted`, nicht `primary` oder `ink-muted`.

### 2. Bildschirme

Jeweils **Handy (360 px)** und **Desktop (1280 px)**:

| Bildschirm | Was zu sehen sein muss |
|---|---|
| Startseite komplett | Header, Hero mit Bild, Leistungen (4 Karten), Projekte (Karte mit Badge), Ablauf (4 Schritte), Über uns (2 Personen), Kontakt (Formular + direkter Draht), Footer |
| Menü geöffnet | nur Handy: Burger-Menü offen |
| Formular-Zustände | leer, Fokus, Fehler mit Meldung am Feld |
| Unterseiten | Impressum (langer Text in `Prose`), Danke-Seite, 404-Seite |
| V1.1 (eigene Abgabe, siehe Teil A2) | Projektdetailseite, FAQ-Sektion (Akkordeon) |

Dazu für jede Sektion: welcher Hintergrund (`Section tone`: `default`, `muted` oder `inverted`).

### 3. Bausteine

Button `primary` / `secondary` / `ghost` in den Zuständen normal, Hover, Fokus. Badge `success` / `warning` / `neutral`. Card. Darstellung der Icons (Größe, Farbe).

### 4. Bilder und Grafiken

- Hero-Visual (Mockup im Geräterahmen oder Foto), als Datei für `src/assets/hero/`
- Gestaltung der Wortmarke (Schrift und Farbe von `Logo`)
- Favicon und Social-Media-Vorschaubild (1200 × 630 px) als Vorlage für WP-09

### Abnahme Teil A

- [ ] Alle Token-Werte geliefert, Pflicht-Kontraste erfüllt (Liste in der Abgabe)
- [ ] Alle Bildschirme aus Punkt 2 für Handy und Desktop vorhanden (ohne die V1.1-Zeile)
- [ ] `themeColor` geliefert
- [ ] Bausteine und Bilder aus Punkt 3 und 4 vorhanden
- [ ] Julian hat im Issue zugestimmt. Zusammen mit WP-00 ist damit die Spec v1.0 freigegeben ([SPECS §12](../../SPECS.md#12-releases--scope)).

## Teil A2: Design-Abgabe V1.1 (zu Beginn von Phase 2)

Nach dem Go-live von V1.0 und **bevor** WP-11 und WP-12 starten, liefert Tony nach denselben Regeln wie in Teil A:

- Projektdetailseite (Handy und Desktop): Breadcrumb, Kopfbereich, Cover, Text, Technik, Galerie, „Weitere Projekte“, Abschluss-Box
- FAQ-Sektion (Handy und Desktop): geschlossen, eine Antwort offen, Fokus

Abgabe und Abnahme durch Julian im eigenen Issue [#20](https://github.com/JulianRudrich/Landingpage/issues/20) unter V1.1 (#6 ist mit Teil B schon geschlossen). Danach können WP-11 und WP-12 starten.

## Teil B: Umsetzung (Phase 1)

1. **Token-Werte** aus Teil A in `src/styles/global.css` eintragen (nur Werte ändern, Namen bleiben).
2. **Schriften** über Fontsource installieren: die variable Version `@fontsource-variable/<name>`, wenn es sie gibt, sonst `@fontsource/<name>` mit den Schriftstärken aus der Abgabe. Abhängigkeit im Issue ankündigen, in `global.css` einbinden, `font-display: swap`.
3. **Bausteine gestalten** in `src/components/ui/` nach dem Entwurf. Die Props bleiben, wie sie sind (siehe Schnittstellen).
4. **`Prose`** gestalten: Überschriften, Absätze, Listen, Links und Zeilenlänge für Markdown (Rechtstexte WP-10, Fallstudien WP-12).
5. **`BaseLayout`** gestalten (Skip-Link sichtbar bei Fokus). Die Props bleiben die von `SEO.astro`.
6. **Styleguide** (`/styleguide/`) zeigt alle Bausteine in allen Varianten, damit die anderen Pakete nachsehen können.
7. **Bild-Muster** im Styleguide zeigen, mit dem Beispielbild `src/assets/styleguide/beispiel.png`: `<Picture>` aus `astro:assets`, `formats={['avif', 'webp']}`, `widths` und `sizes`, `loading="lazy"` (nur das LCP-Bild im Hero bekommt `loading="eager"` und `fetchpriority="high"`). Bilder immer als PNG, JPG oder WebP, nie als SVG.
8. **`themeColor`** aus Teil A in `src/config/site.ts` eintragen (nur dieses Feld).

**Gehört nicht dazu:** Aufbau und Logik von Header und Footer (WP-04), Inhalte der Sektionen (WP-05 bis WP-08).

## Dateien

**Besitzt dieses Paket** (alle existieren schon als Grundversion): `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/ui/Container.astro`, `Section.astro`, `SectionHeading.astro`, `Button.astro`, `Card.astro`, `Badge.astro`, `Icon.astro`, `icons.ts`, `Logo.astro`, `Prose.astro`, `src/pages/styleguide.astro`, `src/i18n/de/common.ts`, `src/assets/styleguide/*`

**Liest/benutzt:** `src/config/site.ts` (Name für `Logo`), `src/components/layout/SEO.astro` (Props-Typ)

**Ändert nach Absprache:** `src/config/site.ts` (nur `themeColor`, Teil B Punkt 8)

## Schnittstellen

Die Props sind ein **Vertrag** mit allen Paketen und ändern sich nur per Spec-Änderung ([SPECS §16](../../SPECS.md#16-änderungsregeln)).

| Baustein | Props | Zweck |
|---|---|---|
| `Container` | `as?: 'div' \| 'section' \| 'header' \| 'footer' \| 'nav'`, `class?` | max. Breite (`max-w-site`) und seitlicher Innenabstand |
| `Section` | `id: string`, `labelledby: string`, `tone?: 'default' \| 'muted' \| 'inverted'`, `class?` | `<section>` mit Anker, einheitlichem Abstand (`py-section`) und `Container` |
| `SectionHeading` | `id: string`, `eyebrow?`, `title: string`, `lead?`, `align?: 'left' \| 'center'`, `level?: 1 \| 2` | einheitliche Überschrift; `id` = `labelledby` der Section |
| `Button` | **entweder** Link: `href: string`, `external?` **oder** Schaltfläche: `type?: 'button' \| 'submit'` (dann kein `href`, kein `external`); dazu immer `variant?: 'primary' \| 'secondary' \| 'ghost'`, `size?: 'md' \| 'lg'`, `icon?: IconName`, `class?` | mit `href` ein Link, sonst `<button>`; `external` öffnet in neuem Tab mit Screenreader-Hinweis. `aria-*`- und `data-*`-Attribute werden durchgereicht, andere (`id` …) meldet `npm run check`. Die Variante steht als `data-variant`/`data-size` am Element, gestalten mit `data-[variant=primary]:…` |
| `Card` | `as?: 'article' \| 'div' \| 'li'`, `class?` | Fläche mit `rounded-card` |
| `Badge` | `tone?: 'neutral' \| 'success' \| 'warning'` | Projektstatus: live → `success`, prototyp → `warning`, konzept → `neutral` |
| `Icon` | `name: IconName`, `size?`, `label?`, `class?` | Inline-SVG; ohne `label` dekorativ |
| `Logo` | `class?` | Text-Wortmarke aus `site.name`, ohne eigenen Link |
| `Prose` | `class?` | Rahmen für gerenderten Markdown-Inhalt |

**Feste Icon-Liste** (`icons.ts`): Leistungen `globe`, `tablet-smartphone`, `sparkles`, `code` · Ablauf `message-circle`, `clipboard-list`, `hammer`, `rocket` · Kontakt `mail`, `phone`, `calendar-check`, `circle-check` · Navigation `menu`, `x` · allgemein `external-link`, `arrow-right`, `arrow-left`, `check`, `chevron-down`.

**Token-Klassen** für alle Pakete: `bg-surface`, `bg-surface-muted`, `bg-surface-inverted`, `text-ink`, `text-ink-muted`, `text-ink-inverted`, `bg-primary`, `hover:bg-primary-hover`, `text-on-primary`, `bg-accent`, `text-on-accent`, `border-border`, `text-success`, `text-warning`, `font-sans`, `font-display`, `rounded-control`, `rounded-card`, `shadow-card`, `max-w-site`, `py-section`.

## Akzeptanzkriterien

**Teil A:** siehe „Abnahme Teil A“ oben.

**Teil B**
- [ ] Alle Token-Werte aus dem Entwurf sind eingetragen; Komponenten nutzen nur Token-Klassen
- [ ] Schriften laufen lokal über Fontsource; im Network-Tab keine fremden Domains
- [ ] Alle Bausteine sehen aus wie im Entwurf; die Props sind unverändert
- [ ] `Prose` stellt Markdown gut lesbar dar (Impressum als Test)
- [ ] Fokus-Stil auf allen interaktiven Elementen sichtbar; der Skip-Link funktioniert
- [ ] `prefers-reduced-motion: reduce` schaltet Animationen und Smooth Scroll ab
- [ ] Bei 360 px Breite kein horizontales Scrollen
- [ ] Der Styleguide zeigt alle Bausteine und das Bild-Muster
