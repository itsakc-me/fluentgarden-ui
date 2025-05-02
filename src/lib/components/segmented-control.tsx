
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../utils';

export interface SegmentedControlOption {
  value: string;
  label: string | React.ReactNode;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  variant?: 'default' | 'material' | 'ios';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  className,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  disabled = false,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(value || defaultValue || options[0]?.value || '');
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const controlRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    updateIndicatorPosition();
    // Add window resize handler
    window.addEventListener('resize', updateIndicatorPosition);
    return () => window.removeEventListener('resize', updateIndicatorPosition);
  }, [selectedValue]);

  const updateIndicatorPosition = () => {
    const selectedOptionEl = optionRefs.current.get(selectedValue);
    const controlEl = controlRef.current;
    
    if (selectedOptionEl && controlEl) {
      const controlRect = controlEl.getBoundingClientRect();
      const optionRect = selectedOptionEl.getBoundingClientRect();
      
      setIndicatorStyle({
        left: `${optionRect.left - controlRect.left}px`,
        width: `${optionRect.width}px`,
        height: `${optionRect.height}px`,
      });
    }
  };

  const handleOptionClick = (optionValue: string) => {
    if (disabled) return;
    
    setSelectedValue(optionValue);
    if (onChange) {
      onChange(optionValue);
    }
  };

  const sizeClasses = {
    sm: "text-xs p-1",
    md: "text-sm p-1.5",
    lg: "text-base p-2"
  };

  const variantClasses = {
    default: "bg-secondary hover:bg-secondary/80 [&>button]:data-[selected=true]:text-primary [&>.indicator]:bg-white [&>.indicator]:shadow-sm",
    material: "bg-secondary/50 hover:bg-secondary/80 [&>button]:data-[selected=true]:text-primary-foreground [&>.indicator]:bg-primary [&>.indicator]:shadow-none",
    ios: "bg-secondary/80 backdrop-blur-sm [&>button]:data-[selected=true]:text-primary-foreground [&>.indicator]:bg-white [&>.indicator]:shadow-md"
  };

  return (
    <div
      ref={controlRef}
      className={cn(
        "inline-flex gap-2 relative rounded-lg p-1 text-muted-foreground",
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "w-full",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      <div 
        className="indicator absolute z-0 rounded-md transition-all duration-200 ease-out"
        style={indicatorStyle}
      />
      
      {options.map((option) => (
        <button
          key={option.value}
          ref={(el) => {
            if (el) optionRefs.current.set(option.value, el);
          }}
          type="button"
          onClick={() => handleOptionClick(option.value)}
          data-selected={selectedValue === option.value}
          className={cn(
            "relative z-10 rounded-md font-medium transition-colors py-1 px-3",
            "data-[selected=true]:font-medium",
            fullWidth && "flex-1 text-center"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
