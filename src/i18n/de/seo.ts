// Seitentitel, Meta-Descriptions und Texte für strukturierte Daten – gehört WP-09 (SEO & Meta).
// `title` immer ohne Markennamen: SEO.astro hängt " | {site.name}" an. Gesamtlänge ≤ 60 Zeichen,
// Descriptions ≤ 155 Zeichen (NFA-09).
export const seo = {
  home: {
    title: 'Websites, Apps & KI für Gastronomie',
    description:
      'Wir bauen Websites, Apps und KI-Lösungen für Gastronomie und lokale Betriebe – persönlich, verständlich und aus einer Hand.',
  },
  impressum: {
    title: 'Impressum',
    description: 'Impressum und Anbieterkennzeichnung von Tony & Julian.',
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
  defaultImageAlt: 'Tony & Julian – Digitale Lösungen für Gastronomie und lokale Betriebe',
  /** Beschreibung im JSON-LD `ProfessionalService` der Startseite */
  organizationDescription: 'Websites, Apps und KI-Lösungen für Gastronomie und lokale Betriebe.',
};
