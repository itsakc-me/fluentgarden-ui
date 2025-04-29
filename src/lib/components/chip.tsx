
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "../utils"

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary hover:bg-primary/20",
        secondary: "bg-secondary/10 text-secondary-foreground hover:bg-secondary/20",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
        success: "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400",
        warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-400",
        info: "bg-blue-100 text-blue-700 dark:bg-blue-700/20 dark:text-blue-400",
      },
      size: {
        default: "h-8 text-xs",
        sm: "h-6 text-xs",
        lg: "h-10 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  onDelete?: () => void
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant, size, onDelete, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(chipVariants({ variant, size }), className)}
        {...props}
      >
        <span className="truncate">{children}</span>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="ml-1 -mr-1 rounded-full p-0.5 hover:bg-background/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </button>
        )}
      </div>
    )
  }
)
Chip.displayName = "Chip"

export { Chip, chipVariants }
