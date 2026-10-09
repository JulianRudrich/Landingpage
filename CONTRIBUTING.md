# Zusammenarbeit auf GitHub

Diese Regeln sorgen dafür, dass wir zu zweit parallel arbeiten können, ohne uns gegenseitig Code zu überschreiben.

**Kurzfassung**

1. Jede Aufgabe ist ein **Arbeitspaket (WP)** mit GitHub-Issue und eigener Spec in [`docs/pakete/`](docs/pakete/README.md).
2. Pro Paket gibt es einen **eigenen Branch** von `dev`.
3. Jeder ändert **nur die Dateien seines Pakets** (siehe [Zuständigkeitsmatrix](docs/pakete/README.md#zuständigkeitsmatrix)).
4. Zurück nach `dev` geht es **nur per Pull Request** mit Review vom anderen.
5. `main` ist die Live-Seite und bekommt Änderungen nur per Release-PR aus `dev`.

**Mit Claude arbeiten:** Claude liest automatisch [`CLAUDE.md`](CLAUDE.md), dort stehen dieselben Regeln in Kurzform. Gebt eurem Claude immer das Paket mit, z. B.: „Arbeite an WP-03 (Issue #6) laut `docs/pakete/WP-03-design-system.md`.“

## Inhalt

- [Branches](#branches)
- [Ablauf für ein Paket](#ablauf-für-ein-paket)
- [Wem gehört welche Datei?](#wem-gehört-welche-datei)
- [Code-Regeln](#code-regeln)
- [Spec ändern und neue Ideen](#spec-ändern-und-neue-ideen)
- [Merge-Konflikte lösen](#merge-konflikte-lösen)
- [Commit-Nachrichten](#commit-nachrichten)
- [Reviews](#reviews)
- [Issues, Labels und Board](#issues-labels-und-board)
- [Release: dev → main](#release-dev--main)
- [Einmalige Einrichtung](#einmalige-einrichtung)
- [Hilfe, ich habe …](#hilfe-ich-habe-)

## Branches

| Branch | Zweck | Wer pusht? |
|---|---|---|
| `main` | Produktion: das, was auf der Domain live ist | niemand direkt, nur Release-PR aus `dev` |
| `dev` | Sammelstelle für alle fertigen Pakete (Staging) | niemand direkt, nur PRs aus Paket-Branches |
| `<name>/wp-XX-kurzname` | Arbeit an genau **einem** Paket | nur der Owner des Pakets |

- Beispiele: `julian/wp-01-projekt-setup`, `tony/wp-05-hero-leistungen`. Der genaue Name steht in jeder Paket-Spec und im Issue.
- Kleinkram ohne Paket (Tippfehler, Doku): `<name>/fix-kurzbeschreibung` bzw. `<name>/docs-kurzbeschreibung`.
- **Keine Branches anlegen, die nur `tony` oder `julian` heißen.** Git kann dann keine `tony/…`- bzw. `julian/…`-Branches mehr anlegen, weil sich die Namen in die Quere kommen.

## Ablauf für ein Paket

### 1. Starten

- Im Issue prüfen: Sind alle Pakete unter „Abhängig von“ erledigt? Code-Abhängigkeiten (durchgezogene Pfeile in der [Übersicht](docs/pakete/README.md#reihenfolge)) müssen in `dev` gemerged sein; Entscheidungen (WP-00) und Design (WP-03 Teil A) sperren nur die Teile, die die Paket-Spec daran bindet.
- Das Issue auf dem Board nach **In Arbeit** ziehen.
- Branch anlegen:

```bash
git switch dev
git pull
git switch -c tony/wp-05-hero-leistungen
```

### 2. Arbeiten

- Kleine, sinnvolle Commits machen (siehe [Commit-Nachrichten](#commit-nachrichten)).
- Regelmäßig pushen: beim ersten Mal `git push -u origin tony/wp-05-hero-leistungen`, danach `git push`.
- Vor dem Push lokal prüfen (verfügbar ab WP-01):

```bash
npm run check && npm run lint && npm run format:check && npm run build
```

### 3. Aktuell bleiben

Wenn in `dev` etwas Neues ist, das du brauchst, spätestens aber vor dem PR:

```bash
git fetch origin
git merge origin/dev
```

Wir **mergen** `dev` in den Paket-Branch und rebasen nicht. Das ist einfacher, und niemand braucht `--force`.

### 4. Pull Request öffnen

- Ziel-Branch ist **`dev`** (nicht `main`!).
- Titel im Commit-Format, z. B. `feat(hero): Hero und Leistungen umsetzen (WP-05)`.
- In die Beschreibung `Closes #8` schreiben, dann schließt sich das Issue beim Merge automatisch. Liefert ein Paket mehrere PRs, schreiben die ersten `Refs #8` und erst der letzte `Closes #8`.
- Die PR-Vorlage ausfüllen (Checkliste, Screenshots mobil und Desktop).
- Am besten früh als **Draft-PR** öffnen, dann sieht der andere den Stand und die Deploy-Preview.

### 5. Review

Der andere wird automatisch als Reviewer eingetragen (über `.github/CODEOWNERS`). Mehr dazu unter [Reviews](#reviews).

### 6. Mergen

- Sobald die CI grün ist und es ein Approval gibt: **„Squash and merge“**. So landet ein sauberer Commit pro Paket in `dev`.
- Den Branch danach löschen (Button im PR, oder automatisch, siehe [Einmalige Einrichtung](#einmalige-einrichtung)).
- Lokal aufräumen:

```bash
git switch dev
git pull
git branch -D tony/wp-05-hero-leistungen   # -D, weil Squash-Merges für Git „nicht gemerged“ aussehen
```

## Wem gehört welche Datei?

Jede Datei gehört genau einem Paket, siehe [Zuständigkeitsmatrix](docs/pakete/README.md#zuständigkeitsmatrix).

| Fall | Regel |
|---|---|
| **Eigene Dateien** | frei ändern |
| **Fremde Dateien** | nur, wenn die eigene Paket-Spec (Abschnitt „Ändert nach Absprache“) oder die Zuständigkeitsmatrix (Spalte „Hinweis“) es ausdrücklich erlaubt; dann im Issue des Owners kurz Bescheid geben und als kleinen, eigenen Commit. Sonst: Issue mit Label `spec-frage` |
| **Gemeinsame Dateien** (`package.json`, `package-lock.json`, `SPECS.md`, `CONTRIBUTING.md`, `docs/`) | Änderung im PR-Text erwähnen |
| **Neue npm-Pakete** | vorher im eigenen Issue ankündigen, damit der andere nicht dasselbe Problem anders löst. Versionen werden exakt eingetragen (`.npmrc` mit `save-exact=true`, kein `^`) |
| **UI-Bausteine** (`src/components/ui/`) | Props und Icon-Liste sind Schnittstellen: Änderungen nur per Spec-Änderung (`spec:`-PR, beide geben frei) |
| **Content-Schema** (`src/content.config.ts`) | Schnittstelle: Änderungen nur per Spec-Änderung (`spec:`-PR, beide geben frei) |
| **Neue Projekte** (`src/content/projects/`) | darf jeder anlegen, neue Datei = kein Konflikt |

## Code-Regeln

Die festen Konventionen stehen in [SPECS §10](SPECS.md#feste-konventionen). Die wichtigsten für den Alltag:

- **Nur ausfüllen, nicht neu erfinden:** Jede Datei existiert schon mit fester Schnittstelle. Keine neuen gemeinsamen Bausteine, Props, Textschlüssel, Token-Namen oder Icons ohne Spec-Änderung.
- **Texte** nur aus `src/i18n/de/<bereich>.ts`, **Daten** (Name, E-Mail, URLs) nur aus `src/config/site.ts`. Markenname und Region in Texten als `{name}` / `{region}`, eingesetzt mit `fill()`.
- **Gestaltung** nur mit Token-Klassen (`bg-surface`, `text-ink`, `bg-primary` …), keine Farbwerte im Code, kein `style`-Attribut, kein `<style>`-Block (eigenes CSS nur in `src/styles/global.css`). Klassen im `class`-Attribut oder in Variablen mit Namen auf `Classes`/`Variants` (z. B. `variantClasses`), nur dort prüft der Linter. `npm run lint` meldet unbekannte Klassen, Farbwerte in eckigen Klammern, doppelte oder widersprüchliche Klassen, `style`-Attribute und `<style>`-Blöcke; `npm run format` sortiert die Klassen.
- **Interne Links** enden mit `/`: `/impressum/`, `/datenschutz/`, `/#kontakt`.
- **Skripte** als normales `<script>` **ohne Attribute** in der Komponente, **kein** `is:inline`, **kein** `define:vars`, kein `onclick=` (sonst landet das Skript inline und die Sicherheitsrichtlinie blockiert es auf der Live-Seite). Daten über `data-*`-Attribute an HTML-Elementen übergeben, z. B. am `<form>`, nie am `<script>`-Tag. Ausnahmen laut SPECS §10: JSON-LD in `SEO.astro` (WP-09) und das externe Statistik-Skript in `Analytics.astro` (WP-13). `npm run lint` meldet Verstöße.
- **Bilder** über `<Picture>` aus `astro:assets`, nie als `<img>` ohne Größe; immer PNG, JPG oder WebP, nie SVG.
- **Icons** nur über `<Icon name="…" />` aus der festen Liste; Lucide direkt zu importieren meldet `npm run lint`.

## Spec ändern und neue Ideen

Ab Spec-Version 1.0 gilt [SPECS §16](SPECS.md#16-änderungsregeln):

| Situation | Was tun |
|---|---|
| Neue Idee, auch eine kleine | Issue mit Label `idee` anlegen. Sie wird **nicht** in das laufende Paket eingebaut, sondern für V2 gesammelt. |
| Die Spec passt nicht (Lücke, Widerspruch, technisch nicht möglich) | An der Stelle anhalten, Issue mit Label `spec-frage` anlegen, gemeinsam entscheiden. Erst die Spec per PR ändern, dann den Code. |
| Spec-Änderung (auch Props, Textschlüssel, Token-Namen, Dateiliste) | PR mit Titel `spec: …`, **beide** geben frei, Version in SPECS.md hochzählen und in der Änderungshistorie eintragen. |
| Tippfehler im eigenen Text, neues Projekt, Bugfix ohne Schnittstellenänderung | normaler PR, keine Spec-Änderung nötig |

## Merge-Konflikte lösen

1. `dev` in deinen Branch holen:

   ```bash
   git fetch origin
   git merge origin/dev
   ```

2. Konfliktdateien öffnen. VS Code zeigt Buttons wie „Accept Current / Incoming / Both“.
3. **Konflikt in `package-lock.json`:** nicht von Hand lösen, sondern so:

   ```bash
   git checkout origin/dev -- package-lock.json
   npm install
   git add package-lock.json
   ```

4. **Konflikt in einer fremden Datei:** kurz mit dem Owner abstimmen, welche Version gilt.
5. `npm run build` laufen lassen, dann committen und pushen:

   ```bash
   git commit
   git push
   ```

**Niemals** `git push --force` auf `dev` oder `main`. Weil wir mergen statt zu rebasen, braucht es Force-Push auch auf dem eigenen Branch normalerweise nie.

## Commit-Nachrichten

Wir nutzen [Conventional Commits](https://www.conventionalcommits.org/de/):

```text
<typ>(<bereich>): <was, im Imperativ>
```

| Typ | Wann |
|---|---|
| `feat` | neue Funktion oder Sektion |
| `fix` | Fehler behoben |
| `style` | nur Optik/CSS, keine Logik |
| `refactor` | Umbau ohne neue Funktion |
| `content` | nur Texte, Bilder, Projekte |
| `docs` | Dokumentation, Specs |
| `ci` | GitHub Actions, Netlify |
| `chore` | Abhängigkeiten, Konfiguration |

Beispiele:

```text
feat(header): Burger-Menü für Mobilgeräte
fix(kontakt): Fehlermeldung bei leerer E-Mail anzeigen
content(projekte): Demo „Trattoria“ hinzufügen
docs(specs): Entscheidungen aus WP-00 eintragen
```

## Reviews

**Als Autor**
- PR klein halten: ein Paket oder weniger. Große Pakete dürfen mehrere PRs haben.
- Screenshots mobil und Desktop anhängen, auf die Deploy-Preview verlinken.

**Als Reviewer**
- Innerhalb von **24 Stunden** antworten (oder kurz Bescheid geben, wann).
- Prüfen: Akzeptanzkriterien erfüllt? Deploy-Preview **auf dem Handy** angesehen? Code verständlich? Nur eigene Dateien geändert?
- Kommentare klar kennzeichnen:
  - **muss:** blockiert den Merge
  - **Vorschlag:** optional, der Autor entscheidet
  - **Frage:** Verständnis, blockiert nicht
- Freundlich und konkret bleiben: das Problem beschreiben, nicht die Person.

## Issues, Labels und Board

- **Jedes Paket = ein Issue**, verlinkt mit seiner Spec. Die Release-Issues [#1 V1.0](https://github.com/JulianRudrich/Landingpage/issues/1) und [#2 V1.1](https://github.com/JulianRudrich/Landingpage/issues/2) sammeln die Pakete als Sub-Issues.
- **Neues Paket:** Issue mit der Vorlage **„Arbeitspaket“** anlegen und eine Spec in `docs/pakete/` ergänzen (siehe [Neues Paket anlegen](docs/pakete/README.md#neues-paket-anlegen)).
- **Bugs und Kleinkram:** normales Issue mit passendem Label.

| Label | Bedeutung |
|---|---|
| `paket` | Arbeitspaket mit eigener Spec |
| `orga` | Organisatorisches ohne Code |
| `technik` | Schwerpunkt Technik |
| `design` | Schwerpunkt Gestaltung/UI |
| `inhalt` | Schwerpunkt Texte, Bilder, Recht |
| `blockiert` | wartet auf etwas; den Grund als Kommentar ins Issue schreiben |
| `idee` | neue Idee für V2, wird nicht sofort umgesetzt |
| `spec-frage` | die Spec passt an einer Stelle nicht, muss gemeinsam entschieden werden |
| `v1.0`, `v1.1` | gehört zu diesem Release |

## Release: dev → main

1. Alle Pakete des Releases sind in `dev`, Staging ist geprüft, die Release-Checkliste aus [SPECS §14](SPECS.md#14-definition-of-done) ist erfüllt.
2. PR von `dev` nach `main` mit dem Titel `release: v1.0.0`.
3. Mergen mit **„Create a merge commit“**, **nicht** Squash, sonst laufen `dev` und `main` auseinander.
4. Auf GitHub unter **Releases → Draft a new release** den Tag `v1.0.0` auf `main` setzen, kurze Notizen dazu.
5. Netlify deployt `main` automatisch auf die Domain.

Auch dringende Korrekturen gehen über `dev` → `main` (als kleines Release, z. B. `v1.0.1`).

## Einmalige Einrichtung

Diese Schritte macht **Julian** (Admin des Repos) einmal in den GitHub-Einstellungen.

### Branch-Schutz

**Settings → Rules → Rulesets → New ruleset → New branch ruleset**

- Name: `schutz-main-dev`, Enforcement status: **Active**
- Target branches: `main` und `dev` hinzufügen
- ✅ Restrict deletions
- ✅ Require a pull request before merging → Required approvals: **1**
- ✅ Require status checks to pass → Check `build` hinzufügen (erst möglich, nachdem die CI aus WP-02 einmal gelaufen ist; ab V1.1 auch `quality` aus WP-14)
- ✅ Block force pushes
- Bypass: für Notfälle darf der Repo-Admin umgehen, nur nach Absprache

### Standard-Branch

**Settings → General → Default branch** → auf **`dev`** umstellen. Nur dann schließt `Closes #N` das Issue beim Merge nach `dev` automatisch (GitHub wertet die Schlüsselwörter nur für den Standard-Branch aus), und neue PRs zielen von selbst auf `dev`. Der Release-PR geht weiterhin von `dev` nach `main`. Erst damit greifen auch die PR- und Issue-Vorlagen aus `.github/`, die GitHub nur aus dem Standard-Branch liest. Achtung beim Verbinden der Netlify-Site (WP-02): Netlify schlägt den Standard-Branch als Production-Branch vor, dort muss trotzdem `main` stehen.

### Merge-Einstellungen

**Settings → General → Pull Requests**

- ✅ Allow squash merging (für Paket-PRs)
- ✅ Allow merge commits (für Release-PRs)
- ✅ Automatically delete head branches

### Labels

Die Labels `paket`, `orga`, `technik`, `design`, `inhalt`, `v1.0` und `v1.1` existieren bereits. **`blockiert`**, **`idee`** und **`spec-frage`** einmal unter **Issues → Labels → New label** anlegen.

### Project-Board

1. Im Repo auf den Reiter **Projects** → neues Projekt mit der Vorlage **Board** anlegen und mit dem Repo verknüpfen.
2. Spalten: **Backlog**, **Bereit**, **In Arbeit**, **Review**, **Fertig**.
3. Alle offenen Issues hinzufügen. Pakete, deren Abhängigkeiten erledigt sind, kommen nach **Bereit**.
4. In den Workflows des Boards aktivieren: „Item closed“ → **Fertig**, „Pull request merged“ → **Fertig**.

## Hilfe, ich habe …

**… aus Versehen auf `dev` committet** (der Push wird vom Branch-Schutz abgelehnt):

```bash
git switch -c tony/wp-05-hero-leistungen   # nimmt deine Commits in einen neuen Branch mit
git switch dev
git reset --hard origin/dev                # setzt dein lokales dev zurück
git switch tony/wp-05-hero-leistungen
```

**… im falschen Branch angefangen, aber noch nicht committet:**

```bash
git stash
git switch richtiger-branch
git stash pop
```

**… keine Ahnung, wo ich gerade bin:**

```bash
git status
git log --oneline -5
```

Im Zweifel: **nichts löschen, nichts forcen**, den anderen fragen.
