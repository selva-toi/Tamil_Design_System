import * as React from "react"

import { cn } from "../../lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // min-w-0 matches Input — prevents the textarea's intrinsic minimum content
        // width from pushing parent flex/grid containers wide on small viewports.
        "font-tamil flex field-sizing-content min-h-24 w-full min-w-0 max-w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-xs transition-all outline-none placeholder:text-muted-foreground/60 hover:border-foreground/20 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
