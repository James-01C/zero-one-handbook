# Zero One Handbook

Internal company handbook app for Zero One Creative. Displays SOPs, reference docs, policies, and guides with type-specific visual renderers. Built with Next.js 15, Tailwind CSS, shadcn/ui. Content lives as markdown files in `/content`.

## Stack

- Next.js 16.1.6 App Router, TypeScript strict mode
- Tailwind CSS v4 + shadcn/ui (zinc theme) + @tailwindcss/typography (via `@plugin`)
- gray-matter (frontmatter parsing) + next-mdx-remote v6 (MDX rendering via RSC)
- fuse.js v7 (client-side search)
- next-themes (dark/light mode toggle)
- lucide-react (icons)
- Fonts: Space Grotesk (headings), JetBrains Mono (code)
- Deployed on Vercel, auto-deploys from main branch

## Architecture

```
content/          → Markdown files with YAML frontmatter (the actual handbook)
app/              → Pages and routes (Next.js App Router)
  [section]/      → Section listing page (generateStaticParams)
  [section]/[slug]/ → Content page with type-specific renderer
  search/         → Full search results page (client component)
components/       → React components
  layout/         → Sidebar, Header, Breadcrumbs, Footer, ThemeProvider, ThemeToggle
  content/        → ContentRenderer + 4 type-specific renderers + badges + MdxContent
  search/         → SearchBar, SearchResults, SearchProvider
  home/           → SectionCard, SectionIcon
  ui/             → shadcn/ui primitives (button, sheet, separator, scroll-area, tooltip)
lib/              → Utilities
  content.ts      → Read/parse markdown, build section + page data
  search.ts       → Fuse.js server-side index builder
  icons.ts        → Static icon name → LucideIcon map
  utils.ts        → cn() helper from shadcn
types/            → TypeScript interfaces
  content.ts      → Section, Page, ContentMeta, ContentType, Role, SearchableItem
```

## Content System

Content is markdown files in `/content/[section]/[slug].md`. Each section has a `_section.json` config. Each page has YAML frontmatter with: title, type (sop|reference|policy|guide), roles (developer|management|all), summary, version, lastUpdated.

## Key Patterns

- **Server components by default.** Client components only when interactivity is needed (search, sidebar toggle, theme switch). Mark with `"use client"`.
- **Named exports** for all components. Default export only for page.tsx files.
- **Content parsing in lib/content.ts.** Never read files directly in components or pages. Always go through the content library.
- **Type-specific rendering.** ContentRenderer checks `type` field and delegates to SOPRenderer, ReferenceRenderer, PolicyRenderer, or GuideRenderer. Never render all types the same way.
- **Props typed with interfaces** defined in `types/`, not inline.
- **Use `Link` from next/link** for all internal navigation. Never use raw `<a>` tags for internal routes.
- **Dynamic icon lookup** goes through `lib/icons.ts` static map. Render via `SectionIcon` component (uses `createElement`) to satisfy `react-hooks/static-components` lint rule. Never call `getIcon()` directly in render body — always use `SectionIcon` or `createElement`.
- **MDX rendering** uses `next-mdx-remote/rsc` `MDXRemote` for server-side rendering. Custom component maps are defined per renderer.
- **Search** uses a `SearchProvider` context wrapping the app. Search items are serialized from the server layout with content truncated to 2KB.
- **Tailwind v4 plugins** use `@plugin` directive in CSS, not `@import`.
- **Fuse.js v7 types** — import `IFuseOptions` and `FuseResultMatch` as named type imports, not as `Fuse.` namespace (namespace pattern doesn't work in v7).
- **Hydration-safe mounting** — use `useSyncExternalStore` instead of `useEffect` + `setState` for mounted checks (avoids `react-hooks/set-state-in-effect` lint error).

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
- Do NOT use raw `<a>` tags for internal navigation — use `Link` from next/link
- Do NOT call `getIcon()` in a component render body — use `SectionIcon` component

## Commands

- `npm run dev` — local development server
- `npm run build` — production build (also validates all content parses correctly)
- `npm run lint` — ESLint check
- `npx prettier --check .` — format check

## Verification Before Committing

- [ ] `npm run build` passes with no errors
- [ ] `npm run lint` passes with no errors
- [ ] No TypeScript errors
- [ ] No unused imports
- [ ] All new components have typed props
- [ ] Content renders correctly for all four types
- [ ] Responsive: check mobile and desktop
- [ ] Dark and light themes both work
