# WP-02: CI & Deployment

| | |
|---|---|
| **Owner** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Reviewer** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Release** | V1.0, Phase 0 (Festlegen; keine Design-Abhängigkeit) |
| **Aufwand** | M (ca. 4–12 h) |
| **Branch** | `julian/wp-02-ci-deployment` |
| **Issue** | [#5](https://github.com/JulianRudrich/Landingpage/issues/5) |
| **Abhängig von** | WP-01; Domain und E-Mail-Anbieter aus WP-00 (nur für Teil B) |
| **Blockiert** | WP-08 (Formular-Test auf Netlify), WP-13, WP-14 |
| **Anforderungen** | NFA-15, NFA-16, NFA-17, NFA-19 aus [SPECS.md](../../SPECS.md) |

## Ziel

Jeder Pull Request wird automatisch geprüft und bekommt eine Vorschau-URL. `dev` läuft als Staging, `main` als Produktion auf der eigenen Domain, abgesichert mit HTTPS und Security-Headern.

Das Paket darf in **zwei PRs** geliefert werden:
- **Teil A** (sofort nach WP-01): CI + Netlify + Header. Im PR `Refs #5` schreiben.
- **Teil B** (sobald WP-00 die Domain liefert): Domain, HTTPS, E-Mail-DNS. Im PR `Closes #5` schreiben.

## Umfang

### Teil A – CI & Netlify

1. **`.github/workflows/ci.yml`**
   - Auslöser: `pull_request` und `push` auf `dev` und `main`
   - Ein Job mit dem Namen **`build`** (wird später Pflicht-Check im Branch-Schutz)
   - Schritte: Checkout → Node aus `.nvmrc` mit npm-Cache → `npm ci` → `npm run check` → `npm run lint` → `npm run format:check` → `npm run build`
2. **Netlify-Site** mit dem GitHub-Repo verbinden
   - Build-Befehl `npm run build`, Ausgabeordner `dist`
   - Production-Branch: `main`; Branch-Deploys: `dev`; Deploy-Previews für alle PRs
   - Die Netlify-Werkzeugleiste in Deploy-Previews („Netlify Drawer“) ausschalten: Netlify fügt sie als fremdes Skript ein, die CSP blockiert es und die Konsole zeigt sonst einen CSP-Fehler
3. **`netlify.toml`**
   - `[build]` mit Befehl und Ausgabeordner
   - Security-Header für `/*` (Vorschlag unten)
   - Cache-Header für `/_astro/*`: `public, max-age=31536000, immutable`
4. **Branch-Schutz** einrichten, wie in [CONTRIBUTING.md](../../CONTRIBUTING.md#einmalige-einrichtung) beschrieben (Julian ist Admin). Den Pflicht-Check `build` erst hinzufügen, nachdem die CI einmal gelaufen ist.
5. **Nichts extra für die Statistik:** Netlify setzt beim Build die Variable `CONTEXT` (`production`, `deploy-preview`, `branch-deploy`). WP-13 nutzt sie, damit die Statistik nur auf der Live-Seite zählt.

**Vorschlag Security-Header** (in der Deploy-Preview prüfen, dass die Browser-Konsole keine CSP-Fehler zeigt):

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    Content-Security-Policy = "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'"
```

`script-src 'self'` funktioniert, weil das Gerüst (WP-01) in `astro.config.mjs` dafür sorgt, dass Astro Skripte immer als Datei unter `/_astro/` ausliefert und nie inline ins HTML schreibt. Voraussetzung ist die Konvention „`<script>` ohne Attribute, kein `is:inline`, kein `define:vars`, keine `onclick`-Handler“ ([SPECS §10](../../SPECS.md#feste-konventionen)); `npm run lint` prüft sie. **Nicht** `'unsafe-inline'` für Skripte erlauben und **keine** Skript-Hashes pflegen. Astros eigene CSP-Unterstützung hilft hier nicht: Sie setzt nur ein zusätzliches `<meta>`-Tag, der Header gilt trotzdem. Die Statistik-Domain ergänzt später WP-13.

### Teil B – Domain & E-Mail

6. Domain in Netlify verbinden (Netlify-DNS oder A/CNAME beim Registrar), HTTPS über Let's Encrypt aktivieren, `www.<domain>` per 301 auf `<domain>` umleiten (E-02: Hauptadresse ohne `www`).
7. E-Mail-DNS laut Anbieter aus WP-00: **SPF**, **DKIM**, **DMARC**. DMARC zunächst mit `p=none` und Berichtsadresse, nach 2–4 Wochen ohne Probleme auf `p=quarantine`.
8. Prüfen, dass `url` in `src/config/site.ts` die echte Domain enthält. **Eingetragen wird sie nur von WP-00**; WP-02 ändert `site.ts` nicht (sonst Merge-Konflikt mit WP-00, die Zeilen liegen direkt nebeneinander). `astro.config.mjs` übernimmt den Wert automatisch als `site`.
9. Im README einen kurzen Abschnitt „Deployment“ ergänzen (welcher Branch wohin deployt).

**Gehört nicht dazu**

- Lighthouse, axe und Link-Check in der CI (WP-14)
- Einstellungen für Netlify Forms (WP-08)
- Statistik (WP-13)

## Dateien

**Besitzt dieses Paket:** `.github/workflows/ci.yml`, `netlify.toml`

**Ändert nach Absprache:** `README.md` (Abschnitt „Deployment“)

**Liest/benutzt:** `src/config/site.ts` (`url`), `.nvmrc`, `package.json`-Skripte

## Schnittstellen

- CI-Job-Name `build` ist der Pflicht-Check im Branch-Schutz und steht fest; Änderung nur per Spec-Änderung ([SPECS §16](../../SPECS.md#16-änderungsregeln)).
- URLs der Umgebungen: siehe [SPECS §10](../../SPECS.md#umgebungen).

## Akzeptanzkriterien

**Teil A**
- [ ] Jeder PR nach `dev`/`main` startet die CI; ein absichtlich eingebauter Lint-Fehler macht sie rot (im PR kurz demonstrieren)
- [ ] Jeder PR bekommt eine Netlify-Deploy-Preview, der Link erscheint im PR
- [ ] `dev` ist als Staging erreichbar
- [ ] Security-Header sind gesetzt, securityheaders.com zeigt mindestens Note A, keine CSP-Fehler in der Konsole
- [ ] Branch-Schutz für `main` und `dev` ist aktiv, inklusive Pflicht-Check `build`

**Teil B**
- [ ] Domain ist in Netlify verbunden, HTTPS aktiv, `www.<domain>` leitet auf `<domain>` um (die Seite selbst ist erst nach dem Release-PR `dev` → `main` live; das prüft die Release-Checkliste in [SPECS §14](../../SPECS.md#14-definition-of-done))
- [ ] SPF, DKIM und DMARC sind gesetzt; mail-tester.com zeigt ≥ 9/10
- [ ] `url` in `src/config/site.ts` zeigt auf die echte Domain (Sitemap und Canonical-URLs nutzen sie)
