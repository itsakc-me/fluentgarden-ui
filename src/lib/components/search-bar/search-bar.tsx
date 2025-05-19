
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Search, X } from "lucide-react"

import { cn } from "../../lib"
import { Button } from "../button"
import { Input } from "../input"

const searchBarVariants = cva(
  "flex items-center gap-2 bg-background transition-all",
  {
    variants: {
      variant: {
        default: "border rounded-md shadow-sm",
        minimal: "border-none",
        pill: "border rounded-full shadow-sm",
        elevated: "rounded-md shadow-elevation-2",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-8 px-2 text-sm",
        lg: "h-12 px-4",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: true,
    },
  }
)

// Fix: Separate the extending interfaces to avoid conflicts with overlapping properties
interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  onSearch?: (value: string) => void
  onClear?: () => void
  showClearButton?: boolean
  iconPosition?: "left" | "right"
  placeholder?: string
  variant?: VariantProps<typeof searchBarVariants>["variant"]
  size?: VariantProps<typeof searchBarVariants>["size"]
  fullWidth?: VariantProps<typeof searchBarVariants>["fullWidth"]
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ 
    className,
    variant, 
    size, 
    fullWidth, 
    onSearch, 
    onClear,
    showClearButton = true,
    iconPosition = "left",
    placeholder = "Search...",
    value,
    onChange,
    ...props 
  }, ref) => {
    const [inputValue, setInputValue] = React.useState(value || "")

    React.useEffect(() => {
      if (value !== undefined) {
        setInputValue(value)
      }
    }, [value])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      onChange?.(e)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch?.(inputValue as string)
      }
    }

    const handleClear = () => {
      setInputValue("")
      onClear?.()
    }

    const searchIcon = <Search className="h-4 w-4 text-muted-foreground shrink-0" />
    const clearButton = showClearButton && inputValue ? (
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={handleClear}
        className="h-6 w-6 p-0 rounded-full"
      >
        <X className="h-4 w-4 text-muted-foreground" />
        <span className="sr-only">Clear search</span>
      </Button>
    ) : null

    return (
      <div
        className={cn(
          searchBarVariants({
            variant,
            size,
            fullWidth,
          }),
          className
        )}
      >
        {iconPosition === "left" && searchIcon}
        <Input
          ref={ref}
          type="search"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
            iconPosition === "left" ? "pl-0" : "pl-3"
          )}
          placeholder={placeholder}
          {...props}
        />
        {clearButton}
        {iconPosition === "right" && searchIcon}
      </div>
    )
  }
)
SearchBar.displayName = "SearchBar"

export { SearchBar }
