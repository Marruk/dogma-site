import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { toIsoDate } from './lib/dates';

// Pages CMS writes "" (or null) for optional fields that were left empty.
const blankToUndefined = (value: unknown) =>
  value === '' || value === null ? undefined : value;
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess(blankToUndefined, schema.optional());

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      seoTitle: optional(z.string()),
      description: z.string(),
      image: optional(image()),
      imageAlt: optional(z.string()),
    }),
});

const events = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.union([z.string(), z.date()]).transform(toIsoDate),
    time: optional(z.string()),
    venue: z.string(),
    address: optional(z.string()),
    mapUrl: optional(z.url()),
    ticketUrl: optional(z.url()),
  }),
});

const players = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/players' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      photo: image(),
    }),
});

export const collections = { pages, events, players };
