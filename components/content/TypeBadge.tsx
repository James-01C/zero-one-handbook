import { cn } from '@/lib/utils';
import type { ContentType } from '@/types/content';

interface TypeBadgeProps {
  type: ContentType;
}

const typeConfig: Record<ContentType, { label: string; className: string }> = {
  sop: { label: 'SOP', className: 'bg-blue-500/10 text-blue-500' },
  reference: {
    label: 'Reference',
    className: 'bg-purple-500/10 text-purple-500',
  },
  policy: { label: 'Policy', className: 'bg-amber-500/10 text-amber-500' },
  guide: { label: 'Guide', className: 'bg-green-500/10 text-green-500' },
};

export function TypeBadge({ type }: TypeBadgeProps) {
  const config = typeConfig[type];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
