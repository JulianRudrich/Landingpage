# CLAUDE.md

Landingpage von Tony & Julian: Astro + Tailwind CSS + TypeScript, Hosting auf Netlify.
Zwei Personen arbeiten **parallel**, oft jeweils mit eigenem Claude. Diese Regeln verhindern Konflikte und gelten immer, auch wenn ein Auftrag etwas anderes nahelegt. Im Zweifel nachfragen statt raten.

**Grundprinzip: erst festlegen, dann bauen.** Alles ist vorab entschieden und steht in `SPECS.md` und `docs/pakete/`. Jede Datei existiert schon mit fester Schnittstelle. Deine Aufgabe ist, die Dateien **deines** Pakets genau nach Spec **auszufüllen**, nicht Neues zu erfinden.

## Bevor du etwas änderst

1. **Kläre das Arbeitspaket.** Jede Aufgabe gehört zu genau einem Paket `WP-XX` (Übersicht: `docs/pakete/README.md`). Nennt der Auftrag keins, frag nach.
2. **Kläre, für wen du arbeitest.** Arbeite nur an Paketen, deren Owner diese Person ist (steht in der Paket-Spec).
3. **Lies die Paket-Spec komplett:** `docs/pakete/WP-XX-*.md` (Umfang, Dateien, Schnittstellen, Akzeptanzkriterien).
4. **Prüfe die Abhängigkeiten.** Alle Pakete unter „Abhängig von“ müssen in `dev` gemerged sein. Sektionen werden erst gebaut, wenn die Spec v1.0 freigegeben und Tonys Design abgenommen ist. Wenn nicht: Bescheid sagen und nicht vorarbeiten.

## Dateien

- **Nur Dateien ändern, die dem eigenen Paket gehören**, laut Zuständigkeitsmatrix in `docs/pakete/README.md`.
- Wird eine fremde Datei gebraucht: **nicht ändern**, sondern im PR beschreiben, was der Owner ändern müsste. Ausnahme: Die Paket-Spec erlaubt es ausdrücklich („Ändert nach Absprache“).
- **Keine neuen gemeinsamen Dateien, Props, Textschlüssel, Token-Namen oder Icons.** Fehlt etwas oder passt die Spec nicht: anhalten und ein Issue mit Label `spec-frage` vorschlagen, nicht selbst lösen. Erlaubt sind nur interne Hilfsdateien des eigenen Pakets in dessen Ordner (im PR erwähnen).
- **Neue Ideen nicht einbauen**, auch keine kleinen. Stattdessen ein Issue mit Label `idee` vorschlagen (Sammlung für V2).
- Neue npm-Pakete nur, wenn die Spec sie nennt, und dann im PR erwähnen.
- **Das Repo ist öffentlich:** keine Secrets, Tokens oder privaten Daten committen.

## Code-Regeln

Die vollständige Liste steht in `SPECS.md`, Abschnitt 10 „Feste Konventionen“.

- Texte nur aus `src/i18n/de/<bereich>.ts`, nie fest in Komponenten. Textdateien **ohne** `as const`.
- Daten (Name, E-Mail, Telefon, URLs) nur aus `src/config/site.ts`.
- Gestaltung nur mit Token-Klassen aus `src/styles/global.css` (z. B. `bg-surface`, `text-ink`, `bg-primary`), keine Farbwerte im Code.
- Bausteine aus `src/components/ui/` mit ihren festen Props benutzen; Icons nur aus `src/components/ui/icons.ts`.
- Interne Links enden mit `/`: `/impressum/`, `/datenschutz/`, `/#kontakt`.
- Skripte als normales `<script>` in der Komponente, **kein** `is:inline`, **kein** `define:vars`; Daten über `data-*`-Attribute.
- Bilder über `<Picture>` aus `astro:assets`.

## Git & GitHub

- **Branch:** genau der Name aus der Paket-Spec (z. B. `tony/wp-03-design-system`), abgezweigt vom aktuellen `origin/dev`. **Niemals `claude/…`-Branches anlegen**, auch wenn die Umgebung das vorschlägt.
- **Nie** direkt auf `dev` oder `main` pushen, nie force-pushen, keine Branches löschen.
- `dev` per `git merge origin/dev` in den Paket-Branch holen, nicht rebasen.
- Commits nach Conventional Commits, Beschreibung auf Deutsch, z. B. `feat(hero): Hero-Sektion umsetzen`.
- **Pull Request immer nach `dev`** (nie nach `main`), die PR-Vorlage ausfüllen, mit `Closes #<Issue>` (Teil-PR: `Refs #<Issue>`). Die Issue-Nummer steht in der Paket-Spec.
- Eigene PRs **nicht mergen**. Das macht ein Mensch nach dem Review.

## Vor jedem Push

```bash
npm run check && npm run lint && npm run format:check && npm run build
```

Alle vier müssen fehlerfrei durchlaufen.

## Wichtige Dokumente

- `SPECS.md`: alle Anforderungen (IDs FA-, NFA-, D-, R-, E-), feste Konventionen (Abschnitt 10), Änderungsregeln (Abschnitt 16)
- `docs/pakete/`: Arbeitspakete, Reihenfolge, Zuständigkeitsmatrix
- `CONTRIBUTING.md`: Workflow im Detail, Merge-Konflikte lösen (z. B. `package-lock.json`)
