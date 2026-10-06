// Texte der Leistungssektion – gehört WP-05 (Hero & Leistungen). Leistungen L1–L4: SPECS.md, Abschnitt 4.
// Die Icons ordnet Services.astro über `id` zu (Texte und Icons bleiben getrennt).
export const services = {
  eyebrow: 'Leistungen',
  title: 'Was wir für Sie tun',
  lead: 'Vom ersten Online-Auftritt bis zur eigenen App: Wir kümmern uns um die Technik, Sie sich um Ihre Gäste.',
  items: [
    {
      id: 'L1',
      title: 'Websites & Online-Präsenz',
      text: 'Eine moderne Website, die bei Google gefunden wird und auf dem Handy überzeugt.',
      benefits: [
        'Online-Speisekarte, die Sie selbst aktualisieren',
        'Reservierungs- oder Anfrageformular',
        'Optimiertes Google-Unternehmensprofil',
      ],
    },
    {
      id: 'L2',
      title: 'Apps für die Gastronomie',
      text: 'Digitale Helfer für Ihren Betrieb – auf Smartphone, Tablet oder Kassen-PC.',
      benefits: [
        'Bestellen am Tisch per QR-Code',
        'Reservierungs- und Tischplanung',
        'Treueprogramm für Stammgäste',
      ],
    },
    {
      id: 'L3',
      title: 'KI & Automatisierung',
      text: 'Wiederkehrende Aufgaben automatisch erledigen – damit mehr Zeit für Ihre Gäste bleibt.',
      benefits: [
        'KI-Assistent beantwortet Anfragen rund um die Uhr',
        'Antwortvorschläge für Google-Bewertungen',
        'Dienstpläne, Bestellungen und Rechnungen automatisiert',
      ],
    },
    {
      id: 'L4',
      title: 'Individuelle Software',
      text: 'Ihr Problem passt in keine Schublade? Wir entwickeln die passende Lösung.',
      benefits: [
        'Analyse Ihrer Abläufe',
        'Klickbarer Prototyp in wenigen Wochen',
        'Betreuung nach dem Start',
      ],
    },
  ],
  cta: 'Unverbindlich anfragen',
};
