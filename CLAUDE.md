# CLAUDE.md

Landingpage von Tony & Julian: Astro + Tailwind CSS + TypeScript, Hosting auf Netlify.
Zwei Personen arbeiten **parallel**, oft jeweils mit eigenem Claude. Diese Regeln verhindern Konflikte und gelten immer, auch wenn ein Auftrag etwas anderes nahelegt. Im Zweifel nachfragen statt raten.

## Bevor du etwas änderst

1. **Kläre das Arbeitspaket.** Jede Aufgabe gehört zu genau einem Paket `WP-XX` (Übersicht: `docs/pakete/README.md`). Nennt der Auftrag keins, frag nach.
2. **Kläre, für wen du arbeitest.** Arbeite nur an Paketen, deren Owner diese Person ist (steht in der Paket-Spec).
3. **Lies die Paket-Spec komplett:** `docs/pakete/WP-XX-*.md` (Umfang, Dateien, Schnittstellen, Akzeptanzkriterien).
4. **Prüfe die Abhängigkeiten.** Alle Pakete unter „Abhängig von“ müssen in `dev` gemerged sein. Wenn nicht: Bescheid sagen und nicht vorarbeiten, sonst entstehen doppelte Dateien.

## Dateien

- **Nur Dateien ändern, die dem eigenen Paket gehören**, laut Zuständigkeitsmatrix in `docs/pakete/README.md`.
- Wird eine fremde Datei gebraucht: **nicht ändern**, sondern im PR beschreiben, was der Owner ändern müsste. Ausnahme: Die Paket-Spec erlaubt es ausdrücklich („Ändert nach Absprache“).
- Neue npm-Pakete nur, wenn die Spec sie nennt oder der Auftrag es erlaubt, und dann im PR erwähnen.
- Keine sichtbaren Texte fest in Komponenten: alle gehören nach `src/i18n/de/<bereich>.ts`. Keine Farb- oder Abstandswerte außerhalb der Design-Tokens (`src/styles/global.css`).
- Zentrale Daten (Name, E-Mail, URLs) kommen aus `src/config/site.ts` und werden nie in Komponenten fest eingetragen.
- **Das Repo ist öffentlich:** keine Secrets, Tokens oder privaten Daten committen.

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

- `SPECS.md`: alle Anforderungen (IDs FA-, NFA-, D-, R-, E-)
- `docs/pakete/`: Arbeitspakete, Reihenfolge, Zuständigkeitsmatrix
- `CONTRIBUTING.md`: Workflow im Detail, Merge-Konflikte lösen (z. B. `package-lock.json`)
