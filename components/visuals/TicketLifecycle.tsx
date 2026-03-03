'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Stage {
  number: number;
  name: string;
  platforms: string[];
  description: string;
  whatHappens: string;
  jiraState: string;
  gitState: string;
  who: string;
  note?: string;
  auto?: string;
  link?: { label: string; href: string };
}

const stages: Stage[] = [
  {
    number: 1,
    name: 'Idea Enters',
    platforms: ['JPD'],
    description: 'Someone submits an idea',
    whatHappens:
      'Someone submits an idea to Product Discovery — a feature request, improvement, or capability. Ideas sit in an inbox until the next triage session.',
    jiraState: 'Idea in JPD Inbox',
    gitState: 'Nothing — no code yet',
    who: 'Anyone on the team can submit ideas',
  },
  {
    number: 2,
    name: 'Triage',
    platforms: ['JPD'],
    description: 'Founders review every 2-4 weeks',
    whatHappens:
      'Founders review the inbox every 2-4 weeks. Ideas are approved, parked, or rejected. Approved ideas get sized: large (new epic), medium (task in existing epic), or small (standalone task).',
    jiraState: 'Idea moves from Inbox → In Development (if approved)',
    gitState: 'Nothing — still planning',
    who: 'Founders (Ash, Rupert, James)',
  },
  {
    number: 3,
    name: 'Epic Planned',
    platforms: ['Jira'],
    description: 'Delivery epic created in DEV',
    whatHappens:
      'A delivery epic is created in the DEV project. The epic owner completes Research & Scoping, then breaks the work into development tasks. Component and Fix Version are set.',
    jiraState: 'Epic In Progress, child tasks in To Do',
    gitState:
      'Dev branch dev/X.Y.Z created from prod (if not already existing for this version)',
    who: 'Epic owner (assigned developer or lead)',
    auto: 'Bookend tasks (Research & Scoping + Final Review & Close-out) are auto-created. Child tasks inherit Component and Fix Version from the epic.',
  },
  {
    number: 4,
    name: 'Task Picked Up',
    platforms: ['Jira', 'GitHub'],
    description: 'Developer grabs task, creates branch',
    whatHappens:
      'A developer picks a task from the sprint, moves it to In Progress, and creates a feature branch from the dev branch.',
    jiraState: 'To Do → In Progress',
    gitState:
      'Feature branch feature/DEV-###-description created from dev/X.Y.Z',
    who: 'The developer picking up the task',
    note: 'Only code-change tasks get branches. Research, scoping, and review tasks are Jira-only.',
    link: { label: 'Git Procedures', href: '/github/git-procedures' },
  },
  {
    number: 5,
    name: 'Work Happens',
    platforms: ['GitHub'],
    description: 'Code, commit, push',
    whatHappens:
      'The developer writes code and pushes commits. Commit messages include the ticket key (DEV-###: description) so Jira automatically links them.',
    jiraState: 'In Progress (unchanged)',
    gitState: 'Commits on feature/DEV-###-description',
    who: 'The developer working the task',
    note: 'Comment on the Jira ticket if a blocker is hit, approach changes, or scope is affected. Otherwise, status is enough signal.',
  },
  {
    number: 6,
    name: 'PR & Review',
    platforms: ['GitHub', 'Jira'],
    description: 'PR opened, ticket moves to In Review',
    whatHappens:
      'Developer opens a pull request against the dev branch. Ticket moves to In Review. A reviewer is assigned.',
    jiraState: 'In Progress → In Review',
    gitState: 'PR open against dev/X.Y.Z',
    who: 'Developer opens the PR, reviewer reviews',
    auto: 'Jira shows the PR on the ticket automatically.',
    link: { label: 'Git Procedures', href: '/github/git-procedures' },
  },
  {
    number: 7,
    name: 'Merge & Complete',
    platforms: ['GitHub', 'Jira'],
    description: 'Squash merge, delete branch, mark Done',
    whatHappens:
      'PR is approved and squash-merged into the dev branch. Feature branch is deleted. Developer moves the ticket to Done and writes a Resolution Summary.',
    jiraState: 'In Review → Done',
    gitState: 'Squash merge into dev/X.Y.Z, feature branch deleted',
    who: 'Developer (merge + resolution summary)',
    note: 'Done means merged to dev — not released to production. The code ships when the version is promoted to staging → prod.',
    link: { label: 'Git Procedures', href: '/github/git-procedures' },
  },
  {
    number: 8,
    name: 'Epic Closes',
    platforms: ['Jira'],
    description: 'Epic owner reviews and closes',
    whatHappens:
      'When all tasks in the epic are Done, the epic owner completes the Final Review & Close-out task and moves the epic to Done. This is a deliberate gate — the owner verifies completeness.',
    jiraState: 'Epic → Done',
    gitState: 'All feature branches merged and deleted',
    who: 'Epic owner (deliberate decision, not automatic)',
    auto: 'JPD delivery status auto-updates to reflect epic completion.',
    link: { label: 'How We Use Jira', href: '/jira/how-we-use-jira' },
  },
];

const platformColors: Record<string, string> = {
  JPD: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  Jira: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  GitHub: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-700/60 dark:text-zinc-300',
  Slack:
    'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
};

const stepAccentColors: Record<number, string> = {
  1: 'border-amber-400',
  2: 'border-amber-400',
  3: 'border-blue-400',
  4: 'border-blue-400',
  5: 'border-zinc-400',
  6: 'border-zinc-400',
  7: 'border-zinc-400',
  8: 'border-blue-400',
};

function ExpandedContent({ stage }: { stage: Stage }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, []);

  return (
    <div
      className="overflow-hidden transition-all duration-250 ease-out"
      style={{ maxHeight: height || 'none' }}
    >
      <div
        ref={contentRef}
        className={cn(
          'mt-3 border-l-2 pl-3 space-y-2.5',
          stepAccentColors[stage.number]
        )}
      >
        {/* What happens */}
        <div>
          <p className="text-sm leading-relaxed text-foreground/80">
            {stage.whatHappens}
          </p>
        </div>

        {/* Jira ↔ Git state */}
        <div className="flex flex-col gap-1 rounded-md bg-muted/50 px-3 py-2 text-xs">
          <div className="flex gap-2">
            <span className="shrink-0 font-medium text-blue-600 dark:text-blue-400">
              Jira:
            </span>
            <span className="text-foreground/70">{stage.jiraState}</span>
          </div>
          <div className="flex gap-2">
            <span className="shrink-0 font-medium text-zinc-600 dark:text-zinc-400">
              Git:
            </span>
            <span className="font-mono text-foreground/70">
              {stage.gitState}
            </span>
          </div>
        </div>

        {/* Who */}
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Who:</span> {stage.who}
        </p>

        {/* Note (optional) */}
        {stage.note && (
          <p className="text-xs italic text-muted-foreground">{stage.note}</p>
        )}

        {/* Auto (optional) */}
        {stage.auto && (
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Auto:</span> {stage.auto}
          </p>
        )}

        {/* Link (optional) */}
        {stage.link && (
          <Link
            href={stage.link.href}
            className="inline-block text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Read more: {stage.link.label} →
          </Link>
        )}
      </div>
    </div>
  );
}

export function TicketLifecycle() {
  const [expandedStage, setExpandedStage] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground md:hidden">
        Tap a stage to expand
      </p>

      <div className="space-y-2">
        {stages.map((stage) => {
          const isExpanded = expandedStage === stage.number;

          return (
            <div
              key={stage.number}
              className={cn(
                'rounded-lg border border-border transition-all duration-200',
                isExpanded
                  ? 'border-zinc-400 bg-zinc-50 shadow-sm dark:border-zinc-500 dark:bg-zinc-800/80'
                  : 'bg-card hover:border-zinc-300 dark:hover:border-zinc-600'
              )}
            >
              <button
                onClick={() =>
                  setExpandedStage(isExpanded ? null : stage.number)
                }
                className="flex w-full items-start gap-3 p-3 text-left"
              >
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
                </div>

                {/* Chevron */}
                <svg
                  className={cn(
                    'size-4 shrink-0 text-muted-foreground transition-transform duration-250',
                    isExpanded && 'rotate-180'
                  )}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-3 pb-3 pl-14">
                  <ExpandedContent stage={stage} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
