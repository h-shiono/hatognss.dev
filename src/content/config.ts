import { defineCollection, reference, z } from 'astro:content';

const award = z.object({
  name: z.string(),
  venue: z.string().optional(),
  year: z.number().int(),
  url: z.string().url().optional(),
  type: z.enum(['paper', 'presentation', 'other']).optional(),
});

const publications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number().int(),
    type: z.enum([
      'journal',
      'conference',
      'popular',
      'preprint',
      'thesis',
      'other',
    ]),
    status: z.enum([
      'published',
      'accepted',
      'submitted',
      'in-revision',
      'in-prep',
    ]),
    doi: z.string().optional(),
    url: z.string().url().optional(),
    pdf: z.string().optional(),
    abstract: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    date: z.date(),
    issue: z.string().optional(),
    pages: z.string().optional(),
    notes: z.string().optional(),
    republished_in: z.string().optional(),
    presented_at: reference('talks').optional(),
    awards: z.array(award).optional(),
  }),
});

const talks = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      event: z.string(),
      date: z.date(),
      location: z.string().optional(),
      type: z.enum(['invited', 'oral', 'poster', 'tutorial', 'seminar']),
      slides_url: z.string().url().optional(),
      slides_pdf: z.string().optional(),
      video_url: z.string().url().optional(),
      url: z.string().url().optional(),
      abstract: z.string(),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      lat: z.number().min(-90).max(90).optional(),
      lng: z.number().min(-180).max(180).optional(),
      thumbnail: image().optional(),
      related_publication: reference('publications').optional(),
      awards: z.array(award).optional(),
    }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['oss', 'work', 'hobby']),
    status: z.enum([
      'active',
      'maintenance',
      'archived',
      'alpha',
      'beta',
      'planning',
    ]),
    summary: z.string(),
    description: z.string().optional(),
    repo: z.string().url().optional(),
    website: z.string().url().optional(),
    demo: z.string().url().optional(),
    docs: z.string().url().optional(),
    tech: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    highlights: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    startDate: z.date(),
    updatedDate: z.date().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    language: z.enum(['ja', 'en']),
  }),
});

export const collections = { publications, talks, projects, blog };
