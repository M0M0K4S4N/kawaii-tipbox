"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Undo, History } from 'lucide-react';
import { DonationControls } from './donation-controls';
import { AdvancedEditor } from './advanced-editor';
import { RevisionHistory } from './revision-history';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { CSSRevision } from './revision-control-types';
import { createSnapshot } from './revision-storage';

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

export const ControlPanel = ({ styles, setStyles, cssText, setCssText, initialMode, mode: externalMode, onModeChange }: {
  styles: DonationStyles;
  setStyles: (styles: DonationStyles) => void;
  cssText: string;
  setCssText: (cssText: string) => void;
  initialMode: 'basic' | 'advanced';
  mode?: 'basic' | 'advanced';
  onModeChange?: (mode: 'basic' | 'advanced') => void;
}) => {
  const [internalMode, setInternalMode] = useState<'basic' | 'advanced'>(initialMode);
  const mode = externalMode || internalMode;
  const [copied, setCopied] = useState(false);
  const [showRevisions, setShowRevisions] = useState(false);

  const generateCSS = useCallback(() => {
    let cssText: string = `.DonateGoal_progress__text {
  color: ${styles.progressTextColor};
}

.DonateGoal_style__goal {
  color: ${styles.progressTextColor};
}

.DonateGoal_progress__done::after {
  content: "${styles.emoji}";
  float: right;
  margin-right: ${styles.emojiPosition};
  font-size: ${styles.emojiSize};
}

.DonateGoal_progress__progress {
  background: linear-gradient(180deg, ${styles.barBackground}, ${styles.barBackground2});
  border-radius: ${styles.barRoundness};
  border: ${styles.barBorder} solid ${styles.barBorderColor};
}

.DonateGoal_progress__done {
  background: linear-gradient(180deg, ${styles.progressBackground}, ${styles.progressBackground2});
  border-right: ${styles.progressRightBorder} solid ${styles.progressRightBorderColor};
  border-radius: ${styles.barRoundness};
  height: 100% !important;
}
`;

if (styles.fixOverflow) {
  cssText += `
/* Fix overflow */
.DonateGoal_style__goal {
  width: 98%;
  margin: auto;
}
`;
}

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

  const handleCreateSnapshot = (name?: string) => {
    createSnapshot(cssText, styles, name);
  };

  const handleRestoreRevision = (revision: CSSRevision) => {
    setCssText(revision.cssText);
    if (revision.styles) {
      setStyles(revision.styles);
    }
    localStorage.setItem('donationCssText', revision.cssText);
    if (revision.styles) {
      localStorage.setItem('donationStyles', JSON.stringify(revision.styles));
    }
  };

  return (
    <div className="h-full flex flex-col bg-card border-r">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-semibold break-words">Kawaii Tipbox</h2>
          <Button
            onClick={() => setShowRevisions(!showRevisions)}
            variant={showRevisions ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-2"
          >
            <History className="w-4 h-4" />
            ประวัติการเปลี่ยนแปลง
          </Button>
        </div>

        <Tabs className='mb-4' value={mode} onValueChange={(value) => {
          const newMode = value as 'basic' | 'advanced';
          if (onModeChange) {
            onModeChange(newMode);
          } else {
            setInternalMode(newMode);
          }
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
        {showRevisions ? (
          <div className="h-full">
            <RevisionHistory
              cssText={cssText}
              styles={styles}
              onCreateSnapshot={handleCreateSnapshot}
              onRestoreRevision={handleRestoreRevision}
            />
          </div>
        ) : (
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
        )}
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