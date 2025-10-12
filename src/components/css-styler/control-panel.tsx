"use client";

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy } from 'lucide-react';
import { DonationControls } from './donation-controls';
import { AdvancedEditor } from './advanced-editor';

export interface DonationStyles {
  // Progress bar styles
  progressBackground: string;
  progressBoxShadow: string;
  progressHeight: string;
  progressLineHeight: string;
  progressPosition: string;
  progressWidth: string;
  
  // Done bar styles
  doneBackground: string;
  doneBorderRight: string;
  doneHeight: string;
  doneLeft: string;
  donePosition: string;
  doneTop: string;
  doneTransition: string;
  doneWidth: string;
  
  // Text styles
  textPosition: string;
  
  // Goal container styles
  goalColor: string;
  goalFontSize: string;
  goalTextAlign: string;
  goalTextShadow: string;
  
  // Name styles
  nameMarginBottom: string;
  
  // Legend styles
  legendDisplay: string;
  legendFlexDirection: string;
  
  // Legend item styles
  legendItemFlex: string;
  
  // Start styles
  startTextAlign: string;
  
  // End styles
  endTextAlign: string;
  
  // Deadline styles
  deadlineTextAlign: string;
}

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

export const ControlPanel = ({ styles, setStyles }: {
  styles: DonationStyles;
  setStyles: (styles: DonationStyles) => void;
}) => {
  const [mode, setMode] = useState<'basic' | 'advanced'>('basic');
  const [copied, setCopied] = useState(false);

  const generateCSS = useCallback(() => {
    return `.DonateGoal_progress__progress {
  background: ${styles.progressBackground};
  box-shadow: ${styles.progressBoxShadow};
  height: ${styles.progressHeight};
  line-height: ${styles.progressLineHeight};
  position: ${styles.progressPosition};
  width: ${styles.progressWidth}
}

.DonateGoal_progress__done {
  background: ${styles.doneBackground};
  border-right: ${styles.doneBorderRight};
  height: ${styles.doneHeight};
  left: ${styles.doneLeft};
  position: ${styles.donePosition};
  top: ${styles.doneTop};
  transition: ${styles.doneTransition};
  width: ${styles.doneWidth};
}

.DonateGoal_progress__text {
  position: ${styles.textPosition}
}

.DonateGoal_style__goal {
  color: ${styles.goalColor};
  font-size: ${styles.goalFontSize};
  text-align: ${styles.goalTextAlign};
  text-shadow: ${styles.goalTextShadow}
}

.DonateGoal_style__name {
  margin-bottom: ${styles.nameMarginBottom}
}

.DonateGoal_style__legend {
  display: ${styles.legendDisplay};
  flex-direction: ${styles.legendFlexDirection}
}

.DonateGoal_style__deadline,
.DonateGoal_style__end,
.DonateGoal_style__start {
  flex: ${styles.legendItemFlex}
}

.DonateGoal_style__start {
  text-align: ${styles.startTextAlign}
}

.DonateGoal_style__end {
  text-align: ${styles.endTextAlign}
}

.DonateGoal_style__deadline {
  text-align: ${styles.deadlineTextAlign}
}`;
  }, [styles]);

  const handleCopyCSS = async () => {
    const css = generateCSS();
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy CSS:', err);
    }
  };

  const handleAdvancedCSSChange = (css: string) => {
    // Parse CSS and update styles
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<style>${css}</style>`, 'text/html');
    const styleSheet = doc.querySelector('style')?.textContent;
    
    if (styleSheet) {
      const newStyles = { ...styles };
      const regex = /(\w[\w-]*)\s*:\s*([^;]+);/g;
      let match;
      
      while ((match = regex.exec(styleSheet)) !== null) {
        const [, property, value] = match;
        const mappedProperty = mapCSSProperty(property);
        if (mappedProperty && newStyles.hasOwnProperty(mappedProperty)) {
          (newStyles as any)[mappedProperty] = value.trim();
        }
      }
      
      setStyles(newStyles);
    }
  };

  const mapCSSProperty = (cssProperty: string): keyof DonationStyles | null => {
    const mapping: Record<string, keyof DonationStyles> = {
      'background': 'progressBackground',
      'box-shadow': 'progressBoxShadow',
      'height': 'progressHeight',
      'line-height': 'progressLineHeight',
      'position': 'progressPosition',
      'width': 'progressWidth',
      'border-right': 'doneBorderRight',
      'left': 'doneLeft',
      'top': 'doneTop',
      'transition': 'doneTransition',
      'color': 'goalColor',
      'font-size': 'goalFontSize',
      'text-align': 'goalTextAlign',
      'text-shadow': 'goalTextShadow',
      'margin-bottom': 'nameMarginBottom',
      'display': 'legendDisplay',
      'flex-direction': 'legendFlexDirection',
      'flex': 'legendItemFlex',
    };
    return mapping[cssProperty] || null;
  };

  return (
    <div className="h-full flex flex-col bg-card border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-4">Donation Goal Styler</h2>
        <Tabs value={mode} onValueChange={(value) => setMode(value as 'basic' | 'advanced')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <Tabs value={mode} className="h-full">
          <TabsContent value="basic" className="h-full m-0">
            <DonationControls styles={styles} setStyles={setStyles} />
          </TabsContent>
          <TabsContent value="advanced" className="h-full m-0">
            <AdvancedEditor
              css={generateCSS()}
              onChange={handleAdvancedCSSChange}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="p-4 border-t">
        <Button onClick={handleCopyCSS} className="w-full">
          <Copy className="w-4 h-4 mr-2" />
          {copied ? 'Copied!' : 'Copy CSS'}
        </Button>
      </div>
    </div>
  );
};