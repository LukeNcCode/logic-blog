# AGENTS.md

## Project overview

This repository is a lightweight single-page blog for GitHub Pages. The site is intentionally static: no build step, no backend, no framework runtime. Most changes are plain HTML, JavaScript, and Markdown.

Key files:
- `index.html`: app shell, theme, routing, UI, and translations
- `data/posts.js`: article metadata list used by the homepage and list views
- `data/site.js`: site settings such as GitHub/social links and version info
- `data/content/*.md`: article body content loaded on demand
- `README.md`: user-facing deployment and authoring instructions

## Working conventions

- Keep the project static and dependency-light. Prefer direct edits to HTML/JS/Markdown instead of introducing a framework or build tooling.
- The blog loads metadata from `data/posts.js` and reads article bodies from `data/content/*.md` only when a post is opened.
- Articles are identified by their `id` value. When adding or renaming a post, update both the metadata entry and the corresponding Markdown file.
- Keep `status` values consistent: `published` shows in the site, `draft` keeps it hidden.
- If you change site-wide content, prefer the existing config/data patterns rather than inventing new storage formats.

## Content authoring

To add a new article:
1. Create `data/content/<article-id>.md` with Markdown content.
2. Add a matching entry in `data/posts.js` with at least: `id`, `status`, `date`, `tags`, `title`, `summary`, and `contentLen`.
3. Keep `contentLen` roughly aligned with the article length for display/reading-time estimates.

For local preview, do not open the HTML via `file://` as the primary workflow. The app fetches Markdown content and browser security blocks that pattern from a local file opening.

## Preview and verification

Use a static server from the repo root, for example:

```bash
npx serve
```

Then open:

```text
http://localhost:3000/
```

This is the expected local preview flow. Refresh the page after edits.

## Deployment notes

This project is designed for GitHub Pages:
- Keep the repo root deployable as static content.
- Preserve `.nojekyll` if the repo expects it.
- Deployment is done through GitHub repository settings; no CI pipeline is required for normal content changes.

## Guardrails for AI coding agents

- Do not assume there is a build system unless one is explicitly added.
- Do not introduce frameworks, Node server logic, or package setup unless the user asks for it.
- Keep edits minimal and consistent with the existing single-file SPA style.
- If a change affects content structure, keep `data/posts.js` and `data/content/*.md` aligned.
- Prefer preserving the current visual design and lightweight static-site architecture.
