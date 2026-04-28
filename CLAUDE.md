# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at localhost:4321
npm run build      # Build static output to ./dist/
npm run preview    # Preview production build locally
npm run astro check  # Type-check .astro files
```

There is no test suite or linter configured.

## Architecture

This is an **Astro v5 static blog** — all pages are pre-rendered to HTML at build time. There is no server, no database, and no client-side framework.

### How content becomes pages

1. Markdown files in `src/content/blog/` are the source of truth for all posts.
2. `src/content/config.ts` defines a Zod schema that validates every post's frontmatter at build time (`title`, `description`, `pubDate`, `tags[]`). A schema violation stops the build.
3. Pages call `getCollection('blog')` to read all posts as typed `CollectionEntry<'blog'>` objects.
4. Dynamic routes (`blog/[...slug].astro`, `tags/[...tag].astro`) use `getStaticPaths()` to enumerate every valid URL at build time — one page per post slug, one page per unique tag string.
5. Tags have no independent existence; the full tag universe is derived by flattening `post.data.tags` across all posts.

### Layout and component composition

Every page wraps itself in `src/layouts/Layout.astro`, which provides the HTML shell, `<head>` metadata, `<Header />`, `<Footer />`, and the dark mode init script. Page-specific content is injected via `<slot />`.

### Dark mode

Implemented across two files:
- `src/layouts/Layout.astro` — inline `<script>` that reads `localStorage.theme` (or `prefers-color-scheme`) and sets `<html class="dark">` before first paint to prevent flash.
- `src/components/Header.astro` — toggle button that flips the `dark` class and writes to `localStorage`.

Tailwind's `darkMode: 'class'` in `tailwind.config.mjs` activates `dark:` variants based on that class.

### Encoding gotcha

Several source files were saved with double-encoded UTF-8, causing emoji and special characters (•, 🌙, ☀️) to render as garbage. If you see garbled characters, inspect the raw bytes with `cat -v` and use Python to replace the corrupted byte sequences with correct UTF-8.

### Key integrations

- `@astrojs/tailwind` — Tailwind CSS processing; custom colors go in `tailwind.config.mjs` under `theme.extend.colors`
- `@astrojs/sitemap` — auto-generates `/sitemap-index.xml` at build time
- `@astrojs/rss` — `/rss.xml` endpoint in `src/pages/rss.xml.js`, maps posts to RSS items (drops `tags` and `body`)

### Environment variable

`astro.config.mjs` reads `EDUCATIVE_LIVE_VM_URL` to set `server.allowedHosts` for the Educative.io platform. It is absent in local development and the config handles this gracefully.

## Adding a blog post

Create `src/content/blog/your-slug.md` — the filename becomes the URL (`/blog/your-slug`). Required frontmatter:

```markdown
---
title: "Post Title"
description: "Short summary."
pubDate: 2026-04-26
tags: ["tag1", "tag2"]
---
```

No other changes needed; the post appears on the home page, tag pages, RSS feed, and sitemap automatically.
