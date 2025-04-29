
import * as React from "react"
import { cn } from "../utils"

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-2", className)}
        {...props}
      />
    )
  }
)
Timeline.displayName = "Timeline"

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, active = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-3",
          className
        )}
        {...props}
      />
    )
  }
)
TimelineItem.displayName = "TimelineItem"

interface TimelineIconProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
}

const TimelineIcon = React.forwardRef<HTMLDivElement, TimelineIconProps>(
  ({ className, active = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background",
          active && "border-primary bg-primary/10",
          className
        )}
        {...props}
      />
    )
  }
)
TimelineIcon.displayName = "TimelineIcon"

interface TimelineConnectorProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
}

const TimelineConnector = React.forwardRef<HTMLDivElement, TimelineConnectorProps>(
  ({ className, active = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute top-10 left-5 h-full w-px -translate-x-1/2 bg-border",
          active && "bg-primary",
          className
        )}
        {...props}
      />
    )
  }
)
TimelineConnector.displayName = "TimelineConnector"

interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-1 pt-1.5", className)}
        {...props}
      />
    )
  }
)
TimelineContent.displayName = "TimelineContent"

interface TimelineTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const TimelineTitle = React.forwardRef<HTMLHeadingElement, TimelineTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn("text-base font-medium leading-none", className)}
        {...props}
      />
    )
  }
)
TimelineTitle.displayName = "TimelineTitle"

interface TimelineDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const TimelineDescription = React.forwardRef<HTMLParagraphElement, TimelineDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    )
  }
)
TimelineDescription.displayName = "TimelineDescription"

export {
  Timeline,
  TimelineItem,
  TimelineIcon,
  TimelineConnector,
  TimelineContent,
  TimelineTitle,
  TimelineDescription
}
