import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"


interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value: number;
  inner?: string;
  outer?: string;
  height?: string;
}


const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, inner, outer, height, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    style={{
      backgroundColor: outer == 'primary' ?
        'var(--progressPrim-Outer)' : 'var(--progressSec-outer)'
    }}
    className={cn(
      "relative w-full overflow-hidden rounded-full",
      height,
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={`h-full w-full flex-1 transition-all`}
      style={{ transform: `translateX(-${100 - (value || 0)}%)`,
       background: inner == 'primary' ? 'var(--progress-primary)' : 'var(--progress-secondary)'}}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
