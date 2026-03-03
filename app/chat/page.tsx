'use client';

import { ChatInterface } from '@/components/chat/ChatInterface';

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          Ask Amara
        </h1>
        <p className="mt-1 text-muted-foreground">
          Ask questions about workflows, Git procedures, Jira conventions, and
          anything else in the handbook.
        </p>
      </div>

      <ChatInterface />
    </div>
  );
}
