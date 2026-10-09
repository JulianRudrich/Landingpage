// @ts-check
import js from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import betterTailwind from 'eslint-plugin-better-tailwindcss';
import { getDefaultSelectors } from 'eslint-plugin-better-tailwindcss/defaults';
import { MatcherType, SelectorKind } from 'eslint-plugin-better-tailwindcss/types';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const SPEC_HINT = 'Siehe SPECS.md, Abschnitt 10 „Feste Konventionen“.';

// Utilities, die eine Farbe setzen (für die Regel gegen Farbnamen in eckigen Klammern)
const COLOR_UTILITIES =
  'bg|text|border(?:-[xytrblse])?|outline|ring|ring-offset|fill|stroke|decoration|shadow|inset-shadow|drop-shadow|text-shadow|from|via|to|divide|accent|caret|placeholder';

// Verbotene Muster im Template; SEO.astro und Analytics.astro bekommen unten eine Ausnahme für <script>-Attribute
const NO_INLINE_SCRIPT = [
  {
    selector: "JSXAttribute[name.namespace.name='is'][name.name.name='inline']",
    message: `Kein is:inline: Skripte müssen als Datei ausgeliefert werden (CSP). ${SPEC_HINT}`,
  },
  {
    selector: "JSXAttribute[name.namespace.name='define'][name.name.name='vars']",
    message: `Kein define:vars: Daten über data-*-Attribute an HTML-Elementen übergeben (CSP). ${SPEC_HINT}`,
  },
  {
    selector: 'JSXAttribute[name.name=/^on[a-z]+$/]',
    message: `Keine Inline-Event-Handler (onclick …): addEventListener in einem <script> benutzen (CSP). ${SPEC_HINT}`,
  },
  {
    selector: "JSXAttribute[name.name='style']",
    message: `Kein style-Attribut: Gestaltung nur über Token-Klassen. ${SPEC_HINT}`,
  },
  {
    selector: "JSXOpeningElement[name.name='style']",
    message: `Kein <style>-Block in Komponenten: eigenes CSS nur in src/styles/global.css (WP-03). ${SPEC_HINT}`,
  },
];
const NO_SCRIPT_ATTRIBUTES = {
  selector: "JSXOpeningElement[name.name='script'] > JSXAttribute",
  message: `<script> ohne Attribute schreiben, sonst landet es inline im HTML und die CSP blockiert es. data-* gehören an HTML-Elemente. ${SPEC_HINT}`,
};

export default [
  {
    ignores: [
      'dist/',
      '.astro/',
      'node_modules/',
      '.netlify/',
      '.lighthouseci/',
      'playwright-report/',
      'test-results/',
      '.claude/worktrees/',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  // Barrierefreiheits-Regeln (NFA-05) für .astro-Dateien
  ...eslintPluginAstro.configs['jsx-a11y-recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Feste Konventionen automatisch prüfen
  {
    files: ['**/*.astro'],
    plugins: { 'better-tailwindcss': betterTailwind },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles/global.css',
        // Zusätzlich zu class/class:list auch Klassen-Varianten in Variablen prüfen,
        // deren Name auf „Classes“ oder „Variants“ endet (z. B. `variantClasses = { primary: '…' }`)
        selectors: [
          ...getDefaultSelectors(),
          {
            kind: SelectorKind.Variable,
            name: '^(?:\\w*Classes|\\w*Variants|variants)$',
            match: [{ type: MatcherType.ObjectValue }, { type: MatcherType.String }],
          },
        ],
      },
    },
    rules: {
      // Nur Klassen, die es gibt: Tippfehler und erfundene Token-Namen fallen auf
      'better-tailwindcss/no-unknown-classes': ['error', { ignore: ['^prose-content$'] }],
      // Keine Farbwerte im Code, nur Token-Klassen (D-01)
      'better-tailwindcss/no-restricted-classes': [
        'error',
        {
          restrict: [
            {
              // Hex-Werte und Farbfunktionen irgendwo in eckigen Klammern, z. B. text-[#123], shadow-[0_0_4px_rgba(…)]
              pattern: String.raw`^.*\[[^\]]*(#[0-9a-fA-F]{3,8}|(?<![a-zA-Z-])(rgba?|hsla?|hwb|lab|lch|oklab|oklch|color|color-mix|light-dark)\(|color:)[^\]]*\].*$`,
              message: `Keine Farbwerte im Code, nur Token-Klassen. ${SPEC_HINT}`,
            },
            {
              // Farbnamen in eckigen Klammern, z. B. bg-[red]
              pattern: String.raw`^(.*:)?-?(${COLOR_UTILITIES})-\[[a-zA-Z]+\]$`,
              message: `Keine Farbwerte im Code, nur Token-Klassen. ${SPEC_HINT}`,
            },
          ],
        },
      ],
      'better-tailwindcss/no-duplicate-classes': 'error',
      'better-tailwindcss/no-conflicting-classes': 'error',
      // Einheitliche Reihenfolge der Klassen (wird mit `npm run format` automatisch sortiert)
      'better-tailwindcss/enforce-consistent-class-order': 'error',
      // Skripte dürfen nicht inline landen, sonst blockiert die CSP sie auf der Live-Seite (WP-02)
      'no-restricted-syntax': ['error', ...NO_INLINE_SCRIPT, NO_SCRIPT_ATTRIBUTES],
    },
  },
  {
    // Ausnahmen laut SPECS §10: JSON-LD (WP-09) und das externe Statistik-Skript (WP-13) brauchen Attribute
    files: ['src/components/layout/SEO.astro', 'src/components/layout/Analytics.astro'],
    rules: {
      'no-restricted-syntax': ['error', ...NO_INLINE_SCRIPT],
    },
  },
  {
    // Nur die feste Icon-Liste benutzen (src/components/ui/icons.ts)
    files: ['**/*.astro', '**/*.ts'],
    ignores: ['src/components/ui/icons.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@lucide/*', 'lucide*'],
              message: `Icons nur über <Icon name="…" /> aus der festen Liste in src/components/ui/icons.ts. ${SPEC_HINT}`,
            },
          ],
        },
      ],
    },
  },
];
