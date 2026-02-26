'use client';

import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbSegment {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  sectionTitle?: string;
  pageTitle?: string;
}

export function Breadcrumbs({ sectionTitle, pageTitle }: BreadcrumbsProps) {
  const pathname = usePathname();

  if (pathname === '/') return null;

  const segments: BreadcrumbSegment[] = [{ label: 'Home', href: '/' }];
  const parts = pathname.split('/').filter(Boolean);

  if (parts[0] && sectionTitle) {
    segments.push({
      label: sectionTitle,
      href: `/${parts[0]}`,
    });
  }

  if (parts[1] && pageTitle) {
    segments.push({
      label: pageTitle,
      href: pathname,
    });
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
        {segments.map((segment, i) => {
          const isLast = i === segments.length - 1;
          return (
            <li key={segment.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3.5" />}
              {i === 0 && <Home className="size-3.5" />}
              {isLast ? (
                <span
                  className={cn(
                    'truncate',
                    isLast && 'text-foreground font-medium'
                  )}
                >
                  {segment.label}
                </span>
              ) : (
                <a
                  href={segment.href}
                  className="truncate hover:text-foreground transition-colors"
                >
                  {segment.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
