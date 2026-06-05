"use client";

import React, { useState } from 'react';
import { TemplateSelector, Template } from './template-selector';
import { templates as tipmeTemplate } from './template-data-tipme';
import { templates as easydonateTemplate } from './template-data-easydonate';
import { CSSClassOverlay } from './css-class-overlay';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sun, Moon } from 'lucide-react';
import { PreviewTemplate } from '@/lib/preview-templates';

const templateCollectionMap: Record<string, Template[]> = {
  tipme: tipmeTemplate,
  easydonate: easydonateTemplate,
}

export const PreviewPane = ({
  cssText,
  onTemplateSelect,
  isDarkMode,
  onToggleDarkMode,
  template,
}: {
  cssText: string;
  onTemplateSelect?: (template: Template) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  template: PreviewTemplate;
  templateId: string;
}) => {
  const [isCSSClassOverlayEnabled, setIsCSSClassOverlayEnabled] = React.useState(false);

  const templates = templateCollectionMap[template.id] || tipmeTemplate;

  return (
    <div className={`h-full overflow-auto p-8 relative`} style={{ backgroundColor: isDarkMode ? '#333' : '#fff' }}>
      <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
        <Sun className="h-4 w-4" color={isDarkMode ? '#fff' : '#000'} />
        <Switch
          checked={isDarkMode}
          onCheckedChange={onToggleDarkMode}
        />
        <Moon className="h-4 w-4" color={isDarkMode ? '#fff' : '#000'} />
      </div>

      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 hidden">
        <Label style={{ color: isDarkMode ? '#fff' : '#000' }}>เปิดตัวช่วยดู Class</Label>
        <Switch
          checked={isCSSClassOverlayEnabled}
          onCheckedChange={setIsCSSClassOverlayEnabled}
        />
      </div>

      <CSSClassOverlay
        enabled={isCSSClassOverlayEnabled}
        overlaySelector={template.overlaySelector}
        overlayContainerClass={template.overlayContainerClass}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <style>{`
          ${template.baseCss || ''}
        `}</style>

        <style>{`#preview-container {
          ${cssText}
        }`}</style>

        <div id="preview-container" dangerouslySetInnerHTML={{ __html: template.html }} />

        {onTemplateSelect && (
          <TemplateSelector
            templates={templates}
            onTemplateSelect={onTemplateSelect}
          />
        )}
      </div>
    </div>
  );
};