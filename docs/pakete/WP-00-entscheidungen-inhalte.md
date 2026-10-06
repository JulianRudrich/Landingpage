# WP-00: Entscheidungen & Inhalte

| | |
|---|---|
| **Owner** | Tony ([@tonytonym21](https://github.com/tonytonym21)) + Julian ([@JulianRudrich](https://github.com/JulianRudrich)), gemeinsam |
| **Reviewer** | gegenseitig |
| **Release** | V1.0 |
| **Aufwand** | M (überwiegend ohne Code) |
| **Branch** | `julian/wp-00-entscheidungen` (nur zum Eintragen der Ergebnisse) |
| **Issue** | [#3](https://github.com/JulianRudrich/Landingpage/issues/3) |
| **Abhängig von** | – |
| **Liefert zu** | WP-02 (Domain, E-Mail), WP-06 (erstes Projekt), WP-07 (Fotos, Bios), WP-09 (Name, Region), WP-10 (Impressumsdaten), WP-11 (FAQ-Antworten) |
| **Anforderungen** | E-01 bis E-09, R-06, R-09 aus [SPECS.md](../../SPECS.md) |

## Ziel

Alle Entscheidungen treffen und Inhalte liefern, die die anderen Pakete brauchen. Das Paket läuft **parallel** zu allem anderen. Je früher es fertig ist, desto weniger Platzhalter bleiben übrig.

> ⚠️ **Das Repo ist öffentlich.** Tragt hier nur ein, was auch auf der Website stehen darf. Private Daten (z. B. Steuernummer, Privatadresse, wenn eine Geschäftsadresse genutzt wird) gehören nicht ins Repo.

## Entscheidungen

Details und Empfehlungen: [SPECS.md, Abschnitt 15](../../SPECS.md#15-offene-entscheidungen).

| ID | Frage | Ergebnis | Entschieden am |
|---|---|---|---|
| E-01 | Markenname / Wortmarke | _offen_ | |
| E-02 | Domain | _offen_ | |
| E-03 | E-Mail-Anbieter und Adressen | _offen_ | |
| E-04 | Ansprache „Sie“ oder „du“ | _offen_ (Empfehlung: „Sie“) | |
| E-05 | Region bzw. Stadt für lokales SEO | _offen_ | |
| E-06 | Preise auf der Seite zeigen? | _offen_ (Empfehlung: V1.0 ohne Preise) | |
| E-07 | Rechtsform und Gewerbeanmeldung | _offen_ | |
| E-08 | Erstes Gastro-Demo: Mobile-, Desktop- oder Web-App (PWA)? | _offen_ (Empfehlung: PWA) | |
| E-09 | Telefonnummer öffentlich zeigen? | _offen_ | |

## Inhalte liefern

| Inhalt | Format | Für Paket |
|---|---|---|
| Porträtfotos von Tony und Julian | Hochformat, mind. 1200 px breit, ruhiger Hintergrund, **gleicher Stil für beide** (gleiches Licht, gleicher Ausschnitt) | WP-07 |
| Rolle, Kurzbio (2–3 Sätze), Profil-Links (LinkedIn, GitHub) | Text | WP-07 |
| Markenname, Domain, E-Mail-Adressen, Region | Text → `src/config/site.ts` | WP-02, WP-09, alle |
| Impressumsdaten: Namen, ladungsfähige Anschrift, E-Mail, Telefon, Rechtsform, ggf. USt-IdNr. | Text, an Tony | WP-10 |
| Erstes Projekt für die Projekte-Sektion (mind. 1: z. B. diese Website selbst oder das erste Gastro-Demo) | Stichpunkte, an Julian | WP-06 |
| Antworten für die FAQ (Preise, Dauer, Betreuung, Eigentum am Code) | Stichpunkte, an Julian | WP-11 (V1.1) |

## Organisatorisches (ohne Code)

- [ ] Domain registrieren (E-02)
- [ ] E-Mail-Postfächer anlegen (E-03); die DNS-Einträge (SPF, DKIM, DMARC) übernimmt WP-02
- [ ] Rechtsform klären, Gewerbe anmelden (E-07, R-09)
- [ ] Auftragsverarbeitungsvertrag (AVV/DPA) mit Netlify abschließen bzw. akzeptieren (R-06)

## Wo die Ergebnisse landen

1. Tabelle **Entscheidungen** oben ausfüllen.
2. [SPECS.md, Abschnitt 15](../../SPECS.md#15-offene-entscheidungen) aktualisieren und die Spec auf Version 1.0 heben.
3. Sobald WP-01 gemerged ist: Werte in `src/config/site.ts` eintragen (Name, Domain, E-Mail, Telefon, Region, Social-Links).
4. Fotos und Bios an Tony (WP-07), Impressumsdaten an Tony (WP-10), Projektidee an Julian (WP-06) übergeben. Die Paket-Owner committen die Inhalte in ihren eigenen Dateien.

## Akzeptanzkriterien

- [ ] E-01 bis E-09 sind entschieden und oben eingetragen
- [ ] Domain ist registriert, E-Mail-Postfächer funktionieren
- [ ] Fotos und Bios sind an WP-07 übergeben
- [ ] Impressumsdaten sind an WP-10 übergeben
- [ ] Mindestens ein Projekt ist für WP-06 beschrieben
- [ ] `src/config/site.ts` enthält echte Werte statt Platzhalter
- [ ] SPECS.md Abschnitt 15 ist aktualisiert, Version 1.0
- [ ] Organisatorische Punkte oben sind abgehakt
