'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { SearchBar } from '@/components/search/SearchBar';
import { useState } from 'react';
import type { Section } from '@/types/content';

interface HeaderProps {
  sections: Section[];
}

export function Header({ sections }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

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
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="hidden text-lg sm:inline-block">
            Zero One Handbook
          </span>
          <span className="text-lg sm:hidden">ZO Handbook</span>
        </Link>

        {/* Search bar with instant results */}
        <SearchBar />

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
