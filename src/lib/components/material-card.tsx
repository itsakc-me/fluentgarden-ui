
import * as React from "react"
import { cn } from "../utils"

interface MaterialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: "1" | "2" | "3" | "4" | "5"
  highlighted?: boolean
}

const MaterialCard = React.forwardRef<HTMLDivElement, MaterialCardProps>(
  ({ className, elevation = "2", highlighted = false, ...props }, ref) => {
    const elevationClasses = {
      "1": "shadow-elevation-1",
      "2": "shadow-elevation-2",
      "3": "shadow-elevation-3", 
      "4": "shadow-elevation-4",
      "5": "shadow-elevation-5"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg bg-card text-card-foreground transition-all duration-200",
          elevationClasses[elevation],
          highlighted && "border-l-4 border-l-primary",
          className
        )}
        {...props}
      />
    )
  }
)
MaterialCard.displayName = "MaterialCard"

const MaterialCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col p-6", className)}
    {...props}
  />
))
MaterialCardHeader.displayName = "MaterialCardHeader"

const MaterialCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold tracking-tight leading-none text-foreground", className)}
    {...props}
  />
))
MaterialCardTitle.displayName = "MaterialCardTitle"

const MaterialCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground mt-2", className)}
    {...props}
  />
))
MaterialCardDescription.displayName = "MaterialCardDescription"

const MaterialCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
MaterialCardContent.displayName = "MaterialCardContent"

const MaterialCardMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("overflow-hidden rounded-t-lg", className)}
    {...props}
  />
))
MaterialCardMedia.displayName = "MaterialCardMedia"

const MaterialCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
MaterialCardFooter.displayName = "MaterialCardFooter"

export {
  MaterialCard,
  MaterialCardHeader,
  MaterialCardFooter,
  MaterialCardTitle,
  MaterialCardDescription,
  MaterialCardContent,
  MaterialCardMedia
}
