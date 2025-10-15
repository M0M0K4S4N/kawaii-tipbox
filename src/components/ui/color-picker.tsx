"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Slider } from './slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, History, Trash2 } from 'lucide-react';

// Color conversion utilities
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

// Local storage key for recently used colors
const RECENT_COLORS_KEY = 'color-picker-recent-colors';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
  disabled?: boolean;
}

export const ColorPicker = ({ value, onChange, className, disabled = false }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hexValue, setHexValue] = useState(value);
  const [rgbValue, setRgbValue] = useState({ r: 0, g: 0, b: 0 });
  const [hslValue, setHslValue] = useState({ h: 0, s: 0, l: 0 });
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [eyedropperActive, setEyedropperActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const saturationRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);

  // Load recent colors from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_COLORS_KEY);
      if (stored) {
        setRecentColors(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load recent colors:', error);
    }
  }, []);

  // Save recent colors to localStorage
  const saveRecentColors = useCallback((colors: string[]) => {
    try {
      localStorage.setItem(RECENT_COLORS_KEY, JSON.stringify(colors));
    } catch (error) {
      console.error('Failed to save recent colors:', error);
    }
  }, []);

  // Add color to recent colors
  const addToRecentColors = useCallback((color: string) => {
    setRecentColors(prev => {
      const filtered = prev.filter(c => c !== color);
      const updated = [color, ...filtered].slice(0, 12); // Keep only 12 recent colors
      saveRecentColors(updated);
      return updated;
    });
  }, [saveRecentColors]);

  // Update color values when prop changes
  useEffect(() => {
    setHexValue(value);
    const rgb = hexToRgb(value);
    if (rgb) {
      setRgbValue(rgb);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setHslValue(hsl);
    }
  }, [value]);

  // Update color from RGB
  const updateFromRgb = useCallback((r: number, g: number, b: number) => {
    const hex = rgbToHex(r, g, b);
    setHexValue(hex);
    setRgbValue({ r, g, b });
    const hsl = rgbToHsl(r, g, b);
    setHslValue(hsl);
    onChange(hex);
    addToRecentColors(hex);
  }, [onChange, addToRecentColors]);

  // Update color from HSL
  const updateFromHsl = useCallback((h: number, s: number, l: number) => {
    const rgb = hslToRgb(h, s, l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setHexValue(hex);
    setRgbValue(rgb);
    setHslValue({ h, s, l });
    onChange(hex);
    addToRecentColors(hex);
  }, [onChange, addToRecentColors]);

  // Update color from HEX
  const updateFromHex = useCallback((hex: string) => {
    const rgb = hexToRgb(hex);
    if (rgb) {
      setHexValue(hex);
      setRgbValue(rgb);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setHslValue(hsl);
      onChange(hex);
      addToRecentColors(hex);
    }
  }, [onChange, addToRecentColors]);

  // Handle hex input change
  const handleHexChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexValue(value);
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      updateFromHex(value);
    }
  }, [updateFromHex]);

  // Handle eyedropper tool
  const handleEyedropper = useCallback(async () => {
    if (!('EyeDropper' in window)) {
      alert('Eyrodropper API is not supported in your browser. Please use a modern browser like Chrome, Edge, or Firefox.');
      return;
    }

    try {
      setEyedropperActive(true);
      // @ts-ignore - EyeDropper is not in the TypeScript types yet
      const eyeDropper = new EyeDropper();
      const result = await eyeDropper.open();
      updateFromHex(result.sRGBHex);
    } catch (error) {
      console.error('Eyedropper failed:', error);
    } finally {
      setEyedropperActive(false);
    }
  }, [updateFromHex]);

  // Clear recent colors
  const clearRecentColors = useCallback(() => {
    setRecentColors([]);
    saveRecentColors([]);
  }, [saveRecentColors]);

  // Handle saturation/lightness picker
  const handleSaturationLightnessChange = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!saturationRef.current) return;
    
    const rect = saturationRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    
    const s = Math.round(x * 100);
    const l = Math.round((1 - y) * 100);
    
    updateFromHsl(hslValue.h, s, l);
  }, [hslValue.h, updateFromHsl]);

  // Handle keyboard navigation for saturation/lightness picker
  const handleSaturationLightnessKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!saturationRef.current) return;
    
    let newS = hslValue.s;
    let newL = hslValue.l;
    let handled = false;
    
    switch (e.key) {
      case 'ArrowRight':
        newS = Math.min(100, newS + 5);
        handled = true;
        break;
      case 'ArrowLeft':
        newS = Math.max(0, newS - 5);
        handled = true;
        break;
      case 'ArrowUp':
        newL = Math.min(100, newL + 5);
        handled = true;
        break;
      case 'ArrowDown':
        newL = Math.max(0, newL - 5);
        handled = true;
        break;
    }
    
    if (handled) {
      e.preventDefault();
      updateFromHsl(hslValue.h, newS, newL);
    }
  }, [hslValue.h, hslValue.s, hslValue.l, updateFromHsl]);

  // Handle hue slider
  const handleHueChange = useCallback((value: number[]) => {
    updateFromHsl(value[0], hslValue.s, hslValue.l);
  }, [hslValue.s, hslValue.l, updateFromHsl]);

  // Handle keyboard navigation for hue slider
  const handleHueKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    let newH = hslValue.h;
    let handled = false;
    
    switch (e.key) {
      case 'ArrowRight':
        newH = Math.min(360, newH + 5);
        handled = true;
        break;
      case 'ArrowLeft':
        newH = Math.max(0, newH - 5);
        handled = true;
        break;
    }
    
    if (handled) {
      e.preventDefault();
      updateFromHsl(newH, hslValue.s, hslValue.l);
    }
  }, [hslValue.h, hslValue.s, hslValue.l, updateFromHsl]);

  return (
    <div className={cn("relative", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-9 p-1 justify-start"
            disabled={disabled}
            aria-label={`Color picker, current color is ${value}`}
            aria-describedby="color-picker-description"
          >
            <div
              className="w-5 h-5 rounded border border-border mr-2"
              style={{ backgroundColor: value }}
              aria-hidden="true"
            />
            <span className="text-sm">{value}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <div className="p-4 space-y-4">
            {/* Saturation/Lightness Picker */}
            <div className="space-y-2">
              <Label id="saturation-lightness-label">Saturation & Lightness</Label>
              <div
                ref={saturationRef}
                className="relative w-full h-32 rounded cursor-crosshair focus:outline-none focus:ring-2 focus:ring-ring"
                style={{
                  background: `linear-gradient(to right, hsl(${hslValue.h}, 0%, 50%), hsl(${hslValue.h}, 100%, 50%)),
                              linear-gradient(to top, hsl(${hslValue.h}, 100%, 0%), hsl(${hslValue.h}, 100%, 50%), hsl(${hslValue.h}, 100%, 100%))`,
                  backgroundBlendMode: 'multiply'
                }}
                onMouseDown={handleSaturationLightnessChange}
                onKeyDown={handleSaturationLightnessKeyDown}
                role="slider"
                aria-label="Saturation and lightness"
                aria-labelledby="saturation-lightness-label"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={hslValue.s}
                aria-valuetext={`Saturation ${hslValue.s}%, Lightness ${hslValue.l}%`}
                tabIndex={0}
              >
                <div
                  className="absolute w-4 h-4 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    left: `${hslValue.s}%`,
                    top: `${100 - hslValue.l}%`,
                    backgroundColor: value
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Hue Slider */}
            <div className="space-y-2">
              <Label id="hue-label">Hue</Label>
              <Slider
                value={[hslValue.h]}
                onValueChange={handleHueChange}
                max={360}
                step={1}
                className="w-full"
                aria-labelledby="hue-label"
                aria-label={`Hue: ${hslValue.h} degrees`}
                aria-valuemin={0}
                aria-valuemax={360}
                aria-valuenow={hslValue.h}
                style={{
                  background: `linear-gradient(to right,
                    hsl(0, 100%, 50%),
                    hsl(60, 100%, 50%),
                    hsl(120, 100%, 50%),
                    hsl(180, 100%, 50%),
                    hsl(240, 100%, 50%),
                    hsl(300, 100%, 50%),
                    hsl(360, 100%, 50%))`
                }}
              />
            </div>

            {/* Color Format Tabs */}
            <Tabs defaultValue="hex" className="w-full">
              <TabsList className="grid w-full grid-cols-3" aria-label="Color format selection">
                <TabsTrigger value="hex" aria-label="Hex color format">HEX</TabsTrigger>
                <TabsTrigger value="rgb" aria-label="RGB color format">RGB</TabsTrigger>
                <TabsTrigger value="hsl" aria-label="HSL color format">HSL</TabsTrigger>
              </TabsList>
              
              <TabsContent value="hex" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Input
                    value={hexValue}
                    onChange={handleHexChange}
                    placeholder="#000000"
                    className="flex-1"
                    aria-label="Hex color value"
                    pattern="^#[0-9A-Fa-f]{6}$"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleEyedropper}
                    disabled={eyedropperActive}
                    title="Pick color from screen"
                    aria-label={eyedropperActive ? "Eyedropper tool active" : "Activate eyedropper tool to pick color from screen"}
                  >
                    {eyedropperActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="rgb" className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="r" className="text-xs">Red</Label>
                    <Input
                      id="r"
                      type="number"
                      min={0}
                      max={255}
                      value={rgbValue.r}
                      onChange={(e) => updateFromRgb(parseInt(e.target.value) || 0, rgbValue.g, rgbValue.b)}
                      className="h-8"
                      aria-label="Red channel value (0-255)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="g" className="text-xs">Green</Label>
                    <Input
                      id="g"
                      type="number"
                      min={0}
                      max={255}
                      value={rgbValue.g}
                      onChange={(e) => updateFromRgb(rgbValue.r, parseInt(e.target.value) || 0, rgbValue.b)}
                      className="h-8"
                      aria-label="Green channel value (0-255)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="b" className="text-xs">Blue</Label>
                    <Input
                      id="b"
                      type="number"
                      min={0}
                      max={255}
                      value={rgbValue.b}
                      onChange={(e) => updateFromRgb(rgbValue.r, rgbValue.g, parseInt(e.target.value) || 0)}
                      className="h-8"
                      aria-label="Blue channel value (0-255)"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="hsl" className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="h" className="text-xs">Hue</Label>
                    <Input
                      id="h"
                      type="number"
                      min={0}
                      max={360}
                      value={hslValue.h}
                      onChange={(e) => updateFromHsl(parseInt(e.target.value) || 0, hslValue.s, hslValue.l)}
                      className="h-8"
                      aria-label="Hue value (0-360 degrees)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="s" className="text-xs">Saturation</Label>
                    <Input
                      id="s"
                      type="number"
                      min={0}
                      max={100}
                      value={hslValue.s}
                      onChange={(e) => updateFromHsl(hslValue.h, parseInt(e.target.value) || 0, hslValue.l)}
                      className="h-8"
                      aria-label="Saturation value (0-100%)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="l" className="text-xs">Lightness</Label>
                    <Input
                      id="l"
                      type="number"
                      min={0}
                      max={100}
                      value={hslValue.l}
                      onChange={(e) => updateFromHsl(hslValue.h, hslValue.s, parseInt(e.target.value) || 0)}
                      className="h-8"
                      aria-label="Lightness value (0-100%)"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Recent Colors */}
            {recentColors.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label id="recent-colors-label" className="flex items-center gap-1">
                    <History className="h-3 w-3" />
                    Recent Colors
                  </Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearRecentColors}
                    className="h-6 px-2 text-xs"
                    aria-label="Clear recent colors"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Clear
                  </Button>
                </div>
                <div
                  className="grid grid-cols-6 gap-2"
                  role="list"
                  aria-labelledby="recent-colors-label"
                >
                  {recentColors.map((color, index) => (
                    <button
                      key={index}
                      className="w-10 h-10 rounded border-2 border-border hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                      style={{ backgroundColor: color }}
                      onClick={() => updateFromHex(color)}
                      aria-label={`Select color ${color}`}
                      role="listitem"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div id="color-picker-description" className="sr-only">
            Color picker with saturation and lightness controls, hue slider, and input fields for HEX, RGB, and HSL color formats
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColorPicker;