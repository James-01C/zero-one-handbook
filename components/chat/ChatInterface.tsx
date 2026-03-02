'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, Loader2, AlertCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSearch } from '@/components/search/SearchProvider';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  compact?: boolean;
  onRequestExpand?: () => void;
}

const SUGGESTED_QUESTIONS = [
  'How do I start working on a Jira ticket?',
  'What merge strategy should I use?',
  'Where do I report a bug?',
  'What happens when a version is released?',
];

export function ChatInterface({ compact = false, onRequestExpand }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNewMessages, setShowNewMessages] = useState(false);
  const [fallbackResults, setFallbackResults] = useState<
    Array<{ title: string; section: string; slug: string }>
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isNearBottomRef = useRef(true);
  const { search } = useSearch();

  const checkNearBottom = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 100;
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowNewMessages(false);
  }, []);

  const handleScroll = useCallback(() => {
    const nearBottom = checkNearBottom();
    isNearBottomRef.current = nearBottom;
    if (nearBottom) {
      setShowNewMessages(false);
    }
  }, [checkNearBottom]);

  useEffect(() => {
    if (isNearBottomRef.current) {
      scrollToBottom();
    } else {
      setShowNewMessages(true);
    }
  }, [messages, scrollToBottom]);

  // Smart auto-expand: check for table overflow when messages change
  useEffect(() => {
    if (!onRequestExpand) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    // Wait for DOM to render the new content
    const timer = setTimeout(() => {
      const tables = el.querySelectorAll('table');
      for (const table of tables) {
        if (table.scrollWidth > table.clientWidth + 2) {
          onRequestExpand();
          break;
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, onRequestExpand]);

  const handleFallbackSearch = useCallback(
    (query: string) => {
      const results = search(query, 5);
      setFallbackResults(
        results.map((r) => ({
          title: r.item.title,
          section: r.item.section,
          slug: r.item.slug,
        }))
      );
    },
    [search]
  );

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);
    setFallbackResults([]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: messages,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        if (errData.error === 'chat_unavailable') {
          handleFallbackSearch(text.trim());
          setError(
            'Chat is not available right now. Here are some relevant handbook pages:'
          );
          setIsLoading(false);
          return;
        }
        throw new Error(errData.message || 'Failed to get response');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response stream');

      const decoder = new TextDecoder();
      let assistantContent = '';

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '' },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;

            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                assistantContent += parsed.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: 'assistant',
                    content: assistantContent,
                  };
                  return updated;
                });
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      }
    } catch {
      handleFallbackSearch(text.trim());
      setError(
        'Could not reach the assistant. Here are some relevant handbook pages:'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const renderUserContent = (content: string) => {
    // Convert markdown-style links to clickable links for user messages
    const parts = content.split(/(\[.*?\]\(\/.*?\))/g);
    return parts.map((part, i) => {
      const linkMatch = part.match(/\[(.*?)\]\((\/.*?)\)/);
      if (linkMatch) {
        return (
          <Link
            key={i}
            href={linkMatch[2]}
            className="font-medium text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {linkMatch[1]}
          </Link>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div
      className={cn(
        'flex flex-col',
        compact ? 'h-[500px]' : 'h-[calc(100vh-12rem)]'
      )}
    >
      {/* Messages area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="relative flex-1 overflow-y-auto space-y-4 pb-4"
      >
        {messages.length === 0 && (
          <div className="space-y-4 pt-4">
            <div className="text-center">
              <div className="text-lg font-semibold">Ask Amara</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Your handbook assistant. Ask about workflows, Git
                procedures, Jira conventions, and more.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="rounded-lg border border-border bg-card p-3 text-left text-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/80"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'flex',
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'max-w-[85%] overflow-hidden rounded-lg px-4 py-2.5 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                  : 'chat-message bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
              )}
            >
              {msg.role === 'assistant' ? (
                <div className="prose prose-sm dark:prose-invert max-w-none overflow-x-auto">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ href, children }) => {
                        if (href?.startsWith('/')) {
                          return (
                            <Link
                              href={href}
                              className="font-medium text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              {children}
                            </Link>
                          );
                        }
                        return (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            {children}
                          </a>
                        );
                      },
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">
                  {renderUserContent(msg.content)}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2.5 text-sm dark:bg-zinc-800">
              <Loader2 className="size-4 animate-spin" />
              <span className="text-muted-foreground">Thinking...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="space-y-2">
            <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm dark:border-amber-900/50 dark:bg-amber-950/20">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <span className="text-amber-800 dark:text-amber-200">
                {error}
              </span>
            </div>
            {fallbackResults.length > 0 && (
              <div className="space-y-1 pl-6">
                {fallbackResults.map((result) => (
                  <Link
                    key={`${result.section}/${result.slug}`}
                    href={`/${result.section}/${result.slug}`}
                    className="block rounded-md p-2 text-sm text-blue-600 hover:bg-zinc-50 dark:text-blue-400 dark:hover:bg-zinc-800/50"
                  >
                    {result.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        <div ref={messagesEndRef} />

        {showNewMessages && (
          <button
            onClick={scrollToBottom}
            className="sticky bottom-2 left-1/2 z-10 -translate-x-1/2 flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs shadow-md transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            <ChevronDown className="size-3" />
            New messages
          </button>
        )}
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-border pt-4"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about workflows, Git, Jira..."
          className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-zinc-400 dark:focus:border-zinc-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={cn(
            'flex size-10 items-center justify-center rounded-lg transition-colors',
            input.trim() && !isLoading
              ? 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200'
              : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600'
          )}
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
        </button>
      </form>
    </div>
  );
}
