## Overview

A static blog built with [Eleventy (11ty)](https://www.11ty.dev/) and Tailwind CSS. Posts are written in Markdown and built to plain HTML — no client-side framework, no database.

## Quick Start

- Requirements: Node.js
- Install: `npm install`
- Run: `npm run dev`
- Build: `npm run build`

## Structure

- `src/posts/` — Markdown blog posts (one file = one post)
- `src/_includes/layouts/` — Nunjucks page layouts
- `src/_includes/partials/` — Reusable template fragments
- `src/css/global.css` — Tailwind source stylesheet
- `src/index.njk` — Home page listing all posts
- `src/tags/` — Tag index pages
- `src/feed/` — RSS feed template
- `_site/` — Build output (generated, not committed)
- `.eleventy.js` — Eleventy config (collections, filters, passthrough)
- `tailwind.config.mjs` — Tailwind configuration
- `postcss.config.js` — PostCSS pipeline for Tailwind

## Configuration

- `EDUCATIVE_LIVE_VM_URL` — When set, binds the dev server to `0.0.0.0` for the Educative.io platform; unset for local development

## Scripts / Tasks

- `npm run dev` — Starts Eleventy in watch mode and runs PostCSS in parallel
- `npm run build` — Compiles CSS then builds the full static site to `_site/`

## Notes

- Post frontmatter must include `title`, `description`, `pubDate` (Date), and `tags` (array) — missing fields throw at build time.
- Tags have no independent source files; the tag universe is derived from post frontmatter.
- Site URL is hardcoded to `https://example.com` in `.eleventy.js` — update before deploying.
