import { SOPRenderer } from '@/components/content/SOPRenderer';
import { ReferenceRenderer } from '@/components/content/ReferenceRenderer';
import { PolicyRenderer } from '@/components/content/PolicyRenderer';
import { GuideRenderer } from '@/components/content/GuideRenderer';
import type { Page } from '@/types/content';

interface ContentRendererProps {
  page: Page;
}

export function ContentRenderer({ page }: ContentRendererProps) {
  switch (page.meta.type) {
    case 'sop':
      return <SOPRenderer page={page} />;
    case 'reference':
      return <ReferenceRenderer page={page} />;
    case 'policy':
      return <PolicyRenderer page={page} />;
    case 'guide':
      return <GuideRenderer page={page} />;
    default:
      return <GuideRenderer page={page} />;
  }
}
