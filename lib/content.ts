import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type {
  ContentMeta,
  ContentType,
  Page,
  Role,
  Section,
  SearchableItem,
} from '@/types/content';

const contentDir = path.join(process.cwd(), 'content');

function parseFrontmatter(raw: matter.GrayMatterFile<string>): ContentMeta {
  const data = raw.data;
  return {
    title: data.title as string,
    type: data.type as ContentType,
    roles: data.roles as Role[],
    summary: data.summary as string,
    version: data.version as string,
    lastUpdated: data.lastUpdated as string,
    order: data.order as number | undefined,
  };
}

export function getAllSectionSlugs(): string[] {
  return fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export function getSection(sectionSlug: string): Section | null {
  const sectionPath = path.join(contentDir, sectionSlug);
  const configPath = path.join(sectionPath, '_section.json');

  if (!fs.existsSync(configPath)) {
    return null;
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const pages = getPagesBySection(sectionSlug);

  return {
    slug: sectionSlug,
    title: config.title,
    description: config.description,
    icon: config.icon,
    sortOrder: config.sortOrder,
    pages,
  };
}

export function getAllSections(): Section[] {
  const slugs = getAllSectionSlugs();
  const sections: Section[] = [];

  for (const slug of slugs) {
    const section = getSection(slug);
    if (section) {
      sections.push(section);
    }
  }

  return sections.sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getPagesBySection(sectionSlug: string): Page[] {
  const sectionPath = path.join(contentDir, sectionSlug);

  if (!fs.existsSync(sectionPath)) {
    return [];
  }

  const files = fs
    .readdirSync(sectionPath)
    .filter((file) => file.endsWith('.md'));

  const pages = files.map((file) => {
    const filePath = path.join(sectionPath, file);
    const raw = matter(fs.readFileSync(filePath, 'utf-8'));
    const meta = parseFrontmatter(raw);

    return {
      slug: file.replace('.md', ''),
      section: sectionSlug,
      meta,
      content: raw.content,
    };
  });

  return pages.sort((a, b) => (a.meta.order ?? 999) - (b.meta.order ?? 999));
}

export function getPageBySlug(
  sectionSlug: string,
  pageSlug: string
): Page | null {
  const filePath = path.join(contentDir, sectionSlug, `${pageSlug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = matter(fs.readFileSync(filePath, 'utf-8'));
  const meta = parseFrontmatter(raw);

  return {
    slug: pageSlug,
    section: sectionSlug,
    meta,
    content: raw.content,
  };
}

export function getAllPages(): Page[] {
  const sections = getAllSectionSlugs();
  const pages: Page[] = [];

  for (const section of sections) {
    pages.push(...getPagesBySection(section));
  }

  return pages;
}

export function getAllSearchableItems(): SearchableItem[] {
  return getAllPages().map((page) => ({
    slug: page.slug,
    section: page.section,
    title: page.meta.title,
    type: page.meta.type,
    roles: page.meta.roles,
    summary: page.meta.summary,
    content: page.content,
  }));
}
