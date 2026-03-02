'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface StatusRow {
  jiraStatus: string;
  gitState: string;
  color: string;
  bgColor: string;
  description: string;
}

interface Transition {
  from: string;
  to: string;
  when: string;
}

const statusRows: StatusRow[] = [
  {
    jiraStatus: 'To Do',
    gitState: 'No branch exists',
    color: 'text-zinc-600 dark:text-zinc-400',
    bgColor: 'bg-zinc-100 dark:bg-zinc-800',
    description: 'In sprint backlog, not started',
  },
  {
    jiraStatus: 'In Progress',
    gitState: 'Feature branch, commits happening',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    description: 'Actively working',
  },
  {
    jiraStatus: 'In Review',
    gitState: 'PR open against dev/X.Y.Z',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    description: 'Waiting for code review',
  },
  {
    jiraStatus: 'Done',
    gitState: 'PR merged, branch deleted',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    description: 'Merged to dev (not yet released)',
  },
];

const transitions: Transition[] = [
  { from: 'To Do', to: 'In Progress', when: 'Picking up work' },
  { from: 'To Do', to: 'Done', when: 'Cancelling' },
  { from: 'In Progress', to: 'In Review', when: 'PR opened' },
  { from: 'In Progress', to: 'To Do', when: 'Putting work back' },
  { from: 'In Review', to: 'Done', when: 'PR merged' },
  { from: 'In Review', to: 'In Progress', when: 'Review found issues' },
  { from: 'Done', to: 'In Progress', when: 'Reopened (rare)' },
];

export function StatusAlignment() {
  const [activeStatus, setActiveStatus] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Side-by-side alignment */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Jira side */}
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <svg
                viewBox="0 0 24 24"
                className="size-4 fill-blue-600"
              >
                <path d="M11.571 11.513H0a5.218 5.218 0 005.232 5.215h2.13v2.057A5.215 5.215 0 0012.575 24V12.518a1.005 1.005 0 00-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 005.215 5.214h2.129v2.058a5.218 5.218 0 005.215 5.214V6.762a1.005 1.005 0 00-1.001-1.005zM23.013 0H11.455a5.215 5.215 0 005.215 5.215h2.129v2.057A5.215 5.215 0 0024.013 12.487V1.005A1.005 1.005 0 0023.013 0z" />
              </svg>
              Jira Board
            </h3>
          </div>
          <div className="space-y-2 p-3">
            {statusRows.map((row) => (
              <button
                key={row.jiraStatus}
                onMouseEnter={() => setActiveStatus(row.jiraStatus)}
                onMouseLeave={() => setActiveStatus(null)}
                className={cn(
                  'w-full rounded-lg border p-3 text-left transition-all duration-200',
                  activeStatus === row.jiraStatus
                    ? 'border-zinc-400 shadow-sm dark:border-zinc-500'
                    : 'border-transparent',
                  row.bgColor
                )}
              >
                <div className={cn('font-semibold', row.color)}>
                  {row.jiraStatus}
                </div>
                <div className="text-xs text-muted-foreground">
                  {row.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Git side */}
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <svg
                viewBox="0 0 24 24"
                className="size-4 fill-current"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Git State
            </h3>
          </div>
          <div className="space-y-2 p-3">
            {statusRows.map((row) => (
              <div
                key={row.jiraStatus}
                className={cn(
                  'rounded-lg border p-3 transition-all duration-200',
                  activeStatus === row.jiraStatus
                    ? 'border-zinc-400 bg-zinc-50 shadow-sm dark:border-zinc-500 dark:bg-zinc-800/80'
                    : 'border-transparent bg-zinc-50/50 dark:bg-zinc-800/30'
                )}
              >
                <div className="font-mono text-sm font-medium">
                  {row.gitState}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transitions */}
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <h3 className="text-sm font-semibold">Allowed Transitions</h3>
        </div>
        <div className="grid gap-px divide-y divide-border sm:grid-cols-2 sm:divide-y-0">
          {transitions.map((t, i) => {
            const isHighlighted =
              activeStatus === t.from || activeStatus === t.to;

            return (
              <div
                key={i}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 transition-colors',
                  isHighlighted && 'bg-zinc-50 dark:bg-zinc-800/50'
                )}
              >
                <span className="text-sm font-medium">{t.from}</span>
                <svg
                  className="size-3 shrink-0 text-muted-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
                <span className="text-sm font-medium">{t.to}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {t.when}
                </span>
              </div>
            );
          })}
        </div>
        <div className="border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
          <strong>Not allowed:</strong> In Review → To Do. Close or draft
          the PR first, then go through In Progress.
        </div>
      </div>
    </div>
  );
}
