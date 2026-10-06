/**
 * Zentrale Daten der Website. Werte kommen aus WP-00 (Entscheidungen E-01 bis E-09).
 * Komponenten tragen Name, E-Mail oder URLs nie selbst ein, sondern lesen sie von hier.
 */
export interface SiteConfig {
  /** Markenname / Wortmarke (E-01) */
  name: string;
  /** Produktions-URL ohne abschließenden Slash (E-02). Wird auch als `site` in astro.config.mjs genutzt. */
  url: string;
  /** Öffentliche Kontaktadresse (E-03) */
  email: string;
  /** Öffentliche Telefonnummer im internationalen Format, z. B. "+49 30 1234567". Leer = nicht anzeigen (E-09). */
  phone: string;
  /** Region bzw. Stadt für lokales SEO (E-05) */
  region: string;
  /** Profil-Links; leere Werte werden nicht angezeigt */
  social: {
    linkedinTony: string;
    linkedinJulian: string;
    github: string;
  };
  /** Link zur Terminbuchung (WP-13). Leer = Button ausblenden. */
  bookingUrl: string;
  /** Cookielose Statistik (WP-13). Leere Domain = kein Skript. */
  analytics: {
    domain: string;
  };
  /** Schalter für Funktionen, die später freigeschaltet werden */
  features: {
    /** Detailseiten /projekte/<slug> verlinken (setzt WP-12) */
    projectDetails: boolean;
  };
}

export const site: SiteConfig = {
  name: 'Tony & Julian',
  url: 'https://example.com',
  email: 'hallo@example.com',
  phone: '',
  region: '',
  social: {
    linkedinTony: '',
    linkedinJulian: '',
    github: '',
  },
  bookingUrl: '',
  analytics: {
    domain: '',
  },
  features: {
    projectDetails: false,
  },
};
