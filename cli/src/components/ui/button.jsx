// cli/src/components/ui/button.jsx
import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils" // Helper to combine classes (see ShadCN docs)

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium \
   transition-colors focus-visible:outline-none focus-visible:ring-2 \
   focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 \
   disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        // etc. define more variants if needed
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export const Button = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
