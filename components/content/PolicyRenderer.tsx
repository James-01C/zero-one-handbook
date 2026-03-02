import { MDXRemote } from 'next-mdx-remote/rsc';
import type { ComponentPropsWithoutRef } from 'react';
import type { Page } from '@/types/content';
import { sharedMdxOptions, tableComponents, customComponents } from '@/lib/mdx';

interface PolicyRendererProps {
  page: Page;
}

interface PolicySection {
  heading: string;
  content: string;
}

function parsePolicySections(markdown: string): {
  tldr: string | null;
  sections: PolicySection[];
} {
  const lines = markdown.split('\n');
  let tldr: string | null = null;
  const sections: PolicySection[] = [];
  let currentHeading = '';
  let currentContent: string[] = [];
  let foundFirstH2 = false;

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/);

    if (h2Match) {
      if (currentHeading || (!foundFirstH2 && currentContent.length > 0)) {
        if (!foundFirstH2) {
          // Content before first heading is intro
          const introText = currentContent.join('\n').trim();
          if (introText) {
            sections.push({ heading: '', content: introText });
          }
        } else {
          sections.push({
            heading: currentHeading,
            content: currentContent.join('\n').trim(),
          });
        }
        currentContent = [];
      }

      const heading = h2Match[1].trim();
      foundFirstH2 = true;

      if (
        heading.toLowerCase().includes('tl;dr') ||
        heading.toLowerCase().includes('tldr') ||
        heading.toLowerCase().includes('summary')
      ) {
        // Next content block is the TL;DR
        currentHeading = '__TLDR__';
      } else {
        currentHeading = heading;
      }
    } else {
      currentContent.push(line);
    }
  }

  // Flush last section
  if (currentHeading || currentContent.length > 0) {
    if (currentHeading === '__TLDR__') {
      tldr = currentContent.join('\n').trim();
    } else {
      sections.push({
        heading: currentHeading,
        content: currentContent.join('\n').trim(),
      });
    }
  }

  return { tldr, sections };
}

const policyMdxComponents = {
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="mb-2 mt-6 text-base font-semibold text-foreground first:mt-0" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="mb-3 leading-7 text-muted-foreground last:mb-0" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="mb-3 ml-6 list-disc space-y-1 text-muted-foreground last:mb-0" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="mb-3 ml-6 list-decimal space-y-1 text-muted-foreground last:mb-0" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li className="leading-7" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<'a'>) => (
    <a className="font-medium text-primary underline underline-offset-4 hover:text-primary/80" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<'code'>) => (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className="mb-3 border-l-4 border-amber-500/40 bg-amber-500/5 py-2 pl-4 text-muted-foreground last:mb-0" {...props} />
  ),
  ...tableComponents,
  ...customComponents,
};

const tldrComponents = {
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="text-sm leading-relaxed text-foreground last:mb-0" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold" {...props} />
  ),
};

export function PolicyRenderer({ page }: PolicyRendererProps) {
  const { tldr, sections } = parsePolicySections(page.content);

  return (
    <div>
      {/* TL;DR callout */}
      {(tldr || page.meta.summary) && (
        <div className="mb-8 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-amber-500">
            TL;DR
          </p>
          {tldr ? (
            <MDXRemote
              source={tldr}
              components={tldrComponents}
              options={sharedMdxOptions}
            />
          ) : (
            <p className="text-sm leading-relaxed text-foreground">
              {page.meta.summary}
            </p>
          )}
        </div>
      )}

      {/* Policy sections */}
      <div className="space-y-8">
        {sections.map((section, i) => (
          <section key={i}>
            {section.heading && (
              <h2 className="mb-4 text-lg font-semibold text-foreground border-b border-border pb-2">
                {section.heading}
              </h2>
            )}
            <div className="border-l-2 border-amber-500/20 pl-4">
              <MDXRemote
                source={section.content}
                components={policyMdxComponents}
                options={sharedMdxOptions}
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
