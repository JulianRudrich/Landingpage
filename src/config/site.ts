/**
 * Zentrale Daten der Website – Werte trägt WP-00 ein (Entscheidungen E-01 bis E-15).
 * Komponenten tragen Name, E-Mail, Adressen oder URLs nie selbst ein, sondern lesen sie von hier.
 * Die Felder (Namen und Typen) sind ein Vertrag: Änderungen nur per Spec-Änderung (SPECS.md §16).
 */
export interface SiteConfig {
  /** Markenname / Wortmarke (E-01) */
  name: string;
  /** Name laut Impressum inkl. Rechtsform, z. B. "Tony & Julian GbR" (E-07) */
  legalName: string;
  /** Produktions-URL ohne abschließenden Slash, ohne "www" (E-02). Wird auch als `site` in astro.config.mjs genutzt. */
  url: string;
  /** Öffentliche Kontaktadresse (E-03) */
  email: string;
  /** Öffentliche Telefonnummer im internationalen Format, z. B. "+49 30 1234567". Leer = nicht anzeigen (E-09). */
  phone: string;
  /** Region bzw. Stadt für lokales SEO (E-05). Leer = Titel ohne Region. */
  region: string;
  /** Geschäftsanschrift wie im Impressum (für strukturierte Daten, WP-09) */
  address: {
    street: string;
    postalCode: string;
    locality: string;
  };
  /** Vollständige Namen der Inhaber (für strukturierte Daten, WP-09) */
  founders: string[];
  /** Profil-Links; leere Werte werden nicht angezeigt */
  social: {
    linkedinTony: string;
    linkedinJulian: string;
    /** gemeinsames GitHub-Profil bzw. -Organisation */
    github: string;
  };
  /** Farbe der Browserleiste (theme-color) und des Web-Manifests, Hex-Wert aus Tonys Design (WP-03 Teil A) */
  themeColor: string;
  /** Link zur Terminbuchung (WP-13). Leer = Button ausblenden. */
  bookingUrl: string;
  /** Cookielose Statistik (WP-13). Leere `scriptUrl` = kein Skript. */
  analytics: {
    /** Adresse des Statistik-Skripts beim Anbieter, z. B. "https://plausible.io/js/script.js" */
    scriptUrl: string;
    /** Kennung der Website beim Anbieter (Plausible: data-domain, Umami: data-website-id) */
    siteId: string;
  };
  /** Schalter für Funktionen, die später freigeschaltet werden */
  features: {
    /** Detailseiten /projekte/<id>/ verlinken (setzt WP-12) */
    projectDetails: boolean;
  };
}

export const site: SiteConfig = {
  name: 'Tony & Julian',
  legalName: '',
  url: 'https://example.com',
  email: 'hallo@example.com',
  phone: '',
  region: '',
  address: {
    street: '',
    postalCode: '',
    locality: '',
  },
  founders: [],
  social: {
    linkedinTony: '',
    linkedinJulian: '',
    github: '',
  },
  themeColor: '#27272a',
  bookingUrl: '',
  analytics: {
    scriptUrl: '',
    siteId: '',
  },
  features: {
    projectDetails: false,
  },
};
