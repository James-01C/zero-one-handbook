'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, Suspense } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SearchResults } from '@/components/search/SearchResults';
import { useSearch } from '@/components/search/SearchProvider';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { search } = useSearch();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return search(query);
  }, [query, search]);

  return (
    <div>
      <Breadcrumbs sectionTitle="Search" />

      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Search Results</h1>
        {query && (
          <p className="mt-1 text-muted-foreground">
            {results.length} {results.length === 1 ? 'result' : 'results'} for
            &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {!query ? (
        <p className="py-12 text-center text-muted-foreground">
          Enter a search query to find content.
        </p>
      ) : (
        <SearchResults results={results} query={query} />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-muted-foreground">
          Loading...
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
