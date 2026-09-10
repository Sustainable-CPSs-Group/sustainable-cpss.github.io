import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkCitations from "./src/lib/remark-citations.mjs";
import remarkLinks from "./src/lib/remark-links.mjs";
import remarkFigures from "./src/lib/remark-figures.mjs";

const base = process.env.ASTRO_BASE || "/";

export default defineConfig({
  site: process.env.ASTRO_SITE || "https://sustainable-cpss-group.github.io",
  base,
  image: { layout: "constrained", objectFit: "contain" },
  integrations: [sitemap()],
  output: "static",
  trailingSlash: "always",
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkCitations, [remarkLinks, { base }], remarkFigures],
      rehypePlugins: [rehypeKatex],
    }),
  },
});
