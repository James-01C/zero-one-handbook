'use client';

import { createContext, useContext, useMemo } from 'react';
import Fuse, { type IFuseOptions } from 'fuse.js';
import type { SearchableItem } from '@/types/content';

interface SearchContextValue {
  search: (query: string, limit?: number) => SearchResultItem[];
}

export interface SearchResultItem {
  item: SearchableItem;
  score: number;
}

const SearchContext = createContext<SearchContextValue | null>(null);

const fuseOptions: IFuseOptions<SearchableItem> = {
  keys: [
    { name: 'title', weight: 3 },
    { name: 'summary', weight: 2 },
    { name: 'content', weight: 1 },
  ],
  threshold: 0.4,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
};

interface SearchProviderProps {
  items: SearchableItem[];
  children: React.ReactNode;
}

export function SearchProvider({ items, children }: SearchProviderProps) {
  const fuse = useMemo(() => new Fuse(items, fuseOptions), [items]);

  const searchFn = useMemo(
    () =>
      (query: string, limit?: number): SearchResultItem[] => {
        if (!query.trim()) return [];
        const results = fuse.search(query);
        return (limit ? results.slice(0, limit) : results).map((r) => ({
          item: r.item,
          score: r.score ?? 1,
        }));
      },
    [fuse]
  );

  return (
    <SearchContext.Provider value={{ search: searchFn }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
