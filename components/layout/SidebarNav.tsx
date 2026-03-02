'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronRight, Map, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionIcon } from '@/components/home/SectionIcon';
import type { Section } from '@/types/content';

interface SidebarNavProps {
  sections: Section[];
  onNavigate?: () => void;
}

export function SidebarNav({ sections, onNavigate }: SidebarNavProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    const currentSection = pathname.split('/')[1];
    return currentSection ? new Set([currentSection]) : new Set<string>();
  });

  const toggleSection = (slug: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  return (
    <nav className="space-y-1 px-2">
      {/* System Overview link */}
      <Link
        href="/visuals"
        onClick={onNavigate}
        className={cn(
          'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
          pathname === '/visuals'
            ? 'bg-accent text-accent-foreground'
            : 'text-muted-foreground'
        )}
      >
        <Map className="size-4" />
        <span className="flex-1 text-left">System Overview</span>
      </Link>

      {sections.map((section) => {
        const isExpanded = expandedSections.has(section.slug);
        const isSectionActive = pathname.startsWith(`/${section.slug}`);

        return (
          <div key={section.slug}>
            <button
              onClick={() => toggleSection(section.slug)}
              className={cn(
                'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                isSectionActive
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              <SectionIcon icon={section.icon} className="size-4" />
              <span className="flex-1 text-left">{section.title}</span>
              <span className="text-xs text-muted-foreground">
                {section.pages.length}
              </span>
              <ChevronRight
                className={cn(
                  'size-3.5 shrink-0 transition-transform',
                  isExpanded && 'rotate-90'
                )}
              />
            </button>

            {isExpanded && (
              <div className="ml-4 mt-0.5 space-y-0.5 border-l border-border pl-3">
                <Link
                  href={`/${section.slug}`}
                  onClick={onNavigate}
                  className={cn(
                    'block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                    pathname === `/${section.slug}`
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground'
                  )}
                >
                  Overview
                </Link>
                {section.pages.map((page) => {
                  const pagePath = `/${section.slug}/${page.slug}`;
                  const isActive = pathname === pagePath;

                  return (
                    <Link
                      key={page.slug}
                      href={pagePath}
                      onClick={onNavigate}
                      className={cn(
                        'block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                        isActive
                          ? 'bg-accent text-accent-foreground font-medium'
                          : 'text-muted-foreground'
                      )}
                    >
                      {page.meta.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Chat link */}
      <Link
        href="/chat"
        onClick={onNavigate}
        className={cn(
          'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
          pathname === '/chat'
            ? 'bg-accent text-accent-foreground'
            : 'text-muted-foreground'
        )}
      >
        <MessageSquare className="size-4" />
        <span className="flex-1 text-left">Ask Amara</span>
      </Link>
    </nav>
  );
}
