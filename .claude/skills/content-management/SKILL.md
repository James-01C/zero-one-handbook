# Content Management Skill

Use this when adding, editing, or reorganising handbook content.

## Adding a New Page

1. Create the markdown file in the correct section directory: `content/[section]/[slug].md`
2. Add complete frontmatter:

```yaml
---
title: 'Page Title'
type: 'sop' # sop | reference | policy | guide
roles:
  - developer # developer | management | all
summary: 'One-line description'
version: '1.0'
lastUpdated: '2026-02-26'
---
```

3. Write content appropriate for the type:
   - **sop**: Use `## Step 1: Title` headings for each step. Keep steps atomic and actionable.
   - **reference**: Use tables and structured data. Headings for sections.
   - **policy**: Start with a clear summary. Use headings for each rule/policy area.
   - **guide**: Write narrative prose. Use headings for TOC generation.
4. Verify it renders: run `npm run dev` and navigate to the page.

## Adding a New Section

1. Create the directory: `content/[section-name]/`
2. Add `_section.json`:

```json
{
  "title": "Section Title",
  "description": "What this section covers",
  "icon": "lucide-icon-name",
  "sortOrder": 5
}
```

3. Add at least one page in the section.

## Content Type Guidelines

- **SOPs** should have 3-10 steps. Each step has a clear action. Include which platform/tool is involved.
- **Reference** pages are for facts you look up, not instructions you follow. Tables are preferred.
- **Policies** need a "why" for each rule. Authority without explanation breeds resentment.
- **Guides** are for understanding, not doing. They explain the "why" behind systems.
