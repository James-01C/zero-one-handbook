'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Stage {
  number: number;
  name: string;
  platforms: string[];
  description: string;
  detail: string;
}

const stages: Stage[] = [
  {
    number: 1,
    name: 'Idea Enters',
    platforms: ['JPD'],
    description: 'Someone submits an idea',
    detail:
      'Ideas land in the Product Discovery Inbox. Anyone can submit — no special process needed.',
  },
  {
    number: 2,
    name: 'Triage',
    platforms: ['JPD'],
    description: 'Founders review every 2-4 weeks',
    detail:
      'Ideas are triaged: approved (gets a delivery epic), backlogged (revisit later), or rejected (with reason).',
  },
  {
    number: 3,
    name: 'Epic Planned',
    platforms: ['Jira'],
    description: 'Delivery epic created in DEV',
    detail:
      'A feature epic is created with [Component] naming. Bookend tasks (Research & Scoping + Final Review) are auto-generated.',
  },
  {
    number: 4,
    name: 'Task Picked Up',
    platforms: ['Jira', 'GitHub'],
    description: 'Developer grabs task, creates branch',
    detail:
      'Move ticket to In Progress. Create feature/DEV-###-description branch from the current dev/X.Y.Z.',
  },
  {
    number: 5,
    name: 'Work Happens',
    platforms: ['GitHub'],
    description: 'Code, commit, push',
    detail:
      'Commit with DEV-###: description format. Push regularly. Jira auto-links via the branch name.',
  },
  {
    number: 6,
    name: 'PR & Review',
    platforms: ['GitHub', 'Jira'],
    description: 'PR opened, ticket moves to In Review',
    detail:
      'Open PR against dev/X.Y.Z. Move Jira ticket to In Review. Reviewer checks code and approves.',
  },
  {
    number: 7,
    name: 'Merge & Complete',
    platforms: ['GitHub', 'Jira'],
    description: 'Squash merge, delete branch, mark Done',
    detail:
      'Use "Squash and merge" on GitHub. Delete feature branch. Move ticket to Done with a Resolution Summary.',
  },
  {
    number: 8,
    name: 'Epic Closes',
    platforms: ['Jira'],
    description: 'Epic owner reviews and closes',
    detail:
      'Epics don\'t auto-close. The owner makes a deliberate decision — this is a quality gate.',
  },
  {
    number: 9,
    name: 'Staging',
    platforms: ['GitHub', 'Slack'],
    description: 'Dev branch promoted to staging',
    detail:
      'Announce in Slack. Merge dev/X.Y.Z → staging via PR (merge commit). Test on staging environment.',
  },
  {
    number: 10,
    name: 'Release',
    platforms: ['GitHub', 'Jira', 'Slack'],
    description: 'Ship to prod, tag, announce',
    detail:
      'Merge staging → prod. Tag components (plugin/v1.2.0). Mark Fix Versions released. Announce in Slack.',
  },
];

const platformColors: Record<string, string> = {
  JPD: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  Jira: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  GitHub:
    'bg-zinc-100 text-zinc-800 dark:bg-zinc-700/60 dark:text-zinc-300',
  Slack:
    'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
};

export function TicketLifecycle() {
  const [expandedStage, setExpandedStage] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {/* Desktop: horizontal scroll hint */}
      <p className="text-xs text-muted-foreground md:hidden">
        Tap a stage to expand
      </p>

      <div className="space-y-2">
        {stages.map((stage) => {
          const isExpanded = expandedStage === stage.number;

          return (
            <button
              key={stage.number}
              onClick={() =>
                setExpandedStage(isExpanded ? null : stage.number)
              }
              className={cn(
                'group w-full rounded-lg border border-border p-3 text-left transition-all duration-200',
                isExpanded
                  ? 'border-zinc-400 bg-zinc-50 shadow-sm dark:border-zinc-500 dark:bg-zinc-800/80'
                  : 'bg-card hover:border-zinc-300 dark:hover:border-zinc-600'
              )}
            >
              <div className="flex items-start gap-3">
                {/* Step number */}
                <div
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors',
                    isExpanded
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                      : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                  )}
                >
                  {stage.number}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{stage.name}</span>
                    <div className="flex gap-1">
                      {stage.platforms.map((p) => (
                        <span
                          key={p}
                          className={cn(
                            'rounded px-1.5 py-0.5 text-[10px] font-medium',
                            platformColors[p]
                          )}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {stage.description}
                  </p>

                  {isExpanded && (
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                      {stage.detail}
                    </p>
                  )}
                </div>

                {/* Expand indicator */}
                <svg
                  className={cn(
                    'size-4 shrink-0 text-muted-foreground transition-transform',
                    isExpanded && 'rotate-180'
                  )}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
