import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllSections, getSection } from '@/lib/content';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { TypeBadge } from '@/components/content/TypeBadge';
import { RoleBadge } from '@/components/content/RoleBadge';
import { getIcon } from '@/lib/icons';
import type { Metadata } from 'next';

interface SectionPageProps {
  params: Promise<{ section: string }>;
}

export async function generateStaticParams() {
  const sections = getAllSections();
  return sections.map((section) => ({ section: section.slug }));
}

export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { section: sectionSlug } = await params;
  const section = getSection(sectionSlug);
  if (!section) return {};

  return {
    title: section.title,
    description: section.description,
  };
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section: sectionSlug } = await params;
  const section = getSection(sectionSlug);

  if (!section) {
    notFound();
  }

  const Icon = getIcon(section.icon);

  return (
    <div>
      <Breadcrumbs sectionTitle={section.title} />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Icon className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {section.title}
            </h1>
          </div>
        </div>
        <p className="text-muted-foreground">{section.description}</p>
      </div>

      <div className="space-y-3">
        {section.pages.map((page) => (
          <Link
            key={page.slug}
            href={`/${section.slug}/${page.slug}`}
            className="group block rounded-lg border border-border bg-card p-4 transition-all hover:border-foreground/20 hover:shadow-md"
          >
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h2 className="font-semibold group-hover:text-primary transition-colors">
                {page.meta.title}
              </h2>
              <TypeBadge type={page.meta.type} />
              {page.meta.roles.map((role) => (
                <RoleBadge key={role} role={role} />
              ))}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              {page.meta.summary}
            </p>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>v{page.meta.version}</span>
              <span className="text-border">|</span>
              <span>Updated {page.meta.lastUpdated}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
