import { MdxContent } from '@/components/content/MdxContent';
import type { Page } from '@/types/content';

interface ReferenceRendererProps {
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

export function ReferenceRenderer({ page }: ReferenceRendererProps) {
  const headings = extractHeadings(page.content);

  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <MdxContent source={page.content} />
      </div>

      {headings.length > 2 && (
        <nav className="hidden xl:block w-56 shrink-0">
          <div className="sticky top-20">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              On this page
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
  );
}
