# Editing content

Run `docker compose up --build` and open [localhost:4321](http://localhost:4321). Edit the source files with any text editor and save to see your changes.

## Edit the research overview

Edit `src/content/pages/research.md` to update the research page. Its `areas` list at the top also supplies the four research summaries on the homepage:

```yaml
areas:
  - title: Low-power wireless and BLE
    description: A short explanation of this research area.
```

Change each title and description as needed, keeping the indentation. The Markdown below the closing `---` supplies the full research page. When updating the text, distinguish published results, prototype experiments, and planned work.

The homepage introduction and its search description are in `src/content/pages/about.md`.

## Write a post

Create a Markdown file directly in `src/content/posts/`. Use a filename such as `2026-10-01-new-paper.md`:

```markdown
---
title: A new paper on energy-efficient sensing
date: 2026-10-01
description: What we studied and what we found, in one sentence.
tags: [publications, energy-harvesting]
hero: ../../assets/img/blog/new-paper/overview.png
heroAlt: A diagram showing the sensor and its wireless connection
bibliography: new-paper.bib
---

Introduce the paper and explain the question it addresses.

## Results

Describe the result and the conditions under which it was obtained.
```

The `hero` image and `bibliography` fields are optional. Remove them if you do not need them. If you keep `hero`, provide a useful `heroAlt` description. Tags can also be omitted.

The filename determines the URL. This example appears at `/blog/2026/new-paper/`. Keep post Markdown files directly in the posts folder; use folders under `src/assets/img/blog/` for their images.

## Add images and captions

Store post images in `src/assets/img/blog/<post-name>/`. From a post file, write:

```markdown
![An accelerometer attached to the fan](../../assets/img/blog/new-paper/experiment.png)

*The accelerometer measures vibration while the fan is running.*
```

The image description is read by screen readers and appears if the image cannot load. An italic paragraph immediately after an image becomes its visible caption. The site groups the image and caption in a figure with consistent spacing and styling.

Astro reads the original image, records its dimensions, and generates optimised versions for different screen sizes. Use Markdown image syntax for images inside posts. In Astro templates, use `Image` from `astro:assets`.

Keep downloadable files that should be copied unchanged, such as PDFs, in `public/`. Portraits and figures used on pages belong in `src/assets/img/`, not `public/`.

## Write equations

Use single dollar signs for inline mathematics: `$E = P \cdot t$`.

For a displayed equation, put two dollar signs on their own lines:

```text
$$
E_{total} = \sum_{i=1}^{n} P_i t_i
$$
```

The site renders equations with KaTeX.

## Cite references in a post

Create `src/content/references/new-paper.bib`:

```bibtex
@article{example2026,
  title = {An example paper},
  author = {Doe, Jane and Smith, Alex},
  year = {2026},
  journal = {Example Journal}
}
```

Set `bibliography: new-paper.bib` in the post’s opening block. In the text, write:

```markdown
We follow the approach described in the paper [@example2026].
```

The citation links to the reference list at the end of the post. Each citation key must exist in that post’s bibliography. The checks report missing bibliography files and broken citation links.

## Add a publication

Add an entry to `src/data/publications.bib`:

```bibtex
@article{example2026,
  title = {An example paper},
  author = {Doe, Jane and Smith, Alex},
  year = {2026},
  journal = {Example Journal},
  abbr = {EJ},
  selected = {true}
}
```

Use a unique key for each paper. Add `doi`, `url`, or `pdf` when available. Add `note` for information such as acceptance status. Set `selected = {true}` to include the paper on the homepage.

The group publication list and post bibliographies are separate. To cite a group paper in a post, include its entry in the post’s bibliography too.

## Add or update a person

Copy a Markdown file in `src/content/people/`. Update the name, role, institution, group role, summary, links, and biography. Put the portrait in `src/assets/img/people/` and use:

```yaml
image: ../../assets/img/people/new-person.jpg
imageAlt: Portrait of the person's name
order: 7
```

Use the `order` field to choose the position on the people page. Keep names and email addresses in the same format as the existing profiles.

## Post a short news item

Create `src/content/news/2026-10-01-paper-accepted.md`:

```markdown
---
date: 2026-10-01
title: Our paper has been accepted for publication.
link: /blog/2026/new-paper/
---
```

The homepage shows the three most recent items. The `title` is the text shown there; text below the opening block is not displayed in the news list. The link is optional.

## Link to another page

Use Markdown links with paths starting at the site root:

```markdown
See our [research](/research/) and [publications](/publications/).
```

The build adds the GitHub Pages repository path when needed. Leave external links as full URLs, such as `https://example.org/paper`. For local images, use the relative file paths described above.

## Check before submitting

```bash
docker compose run --build --rm site npm run ci
```

This runs entirely inside Docker. Commit your Markdown, BibTeX, and original image files; do not commit generated files from `dist/`.
