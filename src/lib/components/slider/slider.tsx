
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "../../lib"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className={cn(
        "absolute h-full bg-primary",
        className?.includes("gradient-slider") && "bg-gradient-to-r from-blue-400 to-purple-500"
      )} />
    </SliderPrimitive.Track>
    {props.defaultValue && Array.isArray(props.defaultValue) && props.defaultValue.map((_, index) => (
      <SliderPrimitive.Thumb 
        key={index} 
        className={cn(
          "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          className?.includes("gradient-slider") && "bg-gradient-to-r from-blue-400 to-purple-500 border-0"
        )}
      />
    ))}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
