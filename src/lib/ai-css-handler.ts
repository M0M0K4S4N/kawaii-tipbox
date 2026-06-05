import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

export interface AICSSConfig {
  systemPrompt: string
  xTitle: string
}

export async function handleAICSSPost(
  request: NextRequest,
  config: AICSSConfig
) {
  const isAiEnabled = process.env.NEXT_PUBLIC_AI_ENABLED !== 'false';

  if (!isAiEnabled) {
    return NextResponse.json(
      { error: 'AI features are disabled' },
      { status: 403 }
    );
  }

  const { prompt, currentCss, sessionId, model } = await request.json();

  if (!prompt) {
    return NextResponse.json(
      { error: 'Prompt is required' },
      { status: 400 }
    );
  }

  if (!currentCss) {
    return NextResponse.json(
      { error: 'Current CSS is required' },
      { status: 400 }
    );
  }

  if (model && process.env.NEXT_PUBLIC_OPENROUTER_ALLOWED_MODEL) {
    const allowedModels = process.env.NEXT_PUBLIC_OPENROUTER_ALLOWED_MODEL
      .split(',')
      .map(m => m.trim())
      .filter(m => m.length > 0);

    if (!allowedModels.includes(model)) {
      return NextResponse.json(
        {
          error: 'Model not allowed',
          allowedModels,
          requestedModel: model
        },
        { status: 400 }
      );
    }
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' },
      { status: 500 }
    );
  }

  const currentSessionId = sessionId || randomUUID();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  };

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    headers['HTTP-Referer'] = process.env.NEXT_PUBLIC_SITE_URL;
  }
  headers['X-Title'] = config.xTitle;

  const systemPrompt = config.systemPrompt.replace('__CURRENT_CSS__', currentCss);

  const apiBase = process.env.OPENROUTER_API_BASE || 'https://openrouter.ai/api/v1';
  const selectedModel = model || process.env.OPENROUTER_MODEL;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await fetch(`${apiBase}/chat/completions`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            model: selectedModel,
            messages: [
              {
                role: 'system',
                content: systemPrompt,
              },
              {
                role: 'user',
                content: prompt,
              },
            ],
            user: currentSessionId,
            temperature: 0.3,
            stream: true,
            provider: {
              order: ['google-vertex']
            },
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No response body');
        }

        const decoder = new TextDecoder();
        let buffer = '';
        let accumulatedContent = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.trim() === '') continue;
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                controller.enqueue(encoder.encode(JSON.stringify({
                  type: 'complete',
                  sessionId: currentSessionId,
                }) + '\n'));
                return;
              }

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  accumulatedContent += content;

                  controller.enqueue(encoder.encode(JSON.stringify({
                    type: 'content',
                    content: accumulatedContent,
                  }) + '\n'));
                }
              } catch (e) {
                console.error('Error parsing streaming data:', e);
              }
            }
          }
        }
      } catch (error) {
        console.error('Streaming error:', error);
        controller.enqueue(encoder.encode(JSON.stringify({
          type: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        }) + '\n'));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
