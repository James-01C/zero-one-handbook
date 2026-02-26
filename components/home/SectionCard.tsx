import Link from 'next/link';
import { SectionIcon } from '@/components/home/SectionIcon';
import { cn } from '@/lib/utils';
import type { Section, ContentType } from '@/types/content';

interface SectionCardProps {
  section: Section;
}

const typeColors: Record<ContentType, string> = {
  sop: 'bg-blue-500/10 text-blue-500',
  reference: 'bg-purple-500/10 text-purple-500',
  policy: 'bg-amber-500/10 text-amber-500',
  guide: 'bg-green-500/10 text-green-500',
};

const typeLabels: Record<ContentType, string> = {
  sop: 'SOP',
  reference: 'Reference',
  policy: 'Policy',
  guide: 'Guide',
};

export function SectionCard({ section }: SectionCardProps) {
  const typeCounts = section.pages.reduce(
    (acc, page) => {
      acc[page.meta.type] = (acc[page.meta.type] || 0) + 1;
      return acc;
    },
    {} as Partial<Record<ContentType, number>>
  );

  return (
    <Link
      href={`/${section.slug}`}
      className="group block rounded-lg border border-border bg-card p-5 transition-all hover:border-foreground/20 hover:shadow-md"
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
          <SectionIcon icon={section.icon} />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold leading-tight">{section.title}</h2>
          <p className="text-xs text-muted-foreground">
            {section.pages.length} {section.pages.length === 1 ? 'page' : 'pages'}
          </p>
        </div>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {section.description}
      </p>

      {Object.keys(typeCounts).length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {(Object.entries(typeCounts) as [ContentType, number][]).map(
            ([type, count]) => (
              <span
                key={type}
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                  typeColors[type]
                )}
              >
                {count} {typeLabels[type]}
              </span>
            )
          )}
        </div>
      )}
    </Link>
  );
}
