"use client";

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Template {
  id: string;
  name: string;
  featured: boolean;
  background: string;
  css: string;
}

interface TemplateSelectorProps {
  templates: Template[];
  onTemplateSelect: (template: Template) => void;
}

export const TemplateSelector = ({ templates, onTemplateSelect }: TemplateSelectorProps) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplateId(template.id);
    onTemplateSelect(template);
    
    // Reset the animation after it completes
    setTimeout(() => {
      setSelectedTemplateId(null);
    }, 300);
  };

  return (
    <div className="w-full bg-card border border-2 border-border shadow-lg p-4 rounded-2xl">
      <h3 className="text-sm font-medium mb-3 text-center">เทมเพลต (Advanced)</h3>
      <div className="flex gap-3 overflow-visible pb-2 justify-center scrollbar-hide">
        {templates.map((template) => (
          <div
            key={template.id}
            className="flex flex-col items-center cursor-pointer group flex-shrink-0"
            onClick={() => handleTemplateClick(template)}
          >
            <div className="relative">
              <div
                className={cn(
                  "w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cover bg-center border-3 border-border group-hover:border-primary transition-all",
                  "overflow-hidden shadow-md group-hover:shadow-lg group-hover:scale-105 transform",
                  selectedTemplateId === template.id && "animate-pulse scale-110 border-primary shadow-lg"
                )}
                style={{ background: template.background }}
              />
              {template.featured && (
                <div className="absolute -top-1 -right-1 bg-yellow-500 text-white rounded-full p-0.5 shadow-md">
                  <Star size={14} className="text-white" />
                </div>
              )}
            </div>
            <span className="text-xs mt-1 text-center max-w-[60px] sm:max-w-[70px] truncate font-medium">
              {template.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};