"use client";

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DonationStyles } from './control-panel';

interface DonationControlsProps {
  styles: DonationStyles;
  setStyles: (styles: DonationStyles) => void;
}

export const DonationControls = ({ styles, setStyles }: DonationControlsProps) => {
  const updateStyle = (property: keyof DonationStyles, value: string) => {
    setStyles({ ...styles, [property]: value });
  };

  const positions = ['static', 'relative', 'absolute', 'fixed', 'sticky'];
  const displays = ['flex', 'block', 'inline', 'inline-block', 'none'];
  const textAligns = ['left', 'center', 'right', 'justify'];
  const flexDirections = ['row', 'column', 'row-reverse', 'column-reverse'];

  return (
    <ScrollArea className="h-full p-4">
      <div className="space-y-6">
        {/* Background */}
        <div>
          <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Background</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="barBackground">Background Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  type="color"
                  value={styles.barBackground}
                  onChange={(e) => updateStyle('barBackground', e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input
                  value={styles.barBackground}
                  onChange={(e) => updateStyle('barBackground', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="barBackground2">Background Color 2</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  type="color"
                  value={styles.barBackground2}
                  onChange={(e) => updateStyle('barBackground2', e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input
                  value={styles.barBackground2}
                  onChange={(e) => updateStyle('barBackground2', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="barRoundness">Roundness</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Slider
                  value={[parseInt(styles.barRoundness)]}
                  onValueChange={([value]) => updateStyle('barRoundness', `${value}px`)}
                  max={25}
                  min={0}
                  step={1}
                  className="flex-1"
                />
                <Input
                  value={styles.barRoundness}
                  onChange={(e) => updateStyle('barRoundness', e.target.value)}
                  className="w-20 text-xs"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="barBorder">Border</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Slider
                  value={[parseInt(styles.barBorder)]}
                  onValueChange={([value]) => updateStyle('barBorder', `${value}px`)}
                  max={3}
                  min={0}
                  step={1}
                  className="flex-1"
                />
                <Input
                  value={styles.barBorder}
                  onChange={(e) => updateStyle('barBorder', e.target.value)}
                  className="w-20 text-xs"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="barBorderColor">Border Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  type="color"
                  value={styles.barBorderColor}
                  onChange={(e) => updateStyle('barBorderColor', e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input
                  value={styles.barBorderColor}
                  onChange={(e) => updateStyle('barBorderColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Progress Bar</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="progressBackground">Background Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  type="color"
                  value={styles.progressBackground}
                  onChange={(e) => updateStyle('progressBackground', e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input
                  value={styles.progressBackground}
                  onChange={(e) => updateStyle('progressBackground', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="progressBackground2">Background Color 2</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  type="color"
                  value={styles.progressBackground2}
                  onChange={(e) => updateStyle('progressBackground2', e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input
                  value={styles.progressBackground2}
                  onChange={(e) => updateStyle('progressBackground2', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="progressRoundness">Roundness</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Slider
                  value={[parseInt(styles.progressRoundness)]}
                  onValueChange={([value]) => updateStyle('progressRoundness', `${value}px`)}
                  max={25}
                  min={0}
                  step={1}
                  className="flex-1"
                />
                <Input
                  value={styles.progressRoundness}
                  onChange={(e) => updateStyle('progressRoundness', e.target.value)}
                  className="w-20 text-xs"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="progressTextColor">Text Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  type="color"
                  value={styles.progressTextColor}
                  onChange={(e) => updateStyle('progressTextColor', e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input
                  value={styles.progressTextColor}
                  onChange={(e) => updateStyle('progressTextColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="progressRightBorder">Right Border</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Slider
                  value={[parseInt(styles.progressRightBorder)]}
                  onValueChange={([value]) => updateStyle('progressRightBorder', `${value}px`)}
                  max={5}
                  min={0}
                  step={1}
                  className="flex-1"
                />
                <Input
                  value={styles.progressRightBorder}
                  onChange={(e) => updateStyle('progressRightBorder', e.target.value)}
                  className="w-20 text-xs"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="progressRightBorderColor">Right Border Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  type="color"
                  value={styles.progressRightBorderColor}
                  onChange={(e) => updateStyle('progressRightBorderColor', e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input
                  value={styles.progressRightBorderColor}
                  onChange={(e) => updateStyle('progressRightBorderColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};