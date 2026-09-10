# Content authoring

Most website changes require editing only Markdown, BibTeX, or images. Run `docker compose up --build` and preview changes at <http://localhost:4321>.

## Add an update

Create `src/content/posts/YYYY-MM-DD-short-title.md`:

```markdown
---
title: A concise title
date: 2026-09-10
description: One sentence used on listing pages and in search previews.
tags: [energy-harvesting, real-time]
hero: /assets/img/blog/short-title/overview.png
heroAlt: A meaningful description of the image
bibliography: short-title.bib
---

Write the update in Markdown.
```

The `hero`, `heroAlt`, and `bibliography` fields are optional. Put post images in `public/assets/img/blog/<short-title>/`.

## Images

Use ordinary Markdown:

```markdown
![Description of the experiment](/assets/img/blog/short-title/experiment.png)
```

For a caption, use a small HTML figure inside the Markdown file:

```html
<figure>
  <img src="/assets/img/blog/short-title/experiment.png" alt="Description of the experiment" loading="lazy" />
  <figcaption>What the reader should notice.</figcaption>
</figure>
```

## Mathematics

Inline mathematics uses single dollar signs: `$E = P \cdot t$`.

Display mathematics uses a pair of dollar signs:

```text
$$
E_{total} = \sum_{i=1}^{n} P_i t_i
$$
```

KaTeX renders both forms during the static build.

## Post references

Create `src/content/references/short-title.bib` and set `bibliography: short-title.bib` in the post front matter. Cite a key with `[@paperKey]`:

```markdown
The configuration follows the latency-budget method [@paperKey].
```

The citation links to the formatted reference list automatically appended to the post.

## Add a publication

Add a standard BibTeX entry to `src/data/publications.bib`. The publications page and selected work on the homepage are generated from this file. Set `selected = {true}` to feature an entry on the homepage. Optional fields include `doi`, `url`, `pdf`, `abbr`, `note`, and `abstract`.

## Add or update a person

People are individual Markdown files in `src/content/people/`. Copy an existing profile and edit its front matter and body. The `order` number controls its position on the people page.
