// Content Collections – gehört WP-06 (Projekte). Das Schema ist ein Vertrag mit WP-12 (Detailseiten):
// Änderungen vorher absprechen. Anleitung "Neues Projekt hinzufügen": docs/pakete/WP-06-projekte.md
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Leistungen L1–L4 aus SPECS.md, Abschnitt 4 */
const serviceIds = ['L1', 'L2', 'L3', 'L4'] as const;

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      /** Projektname, wird zur Überschrift der Karte und der Detailseite */
      title: z.string(),
      /** Kurztext für Karte und Meta-Description, höchstens 160 Zeichen */
      summary: z.string().max(160),
      /** Branche, z. B. "Gastronomie" */
      industry: z.string(),
      /** Welche Leistungen das Projekt zeigt */
      services: z.array(z.enum(serviceIds)).min(1),
      /** Eingesetzte Technik, z. B. ["Astro", "Supabase"] */
      tech: z.array(z.string()).min(1),
      /** Ehrliche Kennzeichnung (R-07): live = echtes Projekt online, prototyp = klickbare Demo, konzept = Entwurf */
      status: z.enum(['live', 'prototyp', 'konzept']),
      /** Vorschaubild (Datei in src/assets/projects/), mindestens 1600 px breit */
      cover: image(),
      coverAlt: z.string(),
      /** Weitere Bilder für die Galerie der Detailseite (WP-12) */
      gallery: z.array(z.object({ src: image(), alt: z.string() })).default([]),
      /** Link zur laufenden Demo (eigene Subdomain, noindex) */
      demoUrl: z.url().optional(),
      /** Link zum öffentlichen Code, falls vorhanden */
      repoUrl: z.url().optional(),
      /** Hervorgehobene Projekte stehen auf der Startseite vorn */
      featured: z.boolean().default(false),
      /** Sortierung: kleinere Zahl = weiter vorn */
      order: z.number().int().default(100),
      publishedAt: z.coerce.date(),
    }),
});

export const collections = { projects };
