# Copilot Coding Agent Instructions (v1.x)

**Read [`AGENTS.md`](../AGENTS.md) first — it is the authoritative entry point for all coding agents in this repo.** It carries the change-routing table, the stop sign for gem-owned paths, the three silent failure modes, and the validated command set. This file previously duplicated that content; it is now a pointer so the rules cannot drift apart.

In short: `al-folio` v1.x is a **thin Jekyll starter, not a theme**. It owns starter wiring (`Gemfile`, `_config.yml`), example content, and docs. The `test/integration_*.sh` scripts and `test/visual/` still exist on disk and are runnable by hand, but no CI workflow invokes them any more. All runtime — layouts, includes, Sass, Liquid tags, filters, feature JS — lives in versioned gems under [`al-org-dev`](https://github.com/al-org-dev). Route runtime changes to the owning gem.

## Where to look

| Question                             | File                                                                                          |
| ------------------------------------ | --------------------------------------------------------------------------------------------- |
| Which repo does my change belong in? | [`AGENTS.md`](../AGENTS.md#route-your-change)                                                 |
| Which gem owns this area?            | [`docs/BOUNDARIES.md`](../docs/BOUNDARIES.md)                                                 |
| Which gem owns this Liquid tag?      | [`docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md#wrapper-to-tag-to-gem-delegation)            |
| Why did my feature render nothing?   | [`docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md#failure-modes-that-produce-no-error-message) |
| What commands should I run?          | [`AGENTS.md`](../AGENTS.md#validated-local-command-set)                                       |
| How do I contribute?                 | [`docs/CONTRIBUTING.md`](../docs/CONTRIBUTING.md)                                             |

## Copilot-specific paths

- `.github/agents/` — custom agents (`customize.agent.md`, `docs.agent.md`).
- `.github/instructions/` — per-file-type instruction files (Liquid, YAML, BibTeX, Markdown, JavaScript).
- `.github/workflows/copilot-setup-steps.yml` — pre-installs Ruby, Python, Node, ImageMagick, and nbconvert for the coding agent.
- `.agents/skills/` — canonical agent skills, also exposed via the `.codex/skills` and `.claude/skills` symlinks.

## CI expectations

The live workflows are `broken-links-site.yml`, `codeql.yml`, `deploy.yml`, `prettier.yml`, `update-citations.yml` (manual trigger only), `update-tocs.yml`, and `upgrade-check.yml` (also runs weekly on a schedule). `unit-tests.yml` and `visual-regression.yml` were removed; `npm run lint:style-contract` and the `test/integration_*.sh` scripts still exist on disk but nothing invokes them automatically any more — run them by hand when your change touches that area.
