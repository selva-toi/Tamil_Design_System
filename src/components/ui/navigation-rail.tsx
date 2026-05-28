"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

interface NavigationRailProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const NavigationRail = React.forwardRef<HTMLDivElement, NavigationRailProps>(
  ({ className, header, footer, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-20 h-full flex flex-col items-center justify-between py-6 bg-card border-r border-border select-none shrink-0",
          className
        )}
        {...props}
      >
        {header && <div className="flex flex-col items-center w-full">{header}</div>}
        <nav aria-label="Main navigation" className="flex-1 flex flex-col items-center justify-start gap-6 w-full px-1.5 pt-4">
          {children}
        </nav>
        {footer && <div className="flex flex-col items-center w-full">{footer}</div>}
      </div>
    );
  }
);
NavigationRail.displayName = "NavigationRail";

interface NavigationRailItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: React.ReactNode;
  hideLabel?: boolean;
}

const NavigationRailItem = React.forwardRef<HTMLButtonElement, NavigationRailItemProps>(
  ({ className, icon, label, active = false, badge, hideLabel = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        title={hideLabel ? label : undefined}
        className={cn(
          "group relative flex flex-col items-center justify-center w-full rounded-md hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all outline-none cursor-pointer",
          active ? "text-brand" : "text-muted-foreground hover:text-foreground",
          hideLabel ? "py-3" : "py-1.5",
          className
        )}
        aria-current={active ? "page" : undefined}
        aria-label={hideLabel ? `${label}${badge ? `, ${badge}` : ""}` : undefined}
        {...props}
      >
        {/* Pill target container */}
        <div className="relative flex items-center justify-center h-8 w-14 rounded-full shrink-0">
          {/* Active indicator backdrop (M3 horizontal stretch animation) */}
          <div
            className={cn(
              "absolute inset-0 rounded-full bg-brand/10 border border-brand/20 transition-all duration-200 cubic-bezier(0.2,0,0,1) scale-x-[0.3] scale-y-[0.8] opacity-0 pointer-events-none",
              active && "scale-x-100 scale-y-100 opacity-100"
            )}
          />
          {/* Inactive hover backdrop */}
          {!active && (
            <div className="absolute inset-0 rounded-full bg-muted/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none" />
          )}
          {/* Icon (above backdrops) */}
          <span className="relative z-10 flex items-center justify-center [&>svg]:size-5">
            {icon}
          </span>
          {badge && (
            <span className="absolute -top-0.5 -right-0.5 z-20 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive text-[8px] font-bold text-white px-1 shadow-sm select-none">
              {badge}
            </span>
          )}
        </div>
        {/* Label */}
        {!hideLabel && (
          <span className="mt-1.5 max-w-[4rem] break-words text-center text-[10px] font-semibold leading-tight tracking-normal line-clamp-2">
            {label}
          </span>
        )}
      </button>
    );
  }
);
NavigationRailItem.displayName = "NavigationRailItem";

export { NavigationRail, NavigationRailItem };
