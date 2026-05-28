"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-full text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-8 px-3 gap-1.5 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "border-border bg-background text-foreground hover:bg-muted/50 data-[selected=true]:bg-brand/10 data-[selected=true]:border-brand/40 data-[selected=true]:text-brand",
        filter:
          "border-border bg-background text-foreground hover:bg-muted/50 data-[selected=true]:bg-brand data-[selected=true]:text-brand-foreground data-[selected=true]:border-brand",
        action:
          "border-border bg-background text-foreground hover:bg-muted/50 hover:shadow-xs active:scale-95",
        input:
          "border-border bg-muted/40 text-foreground hover:bg-muted/80 pr-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  onClose?: () => void;
  icon?: React.ReactNode;
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant, selected = false, onSelectedChange, onClose, icon, children, ...props }, ref) => {
    const isInteractive = variant !== "input" || !!onClose;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (props.onClick) props.onClick(e);
      if (onSelectedChange) {
        onSelectedChange(!selected);
      }
    };

    return (
      <div
        ref={ref}
        data-selected={selected}
        onClick={handleClick}
        className={cn(chipVariants({ variant, className }))}
        role={onSelectedChange ? "checkbox" : isInteractive ? "button" : undefined}
        aria-checked={onSelectedChange ? selected : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
        {...props}
      >
        {icon && <span className="flex shrink-0 items-center justify-center [&>svg]:size-3.5">{icon}</span>}
        <span className="truncate leading-none py-0.5">{children}</span>
        {onClose && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onClose) onClose();
            }}
            className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-foreground/10 text-muted-foreground hover:text-foreground transition-colors outline-none shrink-0"
            aria-label="Remove chip"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  }
);

Chip.displayName = "Chip";

export { Chip, chipVariants };
