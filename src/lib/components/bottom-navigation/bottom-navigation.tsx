
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib"

const bottomNavigationVariants = cva(
  "fixed bottom-0 left-0 right-0 flex w-full items-center justify-around bg-background border-t border-border z-50 px-1 py-2",
  {
    variants: {
      variant: {
        default: "shadow-sm",
        raised: "shadow-md rounded-t-xl",
        floating: "mx-4 mb-4 rounded-full shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BottomNavigationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bottomNavigationVariants> {}

const BottomNavigation = React.forwardRef<HTMLDivElement, BottomNavigationProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(bottomNavigationVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
BottomNavigation.displayName = "BottomNavigation"

interface BottomNavigationItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  label?: string
  isActive?: boolean
  badge?: React.ReactNode | number | string
}

const BottomNavigationItem = React.forwardRef<HTMLButtonElement, BottomNavigationItemProps>(
  ({ icon, label, isActive = false, badge, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group flex flex-col items-center justify-center gap-1 p-1 min-w-[64px] transition-all",
          isActive ? "text-primary" : "text-muted-foreground",
          className
        )}
        {...props}
      >
        <div className="relative">
          <div className="flex items-center justify-center">
            {icon}
          </div>
          {badge && (
            <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground px-1">
              {badge}
            </span>
          )}
        </div>
        {label && (
          <span className={cn(
            "text-xs transition-all", 
            isActive ? "opacity-100" : "opacity-80"
          )}>
            {label}
          </span>
        )}
      </button>
    )
  }
)
BottomNavigationItem.displayName = "BottomNavigationItem"

export { BottomNavigation, BottomNavigationItem }
