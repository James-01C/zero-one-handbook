export type ContentType = 'sop' | 'reference' | 'policy' | 'guide';

export type Role = 'developer' | 'management' | 'all';

export interface ContentMeta {
  title: string;
  type: ContentType;
  roles: Role[];
  summary: string;
  version: string;
  lastUpdated: string;
}

export interface Page {
  slug: string;
  section: string;
  meta: ContentMeta;
  content: string;
}

export interface Section {
  slug: string;
  title: string;
  description: string;
  icon: string;
  sortOrder: number;
  pages: Page[];
}

export interface SearchableItem {
  slug: string;
  section: string;
  title: string;
  type: ContentType;
  roles: Role[];
  summary: string;
  content: string;
}
