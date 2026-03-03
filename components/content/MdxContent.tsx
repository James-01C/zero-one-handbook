import { MDXRemote } from 'next-mdx-remote/rsc';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';
import { sharedMdxOptions, tableComponents, customComponents } from '@/lib/mdx';
import { Divider } from '@/components/content/Divider';

interface MdxContentProps {
  source: string;
  className?: string;
}

const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<'h1'>) => (
    <h1
      className="mb-4 mt-8 text-2xl font-bold tracking-tight first:mt-0"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className="mb-6 mt-16 text-xl font-semibold tracking-tight first:mt-0"
      id={slugify(props.children)}
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3
      className="mb-3 mt-10 text-lg font-semibold tracking-tight"
      id={slugify(props.children)}
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="mb-4 leading-7 text-muted-foreground" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul
      className="mb-4 ml-6 list-disc space-y-1 text-muted-foreground"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className="mb-4 ml-6 list-decimal space-y-1 text-muted-foreground"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li className="leading-7" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<'a'>) => (
    <a
      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="mb-4 border-l-4 border-primary/30 pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<'code'>) => {
    const isInline = !props.className;
    if (isInline) {
      return (
        <code
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
          {...props}
        />
      );
    }
    return <code className="font-mono text-sm" {...props} />;
  },
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-sm text-zinc-100 dark:bg-zinc-800/50"
      {...props}
    />
  ),
  ...tableComponents,
  ...customComponents,
  hr: () => <Divider />,
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
};

function slugify(children: unknown): string {
  if (typeof children === 'string') {
    return children
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  return '';
}

export function MdxContent({ source, className }: MdxContentProps) {
  return (
    <div className={cn('mdx-content', className)}>
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={sharedMdxOptions}
      />
    </div>
  );
}
