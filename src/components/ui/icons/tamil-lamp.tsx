"use client";

import * as React from "react";

export const TamilLamp = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement> & { size?: number }
>(({ size = 24, className, strokeWidth = 2, ...props }, ref) => {
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 2v4" />
      <path d="M8 9c0-2.2 1.8-4 4-4s4 1.8 4 4c0 3-4 6-4 6s-4-3-4-6z" fill="currentColor" />
      <path d="M6 15h12v2H6z" />
      <path d="M12 17v5" />
      <path d="M9 22h6" />
    </svg>
  );
});

TamilLamp.displayName = "TamilLamp";
