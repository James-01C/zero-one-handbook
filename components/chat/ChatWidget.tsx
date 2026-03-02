'use client';

import { useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { MessageSquare, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatInterface } from '@/components/chat/ChatInterface';

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getSnapshot,
    getServerSnapshot
  );

  // Don't show widget on the chat page itself
  if (!mounted || pathname === '/chat') return null;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 right-6 z-50 flex size-12 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-105',
          isOpen
            ? 'bg-zinc-600 text-white dark:bg-zinc-400 dark:text-zinc-900'
            : 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
        )}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X className="size-5" /> : <MessageSquare className="size-5" />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] rounded-xl border border-border bg-background shadow-2xl">
          <div className="border-b border-border px-4 py-3">
            <h3 className="text-sm font-semibold">Ask Amara</h3>
            <p className="text-xs text-muted-foreground">
              Handbook assistant
            </p>
          </div>
          <div className="p-4">
            <ChatInterface compact />
          </div>
        </div>
      )}
    </>
  );
}
