import Fuse, { type IFuseOptions, type FuseResultMatch } from 'fuse.js';
import { getAllSearchableItems } from '@/lib/content';
import type { SearchableItem } from '@/types/content';

export interface SearchResult {
  item: SearchableItem;
  score: number;
  matches?: readonly FuseResultMatch[];
}

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

let fuseIndex: Fuse<SearchableItem> | null = null;

function getIndex(): Fuse<SearchableItem> {
  if (!fuseIndex) {
    const items = getAllSearchableItems();
    fuseIndex = new Fuse(items, fuseOptions);
  }
  return fuseIndex;
}

export function search(query: string, limit?: number): SearchResult[] {
  if (!query.trim()) return [];

  const fuse = getIndex();
  const results = fuse.search(query);

  return (limit ? results.slice(0, limit) : results).map((r) => ({
    item: r.item,
    score: r.score ?? 1,
    matches: r.matches,
  }));
}

export function getSearchableItems(): SearchableItem[] {
  return getAllSearchableItems();
}
