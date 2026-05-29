import { defineCollection, z } from 'astro:content';

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    problem: z.string(),
    approach: z.string(),
    architecture: z.string(),
    impact: z.string(),
    tags: z.array(z.string()),
    order: z.number(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work };
