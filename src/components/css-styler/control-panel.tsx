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

  goalTextColor: string;
  goalTextSize: string;
  goalTextStrokeColor: string;

  descTextColor: string;
  descTextSize: string;
  descTextStrokeColor: string;
}

export const defaultStyles: DonationStyles = {
  barBackground: '#000',
  barBackground2: '#000',
  barRoundness: '35px',
  barBorder: '0px',
  barBorderColor: '#ffffff',

  progressBackground: '#0EA4E9',
  progressBackground2: '#0EA4E9',
  progressRoundness: '0px',
  progressTextColor: '#ffffff',

  progressRightBorder: '2px',
  progressRightBorderColor: '#444444',

  emoji: '',
  emojiPosition: '0px',
  emojiSize: '24pt',

  fixOverflow: true,

  goalTextColor: '#ffffff',
  goalTextSize: '36px',
  goalTextStrokeColor: '#000000',

  descTextColor: '#ffffff',
  descTextSize: '24px',
  descTextStrokeColor: '#000000',
};

export const ControlPanel = ({ styles, setStyles, cssText, setCssText, initialMode, mode: externalMode, onModeChange, storagePrefix = '', apiPath }: {
  styles: DonationStyles;
  setStyles: (styles: DonationStyles) => void;
  cssText: string;
  setCssText: (cssText: string) => void;
  initialMode: 'basic' | 'advanced';
  mode?: 'basic' | 'advanced';
  onModeChange?: (mode: 'basic' | 'advanced') => void;
  storagePrefix?: string;
  apiPath?: string;
}) => {
  const [internalMode, setInternalMode] = useState<'basic' | 'advanced'>(initialMode);
  const mode = externalMode || internalMode;
  const [copied, setCopied] = useState(false);
  const [showRevisions, setShowRevisions] = useState(false);

  const generateCSS = useCallback(() => {
    let cssTextEasydonate: string = `
/* หัวข้อ */
div.flex:nth-child(1)>h1:nth-child(1) {
  color: ${styles.goalTextColor} !important;
  font-size: ${styles.goalTextSize} !important;
  line-height: ${styles.goalTextSize} !important;
}

/* สีขอบหัวข้อ */
#goal-stroke-filter feFlood {
  flood-color: ${styles.goalTextStrokeColor} !important;
}

/* ข้อความคำอธิบาย */
div.flex:nth-child(3) {
  font-weight: 500 !important;
  color: ${styles.descTextColor} !important;
  font-size: ${styles.descTextSize} !important;
  filter: url("#desc-stroke-filter") drop-shadow(rgba(0, 0, 0, 0.6) 0px 4px 6px) !important;
}

/* สีขอบคำอธิบาย */
#desc-stroke-filter feFlood {
  flood-color: ${styles.descTextStrokeColor} !important;
}

/* พื้นหลัง */
div.flex>div.flex>div:nth-child(2)>div:nth-child(1) {
  border-radius: ${styles.barRoundness} !important;
}
div.flex>div.flex>div:nth-child(2) {
  background: color-mix(in oklab, ${styles.barBackground} 40%, transparent) !important;
  border-radius: ${styles.barRoundness} !important;
}

/* เปอร์เซ็๋น */
div.flex>div.flex>div:nth-child(2)>div>h1 {
  color: ${styles.progressTextColor} !important;
  font-size: 2.25rem !important;
}

/* หลอดความคืบหน้า */
div.flex>div.flex>div:nth-child(2)>div>div {
  background: linear-gradient(180deg, ${styles.progressBackground}, ${styles.progressBackground2}) !important;
  border-radius: ${styles.barRoundness} !important;
}

/* เปอร์เซ็๋น เมื่อหลอดความคืบหน้าบัง */
div.flex>div.flex>div:nth-child(2)>div>div>h1 {
  color: ${styles.progressTextColor} !important;
  font-size: 2.25rem !important;
  margin-top: 0.16rem !important;
}
`;
    // let cssText = cssTextEasydonate;
    return cssTextEasydonate;
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
      localStorage.setItem(`${storagePrefix}donationCssText`, css);
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
    localStorage.setItem(`${storagePrefix}donationCssText`, revision.cssText);
    if (revision.styles) {
      localStorage.setItem(`${storagePrefix}donationStyles`, JSON.stringify(revision.styles));
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
          localStorage.setItem(`${storagePrefix}mode`, value);
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
                apiPath={apiPath}
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
            localStorage.setItem(`${storagePrefix}donationStyles`, JSON.stringify(defaultStyles));
            localStorage.setItem(`${storagePrefix}donationCssText`, generateCSS());
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