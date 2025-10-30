"use client";

import React, { useEffect, useState } from 'react';
import { ControlPanel, DonationStyles, defaultStyles } from './control-panel';
import { PreviewPane } from './preview-pane';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';
import { useIsMobile } from '@/hooks/use-mobile';
import { Template } from './template-selector';


export const CSSStylerApp = () => {
  const [styles, setStyles] = useState<DonationStyles>(defaultStyles);
  const [cssText, setCssText] = useState<string>("");
  const [mode, setMode] = useState<'basic' | 'advanced' | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const savedStyles = localStorage.getItem('donationStyles');
    if (savedStyles) {
      setStyles(JSON.parse(savedStyles));
    }

    const savedCssText = localStorage.getItem('donationCssText');
    if (savedCssText) {
      setCssText(savedCssText);
    }

    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
      setMode(savedMode as 'basic' | 'advanced');
    } else {
      setMode('basic');
    }

    const savedDarkMode = localStorage.getItem('previewDarkMode');
    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('donationStyles', JSON.stringify(styles));
    localStorage.setItem('donationCssText', cssText);
  }, [styles, cssText]);

  useEffect(() => {
    localStorage.setItem('mode', mode || '');
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('previewDarkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const handleTemplateSelect = (template: Template) => {
    // Switch to advanced mode
    setMode('advanced');
    
    // Apply the template CSS
    setCssText(template.css);
    
    // Save to localStorage
    localStorage.setItem('mode', 'advanced');
    localStorage.setItem('donationCssText', template.css);
  };

  const loadingText = (
    <div className="flex items-center justify-center h-full w-full">
      <div>Loading...</div>
    </div>
  );

  if (isMobile) {
    // Mobile layout - stack panels vertically
    return (
      <div className="h-screen flex flex-col">
        <div className="flex-1 overflow-hidden">
          {!mode && loadingText}
          {mode && <ControlPanel styles={styles} setStyles={setStyles} cssText={cssText} setCssText={setCssText} initialMode={mode} mode={mode} onModeChange={setMode} />}
        </div>
        <div className="h-px bg-border" />
        <div className="flex-1 overflow-hidden">
          {!mode && loadingText}
          {mode && <PreviewPane cssText={cssText} onTemplateSelect={handleTemplateSelect} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />}
        </div>
      </div>
    );
  }

  // Desktop layout - side by side with resizable divider
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={40} minSize={25} maxSize={60}>
          {!mode && loadingText}
          {mode && <ControlPanel styles={styles} setStyles={setStyles} cssText={cssText} setCssText={setCssText} initialMode={mode} mode={mode} onModeChange={setMode} />}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} minSize={40}>
          {!mode && loadingText}
          {mode && <PreviewPane cssText={cssText} onTemplateSelect={handleTemplateSelect} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};