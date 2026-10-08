# WP-10: Impressum, Datenschutz & 404

| | |
|---|---|
| **Owner** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Reviewer** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Release** | V1.0, Phase 1 (nach Freigabe der Spec v1.0) |
| **Aufwand** | M (ca. 4–12 h) |
| **Branch** | `tony/wp-10-rechtliches-404` |
| **Issue** | [#13](https://github.com/JulianRudrich/Landingpage/issues/13) |
| **Abhängig von** | Freigabe der Spec v1.0 (WP-00 + Design aus WP-03 Teil A); WP-03; Impressumsdaten und Rechtsform aus WP-00; Angaben zum Formular aus WP-08 |
| **Blockiert** | – (aber Pflicht für den Go-live) |
| **Anforderungen** | FA-17, FA-18, FA-19, R-01, R-03 aus [SPECS.md](../../SPECS.md) |

> ⚠️ **Keine Rechtsberatung.** Die Rechtstexte am besten mit einem seriösen Generator für deutsche Websites erstellen und im Zweifel anwaltlich prüfen lassen. Die Punkte unten sind eine Checkliste, kein Mustertext.

## Ziel

Die Seite darf rechtssicher online gehen: Impressum und Datenschutzerklärung passen zu dem, was die Seite **tatsächlich** nutzt. Dazu kommt eine freundliche 404-Seite, die niemanden im Nichts stehen lässt.

## Umfang

**Gehört dazu**

1. **Rechtstexte** in `src/legal/impressum.md` und `src/legal/datenschutz.md` ausfüllen. Die Gliederung und die Einbindung in die Seiten (`<Prose><Content /></Prose>`) stehen schon. Die Gestaltung liefert `Prose` aus WP-03; hier nichts selbst stylen. Die Seiten setzen die H1, die Markdown-Dateien beginnen mit H2.
2. **Impressum (R-01):** Namen beider Inhaber, ladungsfähige Anschrift (kein Postfach), E-Mail, schnelle Kontaktmöglichkeit (z. B. Telefon), Rechtsform (z. B. GbR), ggf. USt-IdNr.
3. **Datenschutzerklärung (R-03)**, mindestens:
   - Verantwortliche (beide, mit Kontakt)
   - Hosting bei Netlify inklusive Server-Logfiles und Übermittlung in die USA
   - Kontaktformular (Netlify Forms) und Kontakt per E-Mail: welche Daten, Zweck, Rechtsgrundlage (Angaben von WP-08), Speicherdauer laut E-15
   - Hinweis, dass Schriften und Icons lokal geladen werden und keine Cookies gesetzt werden
   - Rechte der Betroffenen, Beschwerderecht bei der Aufsichtsbehörde
   - Stand-Datum
   - Abschnitte 8 (Besucherstatistik) und 9 (Terminbuchung) haben für V1.0 schon einen festen Text („derzeit nicht im Einsatz“). Er bleibt stehen und ist kein Platzhalter; ab V1.1 ersetzt WP-13 ihn (Tony reviewt).
4. **404-Seite** `src/pages/404.astro` (existiert): Texte `t.legal.notFound`, Links zur Startseite und zum Kontakt, `noindex`; gestalten nach Tonys Entwurf.
5. Kurze Texte (Seitenüberschriften, 404) stehen in `src/i18n/de/legal.ts`.

Rechtstexte dürfen Namen, Anschrift und Kontakt im Wortlaut enthalten (Ausnahme von „Daten nur aus `site.ts`“, [SPECS §10](../../SPECS.md#feste-konventionen)). Die Hinweise für euch stehen als Kommentar im Kopf der Markdown-Dateien und erscheinen nicht auf der Website.

**Gehört nicht dazu**

- Links im Footer (WP-04)
- Statistik- und Terminbuchungsabschnitt (WP-13, ab V1.1)

## Dateien

> Alle Dateien existieren schon im Gerüst (WP-01) als Grundversion mit fester Schnittstelle; die Texte stehen schon in den Textdateien. Neue gemeinsame Dateien oder Schnittstellen nur per Spec-Änderung ([SPECS §16](../../SPECS.md#16-änderungsregeln)).

**Besitzt dieses Paket:** `src/pages/impressum.astro`, `src/pages/datenschutz.astro`, `src/pages/404.astro`, `src/legal/impressum.md`, `src/legal/datenschutz.md`, `src/i18n/de/legal.ts`

**Liest/benutzt:** `src/layouts/BaseLayout.astro`, `src/components/ui/*` (u. a. `Prose`, `Container`), `src/config/site.ts`

**Wird nach Absprache ergänzt von:** WP-13 (`src/legal/datenschutz.md`)

## Akzeptanzkriterien

- [ ] Das Impressum enthält alle Angaben aus R-01 (Daten aus WP-00)
- [ ] Die Datenschutzerklärung deckt Hosting, Server-Logs, Kontaktformular und E-Mail ab und hat ein Stand-Datum
- [ ] Im PR steht, mit welchem Generator bzw. wie die Texte geprüft wurden
- [ ] Die Texte sind mobil gut lesbar formatiert
- [ ] Eine nicht existierende URL (z. B. `/gibt-es-nicht`) zeigt in der Deploy-Preview die 404-Seite, mit Links zu Start und Kontakt
- [ ] Die 404-Seite hat `noindex`
- [ ] Vor dem Release sind keine Platzhalter in eckigen Klammern mehr enthalten (die festen V1.0-Texte in den Abschnitten 8 und 9 sind keine Platzhalter)
