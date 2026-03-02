import remarkGfm from 'remark-gfm';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * Shared MDX options for all renderers. Single source of truth for
 * remark plugins so adding a new plugin requires one change.
 */
export const sharedMdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
};

/**
 * Shared table component overrides. Every renderer that renders
 * markdown tables must include these in its component map.
 */
export const tableComponents = {
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="mb-4 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
    <thead className="border-b border-border bg-muted/50" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="px-4 py-2.5 text-left font-semibold text-foreground"
      {...props}
    />
  ),
  tr: (props: ComponentPropsWithoutRef<'tr'>) => (
    <tr
      className="border-b border-border last:border-0 transition-colors hover:bg-muted/30"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td className="px-4 py-2.5 text-muted-foreground" {...props} />
  ),
};

/**
 * Compact table variant for use inside constrained contexts (e.g. SOP
 * step cards) where the default sizing is too large.
 */
export const compactTableComponents = {
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="mb-3 overflow-x-auto rounded-lg border border-border last:mb-0">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: tableComponents.thead,
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="px-3 py-2 text-left text-xs font-semibold text-foreground"
      {...props}
    />
  ),
  tr: tableComponents.tr,
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td className="px-3 py-2 text-sm text-muted-foreground" {...props} />
  ),
};
