import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkCitations from "./src/lib/remark-citations.mjs";

export default defineConfig({
  site: "https://sustainable-cpss-group.github.io",
  integrations: [sitemap()],
  output: "static",
  trailingSlash: "always",
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkCitations],
      rehypePlugins: [rehypeKatex],
    }),
  },
});
