"use client";

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DonationStyles } from './control-panel';
import { EmojiPicker } from '@ferrucc-io/emoji-picker';
import { Delete } from 'lucide-react';

interface DonationControlsProps {
  styles: DonationStyles;
  setStyles: (styles: DonationStyles) => void;
}

export const DonationControls = ({ styles, setStyles }: DonationControlsProps) => {
  const updateStyle = (property: keyof DonationStyles, value: string|boolean) => {
    setStyles({ ...styles, [property]: value });
  };

  const positions = ['static', 'relative', 'absolute', 'fixed', 'sticky'];
  const displays = ['flex', 'block', 'inline', 'inline-block', 'none'];
  const textAligns = ['left', 'center', 'right', 'justify'];
  const flexDirections = ['row', 'column', 'row-reverse', 'column-reverse'];

  return (
    <ScrollArea className="h-full p-4">
      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Misc</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fixOverflow">Fix overflow</Label>
              <Select value={styles.fixOverflow ? 'yes' : 'no'} onValueChange={(value) => updateStyle('fixOverflow', value === 'yes')}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
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

        {/* Emoji */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Emoji</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="emojiPosition">Emoji Position (related to progress bar)</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Slider
                  value={[parseInt(styles.emojiPosition)]}
                  onValueChange={([value]) => updateStyle('emojiPosition', `${value}px`)}
                  max={100}
                  min={-100}
                  step={1}
                  className="flex-1"
                />
                <Input
                  value={styles.emojiPosition}
                  onChange={(e) => updateStyle('emojiPosition', e.target.value)}
                  className="w-20 text-xs"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="emojiSize">Emoji Size</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Slider
                  value={[parseInt(styles.emojiSize)]}
                  onValueChange={([value]) => updateStyle('emojiSize', `${value}pt`)}
                  max={70}
                  min={1}
                  step={1}
                  className="flex-1"
                />
                <Input
                  value={styles.emojiSize}
                  onChange={(e) => updateStyle('emojiSize', e.target.value)}
                  className="w-20 text-xs"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="emoji">
                Emoji
              </Label>
              <div className='flex space-x-2 mt-1 mb-4 items-center justify-center'>
                {/* Box to show emoji */}
                <div className='w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 text-5xl'>
                  {styles.emoji}
                </div>
                <div className='w-16 h-16 flex items-center'>
                  <Delete className='cursor-pointer'
                    onClick={() => updateStyle('emoji', '')} />
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <EmojiPicker className='flex-1' onEmojiSelect={(emoji) => {
                  updateStyle('emoji', emoji);
                }}>
                  <EmojiPicker.Header>
                    <EmojiPicker.Input placeholder="Search emoji" />
                  </EmojiPicker.Header>
                  <EmojiPicker.Group>
                    <EmojiPicker.List />
                  </EmojiPicker.Group>
                </EmojiPicker>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};