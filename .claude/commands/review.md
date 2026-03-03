Review all modified files in this session against the project conventions in CLAUDE.md and .claude/rules/.

Check for:

1. TypeScript errors or missing types
2. Components missing "use client" when they need it, or having it when they don't
3. Content files with missing or malformed frontmatter
4. Direct file system access outside of lib/content.ts
5. Unused imports
6. Default exports where named exports should be used
7. Missing responsive handling
8. Dark/light theme inconsistencies

Report findings in plain language. Group by severity: must-fix vs nice-to-have.
