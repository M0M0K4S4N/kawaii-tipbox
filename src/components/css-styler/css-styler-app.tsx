"use client";

import React, { useState } from 'react';
import { ControlPanel, CSSStyles } from './control-panel';
import { PreviewPane } from './preview-pane';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';
import { useIsMobile } from '@/hooks/use-mobile';
import { Footer } from '@/components/footer';

const defaultStyles: CSSStyles = {
  // Typography
  fontSize: '16px',
  fontFamily: 'Arial, sans-serif',
  fontWeight: '400',
  textAlign: 'left',
  lineHeight: '1.5',
  letterSpacing: '0px',
  textColor: '#000000',
  
  // Layout & Spacing
  padding: '16px',
  margin: '0px',
  width: 'auto',
  height: 'auto',
  display: 'block',
  position: 'static',
  
  // Appearance
  backgroundColor: '#ffffff',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: '#cccccc',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  opacity: '1',
};

export const CSSStylerApp = () => {
  const [styles, setStyles] = useState<CSSStyles>(defaultStyles);
  const isMobile = useIsMobile();

  if (isMobile) {
    // Mobile layout - stack panels vertically
    return (
      <div className="h-screen flex flex-col">
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-hidden">
            <ControlPanel styles={styles} setStyles={setStyles} />
          </div>
          <div className="h-px bg-border" />
          <div className="flex-1 overflow-hidden">
            <PreviewPane styles={styles} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Desktop layout - side by side with resizable divider
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={40} minSize={25} maxSize={60}>
            <ControlPanel styles={styles} setStyles={setStyles} />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={60} minSize={40}>
            <PreviewPane styles={styles} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <Footer />
    </div>
  );
};