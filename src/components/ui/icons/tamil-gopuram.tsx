"use client";

import * as React from "react";

export const TamilGopuram = React.forwardRef<
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
      <path d="M4 22h16" />
      <path d="M6 22l1-6h10l1 6" />
      <path d="M8 16l1-5h6l1 5" />
      <path d="M10 11l1-4h2l1 4" />
      <path d="M12 3v4" />
      <path d="M11 3h2" />
    </svg>
  );
});

TamilGopuram.displayName = "TamilGopuram";
