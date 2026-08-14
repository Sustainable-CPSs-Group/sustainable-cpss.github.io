# Sustainable Cyber-Physical Systems Focus Group

This repository is the source for the website of the **Sustainable Cyber-Physical Systems**
Focus Group at the [TUM Institute for Advanced Study](https://www.ias.tum.de/), funded by a
Dieter Schwarz Courageous Research Grant. The group develops models, algorithms and tools for
sustainable cyber-physical systems: energy-efficient and batteryless designs, lightweight but
provably safe autonomy, edge-first computing, and systems that adapt themselves and warn before
they fail.

**Live site:** <https://sustainable-cpss-group.github.io/>

## Local development

Ruby and Bundler are **not** required on the host — everything runs through Docker.

```bash
docker compose up -d      # start the dev server
# open http://localhost:8080/
docker compose down       # stop it
```

`docker compose logs -f` follows the build/rebuild output. Config changes (`_config.yml`) are
picked up by an in-container watcher and restart Jekyll automatically; other files hot-reload.

## Where things live

- `_pages/` — static pages (about, research, people, publications, …)
- `_news/` — short news/announcement items shown on the homepage
- `_posts/` — blog posts
- `_bibliography/papers.bib` — the publication list
- `_data/` — structured data (socials, coauthors, generated citation counts, …)
- `assets/img/people/` — profile photos

## For coding agents

If you are an AI coding agent working in this repository, start with
[`AGENTS.md`](AGENTS.md) — it is the authoritative entry point for change routing, ownership
boundaries, and the validated local command set.

## Credits

Built with [Jekyll](https://jekyllrb.com/) and the [al-folio](https://github.com/alshedivat/al-folio)
theme.
