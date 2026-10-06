# WP-14: Qualitätssicherung (Lighthouse CI, Barrierefreiheit, Link-Check)

| | |
|---|---|
| **Owner** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Reviewer** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Release** | V1.1 |
| **Aufwand** | M (ca. 4–12 h) |
| **Branch** | `tony/wp-14-qualitaetssicherung` |
| **Issue** | [#17](https://github.com/JulianRudrich/Landingpage/issues/17) |
| **Abhängig von** | WP-02 (CI); Start nach dem Go-live von V1.0 |
| **Blockiert** | – |
| **Anforderungen** | NFA-01, NFA-02, NFA-03, NFA-05 (Audit), NFA-08 (Test) aus [SPECS.md](../../SPECS.md) |

## Ziel

Die Qualitätsziele aus der Spec **automatisch absichern**: Jeder PR wird auf Performance, Barrierefreiheit und tote Links geprüft, bevor er gemerged wird. Für V1.0 machen wir diese Checks noch von Hand (Release-Checkliste in [SPECS §14](../../SPECS.md#14-definition-of-done)), ab V1.1 übernimmt die CI.

## Umfang

**Gehört dazu**

1. **Workflow** `.github/workflows/quality.yml`, Auslöser `pull_request` auf `dev` und `main`
   - Seite bauen und lokal ausliefern (z. B. `npm run build` + `npm run preview`)
   - **Lighthouse CI** (`@lhci/cli`) mit `lighthouserc.json`
     - URLs: `/`, `/impressum`, `/datenschutz` und eine Projektdetailseite
     - Schwellen: Accessibility, Best Practices, SEO ≥ 0,95 als **Fehler**; Performance ≥ 0,95 als **Warnung**, weil CI-Runner schwanken
     - Berichte als Artefakt hochladen oder per Link im PR
   - **axe** (z. B. `@axe-core/cli` oder Playwright + `@axe-core/playwright`) auf denselben URLs; bricht bei Verstößen der Stufe `serious` oder `critical` ab
   - **Link-Check** (z. B. lychee) über das gebaute HTML; externe Links mit Wiederholungsversuchen, damit kurzzeitige Ausfälle nicht stören
2. **Manuelle Audit-Checkliste** `docs/qa/audit-checkliste.md`
   - Kompletter Tastatur-Durchlauf (Tab-Reihenfolge, Fokus sichtbar, keine Falle)
   - Screenreader: VoiceOver (iOS/macOS) oder NVDA (Windows), TalkBack (Android)
   - Zoom auf 200 %, Schriftgröße am Handy auf groß
   - Echte Geräte und Browser laut NFA-08
   - Ein Protokoll pro Release, z. B. `docs/qa/audit-v1.1.md`
3. Julian (Admin) nimmt den neuen Job als **Pflicht-Check** in den Branch-Schutz auf.

**Gehört nicht dazu**

- Fehler beheben, die die Checks finden. Die gehen als Issue an den Owner der betroffenen Datei, laut [Zuständigkeitsmatrix](README.md#zuständigkeitsmatrix).

## Dateien

**Besitzt dieses Paket:** `.github/workflows/quality.yml`, `lighthouserc.json`, `docs/qa/*`

**Liest/benutzt:** `package.json`-Skripte, `.github/workflows/ci.yml` (als Vorlage, nicht ändern)

## Akzeptanzkriterien

- [ ] Der Quality-Workflow läuft bei jedem PR; die Lighthouse-Berichte sind im PR erreichbar
- [ ] Die Lighthouse-Schwellen laut NFA-01 sind hinterlegt (Accessibility, Best Practices, SEO hart; Performance mit Toleranz)
- [ ] Der axe-Check bricht bei schweren oder kritischen Verstößen ab (im PR mit einem absichtlich fehlenden Alt-Text demonstriert)
- [ ] Der Link-Check findet keine toten Links
- [ ] Die Audit-Checkliste ist angelegt und für den aktuellen Stand einmal durchgeführt (Protokoll im Repo)
- [ ] Der Workflow läuft in unter 10 Minuten
- [ ] Der Job ist Pflicht-Check im Branch-Schutz
