import * as React from 'react'
import { cn } from '../../lib'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { Button } from '../button'
import { Pipette, Check } from 'lucide-react'
import { SketchPicker } from 'react-color'

interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string
  onChange?: (color: string) => void
  variant?: 'default' | 'material' | 'ios'
  size?: 'sm' | 'md' | 'lg'
  showAlpha?: boolean
  presetColors?: string[]
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  variant = 'default',
  size = 'md',
  showAlpha = true,
  presetColors,
  className,
  ...props
}) => {
  const [open, setOpen] = React.useState(false)
  const [selectedColor, setSelectedColor] = React.useState(value || '#fff')

  React.useEffect(() => {
    setSelectedColor(value || '#fff')
  }, [value])

  const handleColorChange = (color: any) => {
    setSelectedColor(color.hex)
    onChange?.(color.hex)
  }

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  const variants = {
    default: 'rounded-md shadow-sm',
    material: 'rounded-full shadow-md',
    ios: 'rounded-xl shadow-sm border',
  }

  const defaultPresetColors = [
    "#f44336", "#e91e63", "#9c27b0", "#673ab7",
    "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4",
    "#009688", "#4caf50", "#8bc34a", "#cddc39",
    "#ffeb3b", "#ffc107", "#ff9800", "#ff5722"
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(sizes[size], variants[variant], 'p-0 border-input', className)}
          style={{ backgroundColor: selectedColor }}
        >
          <Pipette className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 overflow-hidden" align="start">
        <SketchPicker
          color={selectedColor}
          onChange={handleColorChange}
          disableAlpha={!showAlpha}
          presetColors={presetColors || defaultPresetColors}
        />
      </PopoverContent>
    </Popover>
  )
}

export { ColorPicker }
