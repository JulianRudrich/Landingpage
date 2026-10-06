# WP-08: Kontakt-Sektion & Formular

| | |
|---|---|
| **Owner** | Julian ([@JulianRudrich](https://github.com/JulianRudrich)) |
| **Reviewer** | Tony ([@tonytonym21](https://github.com/tonytonym21)) |
| **Release** | V1.0 |
| **Aufwand** | L (ca. 12–24 h) |
| **Branch** | `julian/wp-08-kontakt` |
| **Issue** | [#11](https://github.com/JulianRudrich/Landingpage/issues/11) |
| **Abhängig von** | WP-03; WP-02 (Netlify-Site, um die Zustellung zu testen) |
| **Blockiert** | – |
| **Anforderungen** | FA-11, FA-12, FA-13, FA-14, FA-15 aus [SPECS.md](../../SPECS.md) |

## Ziel

Die wichtigste Sektion für unser Geschäft: Aus einem Besucher wird eine Anfrage. Kontakt aufnehmen soll **einfach, vertrauenswürdig und zuverlässig** sein. Jede Anfrage kommt bei uns beiden an.

## Umfang

**Gehört dazu**

1. **Sektion** `Contact.astro` (`#kontakt`)
   - `SectionHeading` (Entwurf: „Lassen Sie uns sprechen“ / „Erzählen Sie uns kurz von Ihrem Betrieb. Wir melden uns innerhalb von 1–2 Werktagen.“)
   - Zwei Spalten (mobil untereinander): Formular und direkte Kontaktwege
   - Direkt: E-Mail (`mailto:`), Telefon (`tel:`, nur wenn `site.phone` gesetzt), Terminbuchungs-Button (nur wenn `site.bookingUrl` gesetzt, kommt mit WP-13)
2. **Formular** `ContactForm.astro` über **Netlify Forms**
   - `<form name="kontakt" method="POST" action="/danke" data-netlify="true" netlify-honeypot="website">` plus `<input type="hidden" name="form-name" value="kontakt">`
   - Felder:

     | Feld | Typ | Pflicht | `autocomplete` |
     |---|---|---|---|
     | Name | `text` | ja | `name` |
     | E-Mail | `email` | ja | `email` |
     | Unternehmen | `text` | nein | `organization` |
     | Worum geht es? | `select`: Website, App, KI & Automatisierung, Individuelle Software, Noch unklar | nein | – |
     | Nachricht | `textarea` | ja | – |

   - Honeypot-Feld `website`, visuell versteckt, mit Label „Bitte leer lassen“ und `tabindex="-1"`
   - Datenschutzhinweis über dem Button (Entwurf): „Mit dem Absenden verarbeiten wir Ihre Angaben, um Ihre Anfrage zu beantworten. Mehr dazu in unserer [Datenschutzerklärung](/datenschutz).“
   - Absenden-Button „Anfrage senden“
3. **Validierung**
   - HTML-Attribute (`required`, `type="email"`, `minlength` für die Nachricht) als Basis. Ohne JavaScript funktioniert das Formular mit nativer Browser-Validierung.
   - Kleines Skript für deutsche Fehlermeldungen direkt am Feld (`aria-invalid`, `aria-describedby`); beim Absenden springt der Fokus auf das erste fehlerhafte Feld
   - Kein `fetch` nötig: Das normale POST geht an Netlify, das danach auf `/danke` weiterleitet
4. **Danke-Seite** `src/pages/danke.astro` (`noindex`): Bestätigung, Hinweis auf die Antwortzeit, Link zurück zur Startseite.
5. **Netlify-Einstellungen**: Formular-Benachrichtigung per E-Mail an beide (oder an `hallo@` mit Weiterleitung), Spamfilter aktiv. Eingegangene Anfragen regelmäßig in Netlify löschen, nachdem sie im Postfach sind (Datensparsamkeit).
6. **WP-10 informieren:** Im Issue [#13](https://github.com/JulianRudrich/Landingpage/issues/13) kommentieren, welche Daten das Formular erhebt und wo sie gespeichert werden (für die Datenschutzerklärung).

**Gehört nicht dazu**

- Terminbuchung einrichten (WP-13); hier nur der Button mit Bedingung
- Captcha-Dienste (nicht erlaubt, FA-12)

## Dateien

**Besitzt dieses Paket:** `src/components/sections/Contact.astro`, `src/components/contact/*` (u. a. `ContactForm.astro`), `src/pages/danke.astro`, `src/i18n/de/contact.ts`

**Liest/benutzt:** `src/components/ui/*`, `src/layouts/BaseLayout.astro`, `src/config/site.ts`

## Akzeptanzkriterien

- [ ] Die Felder entsprechen FA-11; Labels sind sichtbar (kein Platzhalter als Label); `autocomplete` ist gesetzt
- [ ] Bei leerem oder ungültigem Absenden erscheint die Fehlermeldung am Feld, der Fokus springt aufs erste fehlerhafte Feld, Screenreader kündigen den Fehler an
- [ ] Ohne JavaScript lässt sich das Formular trotzdem absenden
- [ ] Ein Honeypot ist vorhanden; es wird kein Captcha-Dienst eingebunden
- [ ] Der Datenschutzhinweis mit Link steht über dem Button
- [ ] Nach dem Absenden landet man auf `/danke` (`noindex`)
- [ ] Eine Testanfrage über die Deploy-Preview kommt bei beiden per E-Mail an (Screenshot im PR, private Daten geschwärzt)
- [ ] E-Mail- und Telefon-Link kommen aus `site.ts` und funktionieren am Handy
- [ ] Der Terminbuchungs-Button erscheint nur, wenn `site.bookingUrl` gesetzt ist
- [ ] WP-10 ist über die verarbeiteten Daten informiert (Kommentar in #13)
