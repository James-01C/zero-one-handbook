'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ConnectionDetail {
  id: string;
  from: string;
  to: string;
  direction: 'both' | 'forward';
  label: string;
  colorClass: string;
  detail: { what: string; how: string }[];
}

const connections: ConnectionDetail[] = [
  {
    id: 'github-jira',
    from: 'github',
    to: 'jira',
    direction: 'both',
    label: 'Branch linking',
    colorClass: 'text-blue-500',
    detail: [
      {
        what: 'Branch → ticket linking',
        how: 'Branch name contains DEV-###, Jira auto-detects',
      },
      {
        what: 'Version alignment',
        how: 'Fix Version Plugin 1.2.0 = Git tag plugin/v1.2.0 = dev branch dev/1.2.0',
      },
      {
        what: 'Component alignment',
        how: 'Same four components in both systems (Plugin, PluginBackend, Website, MeshGen)',
      },
    ],
  },
  {
    id: 'github-slack',
    from: 'github',
    to: 'slack',
    direction: 'forward',
    label: 'Deploy alerts',
    colorClass: 'text-purple-500',
    detail: [
      {
        what: 'Deployment notifications',
        how: 'GitHub Actions → Slack webhook → #dev-staging-deploys',
      },
    ],
  },
  {
    id: 'slack-notion',
    from: 'slack',
    to: 'notion',
    direction: 'forward',
    label: 'Progress updates',
    colorClass: 'text-zinc-500',
    detail: [
      {
        what: 'Daily progress updates',
        how: 'n8n automation routes daily standup messages to Notion progress database',
      },
    ],
  },
];

const platforms = [
  {
    id: 'jira',
    name: 'Jira',
    role: 'Work tracking',
    accentClass: 'border-blue-500/50 hover:border-blue-500',
    badgeClass: 'bg-blue-600 text-white',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current">
        <path d="M11.571 11.513H0a5.218 5.218 0 005.232 5.215h2.13v2.057A5.215 5.215 0 0012.575 24V12.518a1.005 1.005 0 00-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 005.215 5.214h2.129v2.058a5.218 5.218 0 005.215 5.214V6.762a1.005 1.005 0 00-1.001-1.005zM23.013 0H11.455a5.215 5.215 0 005.215 5.215h2.129v2.057A5.215 5.215 0 0024.013 12.487V1.005A1.005 1.005 0 0023.013 0z" />
      </svg>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    role: 'Code & versions',
    accentClass: 'border-zinc-500/50 hover:border-zinc-500',
    badgeClass: 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    id: 'slack',
    name: 'Slack',
    role: 'Communication',
    accentClass: 'border-purple-500/50 hover:border-purple-500',
    badgeClass: 'bg-purple-600 text-white',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current">
        <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.271 0a2.528 2.528 0 01-2.521 2.521 2.528 2.528 0 01-2.521-2.521V2.522A2.528 2.528 0 0115.164 0a2.528 2.528 0 012.521 2.522v6.312zM15.164 18.956a2.528 2.528 0 012.521 2.522A2.528 2.528 0 0115.164 24a2.528 2.528 0 01-2.521-2.522v-2.522h2.521zm0-1.271a2.528 2.528 0 01-2.521-2.521 2.528 2.528 0 012.521-2.521h6.314A2.528 2.528 0 0124 15.164a2.528 2.528 0 01-2.522 2.521h-6.314z" />
      </svg>
    ),
  },
  {
    id: 'notion',
    name: 'Notion',
    role: 'Knowledge base',
    accentClass: 'border-zinc-500/50 hover:border-zinc-500',
    badgeClass: 'bg-zinc-700 text-white',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.25 2.1c-.42-.326-.98-.7-2.055-.607L3.26 2.494c-.466.046-.56.28-.374.466l1.573 1.248zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.886l-15.177.887c-.56.046-.747.326-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933l3.222-.186zM2.1 1.168L15.887.074c1.68-.14 2.1.093 2.802.606l3.876 2.754c.466.326.606.42.606.793v17.7c0 1.12-.42 1.773-1.868 1.866L5.86 24.66c-1.075.047-1.588-.093-2.147-.746L.933 20.74C.327 19.948 0 19.34 0 18.641V2.94c0-.886.42-1.633 2.1-1.773z" />
      </svg>
    ),
  },
];

// Node positions for the diamond layout (based on SVG viewBox 540x340)
const nodePositions: Record<string, { x: number; y: number }> = {
  jira: { x: 270, y: 45 },
  github: { x: 80, y: 170 },
  slack: { x: 460, y: 170 },
  notion: { x: 270, y: 295 },
};

function AnimatedArrow({
  conn,
  isActive,
  isDimmed,
  onClick,
}: {
  conn: ConnectionDetail;
  isActive: boolean;
  isDimmed: boolean;
  onClick: () => void;
}) {
  const from = nodePositions[conn.from];
  const to = nodePositions[conn.to];

  // Calculate control point for a gentle curve
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  // Offset the control point perpendicular to the line
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const offsetAmount = 25;
  const cpX = midX + (-dy / len) * offsetAmount;
  const cpY = midY + (dx / len) * offsetAmount;

  const pathD = `M ${from.x} ${from.y} Q ${cpX} ${cpY} ${to.x} ${to.y}`;
  const pathId = `path-${conn.id}`;

  // Label position along the curve
  const labelT = 0.5;
  const labelX =
    (1 - labelT) * (1 - labelT) * from.x +
    2 * (1 - labelT) * labelT * cpX +
    labelT * labelT * to.x;
  const labelY =
    (1 - labelT) * (1 - labelT) * from.y +
    2 * (1 - labelT) * labelT * cpY +
    labelT * labelT * to.y;

  return (
    <g
      onClick={onClick}
      className={cn(
        'cursor-pointer transition-opacity duration-200',
        isDimmed ? 'opacity-20' : 'opacity-100'
      )}
    >
      {/* Invisible wider hit area */}
      <path
        d={pathD}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        className="cursor-pointer"
      />
      {/* Visible path */}
      <path
        d={pathD}
        fill="none"
        className={cn(
          'transition-all duration-200',
          isActive
            ? 'stroke-foreground'
            : 'stroke-zinc-300 dark:stroke-zinc-600'
        )}
        strokeWidth={isActive ? 2 : 1.5}
        strokeDasharray={conn.direction === 'both' ? 'none' : 'none'}
      />
      {/* Animated dots flowing along path */}
      <circle r="2.5" className="fill-zinc-400 dark:fill-zinc-500">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          keyPoints="0;1"
          keyTimes="0;1"
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
      <path id={pathId} d={pathD} fill="none" stroke="none" />
      {/* Arrowhead at destination */}
      {conn.direction === 'forward' && (
        <ArrowHead fromX={cpX} fromY={cpY} toX={to.x} toY={to.y} />
      )}
      {conn.direction === 'both' && (
        <>
          <ArrowHead fromX={cpX} fromY={cpY} toX={to.x} toY={to.y} />
          <ArrowHead fromX={cpX} fromY={cpY} toX={from.x} toY={from.y} />
        </>
      )}
      {/* Label */}
      <g transform={`translate(${labelX}, ${labelY - 10})`}>
        <rect
          x={-40}
          y={-8}
          width={80}
          height={16}
          rx={4}
          className={cn(
            'transition-colors duration-200',
            isActive
              ? 'fill-foreground/10 stroke-foreground/30'
              : 'fill-background stroke-border'
          )}
          strokeWidth={0.5}
        />
        <text
          textAnchor="middle"
          dominantBaseline="central"
          className={cn(
            'text-[8px] font-medium transition-colors duration-200',
            isActive ? 'fill-foreground' : 'fill-muted-foreground'
          )}
        >
          {conn.label}
        </text>
      </g>
    </g>
  );
}

function ArrowHead({
  fromX,
  fromY,
  toX,
  toY,
}: {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}) {
  const angle = Math.atan2(toY - fromY, toX - fromX);
  const size = 8;
  const tipX = toX - Math.cos(angle) * 30;
  const tipY = toY - Math.sin(angle) * 30;
  const p1X = tipX - size * Math.cos(angle - 0.4);
  const p1Y = tipY - size * Math.sin(angle - 0.4);
  const p2X = tipX - size * Math.cos(angle + 0.4);
  const p2Y = tipY - size * Math.sin(angle + 0.4);

  return (
    <polygon
      points={`${tipX},${tipY} ${p1X},${p1Y} ${p2X},${p2Y}`}
      className="fill-zinc-400 dark:fill-zinc-500"
    />
  );
}

function NodeCard({
  platform,
  isHighlighted,
  isDimmed,
  onMouseEnter,
  onMouseLeave,
}: {
  platform: (typeof platforms)[number];
  isHighlighted: boolean;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const pos = nodePositions[platform.id];

  return (
    <foreignObject
      x={pos.x - 68}
      y={pos.y - 33}
      width={136}
      height={66}
      className="overflow-visible"
    >
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={cn(
          'flex h-[66px] items-center gap-2.5 rounded-xl border-2 bg-card px-3.5 transition-all duration-200',
          platform.accentClass,
          isHighlighted && 'shadow-md scale-105',
          isDimmed && 'opacity-30'
        )}
      >
        <div
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-lg',
            platform.badgeClass
          )}
        >
          {platform.icon}
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold leading-tight">
            {platform.name}
          </div>
          <div className="text-[9px] leading-tight text-muted-foreground">
            {platform.role}
          </div>
        </div>
      </div>
    </foreignObject>
  );
}

export function SystemMap() {
  const [activeConnection, setActiveConnection] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const isNodeHighlighted = (nodeId: string) => {
    if (hoveredNode === nodeId) return true;
    if (activeConnection) {
      const conn = connections.find((c) => c.id === activeConnection);
      return conn ? conn.from === nodeId || conn.to === nodeId : false;
    }
    return false;
  };

  const isNodeDimmed = (nodeId: string) => {
    if (!hoveredNode) return false;
    const related = connections.some(
      (c) =>
        (c.from === hoveredNode && (c.to === nodeId || c.from === nodeId)) ||
        (c.to === hoveredNode && (c.from === nodeId || c.to === nodeId))
    );
    return !related && hoveredNode !== nodeId;
  };

  const isConnectionDimmed = (connId: string) => {
    if (!hoveredNode) return false;
    const conn = connections.find((c) => c.id === connId);
    return conn ? conn.from !== hoveredNode && conn.to !== hoveredNode : false;
  };

  const activeDetail = activeConnection
    ? connections.find((c) => c.id === activeConnection)
    : null;

  const handleConnectionClick = (connId: string) => {
    setActiveConnection(activeConnection === connId ? null : connId);
  };

  return (
    <div className="space-y-4">
      {/* SVG Diagram — desktop diamond layout */}
      <div className="hidden rounded-xl border border-border bg-card p-4 md:block">
        <svg
          viewBox="0 0 540 340"
          className="mx-auto w-full max-w-lg"
          style={{ overflow: 'visible' }}
        >
          <style>{`
            @media (prefers-reduced-motion: reduce) {
              animateMotion { display: none; }
            }
          `}</style>
          {/* Arrows behind nodes */}
          {connections.map((conn) => (
            <AnimatedArrow
              key={conn.id}
              conn={conn}
              isActive={activeConnection === conn.id}
              isDimmed={isConnectionDimmed(conn.id)}
              onClick={() => handleConnectionClick(conn.id)}
            />
          ))}
          {/* Nodes on top */}
          {platforms.map((p) => (
            <NodeCard
              key={p.id}
              platform={p}
              isHighlighted={isNodeHighlighted(p.id)}
              isDimmed={isNodeDimmed(p.id)}
              onMouseEnter={() => setHoveredNode(p.id)}
              onMouseLeave={() => setHoveredNode(null)}
            />
          ))}
        </svg>
      </div>

      {/* Mobile stacked layout */}
      <div className="space-y-2 md:hidden">
        {platforms.map((p) => (
          <div
            key={p.id}
            className={cn(
              'flex items-center gap-3 rounded-xl border-2 bg-card p-3',
              p.accentClass
            )}
          >
            <div
              className={cn(
                'flex size-9 shrink-0 items-center justify-center rounded-lg',
                p.badgeClass
              )}
            >
              {p.icon}
            </div>
            <div>
              <div className="text-sm font-semibold">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.role}</div>
            </div>
          </div>
        ))}
        <div className="space-y-1.5 pt-2">
          {connections.map((conn) => {
            const fromP = platforms.find((p) => p.id === conn.from);
            const toP = platforms.find((p) => p.id === conn.to);
            return (
              <button
                key={conn.id}
                onClick={() => handleConnectionClick(conn.id)}
                className={cn(
                  'w-full rounded-lg border border-border p-2.5 text-left text-sm transition-colors',
                  activeConnection === conn.id
                    ? 'border-zinc-400 bg-zinc-50 dark:border-zinc-500 dark:bg-zinc-800/80'
                    : 'bg-card hover:border-zinc-300 dark:hover:border-zinc-600'
                )}
              >
                <span className="font-medium">{fromP?.name}</span>
                <span className="text-muted-foreground">
                  {conn.direction === 'both' ? ' ↔ ' : ' → '}
                </span>
                <span className="font-medium">{toP?.name}</span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {conn.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Connection detail panel */}
      {activeDetail && (
        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <h3 className="text-sm font-medium">
              {platforms.find((p) => p.id === activeDetail.from)?.name}
              {activeDetail.direction === 'both' ? ' ↔ ' : ' → '}
              {platforms.find((p) => p.id === activeDetail.to)?.name}
            </h3>
            <button
              onClick={() => setActiveConnection(null)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Close
            </button>
          </div>
          <div className="divide-y divide-border">
            {activeDetail.detail.map((d, i) => (
              <div key={i} className="px-4 py-2.5 text-sm">
                <div className="font-medium">{d.what}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {d.how}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Boundary rule */}
      <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Not sure where something goes?
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>
            Need it to write code?{' '}
            <span className="text-foreground">GitHub</span>
          </span>
          <span>
            Need to track work? <span className="text-foreground">Jira</span>
          </span>
          <span>
            Need to tell someone now?{' '}
            <span className="text-foreground">Slack</span>
          </span>
          <span>
            Need to understand how things work?{' '}
            <span className="text-foreground">Handbook</span>
          </span>
        </div>
      </div>
    </div>
  );
}
