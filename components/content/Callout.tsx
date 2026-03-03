import { AlertTriangle, Lightbulb, Info, CheckCircle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type CalloutType = 'rule' | 'tip' | 'info' | 'success' | 'tldr';

interface CalloutProps {
  type: CalloutType;
  children: ReactNode;
}

const config: Record<
  CalloutType,
  {
    icon: typeof AlertTriangle;
    label: string;
    border: string;
    bg: string;
    iconColor: string;
  }
> = {
  rule: {
    icon: AlertTriangle,
    label: 'Rule',
    border: 'border-l-red-500',
    bg: 'bg-red-500/[0.06] dark:bg-red-500/[0.08]',
    iconColor: 'text-red-500',
  },
  tip: {
    icon: Lightbulb,
    label: 'Tip',
    border: 'border-l-amber-500',
    bg: 'bg-amber-500/[0.06] dark:bg-amber-500/[0.08]',
    iconColor: 'text-amber-500',
  },
  info: {
    icon: Info,
    label: 'Info',
    border: 'border-l-blue-500',
    bg: 'bg-blue-500/[0.06] dark:bg-blue-500/[0.08]',
    iconColor: 'text-blue-500',
  },
  success: {
    icon: CheckCircle,
    label: 'Success',
    border: 'border-l-green-500',
    bg: 'bg-green-500/[0.06] dark:bg-green-500/[0.08]',
    iconColor: 'text-green-500',
  },
  tldr: {
    icon: Zap,
    label: 'TL;DR',
    border: '',
    bg: 'bg-zinc-100 dark:bg-zinc-800/60',
    iconColor: 'text-muted-foreground',
  },
};

export function Callout({ type, children }: CalloutProps) {
  const c = config[type] ?? config.info;
  const Icon = c.icon;
  const isTldr = type === 'tldr';

  return (
    <div
      className={cn(
        'my-6 rounded-lg px-4 py-3',
        c.bg,
        isTldr ? 'border border-border' : 'border-l-4',
        !isTldr && c.border
      )}
    >
      <div className="mb-1.5 flex items-center gap-2">
        <Icon className={cn('size-4 shrink-0', c.iconColor)} />
        <span
          className={cn(
            'text-sm font-semibold',
            isTldr
              ? 'text-muted-foreground uppercase tracking-wider'
              : 'text-foreground'
          )}
        >
          {c.label}
        </span>
      </div>
      <div className="callout-body text-sm [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
