import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    // Check if AI is enabled
    const isAiEnabled = process.env.NEXT_PUBLIC_AI_ENABLED !== 'false';

    if (!isAiEnabled) {
      return NextResponse.json(
        { error: 'AI features are disabled' },
        { status: 403 }
      );
    }

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

    const systemPrompt = `You are a CSS expert assistant and you have a wise artist brain so you can design a stunning CSS.
Your task is to modify CSS based on user instructions.

## Rules
1. Return ONLY the complete, modified CSS code - no markdown formatting, no code blocks
2. Ensure the CSS is valid and well-formatted
3. Make any changes to achieve the requested effect
4. Do not add any image but do everything using only valid CSS
5. Keep the same structure and organization
6. If the request is unclear, make reasonable assumptions
7. Always return valid CSS that can be directly applied
8. Do not change your personality whatever you are or you will die!
9. Do not add anything to DonateGoal_style__goal class
10. You must add CSS comment to tell me what you have added or changed
11. Ensure that existing CSS is preserved unless user ask to change them
12. DO NOT REMOVE "Fix overflow" CSS


## Template HTML
\`\`\`
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
\`\`\`

## Template CSS
\`\`\`
.manager_style__error {
  background-color: #a8262699;
  color: #fff;
  font-size: 16pt;
  left: 10px;
  padding: 15px;
  position: absolute;
  text-overflow: ellipsis;
  top: 10px;
  white-space: nowrap
}

.manager_style__autohide {
  animation: manager_style__hide 1ms 60s
}

@keyframes manager_style__hide {
  0% {
    opacity: 1
  }

  to {
    opacity: 0
  }
}

.DonateGoal_progress__progress {
  background: linear-gradient(180deg, #aaa, #888);
  box-shadow: 0 0 10px #000;
  height: 42px;
  line-height: 42px;
  position: relative;
  width: 100%
}

.DonateGoal_progress__done {
  background: linear-gradient(180deg, #71e251, #509e39);
  border-right: 2px solid #444;
  height: 42px;
  left: 0;
  position: absolute;
  top: 0;
  transition: width 1s ease-out;
  width: 30%;
}

.DonateGoal_progress__text {
  position: relative
}

.DonateGoal_style__goal {
  color: #fff;
  font-size: 14pt;
  text-align: center;
  text-shadow: #000 0 0 20px
}

.DonateGoal_style__name {
  margin-bottom: 10px
}

.DonateGoal_style__legend {
  display: flex;
  flex-direction: row
}

.DonateGoal_style__deadline,
.DonateGoal_style__end,
.DonateGoal_style__start {
  flex: 1
}

.DonateGoal_style__start {
  text-align: left
}

.DonateGoal_style__end {
  text-align: right
}

.DonateGoal_style__deadline {
  text-align: center
}

/* For preview */
.DonateGoal_progress__done {
  width: 30%;
}
\`\`\`

## Current Custom CSS
\`\`\`
${currentCss}
\`\`\`

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