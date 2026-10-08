import { site } from '@/config/site';

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

/** Macht aus Literal-Typen ihre Grundtypen, z. B. 'Hallo' → string. */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? Widen<U>[]
        : { -readonly [K in keyof T]: Widen<T[K]> };

/**
 * Schutz für die Mehrsprachigkeit: Schreibt jemand eine Textdatei mit `as const`, wären ihre Typen
 * die deutschen Texte selbst, und eine englische Fassung könnte `Dictionary` nie erfüllen.
 * Dann meldet `npm run check` hier sofort einen Fehler ("Type 'false' does not satisfy ...").
 */
type AssertTrue<T extends true> = T;
export type DictionaryIsTranslatable = AssertTrue<
  Widen<Dictionary> extends Dictionary ? true : false
>;

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

/** Platzhalter, die in Texten stehen dürfen. Die Werte kommen aus src/config/site.ts. */
type Placeholder = 'name' | 'region';

/**
 * Setzt zentrale Daten in einen Text ein: `{name}` → site.name, `{region}` → site.region.
 * So stehen Markenname und Region nie fest in einer Textdatei, sondern nur in site.ts.
 *
 * @example
 * fill(t.seo.impressum.description); // "Impressum und Anbieterkennzeichnung von Tony & Julian."
 */
export function fill(text: string, values: Partial<Record<Placeholder, string>> = {}): string {
  const all: Record<Placeholder, string> = { name: site.name, region: site.region, ...values };
  return text.replace(/\{(name|region)\}/g, (_match, key: Placeholder) => all[key]);
}
