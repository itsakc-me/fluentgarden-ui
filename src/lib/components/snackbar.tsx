
import * as React from "react"
import { Toaster as Sonner } from "sonner"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "../utils"
import { Button } from "./button"

const snackbarVariants = cva(
  "group flex w-full items-center justify-between gap-2 overflow-hidden rounded-md border p-4 pr-8 shadow-md transition-all",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "bg-destructive text-destructive-foreground border-destructive",
        success: "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400 border-green-200 dark:border-green-700/30",
        warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700/30",
        info: "bg-blue-100 text-blue-700 dark:bg-blue-700/20 dark:text-blue-400 border-blue-200 dark:border-blue-700/30",
      },
      position: {
        "top-left": "top-0 left-0",
        "top-center": "top-0 left-1/2 -translate-x-1/2",
        "top-right": "top-0 right-0",
        "bottom-left": "bottom-0 left-0",
        "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
        "bottom-right": "bottom-0 right-0",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "bottom-center",
    },
  }
)

interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement>, 
  VariantProps<typeof snackbarVariants> {
  open?: boolean
  onClose?: () => void
  autoClose?: number | boolean
  action?: React.ReactNode
}

const Snackbar = ({
  children,
  className,
  variant,
  position,
  open = false,
  onClose,
  autoClose = 5000,
  action,
  ...props
}: SnackbarProps) => {
  const [isVisible, setIsVisible] = React.useState(open)
  
  React.useEffect(() => {
    setIsVisible(open)
    
    if (open && autoClose !== false) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, typeof autoClose === "number" ? autoClose : 5000)
      
      return () => clearTimeout(timer)
    }
  }, [open, autoClose, onClose])
  
  if (!isVisible) return null
  
  return (
    <div
      className={cn(
        snackbarVariants({ variant, position }),
        "animate-slide-in",
        className
      )}
      {...props}
    >
      <div className="flex-1">{children}</div>
      <div className="flex items-center gap-2">
        {action}
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={() => {
              setIsVisible(false)
              onClose()
            }}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>
    </div>
  )
}

const SnackbarSonner = (props: React.ComponentPropsWithoutRef<typeof Sonner>) => {
  return (
    <Sonner
      className={cn(
        "toaster group",
      )}
      toastOptions={{
        classNames: {
          toast: "group toast group flex w-full items-center justify-between gap-2 rounded-md border p-4 shadow-md",
          description: "group-[.toast]:text-sm",
          actionButton: "group-[.toast]:bg-primary",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}
SnackbarSonner.displayName = "SnackbarSonner"

export { Snackbar, SnackbarSonner, type SnackbarProps }
