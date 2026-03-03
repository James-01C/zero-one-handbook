'use client';

import { useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { MessageSquare, X, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatInterface } from '@/components/chat/ChatInterface';

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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
        {isOpen ? (
          <X className="size-5" />
        ) : (
          <MessageSquare className="size-5" />
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          className={cn(
            'fixed bottom-20 right-6 z-50 rounded-xl border border-border bg-background shadow-2xl transition-all duration-300 ease-in-out',
            isExpanded
              ? 'w-[672px] max-w-[calc(100vw-3rem)]'
              : 'w-[380px] max-w-[calc(100vw-3rem)]'
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <h3 className="text-sm font-semibold">Ask Amara</h3>
              <p className="text-xs text-muted-foreground">
                Handbook assistant
              </p>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-zinc-100 hover:text-foreground dark:hover:bg-zinc-800"
              aria-label={isExpanded ? 'Collapse chat' : 'Expand chat'}
            >
              {isExpanded ? (
                <Minimize2 className="size-3.5" />
              ) : (
                <Maximize2 className="size-3.5" />
              )}
            </button>
          </div>
          <div className="p-4">
            <ChatInterface
              compact
              onRequestExpand={() => setIsExpanded(true)}
            />
          </div>
        </div>
      )}
    </>
  );
}
