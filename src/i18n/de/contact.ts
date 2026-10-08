// Texte der Kontakt-Sektion, des Formulars und der Danke-Seite – gehört WP-08 (Kontakt).
export const contact = {
  eyebrow: 'Kontakt',
  title: 'Lassen Sie uns sprechen',
  lead: 'Erzählen Sie uns kurz von Ihrem Betrieb. Wir melden uns innerhalb von 1–2 Werktagen.',
  form: {
    requiredHint: 'Pflichtfelder sind mit * markiert.',
    name: {
      label: 'Name',
      error: 'Bitte geben Sie Ihren Namen an.',
    },
    email: {
      label: 'E-Mail',
      error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
    },
    company: {
      label: 'Unternehmen',
    },
    projectType: {
      label: 'Worum geht es?',
      placeholder: 'Bitte auswählen',
      options: ['Website', 'App', 'KI & Automatisierung', 'Individuelle Software', 'Noch unklar'],
    },
    message: {
      label: 'Nachricht',
      error: 'Bitte schreiben Sie uns ein paar Worte (mindestens 20 Zeichen).',
    },
    /** Beschriftung des unsichtbaren Spam-Fallen-Felds */
    honeypot: 'Bitte leer lassen',
    privacy: {
      before:
        'Mit dem Absenden verarbeiten wir Ihre Angaben, um Ihre Anfrage zu beantworten. Mehr dazu in unserer ',
      link: 'Datenschutzerklärung',
      after: '.',
    },
    submit: 'Anfrage senden',
    errorSummary: 'Bitte prüfen Sie die markierten Felder.',
  },
  direct: {
    title: 'Direkter Draht',
    email: 'E-Mail',
    phone: 'Telefon',
    booking: 'Termin für ein Erstgespräch buchen',
  },
  thanks: {
    title: 'Vielen Dank für Ihre Anfrage!',
    text: 'Wir haben Ihre Nachricht erhalten und melden uns innerhalb von 1–2 Werktagen bei Ihnen.',
    backLink: 'Zurück zur Startseite',
  },
};
