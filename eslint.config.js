// @ts-check
import js from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import betterTailwind from 'eslint-plugin-better-tailwindcss';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const SPEC_HINT = 'Siehe SPECS.md, Abschnitt 10 „Feste Konventionen“.';

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
      'better-tailwindcss': { entryPoint: 'src/styles/global.css' },
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
              pattern: String.raw`^.*\[(#|rgb|hsl|oklch|color:).*\].*$`,
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
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXAttribute[name.namespace.name='is'][name.name.name='inline']",
          message: `Kein is:inline: Skripte müssen als Datei ausgeliefert werden (CSP). ${SPEC_HINT}`,
        },
        {
          selector: "JSXAttribute[name.namespace.name='define'][name.name.name='vars']",
          message: `Kein define:vars: Daten über data-*-Attribute übergeben (CSP). ${SPEC_HINT}`,
        },
      ],
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
