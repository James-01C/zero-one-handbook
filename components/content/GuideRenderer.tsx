import { MdxContent } from '@/components/content/MdxContent';
import { GuideReadingProgress } from '@/components/content/GuideReadingProgress';
import type { Page } from '@/types/content';

interface GuideRendererProps {
  page: Page;
}

interface TocItem {
  id: string;
  title: string;
  level: number;
}

function extractHeadings(markdown: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    headings.push({ id, title, level });
  }

  return headings;
}

export function GuideRenderer({ page }: GuideRendererProps) {
  const headings = extractHeadings(page.content);

  return (
    <>
      <GuideReadingProgress />

      <div className="flex gap-8">
        <div className="flex-1 min-w-0">
          <div className="max-w-none text-[0.9375rem] leading-[1.8]">
            <MdxContent source={page.content} />
          </div>
        </div>

        {headings.length > 2 && (
          <nav className="hidden xl:block w-56 shrink-0">
            <div className="sticky top-20">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Contents
              </p>
              <ul className="space-y-1.5 text-sm">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className={`block text-muted-foreground transition-colors hover:text-foreground ${
                        heading.level === 3 ? 'pl-3' : ''
                      }`}
                    >
                      {heading.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}
      </div>
    </>
  );
}
