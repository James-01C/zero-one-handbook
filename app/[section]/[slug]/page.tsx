import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  getAllSections,
  getSection,
  getPageBySlug,
  getPagesBySection,
} from '@/lib/content';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ContentRenderer } from '@/components/content/ContentRenderer';
import { TypeBadge } from '@/components/content/TypeBadge';
import { RoleBadge } from '@/components/content/RoleBadge';
import type { Metadata } from 'next';

interface ContentPageProps {
  params: Promise<{ section: string; slug: string }>;
}

export async function generateStaticParams() {
  const sections = getAllSections();
  const params: { section: string; slug: string }[] = [];

  for (const section of sections) {
    for (const page of section.pages) {
      params.push({ section: section.slug, slug: page.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: ContentPageProps): Promise<Metadata> {
  const { section: sectionSlug, slug } = await params;
  const page = getPageBySlug(sectionSlug, slug);
  if (!page) return {};

  const section = getSection(sectionSlug);

  return {
    title: page.meta.title,
    description: page.meta.summary,
    openGraph: {
      title: page.meta.title,
      description: page.meta.summary,
      type: 'article',
      section: section?.title,
    },
  };
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { section: sectionSlug, slug } = await params;
  const page = getPageBySlug(sectionSlug, slug);

  if (!page) {
    notFound();
  }

  const section = getSection(sectionSlug);
  const sectionPages = getPagesBySection(sectionSlug);

  // Find previous and next pages
  const currentIndex = sectionPages.findIndex((p) => p.slug === slug);
  const prevPage = currentIndex > 0 ? sectionPages[currentIndex - 1] : null;
  const nextPage =
    currentIndex < sectionPages.length - 1
      ? sectionPages[currentIndex + 1]
      : null;

  return (
    <div>
      <Breadcrumbs sectionTitle={section?.title} pageTitle={page.meta.title} />

      {/* Metadata bar */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-3">
          {page.meta.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <TypeBadge type={page.meta.type} />
          {page.meta.roles.map((role) => (
            <RoleBadge key={role} role={role} />
          ))}
          <span className="text-xs text-muted-foreground">
            v{page.meta.version}
          </span>
          <span className="text-xs text-border">|</span>
          <span className="text-xs text-muted-foreground">
            Updated {page.meta.lastUpdated}
          </span>
        </div>
      </div>

      {/* Content body */}
      <ContentRenderer page={page} />

      {/* Previous / Next navigation */}
      {(prevPage || nextPage) && (
        <nav className="mt-12 flex items-stretch gap-4 border-t border-border pt-6">
          {prevPage ? (
            <Link
              href={`/${sectionSlug}/${prevPage.slug}`}
              className="group flex flex-1 flex-col items-start rounded-lg border border-border p-4 transition-all hover:border-foreground/20 hover:shadow-md"
            >
              <span className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                <ChevronLeft className="size-3" />
                Previous
              </span>
              <span className="text-sm font-medium group-hover:text-primary transition-colors">
                {prevPage.meta.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextPage ? (
            <Link
              href={`/${sectionSlug}/${nextPage.slug}`}
              className="group flex flex-1 flex-col items-end rounded-lg border border-border p-4 transition-all hover:border-foreground/20 hover:shadow-md"
            >
              <span className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                Next
                <ChevronRight className="size-3" />
              </span>
              <span className="text-sm font-medium group-hover:text-primary transition-colors">
                {nextPage.meta.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      )}
    </div>
  );
}
