# WP-00: Entscheidungen & Inhalte

| | |
|---|---|
| **Owner** | Tony ([@tonytonym21](https://github.com/tonytonym21)) + Julian ([@JulianRudrich](https://github.com/JulianRudrich)), gemeinsam |
| **Reviewer** | gegenseitig |
| **Release** | V1.0, **Phase 0 (Festlegen)** |
| **Aufwand** | M (überwiegend ohne Code) |
| **Branch** | `julian/wp-00-entscheidungen` (nur zum Eintragen der Ergebnisse) |
| **Issue** | [#3](https://github.com/JulianRudrich/Landingpage/issues/3) |
| **Abhängig von** | – (die Werte in `site.ts` und den Textdateien setzen voraus, dass WP-01 gemerged ist) |
| **Liefert zu** | Freigabe der Spec v1.0; WP-02 (Domain, E-Mail), WP-06 (erstes Projekt), WP-07 (Fotos, Rollen, Bios), WP-09 (Name, Region), WP-10 (Impressumsdaten) |
| **Anforderungen** | E-01 bis E-09, E-12 bis E-14, R-06, R-09 aus [SPECS.md](../../SPECS.md) |

## Ziel

Alle Entscheidungen treffen und alle Inhalte bestätigen, **bevor** die Sektionen gebaut werden. Zusammen mit Tonys abgenommenem Design-Entwurf (WP-03, Teil A) ist dieses Paket die Voraussetzung dafür, dass die Spec als v1.0 festgeschrieben wird ([SPECS §16](../../SPECS.md#16-änderungsregeln)).

Für fast alles gibt es schon einen konkreten Vorschlag, und die Texte im Gerüst sind danach geschrieben. Ihr müsst nur bestätigen oder ändern. Selbst wählen müsst ihr nur: **Name (E-01), Domain (E-02), Region (E-05), Rollen und Bios (E-14)**.

> ⚠️ **Das Repo ist öffentlich.** Tragt hier nur ein, was auch auf der Website stehen darf. Private Daten (z. B. Steuernummer, Privatadresse, wenn eine Geschäftsadresse genutzt wird) gehören nicht ins Repo.

## Entscheidungen

Begründungen: [SPECS.md, Abschnitt 15](../../SPECS.md#15-offene-entscheidungen). In die Spalte „Ergebnis“ „wie Vorschlag“ oder eure Abweichung eintragen.

| ID | Frage | Vorschlag | Ergebnis | Entschieden am |
|---|---|---|---|---|
| E-01 | Markenname / Wortmarke | **eure Wahl** (Arbeitstitel „Tony & Julian“) | _offen_ | |
| E-02 | Domain | **eure Wahl**, `.de` | _offen_ | |
| E-03 | E-Mail-Adressen | `hallo@` öffentlich (Formular, leitet an beide weiter), dazu `tony@`, `julian@` | _offen_ | |
| E-04 | Ansprache | „Sie“ | _offen_ | |
| E-05 | Region für lokales SEO | **eure Heimatstadt** + ca. 50 km | _offen_ | |
| E-06 | Preise auf der Seite | V1.0 ohne Preise | _offen_ | |
| E-07 | Rechtsform | GbR (vorher beraten lassen) | _offen_ | |
| E-08 | Erstes Gastro-Demo | Web-App (PWA) | _offen_ | |
| E-09 | Telefonnummer öffentlich | ja, wenn geschäftliche Nummer vorhanden | _offen_ | |
| E-12 | Versprochene Antwortzeit | „innerhalb von 1–2 Werktagen“ | _offen_ | |
| E-13 | Angebotsform, Rechte am Ergebnis | Festpreis nach Erstgespräch; Kunde erhält nach Bezahlung die Rechte | _offen_ | |
| E-14 | Rollen und Kurzbios | **eure Angaben** | _offen_ | |

E-10 (Statistik-Tool) und E-11 (Terminbuchung) entscheidet WP-13 in V1.1.

## Textvorschläge bestätigen

Alle sichtbaren Texte der Website stehen schon im Gerüst. Lest sie einmal gemeinsam und ändert, was nicht passt. Die Datei gehört dem jeweiligen Paket-Owner, der eure Änderungen einträgt.

| Datei | Inhalt | Owner |
|---|---|---|
| `src/i18n/de/hero.ts` | Kernbotschaft, Einleitung, Buttons | Tony (WP-05) |
| `src/i18n/de/services.ts` | Leistungen L1–L4 mit je 3 Nutzenpunkten | Tony (WP-05) |
| `src/i18n/de/process.ts` | 4 Schritte des Ablaufs | Tony (WP-07) |
| `src/i18n/de/about.ts` | Einleitung, **Lücken für Rollen und Bios (E-14)** | Tony (WP-07) |
| `src/i18n/de/projects.ts` | Projekte-Sektion, Status-Beschriftungen | Julian (WP-06) |
| `src/i18n/de/contact.ts` | Kontakt, Formular, Fehlermeldungen, Danke-Seite | Julian (WP-08) |
| `src/i18n/de/faq.ts` | 8 Fragen und Antworten (V1.1) | Julian (WP-11) |
| `src/i18n/de/navigation.ts` | Menü und Footer | Tony (WP-04) |
| `src/i18n/de/seo.ts` | Seitentitel und Beschreibungen für Google | Julian (WP-09) |

## Inhalte liefern

| Inhalt | Format | Für Paket |
|---|---|---|
| Porträtfotos von Tony und Julian | Hochformat, mind. 1200 px breit, ruhiger Hintergrund, **gleicher Stil für beide** (gleiches Licht, gleicher Ausschnitt), Dateinamen `tony.jpg` und `julian.jpg` | WP-07 |
| Rolle und Kurzbio (2–3 Sätze) je Person (E-14), Profil-Links (LinkedIn, GitHub) | Text | WP-07 |
| Markenname, Domain, E-Mail-Adressen, Telefon, Region | Text → `src/config/site.ts` | alle |
| Impressumsdaten: Namen, ladungsfähige Anschrift, E-Mail, Telefon, Rechtsform, ggf. USt-IdNr. | Text, an Tony | WP-10 |
| Erstes Gastro-Demo (E-08): Name und Kurzbeschreibung, sobald es existiert | Stichpunkte, an Julian | WP-06 |

## Organisatorisches (ohne Code)

- [ ] Domain registrieren (E-02)
- [ ] E-Mail-Postfächer anlegen (E-03); die DNS-Einträge (SPF, DKIM, DMARC) übernimmt WP-02
- [ ] Rechtsform klären, Gewerbe anmelden (E-07, R-09)
- [ ] Auftragsverarbeitungsvertrag (AVV/DPA) mit Netlify abschließen bzw. akzeptieren (R-06)

## Wo die Ergebnisse landen

1. Tabelle **Entscheidungen** oben ausfüllen.
2. [SPECS.md, Abschnitt 15](../../SPECS.md#15-offene-entscheidungen) aktualisieren.
3. Werte in `src/config/site.ts` eintragen: Name, **Domain (`url`)**, E-Mail, Telefon, Region, Social-Links. Die Domain wird **nur hier** eingetragen; WP-02 prüft sie nur.
4. Fotos, Rollen und Bios an Tony (WP-07), Impressumsdaten an Tony (WP-10) übergeben. Die Owner tragen sie in ihre Dateien ein.
5. Wenn zusätzlich Tonys Design abgenommen ist: SPECS.md auf **Version 1.0** setzen (Status „festgeschrieben“). Ab dann gelten die Änderungsregeln.

## Akzeptanzkriterien

- [ ] E-01 bis E-09 und E-12 bis E-14 sind entschieden und oben eingetragen
- [ ] Alle Textdateien aus „Textvorschläge bestätigen“ sind gemeinsam gelesen, Änderungen eingetragen
- [ ] Domain ist registriert, E-Mail-Postfächer funktionieren
- [ ] Fotos, Rollen und Bios sind an WP-07 übergeben
- [ ] Impressumsdaten sind an WP-10 übergeben
- [ ] `src/config/site.ts` enthält echte Werte statt Platzhalter
- [ ] SPECS.md Abschnitt 15 ist aktualisiert; mit abgenommenem Design: Version 1.0
- [ ] Organisatorische Punkte oben sind abgehakt
