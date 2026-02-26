# SPEC.md — Zero One Handbook App v1.0.0

## What This Is

An internal company handbook for Zero One Creative — a startup building Amara, a suite of AI-powered 3D creative tools. The app replaces static Notion docs with a beautifully designed, interactive, searchable reference for company processes, SOPs, platform architecture, and policies.

**Audience:** 6-7 developers (ML engineers, full-stack) + 3-4 management/founders. ~10 people total.

**Key principle:** Every content type gets a visual treatment optimised for its function. SOPs are visual step flows, not walls of text. Reference pages are structured tables, not paragraphs. The app should feel like a thoughtfully designed product, not a docs site.

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | **Next.js 15** (App Router) | TypeScript, strict mode |
| Styling | **Tailwind CSS** + **shadcn/ui** | Mobile-first, dark theme default |
| Content | **Markdown files** in `/content` | Frontmatter metadata, parsed at build time |
| Markdown parsing | **gray-matter** + **next-mdx-remote** or **unified/remark/rehype** | Parse frontmatter + render markdown |
| Search | **Client-side** with **fuse.js** | Pre-built search index at build time |
| Deployment | **Vercel** | Connected to GitHub, auto-deploys on push |
| Database | **None for v1** | Supabase ready for v1.1+ (chat, feedback) |

### Key Packages

```
next (latest)
typescript
tailwindcss
@tailwindcss/typography
shadcn/ui (via npx shadcn-ui@latest init)
gray-matter              # Parse markdown frontmatter
next-mdx-remote          # Render MDX content in Next.js
fuse.js                  # Lightweight fuzzy search
lucide-react             # Icons
```

---

## Design Direction

**Aesthetic:** Clean, modern, utilitarian with warmth. Think Stripe Docs meets Linear's UI — structured and functional, but with personality. Not generic docs-site energy.

**Theme:** Dark mode default (matches the team's dev environment preference). Light mode toggle available.

**Typography:** A distinctive monospace or geometric sans-serif for headings (e.g. JetBrains Mono, Space Grotesk, or similar). Clean readable body font. Code blocks styled with care.

**Colour system:**
- Dark background with subtle depth (not pure black — use zinc/slate tones)
- Accent colour: warm orange or amber (ties to Zero One Creative / Amara branding)
- Content type colour coding:
  - SOPs → blue/cyan
  - Reference → purple
  - Policies → amber/yellow
  - Guides → green
- Role badges: Developer → blue, Management → amber, All → neutral

**Layout:** Sidebar navigation on desktop, hamburger on mobile. Content area with generous whitespace. Breadcrumbs for orientation.

**Micro-interactions:** Smooth page transitions. Subtle hover states on cards. Search with instant results dropdown.

---

## Content Architecture

### Directory Structure

```
content/
├── getting-started/
│   ├── _section.json
│   └── welcome.md
├── development/
│   ├── _section.json
│   ├── pr-process.md
│   └── branch-naming.md
├── platforms/
│   ├── _section.json
│   ├── github.md
│   ├── jira.md
│   ├── slack.md
│   └── notion.md
└── policies/
    ├── _section.json
    └── communication-norms.md
```

### Section Config (`_section.json`)

```json
{
  "title": "Development",
  "description": "How we build, ship, and maintain code",
  "icon": "code",
  "sortOrder": 2
}
```

### Page Frontmatter

```yaml
---
title: "How to Open a Pull Request"
type: "sop"
roles:
  - developer
summary: "Step-by-step process for opening, reviewing, and merging PRs"
version: "1.0"
lastUpdated: "2026-02-26"
---
```

**Content types:** `sop` | `reference` | `policy` | `guide`
**Roles:** `developer` | `management` | `all`

### Sample Content

Include 2-3 sample pages per content type so the app isn't empty on first deploy:

**SOP example** — "How to Open a Pull Request" (use numbered steps with clear actions)
**Reference example** — "Platform Overview" (table-based, what each platform does)
**Policy example** — "Communication Norms" (clear rules with rationale)
**Guide example** — "Understanding Our Dev Workflow" (narrative with sections)

Write realistic placeholder content based on a software development team. This demonstrates each content type renderer works correctly.

---

## File Structure

```
zero-one-handbook/
├── CLAUDE.md
├── SPEC.md
├── .claude/
│   ├── rules/
│   │   ├── components.md
│   │   ├── api-routes.md
│   │   └── content.md
│   ├── skills/
│   │   └── content-management/
│   │       └── SKILL.md
│   └── commands/
│       ├── review.md
│       └── handoff.md
├── content/                      # Handbook content (markdown + frontmatter)
│   ├── getting-started/
│   ├── development/
│   ├── platforms/
│   └── policies/
├── app/
│   ├── layout.tsx                # Root layout — sidebar, header, theme provider
│   ├── page.tsx                  # Homepage — section overview cards
│   ├── [section]/
│   │   ├── page.tsx              # Section listing — all pages in section
│   │   └── [slug]/
│   │       └── page.tsx          # Individual content page
│   └── search/
│       └── page.tsx              # Search results page
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx           # Section navigation + role filter
│   │   ├── Header.tsx            # Top bar + search + theme toggle
│   │   ├── Breadcrumbs.tsx       # Location context
│   │   └── Footer.tsx            # Version number + links
│   ├── content/
│   │   ├── ContentRenderer.tsx   # Router — picks correct renderer by type
│   │   ├── SOPRenderer.tsx       # Step-by-step visual layout
│   │   ├── ReferenceRenderer.tsx # Structured data / table layout
│   │   ├── PolicyRenderer.tsx    # Clean sections with summary header
│   │   └── GuideRenderer.tsx     # Narrative + auto-generated TOC
│   ├── search/
│   │   ├── SearchBar.tsx         # Search input with instant results
│   │   └── SearchResults.tsx     # Full search results display
│   ├── home/
│   │   └── SectionCard.tsx       # Homepage section overview card
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── content.ts                # Read & parse markdown files, build indexes
│   ├── search.ts                 # Fuse.js search index builder
│   └── utils.ts                  # General utilities
├── types/
│   └── content.ts                # TypeScript interfaces for content types
└── public/
    └── (static assets if needed)
```

---

## Page-by-Page Specification

### Homepage (`/`)

**Purpose:** Section overview — show all sections as cards, quick orientation.

**Layout:**
- Header with app name ("Zero One Handbook"), search bar, role filter toggle (Developer / Management / All), theme toggle
- Grid of section cards, each showing: icon, title, description, page count
- Cards are clickable → navigate to section page
- Role filter: when set, sections with no matching content are dimmed (not hidden)

**Data:** Read all `_section.json` files + count pages per section at build time.

### Section Page (`/[section]`)

**Purpose:** List all pages in a section with preview info.

**Layout:**
- Breadcrumb: Home > Section Name
- Section header: title, description
- List of pages showing: title, content type badge (colour-coded), role badges, summary, last updated
- Sortable by: title, type, last updated
- Role filter applies here — matching pages highlighted, non-matching dimmed

**Data:** Read all markdown files in the section directory, parse frontmatter.

### Content Page (`/[section]/[slug]`)

**Purpose:** Display a single piece of content, formatted for its type.

**Layout:**
- Breadcrumb: Home > Section > Page Title
- Metadata bar: content type badge, role badges, version, last updated
- Content body — rendered by the appropriate type renderer (see below)
- Previous / Next navigation at bottom (within section)

**Data:** Read the specific markdown file, parse frontmatter + body.

### Search (`/search?q=...`)

**Purpose:** Full-text search across all content.

**Layout:**
- Search input (pre-populated from query)
- Results list: title, section, type badge, summary, matched excerpt
- Clicking a result navigates to the content page

**Data:** Pre-built Fuse.js index (generated at build time from all pages).

---

## Content Type Renderers

### SOPRenderer (type: `sop`)

**Visual treatment:** Step-by-step flow. NOT a numbered list in prose.

- Parse the markdown for numbered steps (## Step 1, ## Step 2, etc. or ordered lists)
- Render each step as a visual card/block with:
  - Step number (large, colour-coded)
  - Step title
  - Step description/detail
  - Optional: platform badges if the step involves specific tools (GitHub, Jira, Slack)
- Visual connector between steps (line or arrow)
- Progress feel — the eye should flow naturally down the steps
- Any non-step content (intro, notes, warnings) renders as standard prose above/below the steps

### ReferenceRenderer (type: `reference`)

**Visual treatment:** Structured data, tables, lookup-friendly.

- Render markdown tables with clean styling (zebra striping, hover highlight)
- Render lists as structured grid cards where appropriate
- Key-value pairs styled as definition lists
- Content should feel scannable — someone looking for one specific fact
- Auto-generated page TOC from headings (sticky on desktop)

### PolicyRenderer (type: `policy`)

**Visual treatment:** Authority and clarity.

- Summary/TL;DR callout at the top (pulled from frontmatter summary)
- Clean section headers with subtle dividers
- Important rules or requirements highlighted with accent-coloured left border
- "Why this matters" sections styled differently from the rules themselves
- Formal but readable tone reflected in the layout

### GuideRenderer (type: `guide`)

**Visual treatment:** Narrative, long-form reading.

- Auto-generated table of contents from headings (sticky sidebar on desktop, collapsible on mobile)
- Generous typography — optimised for reading (larger body text, more line height)
- Callout blocks for tips, warnings, notes (styled distinctively)
- Code blocks with syntax highlighting if technical content
- Reading progress indicator (subtle bar at top of page)

---

## Components Detail

### Sidebar

- Shows all sections with icons
- Expandable: clicking a section shows its pages
- Current page highlighted
- Role filter toggle at the top (Developer / Management / All)
- Role selection saved to localStorage
- Collapsible on desktop, drawer on mobile
- Footer: app version number

### Header

- App name/logo: "Zero One Handbook"
- Search bar (Command+K shortcut to focus)
- Theme toggle (dark/light)
- Responsive: search collapses to icon on mobile

### Search

- Fuse.js fuzzy search over: title, summary, body content, tags
- Instant results dropdown (top 5) as you type in the header search bar
- Full results page at /search for complete list
- Results show: title, section, type badge, matched excerpt
- Keyboard navigation: arrow keys to select, Enter to navigate

---

## Build Sequence

Follow this order. Complete each step before moving to the next. Commit after each step.

### Step 1: Project Scaffold
- Run `npx create-next-app@latest . --typescript --tailwind --eslint --app --src=false --import-alias "@/*"`
- Install packages: `gray-matter`, `next-mdx-remote` (or `unified`+`remark`+`rehype` stack), `fuse.js`, `lucide-react`, `@tailwindcss/typography`
- Set up shadcn/ui: `npx shadcn-ui@latest init`
- Create the folder structure as specified
- Set up Prettier config (`.prettierrc`)
- Set up TypeScript strict mode in `tsconfig.json`
- Create `.env.local.example` with placeholder Supabase vars (for future use)
- **Commit:** "scaffold: initial project setup with Next.js 15"

### Step 2: Types & Content Library
- Create `types/content.ts` — interfaces for Section, Page, ContentMeta, ContentType, Role
- Create `lib/content.ts` — functions to:
  - Get all sections (read `_section.json` files)
  - Get pages by section (read markdown files, parse frontmatter)
  - Get single page by section + slug (parse frontmatter + body)
  - Get all pages (for search index)
- Create sample content (2-3 pages per type across sections)
- Test that content parsing works: `console.log` in a temp page
- **Commit:** "feat: content library and sample handbook pages"

### Step 3: Layout Shell
- Build `layout.tsx` — root layout with theme provider (dark mode default), font loading, sidebar + header structure
- Build `Sidebar.tsx` — section navigation, role filter toggle, version footer
- Build `Header.tsx` — app name, search bar placeholder, theme toggle
- Build `Breadcrumbs.tsx`
- Build `Footer.tsx` — version number
- Responsive behaviour: sidebar as drawer on mobile
- **Commit:** "feat: app layout with sidebar, header, and responsive nav"

### Step 4: Homepage
- Build `page.tsx` — grid of SectionCards
- Build `SectionCard.tsx` — icon, title, description, page count, content type breakdown
- Cards link to `/[section]`
- Role filter dims sections with no matching content
- **Commit:** "feat: homepage with section cards"

### Step 5: Section Page
- Build `[section]/page.tsx` — list pages in section
- Show: title, type badge (colour-coded), role badges, summary, last updated
- Role filter highlights matching pages
- **Commit:** "feat: section listing page"

### Step 6: Content Renderers
- Build `ContentRenderer.tsx` — router that picks renderer by content type
- Build `SOPRenderer.tsx` — visual step flow
- Build `ReferenceRenderer.tsx` — structured tables + TOC
- Build `PolicyRenderer.tsx` — summary callout + clean sections
- Build `GuideRenderer.tsx` — narrative + sticky TOC + reading progress
- Build `[section]/[slug]/page.tsx` — renders content with correct renderer
- Add previous/next navigation
- **Commit:** "feat: four content type renderers with type-specific layouts"

### Step 7: Search
- Build `lib/search.ts` — Fuse.js index builder (runs at build time)
- Build `SearchBar.tsx` — input with instant results dropdown (top 5)
- Build `SearchResults.tsx` — full results display
- Build `search/page.tsx` — full search results page
- Add Command+K keyboard shortcut to focus search
- **Commit:** "feat: fuzzy search with instant results and keyboard nav"

### Step 8: Polish & Deploy
- Review all pages at different viewport sizes
- Ensure dark/light theme works throughout
- Add smooth page transitions
- Verify all sample content renders correctly per type
- Add meta tags for page titles
- Push to GitHub — Vercel auto-deploys
- **Commit:** "polish: responsive review, transitions, meta tags, deploy-ready"

---

## Post-Build Protocol

After completing all steps:

1. Update `CLAUDE.md` with any new patterns, files, or conventions discovered during the build
2. Run `/review` to check all files against conventions
3. Write `HANDOFF.md` with: what was built, what works, what to do next, any known issues
4. Final commit with all documentation updates

---

## Environment Variables (.env.local)

```
# Not needed for v1 — placeholder for future use
NEXT_PUBLIC_SUPABASE_URL=https://lbzyewveissuuepbinhq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Future: Amara chat (v1.1)
# ANTHROPIC_API_KEY=your-key-here
```

---

## What v1 Does NOT Include

- No authentication / login
- No Amara AI chat
- No feedback system
- No database tables
- No user accounts
- No API routes (all content is static at build time)

These are planned for v1.1+ and the architecture supports adding them without restructuring.
