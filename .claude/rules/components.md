# Component Conventions

- Server components by default. Only add "use client" when the component needs interactivity (useState, useEffect, onClick handlers, browser APIs).
- Named exports for all components. Default export only for page.tsx and layout.tsx files.
- Props defined as interfaces in the same file (or imported from types/ for shared types). Never use `any`.
- Component files are PascalCase: `SectionCard.tsx`, `SOPRenderer.tsx`.
- Each component in its own file. No multi-component files.
- Tailwind classes directly on elements. No separate CSS files. Use `cn()` utility from lib/utils.ts for conditional classes.
- shadcn/ui components live in components/ui/. Never modify them directly — wrap them in your own component if customisation is needed.
