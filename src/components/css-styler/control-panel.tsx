"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy } from 'lucide-react';
import { BasicControls } from './basic-controls';
import { AdvancedEditor } from './advanced-editor';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

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
  const [showAlert, setShowAlert] = useState(false);
  const [advancedCSS, setAdvancedCSS] = useState('');
  const [lastSyncedStyles, setLastSyncedStyles] = useState<CSSStyles>(defaultStyles);

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
    const css = mode === 'advanced' ? advancedCSS : generateCSS();
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy CSS:', err);
    }
  };

  const handleModeChange = (newMode: 'basic' | 'advanced') => {
    if (mode !== newMode) {
      if (newMode === 'advanced') {
        // Switching to advanced mode - capture current CSS
        setAdvancedCSS(generateCSS());
        setLastSyncedStyles({ ...styles });
      } else {
        // Switching to basic mode - show alert
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
      }
      setMode(newMode);
    }
  };

  const handleAdvancedCSSChange = (css: string) => {
    setAdvancedCSS(css);
    // Don't sync with basic mode - let user work independently
  };

  return (
    <div className="h-full flex flex-col bg-card border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-4">CSS Styler</h2>
        <Tabs value={mode} onValueChange={handleModeChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {showAlert && (
          <Alert className="mt-3 bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              Changes made in Advanced mode are not synchronized with Basic mode controls.
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      <div className="flex-1 overflow-hidden">
        <Tabs value={mode} className="h-full">
          <TabsContent value="basic" className="h-full m-0">
            <BasicControls styles={styles} setStyles={setStyles} />
          </TabsContent>
          <TabsContent value="advanced" className="h-full m-0">
            <AdvancedEditor
              css={advancedCSS || generateCSS()}
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