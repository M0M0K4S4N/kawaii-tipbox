"use client";

import React from 'react';
import { AdvancedEditor } from '@/components/css-styler/advanced-editor';

export default function TestAiDisabledPage() {
  const [css, setCss] = React.useState(`.DonateGoal_progress__progress {
  background: linear-gradient(180deg, #aaa, #888);
  box-shadow: 0 0 10px #000;
  height: 42px;
  line-height: 42px;
  position: relative;
  width: 100%
}`);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Feature Test</h1>
      <p className="mb-4">
        This page tests the AI feature toggle. 
        Current AI status: <strong>{process.env.NEXT_PUBLIC_AI_ENABLED !== 'false' ? 'Enabled' : 'Disabled'}</strong>
      </p>
      <div className="h-96 border rounded">
        <AdvancedEditor css={css} onChange={setCss} />
      </div>
    </div>
  );
}