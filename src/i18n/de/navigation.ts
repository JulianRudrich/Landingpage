// Menü- und Footer-Texte – gehört WP-04 (Header & Footer).
export const navigation = {
  label: 'Hauptnavigation',
  // `anchor` = ID der Sektion auf der Startseite (SPECS.md, Abschnitt 6)
  items: [
    { label: 'Leistungen', anchor: 'leistungen' },
    { label: 'Projekte', anchor: 'projekte' },
    { label: 'Ablauf', anchor: 'ablauf' },
    { label: 'Über uns', anchor: 'ueber-uns' },
    { label: 'Kontakt', anchor: 'kontakt' },
  ],
  legal: {
    label: 'Rechtliches',
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
  },
};
