# Sustainable Cyber-Physical Systems

Website for the Sustainable Cyber-Physical Systems Focus Group at the TUM Institute for Advanced Study.

The site is built with Astro. Contributors only need Docker; Node.js and npm do not need to be installed on the host.

## Run the site

```bash
docker compose up --build
```

Open <http://localhost:4321>. Changes to source and content files are reloaded automatically.

Stop the server with `Ctrl+C`, then remove the container with:

```bash
docker compose down
```

## Validate a change

```bash
docker compose run --rm site npm run ci
```

This runs Astro's type/content checks and a production build, entirely inside Docker.

## Edit content

- Pages: `src/content/pages/`
- People: `src/content/people/`
- Updates: `src/content/posts/`
- News: `src/content/news/`
- Publications: `src/data/publications.bib`
- Post-specific references: `src/content/references/`
- Images: `public/assets/img/`

See [AUTHORING.md](AUTHORING.md) for examples covering images, equations, and citations.
