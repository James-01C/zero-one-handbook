import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: {
    bg: 'bg-blue-500/10 dark:bg-blue-500/15',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-500/30',
  },
  green: {
    bg: 'bg-green-500/10 dark:bg-green-500/15',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-500/30',
  },
  amber: {
    bg: 'bg-amber-500/10 dark:bg-amber-500/15',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-500/30',
  },
  red: {
    bg: 'bg-red-500/10 dark:bg-red-500/15',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-500/30',
  },
  rose: {
    bg: 'bg-rose-500/10 dark:bg-rose-500/15',
    text: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-500/30',
  },
  purple: {
    bg: 'bg-purple-500/10 dark:bg-purple-500/15',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-500/30',
  },
};

const defaultColor = {
  bg: 'bg-zinc-500/10 dark:bg-zinc-500/15',
  text: 'text-zinc-700 dark:text-zinc-300',
  border: 'border-zinc-500/30',
};

interface FlowProps {
  children: ReactNode;
}

export function Flow({ children }: FlowProps) {
  return (
    <div className="my-6 flex flex-wrap items-center gap-2 sm:flex-nowrap">
      {children}
    </div>
  );
}

interface StepProps {
  color?: string;
  children: ReactNode;
}

export function Step({ color, children }: StepProps) {
  const c = (color && colorMap[color]) || defaultColor;

  return (
    <div
      className={cn(
        'shrink-0 rounded-lg border px-4 py-2 font-mono text-sm font-medium',
        c.bg,
        c.text,
        c.border
      )}
    >
      {children}
    </div>
  );
}

interface ArrowProps {
  label?: string;
}

export function Arrow({ label }: ArrowProps) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-0.5">
      <svg
        width="24"
        height="12"
        viewBox="0 0 24 12"
        fill="none"
        className="text-muted-foreground"
      >
        <path
          d="M0 6h20M16 1l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label && (
        <span className="text-[10px] leading-none text-muted-foreground">
          {label}
        </span>
      )}
    </div>
  );
}
