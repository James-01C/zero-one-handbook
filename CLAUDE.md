# Zero One Handbook

Internal company handbook app for Zero One Creative. Displays SOPs, reference docs, policies, and guides with type-specific visual renderers. Built with Next.js 15, Tailwind CSS, shadcn/ui. Content lives as markdown files in `/content`.

## Stack

- Next.js 15 App Router, TypeScript strict mode
- Tailwind CSS + shadcn/ui + @tailwindcss/typography
- gray-matter (frontmatter parsing) + next-mdx-remote (markdown rendering)
- fuse.js (client-side search)
- Deployed on Vercel, auto-deploys from main branch

## Architecture

```
content/          → Markdown files with YAML frontmatter (the actual handbook)
app/              → Pages and routes (Next.js App Router)
components/       → React components
  layout/         → Sidebar, Header, Breadcrumbs, Footer
  content/        → ContentRenderer + 4 type-specific renderers
  search/         → SearchBar, SearchResults
  home/           → SectionCard
  ui/             → shadcn/ui primitives
lib/              → Utilities
  content.ts      → Read/parse markdown, build section + page data
  search.ts       → Fuse.js index builder
  utils.ts        → General helpers
types/            → TypeScript interfaces
  content.ts      → Section, Page, ContentMeta, ContentType, Role
```

## Content System

Content is markdown files in `/content/[section]/[slug].md`. Each section has a `_section.json` config. Each page has YAML frontmatter with: title, type (sop|reference|policy|guide), roles (developer|management|all), summary, version, lastUpdated.

## Key Patterns

- **Server components by default.** Client components only when interactivity is needed (search, sidebar toggle, theme switch). Mark with `"use client"`.
- **Named exports** for all components. Default export only for page.tsx files.
- **Content parsing in lib/content.ts.** Never read files directly in components or pages. Always go through the content library.
- **Type-specific rendering.** ContentRenderer checks `type` field and delegates to SOPRenderer, ReferenceRenderer, PolicyRenderer, or GuideRenderer. Never render all types the same way.
- **Props typed with interfaces** defined in `types/`, not inline.

## Work Process

1. Read existing files before modifying anything
2. State your plan before building — list files you'll create or modify
3. Wait for confirmation before proceeding
4. Commit after each logical unit of work with clear messages

## Do NOT

- Do NOT install packages not in the spec without asking first
- Do NOT create API routes — v1 is entirely static (no server-side data fetching at request time)
- Do NOT add authentication, database tables, or Supabase client code — that's v1.1+
- Do NOT put content parsing logic in components — it belongs in lib/content.ts
- Do NOT use `require()` — use ES module imports only
- Do NOT skip TypeScript types — every function and component has typed params/props
- Do NOT use default exports except for page.tsx files

## Commands

- `npm run dev` — local development server
- `npm run build` — production build (also validates all content parses correctly)
- `npm run lint` — ESLint check
- `npx prettier --check .` — format check

## Verification Before Committing

- [ ] `npm run build` passes with no errors
- [ ] No TypeScript errors
- [ ] No unused imports
- [ ] All new components have typed props
- [ ] Content renders correctly for all four types
- [ ] Responsive: check mobile and desktop
- [ ] Dark and light themes both work
