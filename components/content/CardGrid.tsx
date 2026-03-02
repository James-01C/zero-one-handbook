import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SectionIcon } from '@/components/home/SectionIcon';
import type { ReactNode } from 'react';

interface CardGridProps {
  children: ReactNode;
}

export function CardGrid({ children }: CardGridProps) {
  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2">{children}</div>
  );
}

interface CardProps {
  title: string;
  href?: string;
  icon?: string;
  children: ReactNode;
}

export function Card({ title, href, icon, children }: CardProps) {
  const content = (
    <>
      <div className="flex items-center gap-2">
        {icon && <SectionIcon icon={icon} className="size-4 text-muted-foreground" />}
        <span className="text-sm font-semibold text-foreground">{title}</span>
      </div>
      <div className="mt-1 text-sm text-muted-foreground [&>:last-child]:mb-0">
        {children}
      </div>
    </>
  );

  const className = cn(
    'block rounded-lg border border-border p-4 transition-colors',
    href && 'hover:border-zinc-400 hover:bg-muted/50 dark:hover:border-zinc-600'
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
