import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import type { ComponentPropsWithoutRef } from 'react';
import type { Page } from '@/types/content';

interface SOPRendererProps {
  page: Page;
}

interface StepData {
  number: number;
  title: string;
  content: string;
}

function parseSteps(markdown: string): { intro: string; steps: StepData[] } {
  const lines = markdown.split('\n');
  const steps: StepData[] = [];
  let intro = '';
  let currentStep: StepData | null = null;
  let currentContent: string[] = [];
  let foundFirstStep = false;

  for (const line of lines) {
    const stepMatch = line.match(/^##\s+Step\s+(\d+)[:\s]*(.*)$/i);

    if (stepMatch) {
      if (currentStep) {
        currentStep.content = currentContent.join('\n').trim();
        steps.push(currentStep);
        currentContent = [];
      } else if (!foundFirstStep) {
        intro = currentContent.join('\n').trim();
        currentContent = [];
      }

      foundFirstStep = true;
      currentStep = {
        number: parseInt(stepMatch[1], 10),
        title: stepMatch[2].trim(),
        content: '',
      };
    } else {
      currentContent.push(line);
    }
  }

  if (currentStep) {
    currentStep.content = currentContent.join('\n').trim();
    steps.push(currentStep);
  } else if (!foundFirstStep) {
    intro = currentContent.join('\n').trim();
  }

  return { intro, steps };
}

const stepMdxComponents = {
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="mb-2 mt-4 text-sm font-semibold text-foreground first:mt-0" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="mb-3 text-sm leading-relaxed text-muted-foreground last:mb-0" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="mb-3 ml-4 list-disc space-y-1 text-sm text-muted-foreground last:mb-0" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="mb-3 ml-4 list-decimal space-y-1 text-sm text-muted-foreground last:mb-0" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li className="leading-relaxed" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<'a'>) => (
    <a className="font-medium text-primary underline underline-offset-4 hover:text-primary/80" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<'code'>) => {
    const isInline = !props.className;
    if (isInline) {
      return <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground" {...props} />;
    }
    return <code className="font-mono text-xs" {...props} />;
  },
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre className="mb-3 overflow-x-auto rounded-md bg-zinc-900 p-3 font-mono text-xs text-zinc-100 dark:bg-zinc-800/50 last:mb-0" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className="mb-3 border-l-2 border-amber-500/50 bg-amber-500/5 pl-3 text-sm italic text-muted-foreground last:mb-0" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="mb-3 overflow-x-auto rounded-lg border border-border last:mb-0">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
    <thead className="border-b border-border bg-muted/50" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th className="px-3 py-2 text-left text-xs font-semibold text-foreground" {...props} />
  ),
  tr: (props: ComponentPropsWithoutRef<'tr'>) => (
    <tr className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td className="px-3 py-2 text-xs text-muted-foreground" {...props} />
  ),
};

const introMdxComponents = {
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="mb-4 leading-7 text-muted-foreground" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="mb-4 ml-6 list-disc space-y-1 text-muted-foreground" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className="mb-4 border-l-4 border-primary/30 pl-4 italic text-muted-foreground" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<'code'>) => (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground" {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="mb-4 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
    <thead className="border-b border-border bg-muted/50" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th className="px-4 py-2.5 text-left font-semibold text-foreground" {...props} />
  ),
  tr: (props: ComponentPropsWithoutRef<'tr'>) => (
    <tr className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td className="px-4 py-2.5 text-muted-foreground" {...props} />
  ),
};

export function SOPRenderer({ page }: SOPRendererProps) {
  const { intro, steps } = parseSteps(page.content);

  return (
    <div>
      {intro && (
        <div className="mb-8">
          <MDXRemote
              source={intro}
              components={introMdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
        </div>
      )}

      <div className="relative space-y-0">
        {steps.map((step, i) => (
          <div key={step.number} className="relative flex gap-4 pb-8 last:pb-0">
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="absolute left-5 top-10 bottom-0 w-px bg-border" />
            )}

            {/* Step number */}
            <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-bold text-blue-500 ring-4 ring-background">
              {step.number}
            </div>

            {/* Step content */}
            <div className="flex-1 rounded-lg border border-border bg-card p-4 pt-2">
              <h3 className="mb-2 font-semibold text-foreground">
                {step.title}
              </h3>
              {step.content && (
                <MDXRemote
                  source={step.content}
                  components={stepMdxComponents}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
