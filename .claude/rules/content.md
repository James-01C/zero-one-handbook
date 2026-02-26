# Content Conventions

- All content lives in `/content/[section]/[slug].md`.
- Every section directory must have a `_section.json` with: title, description, icon (lucide icon name), sortOrder.
- Every markdown file must have YAML frontmatter with: title, type (sop|reference|policy|guide), roles (array of: developer, management, all), summary, version, lastUpdated.
- File names are kebab-case: `pr-process.md`, `branch-naming.md`.
- Section directory names are kebab-case: `getting-started/`, `development/`.
- Content parsing always goes through `lib/content.ts`. Never use `fs.readFileSync` or `gray-matter` directly in components or pages.
- When adding new content, ensure it renders correctly with the appropriate type renderer before committing.
