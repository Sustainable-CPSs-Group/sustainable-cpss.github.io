# Sustainable Cyber-Physical Systems

Website for the Sustainable Cyber-Physical Systems Focus Group at the TUM Institute for Advanced Study.

You can edit the text in Markdown files and the publication list in BibTeX. You only need **Docker with Docker Compose** to run the site. Node.js and npm run inside the container; you do not need to install them on your computer.

## Run the website

Start Docker, then open a terminal in the repository folder:

```bash
docker compose up --build
```

Open [localhost:4321](http://localhost:4321). The first build downloads the tools and dependencies, so it takes longer than later starts.

If you have not downloaded the repository yet:

```bash
git clone https://github.com/Sustainable-CPSs-Group/sustainable-cpss.github.io.git
cd sustainable-cpss.github.io
```

While the Astro migration is being reviewed, switch to its branch with `git switch astro-redesign` before starting Docker.

Leave the terminal running while you edit. Saved changes to text, images, and styles appear in the browser automatically. Press **Ctrl+C** to stop, then run `docker compose down` to remove the stopped container.

## Where to make changes

| What you want to change | File or folder |
| --- | --- |
| Homepage introduction | `src/content/pages/about.md` |
| Research description | `src/content/pages/research.md` |
| People and biographies | `src/content/people/` |
| Research posts | `src/content/posts/` |
| Short news announcements | `src/content/news/` |
| Publication list | `src/data/publications.bib` |
| References for an individual post | `src/content/references/` |
| Portraits and post images | `src/assets/img/` |
| Colours, fonts, and spacing | `src/styles/global.css` |
| Header, navigation, and footer | `src/layouts/BaseLayout.astro` |

Open these files in any text editor. The small block between `---` lines at the top of a Markdown file holds information such as its title and date. The text below it is the page content.

For example:

```markdown
---
title: Research
description: A short introduction to our research.
---

This is a paragraph. Use **bold** or *italics* when needed.

## A section heading

Write the section here.
```

## Add a post, image, or paper

- **Post:** copy a file in `src/content/posts/`, give it a new name such as `2026-10-01-new-paper.md`, and change its title, date, description, and text.
- **Image:** put the file in `src/assets/img/blog/your-post/`. Use a relative path in Markdown, as shown below. Astro creates optimised images automatically.
- **Publication:** add a BibTeX entry to `src/data/publications.bib`. Add `selected = {true}` to show it on the homepage as well.
- **Person:** copy a profile in `src/content/people/`, then update the details and portrait path. The `order` number controls the display order.
- **News:** copy an announcement in `src/content/news/` and update the date, title, and optional link.

Image example, from a post stored directly in `src/content/posts/`:

```markdown
![A sensor attached to the test rig](../../assets/img/blog/your-post/experiment.png)

*The test rig used in the experiment.*
```

Use ordinary Markdown images rather than HTML `<img>` tags. Keep the original image in `src/assets/`; you do not need to resize it by hand or write an Astro component.

See [the authoring guide](AUTHORING.md) for complete examples of posts, portraits, news, equations, and references.

## Check your changes

Run this before submitting a change:

```bash
docker compose run --build --rm site npm run ci
```

Everything in this command runs inside Docker. It checks the code and content, builds the site, and checks local links, reference anchors, image dimensions, and image files. Errors name the file or link that needs attention. External websites are not checked.

To save a copy of the finished website on your computer:

```bash
docker build --target export --output type=local,dest=dist .
```

The result is in `dist/`. This generated folder should not be committed.

## Submit and publish changes

Commit your edited content and image files on a branch, push it, and open a pull request. GitHub runs the **Quality** workflow automatically. It checks the site both at the domain root and under a repository path.

After a pull request is merged into `main`, **Deploy to GitHub Pages** checks and builds the site in Docker, then publishes it. Pull requests do not publish the live website.

A repository administrator needs to select **Settings → Pages → Build and deployment → Source: GitHub Actions** once. The deployment workflow reads the configured Pages URL, including any repository path or custom domain. There is no need to hard-code that address in your Markdown links.

The workflows are in `.github/workflows/`. Deployment permissions are limited to the deployment job, and the build uses the committed `package-lock.json` for consistent dependencies.

## Common problems

**Changes to dependencies or Docker settings do not appear**

Stop the running container and run `docker compose up --build` again after pulling changes. Source files update live; changes to `package.json`, `package-lock.json`, Docker files, or checking scripts need a rebuild.

**Port 4321 is already in use**

Stop the other site using that port, or change the first number in `"4321:4321"` in `docker-compose.yml` to `4322`. Then open [localhost:4322](http://localhost:4322).

**An image does not appear**

Check the spelling and capitalisation of its filename. The path is relative to the Markdown file, not the repository root. Use `../../assets/img/...` from the existing post and person folders. Run the check command above to find missing files.

**Docker fails to build**

Check that Docker is running and has an internet connection for the initial downloads. To get the full build log:

```bash
docker compose --progress plain build --no-cache
```

Share the first error from that log, along with the command you ran.
