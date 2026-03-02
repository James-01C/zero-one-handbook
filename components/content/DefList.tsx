import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

const colorMap: Record<string, string> = {
  red: 'bg-red-500',
  green: 'bg-green-500',
  amber: 'bg-amber-500',
  blue: 'bg-blue-500',
  rose: 'bg-rose-500',
};

interface DefListProps {
  children: ReactNode;
}

export function DefList({ children }: DefListProps) {
  return (
    <div className="my-6 divide-y divide-border rounded-lg border border-border">
      {children}
    </div>
  );
}

interface DefProps {
  term: string;
  color?: string;
  example?: string;
  children: ReactNode;
}

export function Def({ term, color, example, children }: DefProps) {
  const dotColor = (color && colorMap[color]) || 'bg-zinc-400';

  return (
    <div className="flex gap-3 px-4 py-3">
      <div
        className={cn('mt-1.5 size-2 shrink-0 rounded-full', dotColor)}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-mono text-sm font-bold text-foreground">
            {term}
          </span>
          {example && (
            <span className="font-mono text-xs text-muted-foreground">
              e.g. {example}
            </span>
          )}
        </div>
        <div className="mt-1 text-sm text-muted-foreground [&>:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
