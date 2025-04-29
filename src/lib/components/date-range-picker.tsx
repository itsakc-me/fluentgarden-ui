
import * as React from "react"
import { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

const dateRangePickerVariants = cva(
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

export interface DateRangePickerProps extends VariantProps<typeof dateRangePickerVariants> {
  dateRange?: DateRange
  onDateRangeChange?: (dateRange: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  calendarClassName?: string
  popoverClassName?: string
}

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  placeholder = "Select date range",
  disabled = false,
  variant,
  size,
  className,
  calendarClassName,
  popoverClassName,
}: DateRangePickerProps) {
  const [selectedDateRange, setSelectedDateRange] = React.useState<DateRange | undefined>(dateRange)

  const handleSelect = (range: DateRange | undefined) => {
    setSelectedDateRange(range)
    onDateRangeChange?.(range)
  }

  React.useEffect(() => {
    setSelectedDateRange(dateRange)
  }, [dateRange])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            dateRangePickerVariants({ variant, size }),
            "justify-start text-left font-normal",
            !selectedDateRange && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0 opacity-70" />
          {selectedDateRange?.from ? (
            selectedDateRange.to ? (
              <>
                {format(selectedDateRange.from, "LLL dd, y")} -{" "}
                {format(selectedDateRange.to, "LLL dd, y")}
              </>
            ) : (
              format(selectedDateRange.from, "LLL dd, y")
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="start" 
        className={cn("w-auto p-0", popoverClassName)}
      >
        <Calendar
          mode="range"
          selected={selectedDateRange}
          onSelect={handleSelect}
          numberOfMonths={2}
          initialFocus
          className={cn("p-3 pointer-events-auto", calendarClassName)}
        />
      </PopoverContent>
    </Popover>
  )
}
