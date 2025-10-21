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

  emoji: string;
  emojiPosition: string;
  emojiSize: string;

  fixOverflow: boolean;
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

  emoji: '',
  emojiPosition: '0px',
  emojiSize: '24pt',

  fixOverflow: true,
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

  const remapCss = (css: string) => {
      return css.replaceAll('.goal', '.DonateGoal_style__goal')
        .replaceAll('.name', '.DonateGoal_style__name')
        .replaceAll('.progress', '.DonateGoal_progress__progress')
        .replaceAll('.done', '.DonateGoal_progress__done')
        .replaceAll('.text', '.DonateGoal_progress__text')
        .replaceAll('.legend', '.DonateGoal_style__legend')
        .replaceAll('.start', '.DonateGoal_style__start')
        .replaceAll('.deadline', '.DonateGoal_style__deadline')
        .replaceAll('.end', '.DonateGoal_style__end')
  }

  const remapBack = (css: string) => {
    return css.replaceAll('.DonateGoal_style__goal', '.goal')
      .replaceAll('.DonateGoal_style__name', '.name')
      .replaceAll('.DonateGoal_progress__progress', '.progress')
      .replaceAll('.DonateGoal_progress__done', '.done')
      .replaceAll('.DonateGoal_progress__text', '.text')
      .replaceAll('.DonateGoal_style__legend', '.legend')
      .replaceAll('.DonateGoal_style__start', '.start')
      .replaceAll('.DonateGoal_style__deadline', '.deadline')
      .replaceAll('.DonateGoal_style__end', '.end')
  }

  const generateCSS = useCallback(() => {
    let cssText: string = '';
    if (styles.fixOverflow) {
      cssText += `/* Fix overflow */
.goal {
  width: 98%;
  margin: auto;
}

`;
}
    cssText += `.text {
  color: ${styles.progressTextColor};
}

.goal {
  color: ${styles.progressTextColor};
}

.done::after {
  content: "${styles.emoji}";
  float: right;
  margin-right: ${styles.emojiPosition};
  font-size: ${styles.emojiSize};
}

.progress {
  background: linear-gradient(180deg, ${styles.barBackground}, ${styles.barBackground2});
  border-radius: ${styles.barRoundness};
  border: ${styles.barBorder} solid ${styles.barBorderColor};
}

.done {
  background: linear-gradient(180deg, ${styles.progressBackground}, ${styles.progressBackground2});
  border-right: ${styles.progressRightBorder} solid ${styles.progressRightBorderColor};
  border-radius: ${styles.barRoundness};
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
      await navigator.clipboard.writeText(remapBack(cssText));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy CSS:', err);
    }
  };

  const handleAdvancedCSSChange = (css: string) => {
    if (mode === 'advanced') {
      setCssText(remapBack(css));
      localStorage.setItem('donationCssText', remapBack(css));
    }
  };

  return (
    <div className="h-full flex flex-col bg-card border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg md:text-xl font-semibold mb-4 break-words">Kawaii Tipbox</h2>

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
          <AlertTitle><b>คำเตือน!</b></AlertTitle>
          <AlertDescription>
            หากกลับไปที่โหมด Basic อาจทำให้การเปลี่ยนแปลงที่โหมด Advanced <b>หายไป</b>
            <br/>กรุณาบันทึก CSS ที่ต้องการก่อนสลับโหมด
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
              css={remapCss(cssText)}
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