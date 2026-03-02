import Anthropic from '@anthropic-ai/sdk';
import { getAllPages } from '@/lib/content';

const SYSTEM_PROMPT_PREFIX = `You are Amara, the handbook assistant for Zero One Creative's development team.
Answer questions based ONLY on the handbook content provided below.
If the answer is in the handbook, provide it clearly and reference which section it's from.
If the answer isn't in the handbook, say so honestly.
Always be concise and practical.

When referencing sections, format them as links:
- Getting Started > How We Work: /getting-started/how-we-work
- GitHub > How We Use GitHub: /github/how-we-use-github
- GitHub > Git Quick Reference: /github/git-quick-reference
- GitHub > Git Procedures: /github/git-procedures
- Jira > How We Use Jira: /jira/how-we-use-jira

---

HANDBOOK CONTENT:

`;

function buildSystemPrompt(): string {
  const pages = getAllPages();
  const content = pages
    .map((page) => {
      return `## ${page.meta.title} (/${page.section}/${page.slug})\n\n${page.content}`;
    })
    .join('\n\n---\n\n');

  return SYSTEM_PROMPT_PREFIX + content;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        error: 'chat_unavailable',
        message:
          'Chat is not configured. Try searching the handbook instead.',
      },
      { status: 503 }
    );
  }

  let body: ChatRequest;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!body.message || typeof body.message !== 'string') {
    return Response.json(
      { error: 'Message is required' },
      { status: 400 }
    );
  }

  const client = new Anthropic({ apiKey });
  const systemPrompt = buildSystemPrompt();

  const messages: Anthropic.MessageParam[] = [
    ...(body.history || []).map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    })),
    { role: 'user' as const, content: body.message },
  ];

  try {
    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: 'Stream error' })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (apiErr) {
    console.error('Anthropic API error:', apiErr);
    return Response.json(
      {
        error: 'api_error',
        message: 'Failed to get a response. Try searching the handbook instead.',
      },
      { status: 500 }
    );
  }
}
