
import * as React from "react"
import { cn } from "../utils"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"
import { Pipette, Check } from "lucide-react"
import { SketchPicker } from "react-color"

interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string
  onChange?: (color: string) => void
  variant?: "default" | "material" | "ios"
  size?: "sm" | "md" | "lg"
  showAlpha?: boolean
  presetColors?: string[]
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  variant = "default",
  size = "md",
  showAlpha = true,
  presetColors,
  className,
  ...props
}) => {
  const [open, setOpen] = React.useState(false)
  const [selectedColor, setSelectedColor] = React.useState(value || "#fff")

  React.useEffect(() => {
    setSelectedColor(value || "#fff")
  }, [value])

  const handleColorChange = (color: any) => {
    setSelectedColor(color.hex)
    onChange?.(color.hex)
  }

  const handlePresetColorClick = (color: string) => {
    setSelectedColor(color)
    onChange?.(color)
    setOpen(false)
  }

  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  const variants = {
    default: "rounded-md shadow-sm",
    material: "rounded-full shadow-md",
    ios: "rounded-xl shadow-sm border",
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            sizes[size],
            variants[variant],
            "p-0 border-input",
            className
          )}
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
          presetColors={presetColors}
        />
        {presetColors && (
          <div className="flex items-center justify-start p-3 border-t">
            {presetColors.map((color) => (
              <Button
                key={color}
                variant="ghost"
                className="w-8 h-8 p-0 rounded-md shadow-sm"
                style={{ backgroundColor: color }}
                onClick={() => handlePresetColorClick(color)}
              >
                {selectedColor === color && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </Button>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export { ColorPicker }
