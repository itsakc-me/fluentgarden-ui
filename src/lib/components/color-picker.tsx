
import React, { useState, useEffect } from 'react';
import { cn } from "../utils";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Slider } from "./slider";

interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  showAlpha?: boolean;
  showInput?: boolean;
  disabled?: boolean;
  presetColors?: string[];
  size?: "sm" | "md" | "lg";
  variant?: "default" | "material" | "ios";
}

export function ColorPicker({
  value,
  defaultValue = "#9b87f5",
  onChange,
  className,
  showAlpha = true,
  showInput = true,
  disabled = false,
  presetColors = ["#9b87f5", "#0078D4", "#107C10", "#D83B01", "#8661C5", "#D946EF"],
  size = "md",
  variant = "default"
}: ColorPickerProps) {
  const [color, setColor] = useState<string>(value || defaultValue);
  const [hue, setHue] = useState<number>(0);
  const [saturation, setSaturation] = useState<number>(100);
  const [lightness, setLightness] = useState<number>(50);
  const [alpha, setAlpha] = useState<number>(100);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      setColor(value);
      const hslValues = hexToHsl(value);
      if (hslValues) {
        setHue(hslValues.h);
        setSaturation(hslValues.s);
        setLightness(hslValues.l);
        setAlpha(hslValues.a * 100);
      }
    }
  }, [value]);

  useEffect(() => {
    const newColor = showAlpha
      ? `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha / 100})`
      : `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    setColor(hslToHex(hue, saturation, lightness, alpha / 100));
    if (onChange) onChange(hslToHex(hue, saturation, lightness, alpha / 100));
  }, [hue, saturation, lightness, alpha, showAlpha, onChange]);

  const hexToHsl = (hex: string): { h: number; s: number; l: number; a: number } | null => {
    // Remove the # from the beginning if it exists
    hex = hex.replace(/^#/, '');
    
    // Parse the hex values
    let r, g, b, a = 1;
    
    if (hex.length === 3) {
      r = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255;
      g = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255;
      b = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255;
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16) / 255;
      g = parseInt(hex.substring(2, 4), 16) / 255;
      b = parseInt(hex.substring(4, 6), 16) / 255;
    } else if (hex.length === 8) {
      r = parseInt(hex.substring(0, 2), 16) / 255;
      g = parseInt(hex.substring(2, 4), 16) / 255;
      b = parseInt(hex.substring(4, 6), 16) / 255;
      a = parseInt(hex.substring(6, 8), 16) / 255;
    } else {
      return null;
    }
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else if (max === b) h = (r - g) / d + 4;
      
      h *= 60;
    }
    
    return { h, s: s * 100, l: l * 100, a };
  };

  const hslToHex = (h: number, s: number, l: number, a: number = 1): string => {
    s /= 100;
    l /= 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r = 0, g = 0, b = 0;
    
    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x;
    }
    
    const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');
    const aHex = Math.round(a * 255).toString(16).padStart(2, '0');
    
    return a < 1 
      ? `#${rHex}${gHex}${bHex}${aHex}` 
      : `#${rHex}${gHex}${bHex}`;
  };

  const handlePresetClick = (presetColor: string) => {
    setColor(presetColor);
    const hslValues = hexToHsl(presetColor);
    if (hslValues) {
      setHue(hslValues.h);
      setSaturation(hslValues.s);
      setLightness(hslValues.l);
      setAlpha(hslValues.a * 100);
    }
    if (onChange) onChange(presetColor);
  };

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
  };

  const variantClasses = {
    default: "rounded border border-border hover:border-primary/80 transition-colors",
    material: "rounded-lg shadow-sm",
    ios: "rounded-full shadow-sm"
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger disabled={disabled} asChild>
          <button
            type="button"
            aria-label="Pick a color"
            className={cn(
              "relative inline-flex",
              sizeClasses[size],
              variantClasses[variant],
              disabled && "opacity-50 cursor-not-allowed"
            )}
            style={{ background: color }}
          >
            {variant === "ios" && (
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10 dark:ring-white/10" />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-64 p-3"
          align="start"
          sideOffset={5}
        >
          <div className="space-y-3">
            <div
              className="relative h-32 w-full rounded-md"
              style={{
                background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), 
                            linear-gradient(to right, rgba(255, 255, 255, 1) 0%, hsla(${hue}, 100%, 50%, 1) 100%)`,
              }}
              onMouseDown={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
                
                setSaturation(x * 100);
                setLightness(100 - y * 100);
                
                const handleMouseMove = (moveEvent: MouseEvent) => {
                  const newX = Math.max(0, Math.min(1, (moveEvent.clientX - rect.left) / rect.width));
                  const newY = Math.max(0, Math.min(1, (moveEvent.clientY - rect.top) / rect.height));
                  setSaturation(newX * 100);
                  setLightness(100 - newY * 100);
                };
                
                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };
                
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
            />
            
            <div className="space-y-2">
              <Label htmlFor="hue-slider">Hue</Label>
              <Slider
                id="hue-slider"
                min={0}
                max={359}
                step={1}
                value={[hue]}
                onValueChange={(values) => setHue(values[0])}
                className="h-3"
                style={{
                  background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
                }}
              />
            </div>

            {showAlpha && (
              <div className="space-y-2">
                <Label htmlFor="alpha-slider">Opacity</Label>
                <Slider
                  id="alpha-slider"
                  min={0}
                  max={100}
                  step={1}
                  value={[alpha]}
                  onValueChange={(values) => setAlpha(values[0])}
                  className="h-3"
                  style={{
                    background: `linear-gradient(to right, transparent 0%, ${hslToHex(hue, saturation, lightness)})`,
                  }}
                />
              </div>
            )}

            {showInput && (
              <div className="flex items-center space-x-2">
                <Label htmlFor="hex-input" className="w-8">Hex</Label>
                <input
                  id="hex-input"
                  type="text"
                  value={color.toUpperCase()}
                  onChange={(e) => {
                    const newColor = e.target.value;
                    setColor(newColor);
                    const hslValues = hexToHsl(newColor);
                    if (hslValues) {
                      setHue(hslValues.h);
                      setSaturation(hslValues.s);
                      setLightness(hslValues.l);
                      setAlpha(hslValues.a * 100);
                      if (onChange) onChange(newColor);
                    }
                  }}
                  className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            )}

            {presetColors.length > 0 && (
              <div>
                <Label className="text-xs mb-1 block">Presets</Label>
                <div className="flex flex-wrap gap-1">
                  {presetColors.map((preset) => (
                    <button
                      key={preset}
                      style={{ background: preset }}
                      className={cn("w-6 h-6 rounded-md border border-border/50", 
                        preset === color && "ring-2 ring-primary ring-offset-1"
                      )}
                      onClick={() => handlePresetClick(preset)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
