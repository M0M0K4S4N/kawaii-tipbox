"use client";

import React, { useEffect, useState } from 'react';
import { ControlPanel, DonationStyles, defaultStyles } from './control-panel';
import { PreviewPane } from './preview-pane';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';
import { useIsMobile } from '@/hooks/use-mobile';


export const CSSStylerApp = () => {
  const [styles, setStyles] = useState<DonationStyles>(defaultStyles);
  const [cssText, setCssText] = useState<string>("");
  const [mode, setMode] = useState<'basic' | 'advanced' | null>(null);
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
  }, []);

  useEffect(() => {
    localStorage.setItem('donationStyles', JSON.stringify(styles));
    localStorage.setItem('donationCssText', cssText);
  }, [styles, cssText]);

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
          {mode && <ControlPanel styles={styles} setStyles={setStyles} cssText={cssText} setCssText={setCssText} initialMode={mode} />}
        </div>
        <div className="h-px bg-border" />
        <div className="flex-1 overflow-hidden">
          {!mode && loadingText}
          {mode && <PreviewPane cssText={cssText} />}
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
          {mode && <ControlPanel styles={styles} setStyles={setStyles} cssText={cssText} setCssText={setCssText} initialMode={mode} />}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} minSize={40}>
          {!mode && loadingText}
          {mode && <PreviewPane cssText={cssText} />}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};