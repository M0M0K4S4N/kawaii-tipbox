"use client";

import React, { useEffect, useState } from 'react';
import { ControlPanel, DonationStyles, defaultStyles } from './control-panel';
import { PreviewPane } from './preview-pane';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';
import { useIsMobile } from '@/hooks/use-mobile';
import { Template } from './template-selector';
import { PreviewTemplate, previewTemplates } from '@/lib/preview-templates';


export const CSSStylerApp = ({ template: templateConfig }: { template?: PreviewTemplate }) => {
  const template = templateConfig || previewTemplates.tipme;
  const storagePrefix = `template_${template.id}_`;

  const [styles, setStyles] = useState<DonationStyles>(defaultStyles);
  const [cssText, setCssText] = useState<string>("");
  const [mode, setMode] = useState<'basic' | 'advanced' | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const savedStyles = localStorage.getItem(`${storagePrefix}donationStyles`);
    if (savedStyles) {
      setStyles(JSON.parse(savedStyles));
    }

    const savedCssText = localStorage.getItem(`${storagePrefix}donationCssText`);
    if (savedCssText) {
      setCssText(savedCssText);
    }

    const savedMode = localStorage.getItem(`${storagePrefix}mode`);
    if (savedMode) {
      setMode(savedMode as 'basic' | 'advanced');
    } else {
      setMode('basic');
    }

    const savedDarkMode = localStorage.getItem(`${storagePrefix}previewDarkMode`);
    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === 'true');
    }
  }, [storagePrefix]);

  useEffect(() => {
    localStorage.setItem(`${storagePrefix}donationStyles`, JSON.stringify(styles));
    localStorage.setItem(`${storagePrefix}donationCssText`, cssText);
  }, [styles, cssText, storagePrefix]);

  useEffect(() => {
    localStorage.setItem(`${storagePrefix}mode`, mode || '');
  }, [mode, storagePrefix]);

  useEffect(() => {
    localStorage.setItem(`${storagePrefix}previewDarkMode`, isDarkMode.toString());
  }, [isDarkMode, storagePrefix]);

  const handleTemplateSelect = (template: Template) => {
    setMode('advanced');
    setCssText(template.css);
    localStorage.setItem(`${storagePrefix}mode`, 'advanced');
    localStorage.setItem(`${storagePrefix}donationCssText`, template.css);
  };

  const loadingText = (
    <div className="flex items-center justify-center h-full w-full">
      <div>Loading...</div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="h-screen flex flex-col">
        <div className="flex-1 overflow-hidden">
          {!mode && loadingText}
          {mode && <ControlPanel styles={styles} setStyles={setStyles} cssText={cssText} setCssText={setCssText} initialMode={mode} mode={mode} onModeChange={setMode} storagePrefix={storagePrefix} />}
        </div>
        <div className="h-px bg-border" />
        <div className="flex-1 overflow-hidden">
          {!mode && loadingText}
          {mode && <PreviewPane cssText={cssText} onTemplateSelect={handleTemplateSelect} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} template={template} templateId={template.id} />}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={40} minSize={25} maxSize={60}>
          {!mode && loadingText}
          {mode && <ControlPanel styles={styles} setStyles={setStyles} cssText={cssText} setCssText={setCssText} initialMode={mode} mode={mode} onModeChange={setMode} storagePrefix={storagePrefix} />}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} minSize={40}>
          {!mode && loadingText}
          {mode && <PreviewPane cssText={cssText} onTemplateSelect={handleTemplateSelect} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} template={template} templateId={template.id} />}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};