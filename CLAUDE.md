# Zero One Handbook

Internal company handbook app. Displays SOPs, reference docs, policies, and guides with type-specific visual renderers and custom visual components.

## Stack

- Next.js 16.1.6 App Router, TypeScript strict mode
- Tailwind CSS v4 + shadcn/ui (zinc theme) + @tailwindcss/typography (via `@plugin`)
- gray-matter (frontmatter parsing) + next-mdx-remote v6 (MDX rendering via RSC)
- react-markdown + remark-gfm (chat message rendering — separate from MDX pipeline)
- fuse.js v7 (client-side search)
- next-themes (dark/light mode toggle)
- lucide-react (icons)
- Fonts: Space Grotesk (headings), JetBrains Mono (code)
- Deployed on Vercel, auto-deploys from main branch

## Architecture

```
content/              → Markdown/MDX files with YAML frontmatter
app/                  → Pages and routes (Next.js App Router)
  api/chat/           → Chat API route (only server endpoint)
  chat/               → Full-page chat interface
components/
  layout/             → Sidebar, Header, Breadcrumbs, Footer, ThemeProvider
  content/            → ContentRenderer, 4 type renderers, visual components
                        (Callout, Flow, DefList, CardGrid, Divider)
  search/             → SearchBar, SearchResults, SearchProvider
  chat/               → ChatInterface, ChatWidget
  home/               → SectionCard, SectionIcon
  ui/                 → shadcn/ui primitives
lib/
  content.ts          → Content parsing (all file reads go through here)
  mdx.tsx             → Shared MDX config: remark plugins + component map
  remark-callouts.ts  → Remark plugin for > [!TYPE] admonition syntax
  search.ts           → Fuse.js index builder
  icons.ts            → Static icon name → LucideIcon map
  utils.ts            → cn() helper
types/content.ts      → Section, Page, ContentMeta, ContentType, Role
```

## Content System

Content is markdown in `/content/[section]/[slug].md`. Each section has a `_section.json` config. Frontmatter: title, type (sop|reference|policy|guide), roles, summary, version, lastUpdated, order (optional).

Visual components available in MDX content:

- Callout syntax: `> [!RULE]`, `> [!TIP]`, `> [!INFO]`, `> [!TLDR]` — transformed by remark plugin
- JSX components: `<Flow>`, `<Step>`, `<Arrow>`, `<DefList>`, `<Def>`, `<CardGrid>`, `<Card>`
- All registered in `lib/mdx.tsx` shared component map
- See @.claude/skills/content-formatting/CONTENT-FORMATTING-PLAYBOOK.md for content type recipes

## Key Patterns

- **Server components by default.** Only add `"use client"` for interactivity (search, sidebar, theme, chat).
- **Named exports** for all components. Default export only for page.tsx files.
- **Content parsing** always goes through `lib/content.ts` — never read files directly in components.
- **Type-specific rendering.** ContentRenderer delegates to SOPRenderer, ReferenceRenderer, PolicyRenderer, or GuideRenderer.
- **MDX rendering** uses `next-mdx-remote/rsc` with shared config from `lib/mdx.tsx`. Visual components are registered in the shared `customComponents` map — add new components there.
- **Chat rendering** uses `react-markdown` + `remark-gfm` (client-side). Separate pipeline from static MDX — never mix them.
- **Internal links** use `Link` from `next/link` — never raw `<a>` tags for internal routes.
- **Icon lookup** via `lib/icons.ts` static map. Render with `SectionIcon` component — never call `getIcon()` directly in render body.
- **Tailwind v4 plugins** use `@plugin` directive in CSS, not `@import`.
- **Hydration-safe mounting** — use `useSyncExternalStore`, not `useEffect` + `setState`.

## Versioning

Version is in package.json and displayed in the app footer.

- **Patch** (1.1.x) — content changes, bug fixes, formatting improvements
- **Minor** (1.x.0) — new components, new features, new content types
- **Major** (x.0.0) — architectural changes, breaking changes

Bump version when committing work that changes what users see.

## Work Process

1. Read existing files before modifying anything
2. State your plan before building — list files you'll create or modify
3. Build and verify incrementally — run `npm run build` after editing code, don't batch to the end
4. Commit after each logical unit of work with clear messages

## Commands

- `npm run dev` — local development server
- `npm run build` — production build (validates all content parses correctly)
- `npm run lint` — ESLint check
- `npx prettier --check .` — format check

## Verification Before Committing

- [ ] `npm run build` passes with no errors
- [ ] `npm run lint` passes with no errors
- [ ] No TypeScript errors or unused imports
- [ ] All new components have typed props
- [ ] Content renders correctly for all four content types
- [ ] Dark and light themes both work

## Do NOT

- Do NOT install packages without asking first
- Do NOT create API routes beyond `/api/chat` — the rest is static
- Do NOT put content parsing logic in components — use `lib/content.ts`
- Do NOT use `require()` — use ES module imports
- Do NOT skip TypeScript types — every function and component has typed params/props
- Do NOT use default exports except for page.tsx files
- Do NOT use raw `<a>` tags for internal navigation — use `Link` from `next/link`
- Do NOT use inline styles or CSS modules — Tailwind classes only
- Do NOT add more than 3 callouts per H2 section in content files
