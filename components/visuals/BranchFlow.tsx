'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface BranchInfo {
  name: string;
  label: string;
  color: string;
  description: string;
}

interface MergePoint {
  from: string;
  to: string;
  strategy: string;
  label: string;
}

const branches: BranchInfo[] = [
  {
    name: 'prod',
    label: 'prod',
    color: 'bg-emerald-500',
    description:
      'Always reflects production. Protected. Code enters only via merge from staging or hotfix.',
  },
  {
    name: 'staging',
    label: 'staging',
    color: 'bg-amber-500',
    description:
      'Pre-production testing. Only current dev branch should merge here.',
  },
  {
    name: 'dev',
    label: 'dev/1.2.0',
    color: 'bg-blue-500',
    description:
      'Active development branch for a version. Created from prod. Feature branches merge back here.',
  },
  {
    name: 'feature1',
    label: 'feature/DEV-501',
    color: 'bg-violet-500',
    description:
      'Individual work item. Short-lived. Created from dev, squash-merged back, then deleted.',
  },
  {
    name: 'feature2',
    label: 'feature/DEV-502',
    color: 'bg-violet-500',
    description:
      'Another feature branch. Each ticket gets its own branch with DEV-### naming.',
  },
];

const mergePoints: MergePoint[] = [
  {
    from: 'feature/DEV-501',
    to: 'dev/1.2.0',
    strategy: 'Squash and merge',
    label: 'Clean single commit per feature',
  },
  {
    from: 'feature/DEV-502',
    to: 'dev/1.2.0',
    strategy: 'Squash and merge',
    label: 'Clean single commit per feature',
  },
  {
    from: 'dev/1.2.0',
    to: 'staging',
    strategy: 'Merge commit',
    label: 'Preserves full history',
  },
  {
    from: 'staging',
    to: 'prod',
    strategy: 'Merge commit',
    label: 'Clear promotion record',
  },
];

export function BranchFlow() {
  const [activeBranch, setActiveBranch] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Visual branch diagram */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card p-4">
        <div className="min-w-[500px] space-y-3 font-mono text-sm">
          {/* Prod line */}
          <div className="flex items-center gap-2">
            <div className="flex w-36 items-center gap-2">
              <div className="size-3 rounded-full bg-emerald-500" />
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                prod
              </span>
            </div>
            <div className="flex flex-1 items-center">
              <div className="h-0.5 flex-1 bg-emerald-500/40" />
              <div className="flex size-5 items-center justify-center rounded-full border-2 border-emerald-500 bg-background text-[8px] font-bold text-emerald-600">
                M
              </div>
              <div className="h-0.5 w-8 bg-emerald-500/40" />
              <span className="whitespace-nowrap text-xs text-muted-foreground">
                v1.2.0 tagged
              </span>
            </div>
          </div>

          {/* Staging line */}
          <div className="flex items-center gap-2">
            <div className="flex w-36 items-center gap-2">
              <div className="size-3 rounded-full bg-amber-500" />
              <span className="font-semibold text-amber-600 dark:text-amber-400">
                staging
              </span>
            </div>
            <div className="flex flex-1 items-center">
              <div className="h-0.5 w-1/3 bg-transparent" />
              <div className="h-0.5 flex-1 bg-amber-500/40" />
              <div className="flex size-5 items-center justify-center rounded-full border-2 border-amber-500 bg-background text-[8px] font-bold text-amber-600">
                M
              </div>
              <div className="h-0.5 w-8 bg-amber-500/40" />
              <span className="whitespace-nowrap text-xs text-muted-foreground">
                merge commit
              </span>
            </div>
          </div>

          {/* Dev line */}
          <div className="flex items-center gap-2">
            <div className="flex w-36 items-center gap-2">
              <div className="size-3 rounded-full bg-blue-500" />
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                dev/1.2.0
              </span>
            </div>
            <div className="flex flex-1 items-center">
              <div className="h-0.5 flex-1 bg-blue-500/40" />
              <div className="flex size-5 items-center justify-center rounded-full border-2 border-blue-500 bg-background text-[8px] font-bold text-blue-600">
                M
              </div>
              <div className="h-0.5 w-24 bg-blue-500/20" />
              <span className="whitespace-nowrap text-xs text-muted-foreground">
                merge commit ↑
              </span>
            </div>
          </div>

          {/* Feature 1 */}
          <div className="flex items-center gap-2">
            <div className="flex w-36 items-center gap-2">
              <div className="size-3 rounded-full bg-violet-500" />
              <span className="text-xs text-violet-600 dark:text-violet-400">
                feature/DEV-501
              </span>
            </div>
            <div className="flex flex-1 items-center">
              <div className="h-0.5 w-12 bg-violet-500/40" />
              <div className="size-2 rounded-full bg-violet-500" />
              <div className="h-0.5 w-6 bg-violet-500/40" />
              <div className="size-2 rounded-full bg-violet-500" />
              <div className="h-0.5 w-6 bg-violet-500/40" />
              <div className="flex size-5 items-center justify-center rounded-full border-2 border-violet-500 bg-background text-[8px] font-bold text-violet-600">
                S
              </div>
              <div className="h-0.5 w-8 bg-transparent" />
              <span className="whitespace-nowrap text-xs text-muted-foreground">
                squash ↑
              </span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-2">
            <div className="flex w-36 items-center gap-2">
              <div className="size-3 rounded-full bg-violet-500" />
              <span className="text-xs text-violet-600 dark:text-violet-400">
                feature/DEV-502
              </span>
            </div>
            <div className="flex flex-1 items-center">
              <div className="h-0.5 w-20 bg-violet-500/40" />
              <div className="size-2 rounded-full bg-violet-500" />
              <div className="h-0.5 w-10 bg-violet-500/40" />
              <div className="flex size-5 items-center justify-center rounded-full border-2 border-violet-500 bg-background text-[8px] font-bold text-violet-600">
                S
              </div>
              <div className="h-0.5 w-8 bg-transparent" />
              <span className="whitespace-nowrap text-xs text-muted-foreground">
                squash ↑
              </span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="inline-flex size-4 items-center justify-center rounded-full border-2 border-zinc-400 text-[7px] font-bold">
              S
            </span>
            Squash merge
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-flex size-4 items-center justify-center rounded-full border-2 border-zinc-400 text-[7px] font-bold">
              M
            </span>
            Merge commit
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-zinc-400" />
            Commit
          </span>
        </div>
      </div>

      {/* Branch descriptions */}
      <div className="grid gap-2 sm:grid-cols-2">
        {branches.map((branch) => (
          <button
            key={branch.name}
            onMouseEnter={() => setActiveBranch(branch.name)}
            onMouseLeave={() => setActiveBranch(null)}
            className={cn(
              'rounded-lg border border-border p-3 text-left transition-all duration-200',
              activeBranch === branch.name
                ? 'border-zinc-400 bg-zinc-50 shadow-sm dark:border-zinc-500 dark:bg-zinc-800/80'
                : 'bg-card hover:border-zinc-300 dark:hover:border-zinc-600'
            )}
          >
            <div className="mb-1 flex items-center gap-2">
              <div className={cn('size-2.5 rounded-full', branch.color)} />
              <span className="font-mono text-sm font-medium">
                {branch.label}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {branch.description}
            </p>
          </button>
        ))}
      </div>

      {/* Merge strategy table */}
      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border px-4 py-2">
          <h3 className="text-sm font-medium">Merge Strategies</h3>
        </div>
        <div className="divide-y divide-border">
          {mergePoints.map((mp, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-2.5 text-sm">
              <span className="min-w-0 flex-1 truncate font-mono text-xs">
                {mp.from} → {mp.to}
              </span>
              <span className="shrink-0 rounded bg-zinc-100 px-2 py-0.5 text-xs font-medium dark:bg-zinc-800">
                {mp.strategy}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
