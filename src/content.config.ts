// Content Collections – gehört WP-06 (Projekte). Das Schema ist ein Vertrag mit WP-12 (Detailseiten):
// Änderungen nur per Spec-Änderung (SPECS.md §16). Anleitung "Neues Projekt hinzufügen": docs/pakete/WP-06-projekte.md
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { site } from '@/config/site';

/** Der Seitentitel "{title} | {name}" darf höchstens 60 Zeichen lang sein (NFA-09). */
const maxTitleLength = 60 - ' | '.length - site.name.length;

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => {
    /**
     * Nur Rasterbilder (PNG, JPG, WebP): SVG lässt sich nicht in AVIF/WebP umwandeln (NFA-04).
     * Beim Einlesen der Inhalte steht hier noch der Dateipfad, später das Bild-Objekt – beides prüfen.
     */
    const isNotSvg = (img: unknown) =>
      typeof img === 'string'
        ? !img.toLowerCase().endsWith('.svg')
        : (img as { format?: string }).format !== 'svg';
    const rasterImage = image().refine(isNotSvg, {
      message: 'Projektbilder müssen PNG, JPG oder WebP sein, kein SVG.',
    });

    return z.object({
      /** Projektname, wird zur Überschrift der Karte und der Detailseite */
      title: z.string().max(maxTitleLength),
      /** Kurztext für Karte und Meta-Description, höchstens 155 Zeichen */
      summary: z.string().max(155),
      /** Branche, z. B. "Gastronomie" */
      industry: z.string(),
      /** Eingesetzte Technik, z. B. ["Astro", "Supabase"] */
      tech: z.array(z.string()).min(1),
      /** Ehrliche Kennzeichnung (R-07): live = echtes Projekt online, prototyp = klickbare Demo, konzept = Entwurf */
      status: z.enum(['live', 'prototyp', 'konzept']),
      /** Vorschaubild in src/assets/projects/, mindestens 1600 px breit */
      cover: rasterImage,
      coverAlt: z.string(),
      /** Weitere Bilder für die Galerie der Detailseite (WP-12) */
      gallery: z.array(z.object({ src: rasterImage, alt: z.string() })).default([]),
      /** Link zur laufenden Demo (eigene Subdomain, noindex) */
      demoUrl: z.url().optional(),
      /** Link zum öffentlichen Code, falls vorhanden (Detailseite, WP-12) */
      repoUrl: z.url().optional(),
      /** Hervorgehobene Projekte stehen auf der Startseite vorn */
      featured: z.boolean().default(false),
      /** Sortierung: kleinere Zahl = weiter vorn */
      order: z.number().int().default(100),
    });
  },
});

export const collections = { projects };
