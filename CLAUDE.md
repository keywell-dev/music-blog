# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `frontend/`:

```sh
npm run dev      # dev server at localhost:4321
npm run build    # production build to ./dist/
npm run preview  # preview production build locally
```

No test suite or linter is configured.

## Architecture

This is an Astro 5 SSR blog (Netlify adapter) with Keystatic CMS for content management.

**Content model** — Posts live in `frontend/src/content/posts/*.mdoc` (Markdoc format). Each post has frontmatter fields: `title`, `artist`, `album`, an inline `content` body (intro prose), and an optional `lyrics` array. Each lyrics entry has a `line` string and an optional `annotation` string. An empty object `{}` in the lyrics array renders as a stanza break.

**Keystatic CMS** — `frontend/keystatic.config.ts` defines the schema. The CMS UI is accessible at `/keystatic` in dev mode and connects to GitHub (`keywell-dev/music-blog`) for storage in production. Content is edited through the CMS and committed directly to the repo.

**Routing** — File-based Astro routing under `frontend/src/pages/`:
- `/` → `index.astro` (home, lists posts via `HomePage.astro`)
- `/posts/` → `posts/index.astro` (all posts list)
- `/posts/[slug]` → `posts/[slug].astro` (single post, prerendered)

**Lyrics annotation UI** — `PostPage.astro` renders a Genius-style two-column layout: lyrics on the left, annotations on the right. Lines with annotations are highlighted; clicking a line reveals its annotation panel positioned adjacent to the clicked line. The interaction logic is plain JS in a `<script>` block within the component.

**Styling** — Tailwind CSS v4 via `@tailwindcss/vite`. Dark theme (`#2d2d2d` background). Component-scoped `<style>` blocks for anything beyond utilities. shadcn/ui components available via `clsx` + `tailwind-merge` + `class-variance-authority`.

**Layout** — `Layout.astro` wraps all pages, includes `Header.astro`, and applies global styles from `src/styles/global.css` (Geist variable font, CSS custom properties for the shadcn color system).
