import { cn } from '@/lib/utils';
import type { Role } from '@/types/content';

interface RoleBadgeProps {
  role: Role;
}

const roleConfig: Record<Role, { label: string; className: string }> = {
  developer: {
    label: 'Developer',
    className: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  management: {
    label: 'Management',
    className: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  all: {
    label: 'All',
    className: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  },
};

export function RoleBadge({ role }: RoleBadgeProps) {
  const config = roleConfig[role];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
