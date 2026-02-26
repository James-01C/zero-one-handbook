'use client';

import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { Section } from '@/types/content';

interface HeaderProps {
  sections: Section[];
}

export function Header({ sections }: HeaderProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.getElementById(
          'header-search'
        ) as HTMLInputElement | null;
        input?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </Button>

        {/* App name */}
        <a href="/" className="flex items-center gap-2 font-semibold">
          <span className="hidden text-lg sm:inline-block">
            Zero One Handbook
          </span>
          <span className="text-lg sm:hidden">ZO Handbook</span>
        </a>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="ml-auto flex-1 md:max-w-sm">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <input
              id="header-search"
              type="search"
              placeholder="Search... ⌘K"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none ring-ring/50 placeholder:text-muted-foreground focus:border-ring focus:ring-[3px]"
            />
          </div>
        </form>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Mobile drawer */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="border-b border-border px-4 py-3">
              <SheetTitle>Zero One Handbook</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto py-2">
              <SidebarNav
                sections={sections}
                onNavigate={() => setMobileOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
