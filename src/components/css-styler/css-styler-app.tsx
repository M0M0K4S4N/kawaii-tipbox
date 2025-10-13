"use client";

import React, { useState } from 'react';
import { ControlPanel, DonationStyles, defaultStyles } from './control-panel';
import { PreviewPane } from './preview-pane';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';
import { useIsMobile } from '@/hooks/use-mobile';


export const CSSStylerApp = () => {
  const [styles, setStyles] = useState<DonationStyles>(defaultStyles);
  const [cssText, setCssText] = useState<string>("");
  const isMobile = useIsMobile();

  if (isMobile) {
    // Mobile layout - stack panels vertically
    return (
      <div className="h-screen flex flex-col">
        <div className="flex-1 overflow-hidden">
          <ControlPanel styles={styles} setStyles={setStyles} cssText={cssText} setCssText={setCssText} />
        </div>
        <div className="h-px bg-border" />
        <div className="flex-1 overflow-hidden">
          <PreviewPane cssText={cssText} />
        </div>
      </div>
    );
  }

  // Desktop layout - side by side with resizable divider
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={40} minSize={25} maxSize={60}>
          <ControlPanel styles={styles} setStyles={setStyles} cssText={cssText} setCssText={setCssText} />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={60} minSize={40}>
          <PreviewPane cssText={cssText} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};