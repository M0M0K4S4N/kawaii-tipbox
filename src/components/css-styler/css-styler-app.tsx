"use client";

import React, { useState } from 'react';
import { ControlPanel, DonationStyles } from './control-panel';
import { PreviewPane } from './preview-pane';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';
import { useIsMobile } from '@/hooks/use-mobile';

const defaultStyles: DonationStyles = {
  // Progress bar styles
  progressBackground: 'linear-gradient(180deg, #aaa, #888)',
  progressBoxShadow: '0 0 10px #000',
  progressHeight: '42px',
  progressLineHeight: '42px',
  progressPosition: 'relative',
  progressWidth: '100%',
  
  // Done bar styles
  doneBackground: 'linear-gradient(180deg, #71e251, #509e39)',
  doneBorderRight: '2px solid #444',
  doneHeight: '42px',
  doneLeft: '0',
  donePosition: 'absolute',
  doneTop: '0',
  doneTransition: 'width 1s ease-out',
  doneWidth: '30%',
  
  // Text styles
  textPosition: 'relative',
  
  // Goal container styles
  goalColor: '#fff',
  goalFontSize: '14pt',
  goalTextAlign: 'center',
  goalTextShadow: '#000 0 0 20px',
  
  // Name styles
  nameMarginBottom: '10px',
  
  // Legend styles
  legendDisplay: 'flex',
  legendFlexDirection: 'row',
  
  // Legend item styles
  legendItemFlex: '1',
  
  // Start styles
  startTextAlign: 'left',
  
  // End styles
  endTextAlign: 'right',
  
  // Deadline styles
  deadlineTextAlign: 'center',
};

export const CSSStylerApp = () => {
  const [styles, setStyles] = useState<DonationStyles>(defaultStyles);
  const isMobile = useIsMobile();

  if (isMobile) {
    // Mobile layout - stack panels vertically
    return (
      <div className="h-screen flex flex-col">
        <div className="flex-1 overflow-hidden">
          <ControlPanel styles={styles} setStyles={setStyles} />
        </div>
        <div className="h-px bg-border" />
        <div className="flex-1 overflow-hidden">
          <PreviewPane styles={styles} />
        </div>
      </div>
    );
  }

  // Desktop layout - side by side with resizable divider
  return (
    <div className="h-screen">
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
  );
};