"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const fabVariants = cva(
  "inline-flex items-center justify-center shrink-0 rounded-md font-semibold transition-all duration-150 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 shadow-md hover:shadow-lg [&>svg]:pointer-events-none [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-brand text-brand-foreground hover:bg-brand/95",
        surface: "bg-card border border-border text-foreground hover:bg-muted/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      },
      size: {
        small: "size-10 rounded-md [&>svg]:size-5",
        default: "size-14 rounded-md [&>svg]:size-6",
        large: "size-24 rounded-md [&>svg]:size-9",
        extended: "h-14 w-auto px-5 gap-2.5 rounded-md text-sm [&>svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface FabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants> {
  icon?: React.ReactNode;
}

const FAB = React.forwardRef<HTMLButtonElement, FabProps>(
  ({ className, variant, size, icon, children, "aria-label": ariaLabel, ...props }, ref) => {
    const isIconOnly = size !== "extended";
    return (
      <button
        ref={ref}
        className={cn(fabVariants({ variant, size, className }))}
        aria-label={ariaLabel || (isIconOnly ? undefined : undefined)}
        {...props}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {size === "extended" && children && (
          <span className="truncate leading-none font-bold py-0.5">{children}</span>
        )}
      </button>
    );
  }
);

FAB.displayName = "FAB";

export { FAB, fabVariants };
