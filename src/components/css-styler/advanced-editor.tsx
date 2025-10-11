"use client";

import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface AdvancedEditorProps {
  css: string;
  onChange: (css: string) => void;
}

export const AdvancedEditor = ({ css, onChange }: AdvancedEditorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4">
        <Textarea
          value={css}
          onChange={handleChange}
          className="h-full w-full font-mono text-sm resize-none leading-relaxed"
          placeholder="Enter your CSS here..."
          spellCheck={false}
        />
      </div>
    </div>
  );
};