// Menü- und Footer-Texte – gehört WP-04 (Header & Footer).
export const navigation = {
  mainLabel: 'Hauptnavigation',
  /** `anchor` = ID der Sektion auf der Startseite (SPECS.md, Abschnitt 6). Links werden zu `/#<anchor>`. */
  items: [
    { label: 'Leistungen', anchor: 'leistungen' },
    { label: 'Projekte', anchor: 'projekte' },
    { label: 'Ablauf', anchor: 'ablauf' },
    { label: 'Über uns', anchor: 'ueber-uns' },
    { label: 'Kontakt', anchor: 'kontakt' },
  ],
  cta: { label: 'Projekt anfragen', anchor: 'kontakt' },
  menuOpen: 'Menü öffnen',
  menuClose: 'Menü schließen',
  footer: {
    claim: 'Digitale Lösungen für Gastronomie und lokale Betriebe.',
    contactHeading: 'Kontakt',
    navHeading: 'Navigation',
    legalHeading: 'Rechtliches',
    socialHeading: 'Profile',
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
    social: {
      linkedinTony: 'Tony auf LinkedIn',
      linkedinJulian: 'Julian auf LinkedIn',
      github: 'GitHub',
    },
    copyright: 'Alle Rechte vorbehalten.',
  },
};
