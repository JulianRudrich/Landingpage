# Landingpage

Dies wird die Landingpage von Tony und Julian.

## Wo steht was?

| Dokument | Inhalt |
|---|---|
| [SPECS.md](SPECS.md) | **Was** die Website können muss: Ziele, Zielgruppe, Anforderungen, Design, Technik, Recht |
| [docs/pakete/](docs/pakete/README.md) | **Wer was baut:** Arbeitspakete, Reihenfolge, welche Datei wem gehört |
| [CONTRIBUTING.md](CONTRIBUTING.md) | **Wie** wir auf GitHub arbeiten: Branches, Pull Requests, Reviews, Releases |

**Aktueller Stand:** [Issues](https://github.com/JulianRudrich/Landingpage/issues) · Release-Fortschritt in [#1 V1.0](https://github.com/JulianRudrich/Landingpage/issues/1) und [#2 V1.1](https://github.com/JulianRudrich/Landingpage/issues/2)

**Tech-Stack:** Astro · Tailwind CSS · TypeScript · Netlify

## Lokale Entwicklung

**Voraussetzung:** Node.js 24 (LTS), siehe `.nvmrc`. Mit [nvm](https://github.com/nvm-sh/nvm) reicht im Projektordner `nvm install && nvm use`.

```bash
npm install     # einmalig bzw. nach Änderungen an package.json
npm run dev     # Entwicklungsserver auf http://localhost:4321
```

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver mit Live-Reload |
| `npm run build` | Produktions-Build nach `dist/` |
| `npm run preview` | den Build lokal ansehen |
| `npm run check` | Astro- und TypeScript-Prüfung |
| `npm run lint` | ESLint, inklusive Barrierefreiheits-Regeln |
| `npm run format` | Code formatieren (Prettier) und Tailwind-Klassen sortieren (ESLint `--fix`) |
| `npm run format:check` | nur prüfen, ob alles formatiert ist |

**Vor jedem Push** müssen diese vier Befehle fehlerfrei durchlaufen:

```bash
npm run check && npm run lint && npm run format:check && npm run build
```

In VS Code schlägt das Projekt beim Öffnen die passenden Erweiterungen vor (Astro, Tailwind, ESLint, Prettier).

**Gut zu wissen**

- Alle Seiten-URLs enden mit `/` (z. B. `/impressum/`). Im Dev-Server ergibt `/impressum` ohne `/` absichtlich eine 404-Seite, damit falsch geschriebene interne Links sofort auffallen. Auf der Live-Seite leitet Netlify automatisch um.
- Unter `/styleguide/` sieht man alle UI-Bausteine und Icons auf einen Blick.
