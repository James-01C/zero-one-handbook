import { getAllSections } from '@/lib/content';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export function Sidebar() {
  const sections = getAllSections();

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-border">
      <ScrollArea className="flex-1 py-4">
        <SidebarNav sections={sections} />
      </ScrollArea>
      <Separator />
      <div className="px-4 py-3">
        <p className="text-xs text-muted-foreground">
          Zero One Handbook v1.0.0
        </p>
      </div>
    </aside>
  );
}
