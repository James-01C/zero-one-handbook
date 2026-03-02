'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Connection {
  from: string;
  to: string;
  labels: string[];
  direction: 'both' | 'forward';
}

const platforms = [
  {
    id: 'github',
    name: 'GitHub',
    owns: 'Code & versions',
    color: 'bg-zinc-900 dark:bg-zinc-100',
    textColor: 'text-white dark:text-zinc-900',
    icon: (
      <svg viewBox="0 0 24 24" className="size-6 fill-current">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    id: 'jira',
    name: 'Jira',
    owns: 'Work tracking',
    color: 'bg-blue-600',
    textColor: 'text-white',
    icon: (
      <svg viewBox="0 0 24 24" className="size-6 fill-current">
        <path d="M11.571 11.513H0a5.218 5.218 0 005.232 5.215h2.13v2.057A5.215 5.215 0 0012.575 24V12.518a1.005 1.005 0 00-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 005.215 5.214h2.129v2.058a5.218 5.218 0 005.215 5.214V6.762a1.005 1.005 0 00-1.001-1.005zM23.013 0H11.455a5.215 5.215 0 005.215 5.215h2.129v2.057A5.215 5.215 0 0024.013 12.487V1.005A1.005 1.005 0 0023.013 0z" />
      </svg>
    ),
  },
  {
    id: 'slack',
    name: 'Slack',
    owns: 'Communication',
    color: 'bg-purple-600',
    textColor: 'text-white',
    icon: (
      <svg viewBox="0 0 24 24" className="size-6 fill-current">
        <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.271 0a2.528 2.528 0 01-2.521 2.521 2.528 2.528 0 01-2.521-2.521V2.522A2.528 2.528 0 0115.164 0a2.528 2.528 0 012.521 2.522v6.312zM15.164 18.956a2.528 2.528 0 012.521 2.522A2.528 2.528 0 0115.164 24a2.528 2.528 0 01-2.521-2.522v-2.522h2.521zm0-1.271a2.528 2.528 0 01-2.521-2.521 2.528 2.528 0 012.521-2.521h6.314A2.528 2.528 0 0124 15.164a2.528 2.528 0 01-2.522 2.521h-6.314z" />
      </svg>
    ),
  },
  {
    id: 'notion',
    name: 'Notion',
    owns: 'Knowledge base',
    color: 'bg-zinc-700',
    textColor: 'text-white',
    icon: (
      <svg viewBox="0 0 24 24" className="size-6 fill-current">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.25 2.1c-.42-.326-.98-.7-2.055-.607L3.26 2.494c-.466.046-.56.28-.374.466l1.573 1.248zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.886l-15.177.887c-.56.046-.747.326-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933l3.222-.186zM2.1 1.168L15.887.074c1.68-.14 2.1.093 2.802.606l3.876 2.754c.466.326.606.42.606.793v17.7c0 1.12-.42 1.773-1.868 1.866L5.86 24.66c-1.075.047-1.588-.093-2.147-.746L.933 20.74C.327 19.948 0 19.34 0 18.641V2.94c0-.886.42-1.633 2.1-1.773z" />
      </svg>
    ),
  },
];

const connections: Connection[] = [
  {
    from: 'github',
    to: 'jira',
    labels: [
      'Branch linking (DEV-###)',
      'Version alignment',
      'Component alignment',
    ],
    direction: 'both',
  },
  {
    from: 'github',
    to: 'slack',
    labels: ['Deployment notifications'],
    direction: 'forward',
  },
  {
    from: 'slack',
    to: 'notion',
    labels: ['Daily progress updates'],
    direction: 'forward',
  },
];

export function SystemMap() {
  const [activeConnection, setActiveConnection] = useState<Connection | null>(
    null
  );
  const [activePlatform, setActivePlatform] = useState<string | null>(null);

  const isPlatformHighlighted = (platformId: string) => {
    if (activePlatform === platformId) return true;
    if (activeConnection) {
      return (
        activeConnection.from === platformId ||
        activeConnection.to === platformId
      );
    }
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Platform cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onMouseEnter={() => setActivePlatform(platform.id)}
            onMouseLeave={() => setActivePlatform(null)}
            className={cn(
              'group relative flex flex-col items-center gap-3 rounded-xl border border-border p-5 transition-all duration-200',
              isPlatformHighlighted(platform.id)
                ? 'border-zinc-400 bg-zinc-50 shadow-md dark:border-zinc-500 dark:bg-zinc-800/80'
                : 'bg-card hover:border-zinc-300 dark:hover:border-zinc-600'
            )}
          >
            <div
              className={cn(
                'flex size-12 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110',
                platform.color,
                platform.textColor
              )}
            >
              {platform.icon}
            </div>
            <div className="text-center">
              <div className="font-semibold">{platform.name}</div>
              <div className="text-xs text-muted-foreground">
                {platform.owns}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Connection list */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Connections
        </h3>
        <div className="grid gap-2 sm:grid-cols-3">
          {connections.map((conn, i) => {
            const fromPlatform = platforms.find((p) => p.id === conn.from);
            const toPlatform = platforms.find((p) => p.id === conn.to);
            const isActive =
              activeConnection === conn ||
              activePlatform === conn.from ||
              activePlatform === conn.to;

            return (
              <button
                key={i}
                onMouseEnter={() => setActiveConnection(conn)}
                onMouseLeave={() => setActiveConnection(null)}
                className={cn(
                  'rounded-lg border border-border p-3 text-left transition-all duration-200',
                  isActive
                    ? 'border-zinc-400 bg-zinc-50 shadow-sm dark:border-zinc-500 dark:bg-zinc-800/80'
                    : 'bg-card hover:border-zinc-300 dark:hover:border-zinc-600'
                )}
              >
                <div className="mb-2 flex items-center gap-1.5 text-sm font-medium">
                  <span>{fromPlatform?.name}</span>
                  <span className="text-muted-foreground">
                    {conn.direction === 'both' ? '↔' : '→'}
                  </span>
                  <span>{toPlatform?.name}</span>
                </div>
                <ul className="space-y-0.5">
                  {conn.labels.map((label, j) => (
                    <li
                      key={j}
                      className="text-xs text-muted-foreground"
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
