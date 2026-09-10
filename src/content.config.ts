import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    hero: z.string().optional(),
    heroAlt: z.string().optional(),
    bibliography: z.string().optional(),
  }),
});

const people = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/people" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    institution: z.string(),
    groupRole: z.string(),
    summary: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    order: z.number(),
    email: z.email().optional(),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({ title: z.string(), description: z.string() }),
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    link: z.string().optional(),
  }),
});

export const collections = { posts, people, pages, news };
