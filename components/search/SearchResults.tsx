'use client';

import Link from 'next/link';
import { TypeBadge } from '@/components/content/TypeBadge';
import { RoleBadge } from '@/components/content/RoleBadge';
import type { SearchResultItem } from '@/components/search/SearchProvider';

interface SearchResultsProps {
  results: SearchResultItem[];
  query: string;
}

export function SearchResults({ results, query }: SearchResultsProps) {
  if (query && results.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          No results found for &ldquo;{query}&rdquo;
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try searching with different keywords.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {results.map((result) => (
        <Link
          key={`${result.item.section}/${result.item.slug}`}
          href={`/${result.item.section}/${result.item.slug}`}
          className="group block rounded-lg border border-border bg-card p-4 transition-all hover:border-foreground/20 hover:shadow-md"
        >
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <h2 className="font-semibold group-hover:text-primary transition-colors">
              {result.item.title}
            </h2>
            <TypeBadge type={result.item.type} />
            {result.item.roles.map((role) => (
              <RoleBadge key={role} role={role} />
            ))}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
            {result.item.summary}
          </p>

          <span className="text-xs text-muted-foreground capitalize">
            {result.item.section.replace(/-/g, ' ')}
          </span>
        </Link>
      ))}
    </div>
  );
}
