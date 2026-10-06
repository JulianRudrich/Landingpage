# Spezifikation – Landingpage Tony & Julian

| | |
|---|---|
| **Version** | 0.1 (Entwurf) |
| **Stand** | 06.10.2026 |
| **Autoren** | Tony ([@tonytonym21](https://github.com/tonytonym21)), Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Status** | Entwurf, wird mit [WP-00](docs/pakete/WP-00-entscheidungen-inhalte.md) finalisiert |

Dieses Dokument beschreibt, **was** die Website können muss und **warum**.
**Wer** was baut und **welche Dateien** wem gehören, steht in den [Arbeitspaketen](docs/pakete/README.md).
**Wie** wir auf GitHub zusammenarbeiten, steht in [CONTRIBUTING.md](CONTRIBUTING.md).

Änderungen an dieser Spec laufen wie Code: per Pull Request mit Review durch den anderen.

## Inhalt

1. [Ziele & Erfolgskriterien](#1-ziele--erfolgskriterien)
2. [Zielgruppe & Nutzerreisen](#2-zielgruppe--nutzerreisen)
3. [Positionierung & Tonalität](#3-positionierung--tonalität)
4. [Leistungsangebot](#4-leistungsangebot)
5. [Sitemap](#5-sitemap)
6. [Aufbau der Startseite](#6-aufbau-der-startseite)
7. [Funktionale Anforderungen](#7-funktionale-anforderungen)
8. [Nicht-funktionale Anforderungen](#8-nicht-funktionale-anforderungen)
9. [Design-Anforderungen](#9-design-anforderungen)
10. [Technische Architektur](#10-technische-architektur)
11. [Rechtliches (Deutschland)](#11-rechtliches-deutschland)
12. [Releases & Scope](#12-releases--scope)
13. [Arbeitspakete & Zuordnung der Anforderungen](#13-arbeitspakete--zuordnung-der-anforderungen)
14. [Definition of Done](#14-definition-of-done)
15. [Offene Entscheidungen](#15-offene-entscheidungen)
16. [Änderungshistorie](#16-änderungshistorie)

---

## 1. Ziele & Erfolgskriterien

Die Landingpage ist unser digitales Aushängeschild und das Ziel jeder Akquise: Wir verlinken sie in Kaltakquise-Mails, verschicken Prototypen darüber und zeigen sie potenziellen Partnern.

| ID | Ziel | Bedeutung |
|---|---|---|
| Z-1 | **Vertrauen schaffen** | Wer unsere Mail oder unseren Prototyp bekommt, sieht in unter 30 Sekunden: echte Personen, klares Angebot, vorzeigbare Arbeit. |
| Z-2 | **Anfragen erzeugen** | Jeder Weg auf der Seite führt zur Kontaktaufnahme (Formular, E-Mail, später Terminbuchung). |
| Z-3 | **Arbeitsprobe sein** | Die Seite selbst beweist, was wir können: schnell, mobil, barrierefrei, sauber gebaut. |
| Z-4 | **Demos bündeln** | Projekte und Prototypen sind zentral verlinkt und können einzeln verschickt werden. |

**Erfolgskriterien (KPIs)**

| KPI | Zielwert | Messung |
|---|---|---|
| Qualifizierte Anfragen | ≥ 3 pro Monat, 3 Monate nach Go-live (Startwert, nach Erfahrung anpassen) | Formular-Eingänge und E-Mails |
| Conversion Besuch → Anfrage | ≥ 2 % | Statistik ([WP-13](docs/pakete/WP-13-analytics-terminbuchung.md)) und Anfragen |
| Lighthouse (mobil) | ≥ 95 in allen 4 Kategorien | Lighthouse bzw. Lighthouse CI ([WP-14](docs/pakete/WP-14-qualitaetssicherung.md)) |
| Ladezeit (LCP, mobil) | < 2,5 s | Lighthouse / PageSpeed Insights |

## 2. Zielgruppe & Nutzerreisen

**Primäre Zielgruppe:** Inhaber:innen lokaler **Gastronomiebetriebe** (Restaurant, Café, Bar, Imbiss, Lieferservice).

**Sekundäre Zielgruppen:** andere lokale Kleinunternehmen (Handwerk, Praxen, Einzelhandel, Dienstleister) sowie Agenturen und Partner, die Entwickler suchen.

### Persona: „Maria, 46, Inhaberin eines italienischen Restaurants“

- 40 Plätze plus Terrasse, 6 Mitarbeitende
- Reservierungen laufen per Telefon, die Speisekarte ist ein PDF, die Website wurde seit Jahren nicht angefasst
- Liest Mails zwischen Mittags- und Abendgeschäft, **fast immer auf dem Smartphone**
- Kein Technikwissen, misstrauisch gegenüber Agentur-Sprech und Abo-Fallen
- Will mehr Gäste, weniger Telefonstress und einen verlässlichen Ansprechpartner
- Entscheidet nach Bauchgefühl: Sympathie, Verständlichkeit, Beispiele

**Konsequenzen für die Seite:** mobil zuerst, kurze Texte, keine Fachbegriffe, Gesichter zeigen, Kontakt immer mit einem Tipp erreichbar.

### Nutzerreisen

| ID | Auslöser | Weg durch die Seite | Ziel |
|---|---|---|---|
| J1 | Kaltakquise-Mail mit Link | Smartphone → Hero (versteht das Angebot) → Projekte/Demo → Über uns → Kontakt | Anfrage oder Erstgespräch |
| J2 | Wir schicken einen Prototyp-Link | Demo (eigene Subdomain) → Link „Ein Projekt von Tony & Julian“ → Startseite → Kontakt | Rückmeldung oder Auftrag |
| J3 | Google-Suche „Website Restaurant <Stadt>“ | Suchergebnis → Hero → Leistungen → Kontakt | Anfrage |
| J4 | Agentur sucht Entwickler-Partner | Desktop → Projekte (Tech-Stack) → Über uns → Kontakt | Partnerschaft |

## 3. Positionierung & Tonalität

**Kernbotschaft** (Entwurf, wird in [WP-05](docs/pakete/WP-05-hero-leistungen.md) finalisiert):

> **Digitale Lösungen für Gastronomie und lokale Betriebe – von der Website bis zur eigenen App.**

**Nutzenversprechen**

- **Persönlich:** zwei feste Ansprechpartner statt Agentur-Hotline
- **Verständlich:** Wir erklären ohne Fachchinesisch.
- **Modern:** aktuelle Technik inklusive KI, zu fairen Preisen für kleine Betriebe
- **Greifbar:** früh ein klickbarer Prototyp statt langer Konzeptpapiere

**Tonalität**

- Ansprache mit **„Sie“** (Empfehlung, Entscheidung E-04 in [WP-00](docs/pakete/WP-00-entscheidungen-inhalte.md))
- Kurze Sätze, aktive Sprache, konkreter Nutzen statt Technik („mehr Reservierungen“ statt „React-basierte Buchungs-API“)
- Ehrlich: keine übertriebenen Versprechen, keine erfundenen Zahlen oder Referenzen
- Fachbegriffe nur, wo nötig, und dann kurz erklärt

## 4. Leistungsangebot

Wir können vieles. Für eine klare Botschaft in der Akquise führen **L1 bis L3** mit Gastro-Bezug, **L4** fängt alles andere auf.

| ID | Leistung | Kurztext (Entwurf) | Nutzenpunkte (Entwurf) |
|---|---|---|---|
| L1 | Websites & Online-Präsenz | „Eine moderne Website, die bei Google gefunden wird und auf dem Handy überzeugt.“ | Online-Speisekarte, die Sie selbst aktualisieren · Reservierungs- oder Anfrageformular · optimiertes Google-Unternehmensprofil |
| L2 | Apps für die Gastronomie | „Digitale Helfer für Ihren Betrieb – auf Smartphone, Tablet oder Kassen-PC.“ | Bestellen am Tisch per QR-Code · Reservierungs- und Tischplanung · Treueprogramm für Stammgäste |
| L3 | KI & Automatisierung | „Wiederkehrende Aufgaben automatisch erledigen – damit mehr Zeit für Ihre Gäste bleibt.“ | KI-Assistent beantwortet Anfragen rund um die Uhr · Antwortvorschläge für Google-Bewertungen · Dienstpläne, Bestellungen und Rechnungen automatisiert |
| L4 | Individuelle Software | „Ihr Problem passt in keine Schublade? Wir entwickeln die passende Lösung.“ | Analyse Ihrer Abläufe · klickbarer Prototyp in wenigen Wochen · Betreuung nach dem Start |

> **Hinweis zu L2:** Ob unser erstes Gastro-Produkt eine Mobile-App, eine Desktop-App oder eine Web-App (PWA) wird, ist Entscheidung **E-08**. Empfehlung: **Web-App (PWA)**. Sie läuft mit einer Codebasis auf dem Tablet an der Theke, dem PC im Büro und dem Smartphone, ohne App-Store-Hürde. Die Website formuliert L2 bewusst geräteneutral.

## 5. Sitemap

| Pfad | Inhalt | Release | Indexierung | Paket |
|---|---|---|---|---|
| `/` | Startseite (One-Pager) | V1.0 | ja | WP-01 (Gerüst) + Sektionen |
| `/danke` | Bestätigung nach Kontaktanfrage | V1.0 | `noindex` | WP-08 |
| `/impressum` | Impressum | V1.0 | ja | WP-10 |
| `/datenschutz` | Datenschutzerklärung | V1.0 | ja | WP-10 |
| `/404` | Fehlerseite | V1.0 | `noindex` | WP-10 |
| `/projekte/<slug>` | Projekt-Detailseite (Case Study) | V1.1 | ja | WP-12 |
| `/gastronomie` | Branchen-Landingpage für gezielte Akquise | V2 | ja | – |
| `/en/…` | Englische Version | V2 | ja | – |
| `/blog/…` | Artikel für SEO | V2 | ja | – |

**Demos und Prototypen laufen nicht in diesem Repo.** Jede Demo hat ein eigenes Repo und ein eigenes Deployment, erreichbar unter `demo-<projekt>.<domain>` (oder vorerst der Netlify-URL), mit `noindex` und einem Link zurück zur Landingpage. Die Landingpage verlinkt sie nur über die Projektkarten.

## 6. Aufbau der Startseite

| # | Sektion | Anker | Inhalt | Paket |
|---|---|---|---|---|
| 1 | Header | – | Wortmarke, Navigation (Leistungen, Projekte, Ablauf, Über uns, Kontakt), CTA „Projekt anfragen“ | WP-04 |
| 2 | Hero | `#start` | Headline, Subline, CTA „Kostenloses Erstgespräch“ → `#kontakt`, CTA „Projekte ansehen“ → `#projekte`, Visual | WP-05 |
| 3 | Leistungen | `#leistungen` | L1 bis L4 als Karten | WP-05 |
| 4 | Projekte | `#projekte` | 2–6 Projektkarten aus der Content Collection | WP-06 |
| 5 | Ablauf | `#ablauf` | 4 Schritte vom Erstgespräch bis zur Betreuung | WP-07 |
| 6 | Über uns | `#ueber-uns` | Tony & Julian: Foto, Rolle, Kurzbio, Links | WP-07 |
| 7 | FAQ | `#faq` | 6–8 Fragen als Akkordeon (ab V1.1) | WP-11 |
| 8 | Kontakt | `#kontakt` | Formular, E-Mail, Telefon, ab V1.1 Terminbuchung | WP-08 |
| 9 | Footer | – | Kontakt, Navigation, Impressum, Datenschutz, © | WP-04 |

- Jede Sektion ist eine **eigene Komponente** in `src/components/sections/`. `src/pages/index.astro` setzt sie nur zusammen.
- Kundenstimmen kommen erst, wenn echte vorliegen (V2), dann zwischen „Projekte“ und „Ablauf“.

## 7. Funktionale Anforderungen

Priorität nach MoSCoW: **M** = Must, **S** = Should, **C** = Could, **W** = Won't (diesmal nicht).

| ID | Anforderung | Prio | Akzeptanzkriterium | Paket |
|---|---|---|---|---|
| FA-01 | Startseite als One-Pager mit den Sektionen aus [Abschnitt 6](#6-aufbau-der-startseite) in dieser Reihenfolge, jede mit Anker-ID | M | Alle Anker sind per URL (z. B. `/#kontakt`) direkt anspringbar | WP-01 |
| FA-02 | Sticky Header mit Wortmarke, Navigation und CTA „Projekt anfragen“ | M | Header bleibt beim Scrollen sichtbar; angesprungene Sektionen werden nicht vom Header verdeckt | WP-04 |
| FA-03 | Mobile Navigation (Burger-Menü) unter 768 px | M | Bedienbar per Touch und Tastatur; `aria-expanded` korrekt; schließt per Esc und nach Klick auf einen Link | WP-04 |
| FA-04 | Aktiver Menüpunkt beim Scrollen hervorgehoben | S | Der Menüpunkt der sichtbaren Sektion ist markiert | WP-04 |
| FA-05 | Hero mit Headline (H1), Subline, primärem CTA → `#kontakt` und sekundärem CTA → `#projekte` | M | Botschaft und primärer CTA sind bei 360 × 640 px ohne Scrollen sichtbar | WP-05 |
| FA-06 | Leistungssektion mit L1 bis L4 (Icon, Titel, Kurztext, 3 Nutzenpunkte) | M | Vier Karten; mobil einspaltig, ab Tablet mehrspaltig | WP-05 |
| FA-07 | Projekte als Content Collection mit validiertem Schema | M | Neues Projekt = neue Markdown-Datei; fehlende Pflichtfelder brechen den Build ab | WP-06 |
| FA-08 | Projektkarten mit Bild, Titel, Branche, Kurzbeschreibung, Tech-Tags, Status-Badge und Demo-Link | M | Status „Prototyp“ bzw. „Konzept“ ist sichtbar gekennzeichnet; externe Links öffnen im neuen Tab mit `rel="noopener"` | WP-06 |
| FA-09 | Ablauf-Sektion mit 4 Schritten | M | Schritte sind nummeriert und als geordnete Liste (`<ol>`) ausgezeichnet | WP-07 |
| FA-10 | Über uns mit Foto, Name, Rolle, Kurzbio und Profil-Links für beide | M | Beide gleichwertig dargestellt; Fotos mit Alt-Text | WP-07 |
| FA-11 | Kontaktformular: Name\*, E-Mail\*, Unternehmen, Projektart (Auswahl), Nachricht\* | M | Pflichtfelder werden validiert, Fehlermeldungen stehen am Feld (`aria-describedby`), Formular ist per Tastatur bedienbar | WP-08 |
| FA-12 | Spam-Schutz ohne Captcha-Drittanbieter | M | Honeypot-Feld + Netlify-Spamfilter; kein reCAPTCHA/hCaptcha | WP-08 |
| FA-13 | Nach dem Absenden Weiterleitung auf `/danke`, Benachrichtigung per E-Mail an beide | M | Eine Testanfrage kommt bei Tony und Julian an | WP-08 |
| FA-14 | Datenschutzhinweis mit Link direkt am Formular | M | Hinweis über dem Absenden-Button, Link auf `/datenschutz` | WP-08 |
| FA-15 | Direkte Kontaktwege: E-Mail (`mailto:`) und Telefon (`tel:`, falls öffentlich) | M | Links funktionieren auf dem Smartphone | WP-08 |
| FA-16 | Footer mit Kontakt, Navigation, Impressum, Datenschutz, Copyright | M | Impressum und Datenschutz sind von jeder Seite mit 1 Klick erreichbar | WP-04 |
| FA-17 | Seite `/impressum` | M | Enthält alle Pflichtangaben laut R-01 | WP-10 |
| FA-18 | Seite `/datenschutz` | M | Deckt alle tatsächlich genutzten Dienste ab (R-03) | WP-10 |
| FA-19 | Eigene 404-Seite | M | Freundlicher Text, Links zur Startseite und zum Kontakt | WP-10 |
| FA-20 | Mehrsprachigkeit vorbereitet | M | Astro-i18n konfiguriert (`de` ohne URL-Präfix); **keine** sichtbaren Texte fest in Komponenten, alle in `src/i18n/de/*.ts` | WP-01 (Grundlage), alle (Einhaltung) |
| FA-21 | FAQ-Sektion als Akkordeon | S | Natives `<details>`/`<summary>` oder gleichwertig barrierefrei | WP-11 |
| FA-22 | Projektdetailseiten `/projekte/<slug>` | S | Werden für jedes Projekt automatisch aus der Content Collection erzeugt | WP-12 |
| FA-23 | Terminbuchung für das Erstgespräch | S | Externer Link (kein Embed), Button in der Kontakt-Sektion | WP-13 |
| FA-24 | Cookielose Besucherstatistik | S | Seitenaufrufe und Formular-Absendungen messbar; kein Cookie, kein Banner | WP-13 |
| FA-25 | Englische Version unter `/en/` | C | – | V2 |
| FA-26 | Branchen-Landingpage `/gastronomie` | C | – | V2 |
| FA-27 | Kundenstimmen (nur echte, mit Einverständnis) | C | – | V2 |
| FA-28 | Blog | C | – | V2 |
| FA-29 | Dark Mode | W | – | – |
| FA-30 | CMS, Login, Shop, Kundenportal | W | – | – |

## 8. Nicht-funktionale Anforderungen

| ID | Bereich | Anforderung | Prio | Akzeptanzkriterium | Paket |
|---|---|---|---|---|---|
| NFA-01 | Performance | Lighthouse (mobil) ≥ 95 in Performance, Accessibility, Best Practices und SEO | M | Messung auf der Deploy-Preview | alle; Messung WP-14 |
| NFA-02 | Performance | Core Web Vitals: LCP < 2,5 s, CLS < 0,1, INP < 200 ms | M | Lighthouse / PageSpeed Insights | alle; Messung WP-14 |
| NFA-03 | Performance | Startseite < 500 KB übertragen, eigenes JavaScript < 30 KB | S | Network-Tab ohne Cache | alle; Messung WP-14 |
| NFA-04 | Performance | Bilder nur über `astro:assets` (`<Image>`/`<Picture>`): AVIF/WebP, feste Maße, `loading="lazy"` unterhalb des sichtbaren Bereichs | M | Kein `<img>` ohne `width`/`height` | WP-03 (Muster), alle |
| NFA-05 | Barrierefreiheit | WCAG 2.2 AA: Kontrast ≥ 4,5 : 1, Tastaturbedienung, sichtbarer Fokus, Skip-Link, Alt-Texte, Landmarks, logische Überschriften (genau eine H1 pro Seite) | M | axe: 0 kritische/schwere Verstöße; kompletter Tastatur-Durchlauf ohne Falle | WP-03 (Basis), alle; Audit WP-14 |
| NFA-06 | Barrierefreiheit | `prefers-reduced-motion` wird respektiert | M | Bei aktivierter Systemeinstellung keine Animationen | WP-03 |
| NFA-07 | Responsive | Mobile-first, 360 px bis 1920 px ohne horizontales Scrollen | M | Test bei 360, 768, 1280 und 1920 px | WP-03 (Basis), alle |
| NFA-08 | Kompatibilität | Jeweils letzte 2 Versionen von Chrome, Edge, Firefox, Safari (macOS + iOS) und Samsung Internet | M | Manueller Test vor jedem Release | alle; Test WP-14 |
| NFA-09 | SEO | Pro Seite eigener `<title>` (≤ 60 Zeichen) und Description (≤ 155 Zeichen), Canonical-URL, `lang="de"` | M | Lighthouse SEO ≥ 95 | WP-09 |
| NFA-10 | SEO | Strukturierte Daten (JSON-LD `ProfessionalService` mit Region) | S | Google Rich Results Test ohne Fehler | WP-09 |
| NFA-11 | SEO | `sitemap.xml` und `robots.txt`; `noindex`-Seiten nicht in der Sitemap | M | Beide Dateien sind erreichbar und korrekt | WP-09 |
| NFA-12 | SEO | Open-Graph- und Twitter-Meta-Tags, OG-Bild 1200 × 630 px | S | Link-Vorschau in WhatsApp und LinkedIn ist korrekt | WP-09 |
| NFA-13 | Datenschutz | Keine Cookies oder Speicherzugriffe, die eine Einwilligung erfordern, also **kein Cookie-Banner** | M | Browser-DevTools → Application: keine Cookies, kein Local Storage | alle; Statistik WP-13 |
| NFA-14 | Datenschutz | Keine Requests an Drittanbieter beim Seitenaufruf: Schriften, Icons und Skripte liegen lokal. Einzige Ausnahme: die gewählte cookielose Statistik (WP-13), in der Datenschutzerklärung genannt | M | Network-Tab: nur eigene Domain (+ Statistik) | WP-03, alle |
| NFA-15 | Sicherheit | HTTPS erzwungen; Header: HSTS, CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors` | M | securityheaders.com: mindestens Note A | WP-02 |
| NFA-16 | Code-Qualität | TypeScript `strict`; ESLint, Prettier und `astro check` ohne Fehler | M | CI grün | WP-01, WP-02 |
| NFA-17 | Prozess | Jeder PR läuft durch die CI und bekommt eine Deploy-Preview | M | Kein Merge ohne grüne CI | WP-02 |
| NFA-18 | Wartbarkeit | Texte und Projekte sind ohne Änderung an Komponenten-Logik pflegbar | M | Textänderung betrifft nur `src/i18n/`, neues Projekt nur `src/content/` | WP-01, WP-06 |
| NFA-19 | E-Mail | Domain mit SPF, DKIM und DMARC, damit Akquise-Mails nicht im Spam landen | M | mail-tester.com ≥ 9/10 | WP-02 |
| NFA-20 | Demos | Prototypen getrennt deployt, `noindex`, mit Link zurück zur Landingpage | S | Demo nicht bei Google gelistet; Rücklink vorhanden | jeweiliges Demo-Projekt |

## 9. Design-Anforderungen

**Leitbild: modern, warm, vertrauenswürdig.** Die Seite soll sich nach „die zwei verstehen meinen Betrieb“ anfühlen, nicht nach Konzern-IT oder Hacker-Look. Gastro-Nähe entsteht über warme Farben, echte Fotos und appetitliche Projekt-Screenshots.

| ID | Anforderung | Prio | Paket |
|---|---|---|---|
| D-01 | Design-Tokens (Farben, Schriften, Schriftgrößen, Abstände, Radien, Schatten) zentral im Tailwind-Theme in `src/styles/global.css`; keine Hex-Werte oder Magic Numbers in Komponenten | M | WP-03 |
| D-02 | Farbpalette: 1 Primärfarbe, 1 Akzentfarbe, Neutraltöne (warmes Off-White als Hintergrund, fast schwarzer Text); alle Text-Kombinationen mit Kontrast ≥ 4,5 : 1 | M | WP-03 |
| D-03 | Höchstens 2 Schriftfamilien (gut lesbare Sans für Text, optional eine charaktervolle Display-Schrift für Überschriften), selbst gehostet über Fontsource, `font-display: swap` | M | WP-03 |
| D-04 | Logo vorerst als Text-Wortmarke, später austauschbar | S | WP-03 |
| D-05 | Einheitliches Raster: Container max. ca. 1200 px, einheitliche Sektionsabstände, 8-px-Abstandsskala | M | WP-03 |
| D-06 | Bildsprache: echte Fotos von Tony & Julian, Projekt-Screenshots in Geräterahmen; keine generischen Stockfotos | S | WP-05, WP-06, WP-07 |
| D-07 | Icons aus einem einheitlichen Set (z. B. Lucide), als lokales SVG eingebunden | S | WP-03 |
| D-08 | Animationen dezent (≤ 300 ms, nur `opacity`/`transform`), Inhalte nie nur per Animation sichtbar | C | WP-03 |
| D-09 | Vor der Umsetzung ein Design-Entwurf der Startseite für Mobil und Desktop (Figma o. ä. oder Skizze), vom anderen abgenommen | S | WP-03 |

## 10. Technische Architektur

### Tech-Stack

| Bereich | Wahl | Begründung |
|---|---|---|
| Framework | Astro (aktuelle stabile Version) | Liefert statisches HTML mit kaum JavaScript, dadurch schnell und SEO-stark; Content Collections für Projekte; i18n eingebaut |
| Styling | Tailwind CSS | Design-Tokens an einer Stelle, schnelle Umsetzung, kein CSS-Wildwuchs |
| Sprache | TypeScript (`strict`) | Fehler früh finden; Props von Komponenten sind dokumentiert |
| Paketmanager | npm; Node 24 (LTS), festgehalten in `.nvmrc` | Standard, keine Extra-Installation |
| Code-Qualität | ESLint (mit `eslint-plugin-astro` und Barrierefreiheits-Regeln), Prettier (mit Astro- und Tailwind-Plugin) | Einheitlicher Stil, keine Format-Diskussionen im Review |
| Hosting | Netlify | Kostenloser Tarif, Auto-Deploy aus GitHub, Deploy-Preview pro PR, integrierte Formulare, AVV verfügbar |
| Formulare | Netlify Forms | Kein eigenes Backend nötig, Spamfilter, E-Mail-Benachrichtigung |
| CI | GitHub Actions | Prüft jeden PR vor dem Merge |
| Statistik (V1.1) | Plausible (EU) oder Umami, Entscheidung in WP-13 | Cookielos, DSGVO-freundlich |
| Terminbuchung (V1.1) | Cal.com oder Calendly als externer Link, Entscheidung in WP-13 | Kein Embed, also keine Drittanbieter-Requests beim Seitenaufruf |

### Umgebungen

| Umgebung | Branch | URL | Zweck |
|---|---|---|---|
| Produktion | `main` | `https://<domain>` | Live-Seite |
| Staging | `dev` | `https://dev--<netlify-name>.netlify.app` | Gesamtstand vor dem Release prüfen |
| Preview | jeder PR | `https://deploy-preview-<nr>--<netlify-name>.netlify.app` | Review eines einzelnen Pakets |

### Ordnerstruktur (Zielbild)

WP-01 legt diese Struktur als Gerüst mit Platzhaltern an. Welche Datei welchem Paket gehört, steht in der [Zuständigkeitsmatrix](docs/pakete/README.md#zuständigkeitsmatrix).

```text
.
├── .github/
│   ├── workflows/            CI (WP-02), Qualitätschecks (WP-14)
│   ├── ISSUE_TEMPLATE/       Vorlage für neue Arbeitspakete
│   ├── CODEOWNERS            Reviewer werden automatisch eingetragen
│   └── pull_request_template.md
├── docs/pakete/              eine Spec pro Arbeitspaket
├── public/                   Favicons, robots.txt, OG-Bild
├── src/
│   ├── assets/               Bilder (werden von Astro optimiert)
│   ├── components/
│   │   ├── layout/           Header, Footer, SEO, Analytics
│   │   ├── sections/         eine Datei pro Startseiten-Sektion
│   │   ├── ui/               Button, Container, Section, Card, Icon, Logo …
│   │   ├── projects/         Projektkarte, Bausteine der Detailseite
│   │   └── contact/          Kontaktformular
│   ├── config/site.ts        zentrale Daten: Name, Domain, E-Mail, Links
│   ├── content/projects/     ein Projekt = eine Markdown-Datei
│   ├── content.config.ts     Schema der Content Collections
│   ├── i18n/                 Texte, eine Datei pro Bereich
│   ├── layouts/              BaseLayout
│   ├── pages/                Routen (index, impressum, datenschutz, danke, 404, projekte/…)
│   └── styles/global.css     Tailwind + Design-Tokens
├── astro.config.mjs
├── netlify.toml
├── package.json
├── SPECS.md
└── CONTRIBUTING.md
```

### Texte & Mehrsprachigkeit

- Alle sichtbaren Texte liegen in `src/i18n/de/<bereich>.ts`. Ein Bereich gehört einem Paket, dadurch gibt es keine Merge-Konflikte in einer großen Textdatei.
- Komponenten holen ihre Texte über `useTranslations(locale)` aus `src/i18n/index.ts`.
- Für Englisch (V2) kommt `src/i18n/en/` mit identischer Struktur dazu. TypeScript erzwingt, dass alle Schlüssel übersetzt sind.

### Zentrale Daten

`src/config/site.ts` enthält Markenname, Domain, E-Mail, Telefon, Social-Links und die Terminbuchungs-URL. Diese Daten werden einmal gepflegt und überall genutzt; keine Komponente schreibt eine E-Mail-Adresse oder URL selbst hinein. Auch `astro.config.mjs` liest die Domain von dort, sie steht also nur an einer Stelle.

## 11. Rechtliches (Deutschland)

> ⚠️ **Keine Rechtsberatung.** Diese Liste dient der Orientierung. Rechtstexte bitte mit einem seriösen Generator erstellen und im Zweifel anwaltlich prüfen lassen.

| ID | Anforderung | Paket |
|---|---|---|
| R-01 | Impressum nach § 5 DDG: Namen beider Inhaber, ladungsfähige Anschrift (kein Postfach), E-Mail, schnelle Kontaktmöglichkeit, Rechtsform, ggf. USt-IdNr. | WP-10 (Daten aus WP-00) |
| R-02 | Impressum und Datenschutzerklärung von jeder Seite mit einem Klick erreichbar | WP-04 |
| R-03 | Datenschutzerklärung nach Art. 13 DSGVO: Verantwortliche, Hosting (Netlify, Übermittlung in die USA), Server-Logs, Kontaktformular und E-Mail, ab V1.1 Statistik und Terminbuchungs-Link, Betroffenenrechte, Beschwerderecht | WP-10, Ergänzung WP-13 |
| R-04 | Kein Cookie-Banner nötig, solange keine einwilligungspflichtigen Cookies oder Tracker genutzt werden (§ 25 TDDDG). Jede neue Einbindung vorher prüfen | alle |
| R-05 | Schriften, Icons und Skripte lokal; keine Google Fonts, Google Maps, YouTube o. ä. ohne Einwilligung | WP-03, alle |
| R-06 | Auftragsverarbeitungsverträge (AVV/DPA) mit Netlify und ggf. Statistik- und Terminbuchungsanbieter abschließen | WP-00, WP-13 |
| R-07 | Keine erfundenen Referenzen, Kundenlogos, Bewertungen oder Zahlen (UWG); Demos und Konzepte klar als solche kennzeichnen | WP-06, alle |
| R-08 | Nur eigene oder korrekt lizenzierte Bilder, Icons und Schriften; Quellen und Lizenzen dokumentieren | alle |
| R-09 | Rechtsform klären und Gewerbe anmelden, bevor Leistungen verkauft werden (beeinflusst Impressum und Rechnungen) | WP-00 |

## 12. Releases & Scope

| Release | Inhalt | Pakete | Issue |
|---|---|---|---|
| **V1.0 – MVP / Go-live** | One-Pager mit allen Sektionen außer FAQ, Kontaktformular, Rechtsseiten, 404, SEO-Grundlagen, CI und Deployment auf eigener Domain | WP-00 bis WP-10 | [#1](https://github.com/JulianRudrich/Landingpage/issues/1) |
| **V1.1 – Ausbau** | FAQ, Projektdetailseiten, Statistik, Terminbuchung, automatische Qualitätschecks | WP-11 bis WP-14 | [#2](https://github.com/JulianRudrich/Landingpage/issues/2) |
| **V2 – Wachstum** | Englische Version, Branchenseite `/gastronomie`, Kundenstimmen, Blog, Preispakete | noch nicht geplant | – |

**Out of Scope:** CMS (Inhalte liegen als Dateien im Repo), Login, Shop, Kundenportal, Dark Mode.

## 13. Arbeitspakete & Zuordnung der Anforderungen

Jede Anforderung ist mindestens einem Paket zugeordnet, damit nichts verloren geht. Details, Dateien und Akzeptanzkriterien stehen in den [Paket-Specs](docs/pakete/README.md).

| Paket | Owner | Deckt ab |
|---|---|---|
| [WP-00](docs/pakete/WP-00-entscheidungen-inhalte.md) Entscheidungen & Inhalte | beide | E-01 bis E-09, R-06, R-09 |
| [WP-01](docs/pakete/WP-01-projekt-setup.md) Projekt-Setup & Gerüst | Julian | FA-01, FA-20, NFA-16, NFA-18 |
| [WP-02](docs/pakete/WP-02-ci-deployment.md) CI & Deployment | Julian | NFA-15, NFA-16, NFA-17, NFA-19 |
| [WP-03](docs/pakete/WP-03-design-system.md) Design-System & BaseLayout | Tony | D-01 bis D-05, D-07 bis D-09, NFA-04, NFA-05, NFA-06, NFA-07, NFA-14, R-05 |
| [WP-04](docs/pakete/WP-04-header-footer.md) Header & Footer | Tony | FA-02, FA-03, FA-04, FA-16, R-02 |
| [WP-05](docs/pakete/WP-05-hero-leistungen.md) Hero & Leistungen | Tony | FA-05, FA-06, D-06 |
| [WP-06](docs/pakete/WP-06-projekte.md) Projekte | Julian | FA-07, FA-08, NFA-18, D-06, R-07 |
| [WP-07](docs/pakete/WP-07-ablauf-ueber-uns.md) Ablauf & Über uns | Tony | FA-09, FA-10, D-06 |
| [WP-08](docs/pakete/WP-08-kontakt.md) Kontakt-Sektion & Formular | Julian | FA-11, FA-12, FA-13, FA-14, FA-15 |
| [WP-09](docs/pakete/WP-09-seo-meta.md) SEO & Meta | Julian | NFA-09, NFA-10, NFA-11, NFA-12 |
| [WP-10](docs/pakete/WP-10-rechtliches-404.md) Impressum, Datenschutz & 404 | Tony | FA-17, FA-18, FA-19, R-01, R-03 |
| [WP-11](docs/pakete/WP-11-faq.md) FAQ | Julian | FA-21 |
| [WP-12](docs/pakete/WP-12-projektdetailseiten.md) Projektdetailseiten | Tony | FA-22 |
| [WP-13](docs/pakete/WP-13-analytics-terminbuchung.md) Analytics & Terminbuchung | Julian | FA-23, FA-24, NFA-13, R-03 (Ergänzung), R-06, E-10, E-11 |
| [WP-14](docs/pakete/WP-14-qualitaetssicherung.md) Qualitätssicherung | Tony | NFA-01, NFA-02, NFA-03, NFA-05 (Audit), NFA-08 (Test) |

**Querschnitt (gilt für jedes Paket):** NFA-01 bis NFA-08, NFA-13, NFA-14, R-04, R-07, R-08.
**Außerhalb dieses Repos:** NFA-20 (gilt für jedes Demo-Projekt).
**Später:** FA-25 bis FA-28 (V2). **Nicht geplant:** FA-29, FA-30.

## 14. Definition of Done

### Pro Paket (jeder Pull Request)

- [ ] Alle Akzeptanzkriterien der Paket-Spec sind erfüllt
- [ ] Nur Dateien geändert, die dem Paket gehören (oder Abweichung im Issue abgesprochen)
- [ ] `npm run check`, `npm run lint`, `npm run format:check` und `npm run build` sind lokal und in der CI grün
- [ ] Keine fest eingebauten sichtbaren Texte (FA-20), keine Farbwerte außerhalb der Tokens (D-01)
- [ ] In der Deploy-Preview mobil (360 px) und am Desktop geprüft
- [ ] Per Tastatur bedienbar, Fokus sichtbar
- [ ] Review vom anderen bestanden

### Pro Release

- [ ] Alle Pakete des Releases sind geschlossen
- [ ] Lighthouse mobil ≥ 95 in allen 4 Kategorien (Startseite, Impressum, Datenschutz)
- [ ] axe DevTools: 0 kritische oder schwere Verstöße
- [ ] Getestet auf einem echten iPhone (Safari), einem Android-Gerät (Chrome) und am Desktop in Chrome, Firefox und Safari oder Edge
- [ ] Eine Testanfrage über das Live-Formular kommt bei beiden an
- [ ] Network-Tab: keine Requests an Drittanbieter; Application-Tab: keine Cookies
- [ ] Alle Links funktionieren, keine Platzhalter („Lorem ipsum“, „TODO“) mehr sichtbar
- [ ] Impressum und Datenschutzerklärung sind final
- [ ] Domain mit HTTPS ist live, `www` leitet auf die Hauptdomain um (oder umgekehrt)
- [ ] Release-PR `dev` → `main` ist gemerged und getaggt (z. B. `v1.0.0`)

## 15. Offene Entscheidungen

| ID | Frage | Empfehlung | Entscheidet in |
|---|---|---|---|
| E-01 | Markenname / Wortmarke | kurz, merkbar, Domain frei; Arbeitstitel „Tony & Julian“ | WP-00 |
| E-02 | Domain | `.de`-Domain bei einem Anbieter mit einfacher DNS-Verwaltung | WP-00 |
| E-03 | E-Mail-Anbieter und Adressen | Postfächer auf der eigenen Domain, z. B. `hallo@`, `tony@`, `julian@` | WP-00 |
| E-04 | Ansprache „Sie“ oder „du“ | „Sie“, passend zu lokalen Betrieben | WP-00 |
| E-05 | Region bzw. Stadt für lokales SEO | eigene Heimatregion plus Umkreis | WP-00 |
| E-06 | Preise auf der Seite zeigen? | V1.0 ohne Preise; ab V2 „ab“-Preise für Standardpakete | WP-00 |
| E-07 | Rechtsform und Gewerbeanmeldung | z. B. GbR; vorher bei IHK oder Steuerberatung informieren | WP-00 |
| E-08 | Erstes Gastro-Demo: Mobile-, Desktop- oder Web-App (PWA)? | Web-App (PWA): eine Codebasis für Tablet, PC und Handy, kein App-Store | WP-00 |
| E-09 | Telefonnummer öffentlich zeigen? | Optional; erhöht Vertrauen bei lokalen Betrieben | WP-00 |
| E-10 | Statistik-Tool | Plausible (EU) oder Umami | WP-13 |
| E-11 | Terminbuchungs-Tool | Cal.com oder Calendly | WP-13 |

## 16. Änderungshistorie

| Version | Datum | Änderung |
|---|---|---|
| 0.1 | 06.10.2026 | Erster Entwurf: Anforderungen, Arbeitspakete, Workflow |
