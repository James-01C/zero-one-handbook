'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { SystemMap } from '@/components/visuals/SystemMap';
import { TicketLifecycle } from '@/components/visuals/TicketLifecycle';
import { BranchFlow } from '@/components/visuals/BranchFlow';
import { StatusAlignment } from '@/components/visuals/StatusAlignment';

const tabs = [
  {
    id: 'system-map',
    label: 'System Map',
    shortLabel: 'Systems',
    description: 'How GitHub, Jira, Slack, and Notion connect',
  },
  {
    id: 'ticket-lifecycle',
    label: 'Ticket Lifecycle',
    shortLabel: 'Lifecycle',
    description: 'A ticket\'s journey from idea to release',
  },
  {
    id: 'branch-flow',
    label: 'Branch Flow',
    shortLabel: 'Branches',
    description: 'The Git branching model and merge strategies',
  },
  {
    id: 'status-alignment',
    label: 'Status Alignment',
    shortLabel: 'Statuses',
    description: 'Jira board columns mapped to Git states',
  },
] as const;

type TabId = (typeof tabs)[number]['id'];

export default function VisualsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('system-map');

  const currentTab = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          System Overview
        </h1>
        <p className="mt-1 text-muted-foreground">
          Interactive diagrams showing how our systems connect and how work
          flows through them.
        </p>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 overflow-x-auto rounded-lg border border-border bg-muted/50 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.shortLabel}</span>
          </button>
        ))}
      </div>

      {/* Tab description */}
      <p className="text-sm text-muted-foreground">{currentTab.description}</p>

      {/* Tab content */}
      <div>
        {activeTab === 'system-map' && <SystemMap />}
        {activeTab === 'ticket-lifecycle' && <TicketLifecycle />}
        {activeTab === 'branch-flow' && <BranchFlow />}
        {activeTab === 'status-alignment' && <StatusAlignment />}
      </div>
    </div>
  );
}
