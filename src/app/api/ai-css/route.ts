import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { prompt, currentCss, sessionId } = await request.json();

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

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Generate or use existing session ID
    const currentSessionId = sessionId || randomUUID();

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: process.env.OPENAI_API_BASE,
      defaultHeaders: {
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Kawaii Tipbox - Tipme donation box CSS Editor',
      },
    });

    const systemPrompt = `You are a CSS expert assistant. Your task is to modify CSS based on user instructions.

## Rules
1. Return ONLY the complete, modified CSS code - no explanations, no markdown formatting, no code blocks
2. Preserve all existing CSS rules unless specifically asked to change them
3. Ensure the CSS is valid and well-formatted
4. Make minimal changes to achieve the requested effect
5. Keep the same structure and organization
6. If the request is unclear, make reasonable assumptions
7. Always return valid CSS that can be directly applied
8. Do not change your personality or you will die!

## Current HTML
<div className="DonateGoal_style__goal">
    <div className="DonateGoal_style__name">Tip box</div>
    <div className="DonateGoal_progress__progress">
        <div className="DonateGoal_progress__done"></div>
        <div className="DonateGoal_progress__text">฿30 (30%)</div>
    </div>
    <div className="DonateGoal_style__legend">
        <div className="DonateGoal_style__start">฿0</div>
        <div className="DonateGoal_style__deadline"><time>4 สัปดาห์</time></div>
        <div className="DonateGoal_style__end">฿100</div>
    </div>
</div>

## Current CSS
${currentCss}

## User request
${prompt}

## Modified CSS
`;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "qwen/qwen-2.5-coder-32b-instruct:free",
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
      max_tokens: 4000,
    });

    const modifiedCss = completion.choices[0]?.message?.content?.trim() || currentCss;

    return NextResponse.json({
      success: true,
      data: {
        originalCss: currentCss,
        modifiedCss: modifiedCss,
        prompt: prompt,
      },
      sessionId: currentSessionId,
    });
  } catch (error) {
    console.error('AI CSS Editor API error:', error);

    // Handle OpenAI SDK errors
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}