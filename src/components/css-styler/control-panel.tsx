"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Undo } from 'lucide-react';
import { DonationControls } from './donation-controls';
import { AdvancedEditor } from './advanced-editor';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export interface DonationStyles {
  barBackground: string;
  barBackground2: string;
  barRoundness: string;
  barBorder: string;
  barBorderColor: string;

  progressBackground: string;
  progressBackground2: string;
  progressRoundness: string;
  progressTextColor: string;

  progressRightBorder: string;
  progressRightBorderColor: string;
}

export const defaultStyles: DonationStyles = {
  barBackground: '#aaaaaa',
  barBackground2: '#888888',
  barRoundness: '0px',
  barBorder: '0px',
  barBorderColor: '#ffffff',

  progressBackground: '#71e251',
  progressBackground2: '#509e39',
  progressRoundness: '0px',
  progressTextColor: '#ffffff',

  progressRightBorder: '2px',
  progressRightBorderColor: '#444444',
};

export const ControlPanel = ({ styles, setStyles, cssText, setCssText, initialMode }: {
  styles: DonationStyles;
  setStyles: (styles: DonationStyles) => void;
  cssText: string;
  setCssText: (cssText: string) => void;
  initialMode: 'basic' | 'advanced';
}) => {
  const [mode, setMode] = useState<'basic' | 'advanced'>(initialMode);
  const [copied, setCopied] = useState(false);

  const generateCSS = useCallback(() => {
    const cssText: string = `.DonateGoal_progress__text {
  color: ${styles.progressTextColor};
}

.DonateGoal_style__goal {
  color: ${styles.progressTextColor};
}

.DonateGoal_progress__done::after {
  content: "";
  float: right;
  margin-right: -16px;
  font-size: 24pt;
}

.DonateGoal_progress__progress {
  background: linear-gradient(180deg, ${styles.barBackground}, ${styles.barBackground2});
  border-radius: ${styles.barRoundness};
  border: ${styles.barBorder} solid ${styles.barBorderColor};
}

.DonateGoal_progress__done {
  background: linear-gradient(180deg, ${styles.progressBackground}, ${styles.progressBackground2});
  border-right: ${styles.progressRightBorder} solid ${styles.progressRightBorderColor};
  border-radius: ${styles.progressRoundness};
  height: 100% !important;
}
`;

    return cssText;
  }, [styles]);

  useEffect(() => {
    if (mode === 'basic') {
      const cssText = generateCSS();
      setCssText(cssText);
    }
  }, [generateCSS, setCssText]);

  const handleCopyCSS = async () => {
    try {
      await navigator.clipboard.writeText(cssText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy CSS:', err);
    }
  };

  const handleAdvancedCSSChange = (css: string) => {
    if (mode === 'advanced') {
      setCssText(css);
      localStorage.setItem('donationCssText', css);
    }
  };

  return (
    <div className="h-full flex flex-col bg-card border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-4">Donation Goal Styler</h2>

        <Tabs className='mb-4' value={mode} onValueChange={(value) => {
          setMode(value as 'basic' | 'advanced');
          localStorage.setItem('mode', value);
        }}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        </Tabs>
        <Alert variant="destructive">
          <AlertTitle><b>Warning!</b></AlertTitle>
          <AlertDescription>
            Switching back to the basic editor may result in <b>your custom CSS being lost</b>.
            <br/>Please be sure to <b>save any changes</b> before switching..
          </AlertDescription>
        </Alert>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <Tabs value={mode} className="h-full">
          <TabsContent value="basic" className="h-full m-0">
            <DonationControls styles={styles} setStyles={setStyles} />
          </TabsContent>
          <TabsContent value="advanced" className="h-full m-0">
            <AdvancedEditor
              css={cssText}
              onChange={handleAdvancedCSSChange}
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="p-4 border-t flex gap-2">
        <Button
          onClick={() => {
            setStyles(defaultStyles);
            setCssText(generateCSS());
            localStorage.setItem('donationStyles', JSON.stringify(defaultStyles));
            localStorage.setItem('donationCssText', generateCSS());
          }}
          className="w-[20%] min-w-[70px]"
          variant="outline"
        >
          <Undo className="w-4 h-4 mr-2" />
          Reset
        </Button>
        <Button onClick={handleCopyCSS} className="w-[80%]">
          <Copy className="w-4 h-4 mr-2" />
          {copied ? 'Copied!' : 'Copy CSS'}
        </Button>
      </div>
    </div>
  );
};