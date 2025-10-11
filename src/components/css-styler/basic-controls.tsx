"use client";

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ControlPanel } from './control-panel';

interface BasicControlsProps {
  styles: ControlPanel['styles'];
  setStyles: (styles: ControlPanel['styles']) => void;
}

export const BasicControls = ({ styles, setStyles }: BasicControlsProps) => {
  const updateStyle = (property: keyof ControlPanel['styles'], value: string) => {
    setStyles({ ...styles, [property]: value });
  };

  const fontFamilies = [
    'Arial, sans-serif',
    'Georgia, serif',
    'Times New Roman, serif',
    'Courier New, monospace',
    'Verdana, sans-serif',
    'Helvetica, sans-serif',
    'Trebuchet MS, sans-serif',
    'Palatino, serif',
  ];

  const fontWeights = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];
  const textAligns = ['left', 'center', 'right', 'justify'];
  const displays = ['block', 'inline', 'inline-block', 'flex', 'grid', 'none'];
  const positions = ['static', 'relative', 'absolute', 'fixed', 'sticky'];
  const borderStyles = ['none', 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'];

  return (
    <ScrollArea className="h-full p-4">
      <div className="space-y-6">
        {/* Typography */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Typography</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fontSize">Font Size</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Slider
                  value={[parseInt(styles.fontSize)]}
                  onValueChange={([value]) => updateStyle('fontSize', `${value}px`)}
                  max={72}
                  min={8}
                  step={1}
                  className="flex-1"
                />
                <Input
                  value={styles.fontSize}
                  onChange={(e) => updateStyle('fontSize', e.target.value)}
                  className="w-20 text-xs"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="fontFamily">Font Family</Label>
              <Select value={styles.fontFamily} onValueChange={(value) => updateStyle('fontFamily', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontFamilies.map((font) => (
                    <SelectItem key={font} value={font}>{font}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="fontWeight">Font Weight</Label>
              <Select value={styles.fontWeight} onValueChange={(value) => updateStyle('fontWeight', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontWeights.map((weight) => (
                    <SelectItem key={weight} value={weight}>{weight}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="textAlign">Text Align</Label>
              <Select value={styles.textAlign} onValueChange={(value) => updateStyle('textAlign', value)}>
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
              <Label htmlFor="lineHeight">Line Height</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Slider
                  value={[parseFloat(styles.lineHeight)]}
                  onValueChange={([value]) => updateStyle('lineHeight', value.toString())}
                  max={3}
                  min={0.5}
                  step={0.1}
                  className="flex-1"
                />
                <Input
                  value={styles.lineHeight}
                  onChange={(e) => updateStyle('lineHeight', e.target.value)}
                  className="w-20 text-xs"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="letterSpacing">Letter Spacing</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Slider
                  value={[parseInt(styles.letterSpacing)]}
                  onValueChange={([value]) => updateStyle('letterSpacing', `${value}px`)}
                  max={10}
                  min={-5}
                  step={1}
                  className="flex-1"
                />
                <Input
                  value={styles.letterSpacing}
                  onChange={(e) => updateStyle('letterSpacing', e.target.value)}
                  className="w-20 text-xs"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="textColor">Text Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  type="color"
                  value={styles.textColor}
                  onChange={(e) => updateStyle('textColor', e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input
                  value={styles.textColor}
                  onChange={(e) => updateStyle('textColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Layout & Spacing */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Layout & Spacing</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="padding">Padding</Label>
              <Input
                value={styles.padding}
                onChange={(e) => updateStyle('padding', e.target.value)}
                placeholder="e.g., 16px or 1rem"
              />
            </div>

            <div>
              <Label htmlFor="margin">Margin</Label>
              <Input
                value={styles.margin}
                onChange={(e) => updateStyle('margin', e.target.value)}
                placeholder="e.g., 16px or 1rem"
              />
            </div>

            <div>
              <Label htmlFor="width">Width</Label>
              <Input
                value={styles.width}
                onChange={(e) => updateStyle('width', e.target.value)}
                placeholder="e.g., 100% or 300px"
              />
            </div>

            <div>
              <Label htmlFor="height">Height</Label>
              <Input
                value={styles.height}
                onChange={(e) => updateStyle('height', e.target.value)}
                placeholder="e.g., auto or 200px"
              />
            </div>

            <div>
              <Label htmlFor="display">Display</Label>
              <Select value={styles.display} onValueChange={(value) => updateStyle('display', value)}>
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
              <Label htmlFor="position">Position</Label>
              <Select value={styles.position} onValueChange={(value) => updateStyle('position', value)}>
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
          </div>
        </div>

        <Separator />

        {/* Appearance */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Appearance</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="backgroundColor">Background Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  type="color"
                  value={styles.backgroundColor}
                  onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input
                  value={styles.backgroundColor}
                  onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="borderStyle">Border Style</Label>
              <Select value={styles.borderStyle} onValueChange={(value) => updateStyle('borderStyle', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {borderStyles.map((style) => (
                    <SelectItem key={style} value={style}>{style}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="borderWidth">Border Width</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Slider
                  value={[parseInt(styles.borderWidth)]}
                  onValueChange={([value]) => updateStyle('borderWidth', `${value}px`)}
                  max={20}
                  min={0}
                  step={1}
                  className="flex-1"
                />
                <Input
                  value={styles.borderWidth}
                  onChange={(e) => updateStyle('borderWidth', e.target.value)}
                  className="w-20 text-xs"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="borderColor">Border Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  type="color"
                  value={styles.borderColor}
                  onChange={(e) => updateStyle('borderColor', e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input
                  value={styles.borderColor}
                  onChange={(e) => updateStyle('borderColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="borderRadius">Border Radius</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Slider
                  value={[parseInt(styles.borderRadius)]}
                  onValueChange={([value]) => updateStyle('borderRadius', `${value}px`)}
                  max={50}
                  min={0}
                  step={1}
                  className="flex-1"
                />
                <Input
                  value={styles.borderRadius}
                  onChange={(e) => updateStyle('borderRadius', e.target.value)}
                  className="w-20 text-xs"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="boxShadow">Box Shadow</Label>
              <Input
                value={styles.boxShadow}
                onChange={(e) => updateStyle('boxShadow', e.target.value)}
                placeholder="e.g., 0 2px 4px rgba(0,0,0,0.1)"
              />
            </div>

            <div>
              <Label htmlFor="opacity">Opacity</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Slider
                  value={[parseFloat(styles.opacity) * 100]}
                  onValueChange={([value]) => updateStyle('opacity', (value / 100).toString())}
                  max={100}
                  min={0}
                  step={1}
                  className="flex-1"
                />
                <Input
                  value={styles.opacity}
                  onChange={(e) => updateStyle('opacity', e.target.value)}
                  className="w-20 text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};