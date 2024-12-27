// cli/src/components/ui/input.jsx
import * as React from "react"
// If you have a utility for combining class names (like ShadCN’s "cn" helper),
// import it here. Otherwise, you can write a simple function to join classes:
function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

/**
 * Props for the Input component extend the standard HTML input attributes.
 */
export const Input = React.forwardRef(({
  className,
  type = "text",
  ...props
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        // Base styles (Tailwind classes):
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        // Merges any additional classes passed via className
        className
      )}
      {...props}
    />
  )
})

Input.displayName = "Input"
