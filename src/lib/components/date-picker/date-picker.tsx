
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib"
import { Button } from "../button"
import { Calendar } from "../calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../popover"

const datePickerVariants = cva(
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

export interface DatePickerProps extends VariantProps<typeof datePickerVariants> {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  calendarClassName?: string
  popoverClassName?: string
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Select date",
  disabled = false,
  variant,
  size,
  className,
  calendarClassName,
  popoverClassName,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date)

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    onDateChange?.(date)
  }

  React.useEffect(() => {
    setSelectedDate(date)
  }, [date])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            datePickerVariants({ variant, size }),
            "justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0 opacity-70" />
          {selectedDate ? format(selectedDate, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="start" 
        className={cn("w-auto p-0", popoverClassName)}
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          initialFocus
          className={cn("p-3 pointer-events-auto", calendarClassName)}
        />
      </PopoverContent>
    </Popover>
  )
}
