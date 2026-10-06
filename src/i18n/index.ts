import * as de from './de';

/** Alle unterstützten Sprachen. Für Englisch (V2): 'en' ergänzen und src/i18n/en/ anlegen. */
export const locales = ['de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';

/**
 * Struktur aller Texte, abgeleitet aus der deutschen Fassung.
 * Eine weitere Sprache muss jeden Schlüssel liefern, sonst meldet TypeScript einen Fehler.
 */
export type Dictionary = typeof de;

const dictionaries: Record<Locale, Dictionary> = { de };

function isLocale(value: string | undefined): value is Locale {
  return (locales as readonly string[]).includes(value ?? '');
}

/**
 * Liefert alle Texte für die aktuelle Sprache.
 *
 * @example
 * const t = useTranslations(Astro.currentLocale);
 * t.hero.title;
 */
export function useTranslations(locale: string | undefined = defaultLocale): Dictionary {
  return dictionaries[isLocale(locale) ? locale : defaultLocale];
}
