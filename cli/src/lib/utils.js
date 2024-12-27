// cli/src/lib/utils.js

// A minimal 'cn' function to combine class names
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
