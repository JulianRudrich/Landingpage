# WP-08: Kontakt-Sektion & Formular

| | |
|---|---|
| **Owner** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Reviewer** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Release** | V1.0, Phase 1 (nach Freigabe der Spec v1.0) |
| **Aufwand** | L (ca. 12–24 h) |
| **Branch** | `julian/wp-08-kontakt` |
| **Issue** | [#11](https://github.com/JulianRudrich/Landingpage/issues/11) |
| **Abhängig von** | Freigabe der Spec v1.0 (WP-00 + Design aus WP-03 Teil A); WP-03; WP-02 (Netlify-Site, um die Zustellung zu testen) |
| **Blockiert** | – |
| **Anforderungen** | FA-11, FA-12, FA-13, FA-14, FA-15 aus [SPECS.md](../../SPECS.md) |

## Ziel

Die wichtigste Sektion für unser Geschäft: Aus einem Besucher wird eine Anfrage. Kontakt aufnehmen soll **einfach, vertrauenswürdig und zuverlässig** sein. Jede Anfrage kommt bei uns beiden an.

## Umfang

**Gehört dazu**

1. **Sektion** `Contact.astro` (`#kontakt`)
   - `SectionHeading` mit `t.contact.eyebrow`, `title`, `lead`
   - Zwei Spalten (mobil untereinander): Formular und direkte Kontaktwege
   - Direkter Draht (`t.contact.direct`): E-Mail (`mailto:`, Icon `mail`), Telefon (`tel:`, Icon `phone`, nur wenn `site.phone` gesetzt), `Button` „Termin für ein Erstgespräch buchen“ mit `external` und Icon `calendar-check` (nur wenn `site.bookingUrl` gesetzt, kommt mit WP-13)
2. **Formular** `ContactForm.astro` über **Netlify Forms**
   - `<form name="kontakt" method="POST" action="/danke/" data-netlify="true" netlify-honeypot="website">` plus `<input type="hidden" name="form-name" value="kontakt">`
   - Felder (Beschriftungen, Optionen und Fehlermeldungen aus `t.contact.form`):

     | Feld | Typ | Pflicht | `autocomplete` |
     |---|---|---|---|
     | Name | `text` | ja | `name` |
     | E-Mail | `email` | ja | `email` |
     | Unternehmen | `text` | nein | `organization` |
     | Worum geht es? | `select`: Website, App, KI & Automatisierung, Individuelle Software, Noch unklar | nein | – |
     | Nachricht | `textarea` | ja | – |

   - Hinweis `t.contact.form.requiredHint`, Pflichtfelder mit *
   - Honeypot-Feld `website`, visuell versteckt, Label `t.contact.form.honeypot`, `tabindex="-1"`, `autocomplete="off"`
   - Datenschutzhinweis über dem Button aus `t.contact.form.privacy` (`before` + Link auf `/datenschutz/` + `after`)
   - `Button` mit `type="submit"`: `t.contact.form.submit`
3. **Validierung**
   - HTML-Attribute (`required`, `type="email"`, `minlength` für die Nachricht) als Basis. Ohne JavaScript funktioniert das Formular mit nativer Browser-Validierung.
   - Kleines normales `<script>` (kein `is:inline`, kein `define:vars`; Fehlertexte über `data-*`-Attribute an das Skript übergeben) für die Meldungen aus `t.contact.form` direkt am Feld (`aria-invalid`, `aria-describedby`); beim Absenden springt der Fokus auf das erste fehlerhafte Feld und `t.contact.form.errorSummary` wird angekündigt
   - Kein `fetch` nötig: Das normale POST geht an Netlify, das danach auf `/danke/` weiterleitet
4. **Danke-Seite** `src/pages/danke.astro` (`noindex`, existiert): Texte `t.contact.thanks`, Icon `circle-check`, gestaltet nach Tonys Entwurf.
5. **Netlify-Einstellungen**: Formular-Benachrichtigung per E-Mail an `hallo@` (leitet an beide weiter, E-03), Spamfilter aktiv. Eingegangene Anfragen in Netlify löschen, sobald sie im Postfach sind, spätestens nach 30 Tagen (E-15).
6. **WP-10 informieren:** Im Issue [#13](https://github.com/JulianRudrich/Landingpage/issues/13) kommentieren, welche Daten das Formular erhebt, wo sie gespeichert werden und wie lange (Speicherdauer laut E-15), für die Datenschutzerklärung.

**Gehört nicht dazu**

- Terminbuchung einrichten (WP-13); hier nur der Button mit Bedingung
- Captcha-Dienste (nicht erlaubt, FA-12)

## Dateien

> Alle Dateien existieren schon im Gerüst (WP-01) als Grundversion mit fester Schnittstelle; die Texte stehen schon in den Textdateien. Neue gemeinsame Dateien oder Schnittstellen nur per Spec-Änderung ([SPECS §16](../../SPECS.md#16-änderungsregeln)).

**Besitzt dieses Paket:** `src/components/sections/Contact.astro`, `src/components/contact/ContactForm.astro`, `src/pages/danke.astro`, `src/i18n/de/contact.ts`

**Liest/benutzt:** `src/components/ui/*`, `src/layouts/BaseLayout.astro`, `src/config/site.ts`

## Akzeptanzkriterien

- [ ] Die Felder entsprechen FA-11; Labels sind sichtbar (kein Platzhalter als Label); `autocomplete` ist gesetzt
- [ ] Bei leerem oder ungültigem Absenden erscheint die Fehlermeldung am Feld, der Fokus springt aufs erste fehlerhafte Feld, Screenreader kündigen den Fehler an
- [ ] Ohne JavaScript lässt sich das Formular trotzdem absenden
- [ ] Ein Honeypot ist vorhanden; es wird kein Captcha-Dienst eingebunden
- [ ] Der Datenschutzhinweis mit Link steht über dem Button
- [ ] Nach dem Absenden landet man auf `/danke/` (`noindex`)
- [ ] Eine Testanfrage über die Deploy-Preview kommt bei beiden per E-Mail an (Screenshot im PR, private Daten geschwärzt)
- [ ] E-Mail- und Telefon-Link kommen aus `site.ts` und funktionieren am Handy
- [ ] Der Terminbuchungs-Button erscheint nur, wenn `site.bookingUrl` gesetzt ist
- [ ] WP-10 ist über die verarbeiteten Daten informiert (Kommentar in #13)
