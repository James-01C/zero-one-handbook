import remarkGfm from 'remark-gfm';
import type { ComponentPropsWithoutRef } from 'react';
import { remarkCallouts } from '@/lib/remark-callouts';
import { Callout } from '@/components/content/Callout';
import { Flow, Step, Arrow } from '@/components/content/Flow';
import { DefList, Def } from '@/components/content/DefList';
import { Divider } from '@/components/content/Divider';

/**
 * Shared MDX options for all renderers. Single source of truth for
 * remark plugins so adding a new plugin requires one change.
 */
export const sharedMdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkCallouts],
  },
};

/**
 * Custom MDX components shared across all renderers. Spread into
 * each renderer's component map so new components only need one registration.
 */
export const customComponents: Record<string, React.ComponentType<never>> = {
  Callout: Callout as React.ComponentType<never>,
  Flow: Flow as React.ComponentType<never>,
  Step: Step as React.ComponentType<never>,
  Arrow: Arrow as React.ComponentType<never>,
  DefList: DefList as React.ComponentType<never>,
  Def: Def as React.ComponentType<never>,
  Divider: Divider as React.ComponentType<never>,
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
