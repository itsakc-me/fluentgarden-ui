
import * as React from "react"
import { Clock } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib"
import { Button } from "../button"
import { Popover, PopoverContent, PopoverTrigger } from "../popover"

const timePickerVariants = cva(
  "flex h-10 w-full items-center justify-start rounded-md border border-input bg-background text-sm ring-offset-background transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-input bg-background",
        pill: "rounded-full",
        outlined: "border-2",
        filled: "bg-secondary/20 border-transparent",
      },
      size: {
        sm: "h-8 text-xs",
        default: "h-10 text-sm",
        lg: "h-12 text-base px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface TimePickerProps extends VariantProps<typeof timePickerVariants> {
  value?: string
  onChange?: (time: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  popoverClassName?: string
  showSeconds?: boolean
  hourFormat?: "12h" | "24h"
}

export function TimePicker({
  value,
  onChange,
  placeholder = "Select time",
  disabled = false,
  variant,
  size,
  className,
  popoverClassName,
  showSeconds = false,
  hourFormat = "24h",
}: TimePickerProps) {
  const [selectedTime, setSelectedTime] = React.useState<string>(value || "")
  const [isOpen, setIsOpen] = React.useState(false)
  
  const handleTimeChange = (newTime: string) => {
    setSelectedTime(newTime)
    onChange?.(newTime)
    setIsOpen(false)
  }

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedTime(value)
    }
  }, [value])

  const hours = hourFormat === "12h" 
    ? Array.from({ length: 12 }, (_, i) => i === 0 ? 12 : i) 
    : Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 60 }, (_, i) => i)
  const seconds = showSeconds ? Array.from({ length: 60 }, (_, i) => i) : []
  const periods = ["AM", "PM"]
  
  // Parse the current time for display
  let currentHour = 0
  let currentMinute = 0
  let currentSecond = 0
  let currentPeriod = "AM"
  
  if (selectedTime) {
    const [timePart, periodPart] = selectedTime.split(" ")
    if (periodPart) {
      currentPeriod = periodPart
    }
    
    const timeParts = timePart.split(":")
    if (timeParts.length >= 2) {
      currentHour = parseInt(timeParts[0], 10)
      currentMinute = parseInt(timeParts[1], 10)
      if (timeParts.length === 3) {
        currentSecond = parseInt(timeParts[2], 10)
      }
      
      // Convert to 12-hour format for display if needed
      if (hourFormat === "12h" && !periodPart) {
        if (currentHour >= 12) {
          currentPeriod = "PM"
          if (currentHour > 12) {
            currentHour -= 12
          }
        } else if (currentHour === 0) {
          currentHour = 12
        }
      }
    }
  }

  const formatTimeValue = (hour: number, minute: number, second?: number, period?: string) => {
    let formattedHour = hour
    
    // Convert hour to 24-hour format if needed
    if (hourFormat === "12h" && period) {
      if (period === "PM" && hour !== 12) {
        formattedHour = hour + 12
      } else if (period === "AM" && hour === 12) {
        formattedHour = 0
      }
    }
    
    // Format the time string
    const hourStr = formattedHour.toString().padStart(2, "0")
    const minuteStr = minute.toString().padStart(2, "0")
    let timeValue = `${hourStr}:${minuteStr}`
    
    if (showSeconds && second !== undefined) {
      const secondStr = second.toString().padStart(2, "0")
      timeValue += `:${secondStr}`
    }
    
    if (hourFormat === "12h") {
      timeValue += ` ${period}`
    }
    
    return timeValue
  }

  const handleHourSelect = (hour: number) => {
    const newTime = formatTimeValue(hour, currentMinute, showSeconds ? currentSecond : undefined, hourFormat === "12h" ? currentPeriod : undefined)
    handleTimeChange(newTime)
  }

  const handleMinuteSelect = (minute: number) => {
    const newTime = formatTimeValue(currentHour, minute, showSeconds ? currentSecond : undefined, hourFormat === "12h" ? currentPeriod : undefined)
    handleTimeChange(newTime)
  }

  const handleSecondSelect = (second: number) => {
    const newTime = formatTimeValue(currentHour, currentMinute, second, hourFormat === "12h" ? currentPeriod : undefined)
    handleTimeChange(newTime)
  }

  const handlePeriodSelect = (period: string) => {
    const newTime = formatTimeValue(currentHour, currentMinute, showSeconds ? currentSecond : undefined, period)
    handleTimeChange(newTime)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            timePickerVariants({ variant, size }),
            "justify-start text-left font-normal",
            !selectedTime && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4 shrink-0 opacity-70" />
          {selectedTime ? selectedTime : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="start" 
        className={cn("w-auto p-3", popoverClassName)}
      >
        <div className="flex gap-2">
          <div className="flex flex-col">
            <div className="text-sm font-medium mb-2">Hour</div>
            <div className="h-48 overflow-auto scroll-smooth rounded border">
              {hours.map((hour) => (
                <div
                  key={`hour-${hour}`}
                  className={cn(
                    "px-4 py-2 cursor-pointer hover:bg-muted",
                    currentHour === hour && "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                  onClick={() => handleHourSelect(hour)}
                >
                  {hour.toString().padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-medium mb-2">Minute</div>
            <div className="h-48 overflow-auto scroll-smooth rounded border">
              {minutes.map((minute) => (
                <div
                  key={`minute-${minute}`}
                  className={cn(
                    "px-4 py-2 cursor-pointer hover:bg-muted",
                    currentMinute === minute && "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                  onClick={() => handleMinuteSelect(minute)}
                >
                  {minute.toString().padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>
          
          {showSeconds && (
            <div className="flex flex-col">
              <div className="text-sm font-medium mb-2">Second</div>
              <div className="h-48 overflow-auto scroll-smooth rounded border">
                {seconds.map((second) => (
                  <div
                    key={`second-${second}`}
                    className={cn(
                      "px-4 py-2 cursor-pointer hover:bg-muted",
                      currentSecond === second && "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                    onClick={() => handleSecondSelect(second)}
                  >
                    {second.toString().padStart(2, "0")}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {hourFormat === "12h" && (
            <div className="flex flex-col">
              <div className="text-sm font-medium mb-2">Period</div>
              <div className="rounded border">
                {periods.map((period) => (
                  <div
                    key={`period-${period}`}
                    className={cn(
                      "px-4 py-2 cursor-pointer hover:bg-muted",
                      currentPeriod === period && "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                    onClick={() => handlePeriodSelect(period)}
                  >
                    {period}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
