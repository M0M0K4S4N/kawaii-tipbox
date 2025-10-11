"use client";

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy } from 'lucide-react';
import { BasicControls } from './basic-controls';
import { AdvancedEditor } from './advanced-editor';

export interface CSSStyles {
  // Typography
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  textAlign: string;
  lineHeight: string;
  letterSpacing: string;
  textColor: string;
  
  // Layout & Spacing
  padding: string;
  margin: string;
  width: string;
  height: string;
  display: string;
  position: string;
  
  // Appearance
  backgroundColor: string;
  borderStyle: string;
  borderWidth: string;
  borderColor: string;
  borderRadius: string;
  boxShadow: string;
  opacity: string;
}

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

export const ControlPanel = ({ styles, setStyles }: {
  styles: CSSStyles;
  setStyles: (styles: CSSStyles) => void;
}) => {
  const [mode, setMode] = useState<'basic' | 'advanced'>('basic');
  const [copied, setCopied] = useState(false);

  const generateCSS = useCallback(() => {
    return `.styled-element {
  /* Typography */
  font-size: ${styles.fontSize};
  font-family: ${styles.fontFamily};
  font-weight: ${styles.fontWeight};
  text-align: ${styles.textAlign};
  line-height: ${styles.lineHeight};
  letter-spacing: ${styles.letterSpacing};
  color: ${styles.textColor};

  /* Layout & Spacing */
  padding: ${styles.padding};
  margin: ${styles.margin};
  width: ${styles.width};
  height: ${styles.height};
  display: ${styles.display};
  position: ${styles.position};

  /* Appearance */
  background-color: ${styles.backgroundColor};
  border-style: ${styles.borderStyle};
  border-width: ${styles.borderWidth};
  border-color: ${styles.borderColor};
  border-radius: ${styles.borderRadius};
  box-shadow: ${styles.boxShadow};
  opacity: ${styles.opacity};
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

  const mapCSSProperty = (cssProperty: string): keyof CSSStyles | null => {
    const mapping: Record<string, keyof CSSStyles> = {
      'font-size': 'fontSize',
      'font-family': 'fontFamily',
      'font-weight': 'fontWeight',
      'text-align': 'textAlign',
      'line-height': 'lineHeight',
      'letter-spacing': 'letterSpacing',
      'color': 'textColor',
      'padding': 'padding',
      'margin': 'margin',
      'width': 'width',
      'height': 'height',
      'display': 'display',
      'position': 'position',
      'background-color': 'backgroundColor',
      'border-style': 'borderStyle',
      'border-width': 'borderWidth',
      'border-color': 'borderColor',
      'border-radius': 'borderRadius',
      'box-shadow': 'boxShadow',
      'opacity': 'opacity',
    };
    return mapping[cssProperty] || null;
  };

  return (
    <div className="h-full flex flex-col bg-card border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-4">TipBoxStyler</h2>
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
            <BasicControls styles={styles} setStyles={setStyles} />
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