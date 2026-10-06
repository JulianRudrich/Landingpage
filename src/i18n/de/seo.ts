// Seitentitel, Meta-Descriptions und Texte für strukturierte Daten – gehört WP-09 (SEO & Meta).
// `title` immer ohne Markennamen: SEO.astro hängt " | {site.name}" an (und lässt ihn weg, wenn der
// Titel sonst länger als 60 Zeichen würde). Descriptions höchstens 155 Zeichen (NFA-09).
// Markenname und Region nie fest eintragen, sondern als Platzhalter {name} bzw. {region} (siehe fill()).
export const seo = {
  home: {
    /** Titel, solange keine Region festgelegt ist (E-05) */
    title: 'Websites, Apps & KI für Gastronomie',
    /** Titel mit Region; wird verwendet, sobald site.region gesetzt ist */
    titleWithRegion: 'Websites, Apps & KI für Gastronomie in {region}',
    description:
      'Wir bauen Websites, Apps und KI-Lösungen für Gastronomie und lokale Betriebe – persönlich, verständlich und aus einer Hand.',
  },
  impressum: {
    title: 'Impressum',
    description: 'Impressum und Anbieterkennzeichnung von {name}.',
  },
  datenschutz: {
    title: 'Datenschutzerklärung',
    description: 'Wie wir mit Ihren Daten umgehen: Hosting, Kontaktformular und Ihre Rechte.',
  },
  danke: {
    title: 'Vielen Dank',
    description: 'Ihre Anfrage ist bei uns angekommen.',
  },
  notFound: {
    title: 'Seite nicht gefunden',
    description: 'Diese Seite gibt es leider nicht.',
  },
  styleguide: {
    title: 'Styleguide',
    description: 'Interne Übersicht aller UI-Bausteine.',
  },
  /** Alt-Text des Standard-Vorschaubilds (public/og-image.png) */
  defaultImageAlt: '{name} – Digitale Lösungen für Gastronomie und lokale Betriebe',
  /** Beschreibung im JSON-LD `ProfessionalService` der Startseite und im Web-Manifest */
  organizationDescription: 'Websites, Apps und KI-Lösungen für Gastronomie und lokale Betriebe.',
};
