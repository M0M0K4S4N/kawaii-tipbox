"use client";

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ControlPanel } from './control-panel';

interface DonationControlsProps {
  styles: ControlPanel['styles'];
  setStyles: (styles: ControlPanel['styles']) => void;
}

export const DonationControls = ({ styles, setStyles }: DonationControlsProps) => {
  const updateStyle = (property: keyof ControlPanel['styles'], value: string) => {
    setStyles({ ...styles, [property]: value });
  };

  const positions = ['static', 'relative', 'absolute', 'fixed', 'sticky'];
  const displays = ['flex', 'block', 'inline', 'inline-block', 'none'];
  const textAligns = ['left', 'center', 'right', 'justify'];
  const flexDirections = ['row', 'column', 'row-reverse', 'column-reverse'];

  return (
    <ScrollArea className="h-full p-4">
      <div className="space-y-6">
        {/* Progress Bar Styles */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Progress Bar</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="progressBackground">Background</Label>
              <Input
                value={styles.progressBackground}
                onChange={(e) => updateStyle('progressBackground', e.target.value)}
                placeholder="e.g., linear-gradient(180deg, #aaa, #888)"
              />
            </div>

            <div>
              <Label htmlFor="progressBoxShadow">Box Shadow</Label>
              <Input
                value={styles.progressBoxShadow}
                onChange={(e) => updateStyle('progressBoxShadow', e.target.value)}
                placeholder="e.g., 0 0 10px #000"
              />
            </div>

            <div>
              <Label htmlFor="progressHeight">Height</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Slider
                  value={[parseInt(styles.progressHeight)]}
                  onValueChange={([value]) => updateStyle('progressHeight', `${value}px`)}
                  max={100}
                  min={10}
                  step={1}
                  className="flex-1"
                />
                <Input
                  value={styles.progressHeight}
                  onChange={(e) => updateStyle('progressHeight', e.target.value)}
                  className="w-20 text-xs"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="progressLineHeight">Line Height</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Slider
                  value={[parseInt(styles.progressLineHeight)]}
                  onValueChange={([value]) => updateStyle('progressLineHeight', `${value}px`)}
                  max={100}
                  min={10}
                  step={1}
                  className="flex-1"
                />
                <Input
                  value={styles.progressLineHeight}
                  onChange={(e) => updateStyle('progressLineHeight', e.target.value)}
                  className="w-20 text-xs"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="progressPosition">Position</Label>
              <Select value={styles.progressPosition} onValueChange={(value) => updateStyle('progressPosition', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>{position}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="progressWidth">Width</Label>
              <Input
                value={styles.progressWidth}
                onChange={(e) => updateStyle('progressWidth', e.target.value)}
                placeholder="e.g., 100% or 300px"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Done Bar Styles */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Progress Done Bar</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="doneBackground">Background</Label>
              <Input
                value={styles.doneBackground}
                onChange={(e) => updateStyle('doneBackground', e.target.value)}
                placeholder="e.g., linear-gradient(180deg, #71e251, #509e39)"
              />
            </div>

            <div>
              <Label htmlFor="doneBorderRight">Border Right</Label>
              <Input
                value={styles.doneBorderRight}
                onChange={(e) => updateStyle('doneBorderRight', e.target.value)}
                placeholder="e.g., 2px solid #444"
              />
            </div>

            <div>
              <Label htmlFor="doneHeight">Height</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Slider
                  value={[parseInt(styles.doneHeight)]}
                  onValueChange={([value]) => updateStyle('doneHeight', `${value}px`)}
                  max={100}
                  min={10}
                  step={1}
                  className="flex-1"
                />
                <Input
                  value={styles.doneHeight}
                  onChange={(e) => updateStyle('doneHeight', e.target.value)}
                  className="w-20 text-xs"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="doneLeft">Left</Label>
              <Input
                value={styles.doneLeft}
                onChange={(e) => updateStyle('doneLeft', e.target.value)}
                placeholder="e.g., 0 or 10px"
              />
            </div>

            <div>
              <Label htmlFor="donePosition">Position</Label>
              <Select value={styles.donePosition} onValueChange={(value) => updateStyle('donePosition', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>{position}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="doneTop">Top</Label>
              <Input
                value={styles.doneTop}
                onChange={(e) => updateStyle('doneTop', e.target.value)}
                placeholder="e.g., 0 or 10px"
              />
            </div>

            <div>
              <Label htmlFor="doneTransition">Transition</Label>
              <Input
                value={styles.doneTransition}
                onChange={(e) => updateStyle('doneTransition', e.target.value)}
                placeholder="e.g., width 1s ease-out"
              />
            </div>

            <div>
              <Label htmlFor="doneWidth">Width</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Slider
                  value={[parseInt(styles.doneWidth)]}
                  onValueChange={([value]) => updateStyle('doneWidth', `${value}%`)}
                  max={100}
                  min={0}
                  step={1}
                  className="flex-1"
                />
                <Input
                  value={styles.doneWidth}
                  onChange={(e) => updateStyle('doneWidth', e.target.value)}
                  className="w-20 text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Text Styles */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Text Styles</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="textPosition">Text Position</Label>
              <Select value={styles.textPosition} onValueChange={(value) => updateStyle('textPosition', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>{position}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="goalColor">Goal Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  type="color"
                  value={styles.goalColor}
                  onChange={(e) => updateStyle('goalColor', e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input
                  value={styles.goalColor}
                  onChange={(e) => updateStyle('goalColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="goalFontSize">Goal Font Size</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Slider
                  value={[parseInt(styles.goalFontSize)]}
                  onValueChange={([value]) => updateStyle('goalFontSize', `${value}pt`)}
                  max={24}
                  min={8}
                  step={1}
                  className="flex-1"
                />
                <Input
                  value={styles.goalFontSize}
                  onChange={(e) => updateStyle('goalFontSize', e.target.value)}
                  className="w-20 text-xs"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="goalTextAlign">Goal Text Align</Label>
              <Select value={styles.goalTextAlign} onValueChange={(value) => updateStyle('goalTextAlign', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {textAligns.map((align) => (
                    <SelectItem key={align} value={align}>{align}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="goalTextShadow">Goal Text Shadow</Label>
              <Input
                value={styles.goalTextShadow}
                onChange={(e) => updateStyle('goalTextShadow', e.target.value)}
                placeholder="e.g., #000 0 0 20px"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Layout Styles */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Layout</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="nameMarginBottom">Name Margin Bottom</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Slider
                  value={[parseInt(styles.nameMarginBottom)]}
                  onValueChange={([value]) => updateStyle('nameMarginBottom', `${value}px`)}
                  max={50}
                  min={0}
                  step={1}
                  className="flex-1"
                />
                <Input
                  value={styles.nameMarginBottom}
                  onChange={(e) => updateStyle('nameMarginBottom', e.target.value)}
                  className="w-20 text-xs"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="legendDisplay">Legend Display</Label>
              <Select value={styles.legendDisplay} onValueChange={(value) => updateStyle('legendDisplay', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {displays.map((display) => (
                    <SelectItem key={display} value={display}>{display}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="legendFlexDirection">Legend Flex Direction</Label>
              <Select value={styles.legendFlexDirection} onValueChange={(value) => updateStyle('legendFlexDirection', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {flexDirections.map((direction) => (
                    <SelectItem key={direction} value={direction}>{direction}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="legendItemFlex">Legend Item Flex</Label>
              <Input
                value={styles.legendItemFlex}
                onChange={(e) => updateStyle('legendItemFlex', e.target.value)}
                placeholder="e.g., 1 or auto"
              />
            </div>

            <div>
              <Label htmlFor="startTextAlign">Start Text Align</Label>
              <Select value={styles.startTextAlign} onValueChange={(value) => updateStyle('startTextAlign', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {textAligns.map((align) => (
                    <SelectItem key={align} value={align}>{align}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="endTextAlign">End Text Align</Label>
              <Select value={styles.endTextAlign} onValueChange={(value) => updateStyle('endTextAlign', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {textAligns.map((align) => (
                    <SelectItem key={align} value={align}>{align}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="deadlineTextAlign">Deadline Text Align</Label>
              <Select value={styles.deadlineTextAlign} onValueChange={(value) => updateStyle('deadlineTextAlign', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {textAligns.map((align) => (
                    <SelectItem key={align} value={align}>{align}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};