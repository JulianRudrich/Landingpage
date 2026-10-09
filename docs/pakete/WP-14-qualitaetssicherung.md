# WP-14: Qualitätssicherung (Lighthouse CI, Barrierefreiheit, Link-Check)

| | |
|---|---|
| **Owner** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Reviewer** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Release** | V1.1 |
| **Aufwand** | M (ca. 4–12 h) |
| **Branch** | `tony/wp-14-qualitaetssicherung` |
| **Issue** | [#17](https://github.com/JulianRudrich/Landingpage/issues/17) |
| **Abhängig von** | WP-02 (CI), WP-12 (die geprüfte Detailseite muss existieren); Start nach dem Go-live von V1.0 |
| **Blockiert** | – |
| **Anforderungen** | NFA-01, NFA-02, NFA-03, NFA-05 (Audit), NFA-08 (Test) aus [SPECS.md](../../SPECS.md) |

## Ziel

Die Qualitätsziele aus der Spec **automatisch absichern**: Jeder PR wird auf Performance, Barrierefreiheit und tote Links geprüft, bevor er gemerged wird. Für V1.0 machen wir diese Checks noch von Hand (Release-Checkliste in [SPECS §14](../../SPECS.md#14-definition-of-done)), ab V1.1 übernimmt die CI.

## Umfang

**Gehört dazu** (alles festgelegt, keine Werkzeugwahl mehr nötig)

1. **Workflow** `.github/workflows/quality.yml`, Auslöser `pull_request` auf `dev` und `main`, **ein Job mit dem Namen `quality`** (Pflicht-Check im Branch-Schutz, wie `build` aus WP-02)
   - Schritte: Checkout → Node aus `.nvmrc` mit npm-Cache → `npm ci` → `npm run build` → die drei Prüfungen unten → Berichte als Artefakt hochladen (`actions/upload-artifact`: `.lighthouseci/`, `playwright-report/`)
2. **Lighthouse CI** mit `npx @lhci/cli autorun` und `lighthouserc.json`:
   - `ci.collect.staticDistDir: "./dist"`, `numberOfRuns: 3`
   - URLs (der Host wird durch den Testserver ersetzt): `http://localhost/`, `http://localhost/impressum/`, `http://localhost/datenschutz/`, `http://localhost/projekte/diese-website/`
   - `ci.assert.assertions`: `categories:accessibility`, `categories:best-practices`, `categories:seo` je `["error", {"minScore": 0.95}]`; `categories:performance` `["warn", {"minScore": 0.95}]` (CI-Runner schwanken)
   - `ci.upload.target: "temporary-public-storage"` (Link zum Bericht erscheint im Job-Log)
3. **Barrierefreiheit** mit Playwright und `@axe-core/playwright`:
   - `playwright.config.ts`: nur Chromium, `webServer` = `npm run preview -- --port 4321`, `baseURL` = `http://localhost:4321`
   - `tests/a11y.spec.ts`: für jede der vier URLs `new AxeBuilder({ page }).analyze()`, Verstöße mit `impact` `serious` oder `critical` lassen den Test fehlschlagen; die Liste der Verstöße steht in der Fehlermeldung
   - im Workflow vorher `npx playwright install --with-deps chromium`, dann `npx playwright test`
4. **Link-Check** mit `lycheeverse/lychee-action`:
   - Vorher die eigene Domain aus dem Build lesen: `echo "SITE_HOST=$(sed -n 's|^Sitemap: https\?://\([^/]*\)/.*|\1|p' dist/robots.txt)" >> "$GITHUB_ENV"`
   - `args`: `--root-dir ${{ github.workspace }}/dist --exclude '^https?://(www\.)?${{ env.SITE_HOST }}/' --max-retries 3 --retry-wait-time 5 --accept 200..=299,429,999 --no-progress './dist/**/*.html'` (LinkedIn antwortet Bots mit 999)
   - Warum der Ausschluss: Canonical, `og:url`, `og:image` und JSON-LD zeigen absolut auf die Live-Seite, neue Seiten gibt es dort aber erst nach dem nächsten Release. Interne Links sind wurzelrelativ ([SPECS §10](../../SPECS.md#feste-konventionen)) und werden über `--root-dir` gegen `dist/` geprüft.
5. **Manuelle Audit-Checkliste** `docs/qa/audit-checkliste.md`
   - Kompletter Tastatur-Durchlauf (Tab-Reihenfolge, Fokus sichtbar, keine Falle)
   - Screenreader: VoiceOver (iOS/macOS) oder NVDA (Windows), TalkBack (Android)
   - Zoom auf 200 %, Schriftgröße am Handy auf groß
   - Echte Geräte und Browser laut NFA-08
   - Ein Protokoll pro Release: `docs/qa/audit-v1.1.md`
6. Julian (Admin) nimmt den Job `quality` als **Pflicht-Check** in den Branch-Schutz auf.

**Gehört nicht dazu**

- Fehler beheben, die die Checks finden. Die gehen als Issue an den Owner der betroffenen Datei, laut [Zuständigkeitsmatrix](README.md#zuständigkeitsmatrix).

## Dateien

> Diese Dateien haben keine Schnittstelle und werden von WP-14 selbst angelegt. Ihre Ausgaben (`.lighthouseci/`, `playwright-report/`, `test-results/`) sind in `.gitignore` und ESLint schon ignoriert. Die Dev-Abhängigkeiten `@lhci/cli`, `@playwright/test` und `@axe-core/playwright` kommen über die Ausnahme für gemeinsame Dateien in `package.json`/`package-lock.json` dazu (im Issue ankündigen). Neue npm-Skripte sind nicht nötig, der Workflow ruft die Tools direkt auf.

**Besitzt dieses Paket:** `.github/workflows/quality.yml`, im Hauptordner `lighthouserc.json` und `playwright.config.ts`, `tests/a11y.spec.ts`, `docs/qa/*`

**Liest/benutzt:** `package.json`-Skripte, `.github/workflows/ci.yml` (als Vorlage, nicht ändern)

## Akzeptanzkriterien

- [ ] Der Quality-Workflow läuft bei jedem PR; die Lighthouse-Berichte sind im PR erreichbar
- [ ] Die Lighthouse-Schwellen laut NFA-01 sind hinterlegt (Accessibility, Best Practices, SEO hart; Performance mit Toleranz)
- [ ] Der axe-Check bricht bei schweren oder kritischen Verstößen ab (lokal mit einem absichtlich fehlenden Alt-Text gezeigt, Ausgabe im PR; die Änderung wird nicht committet)
- [ ] Der Link-Check findet keine toten Links
- [ ] Die Audit-Checkliste ist angelegt und für den aktuellen Stand einmal durchgeführt (Protokoll im Repo)
- [ ] Der Workflow läuft in unter 10 Minuten
- [ ] Der Job `quality` ist Pflicht-Check im Branch-Schutz
