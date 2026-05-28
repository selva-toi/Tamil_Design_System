import { ImageIcon } from "lucide-react";

import { cn } from "../../lib/utils";

interface PlaceholderImageProps {
  width: number;
  height: number;
  label?: string;
  labelTa?: string;
  className?: string;
  rounded?: boolean;
}

export function PlaceholderImage({
  width,
  height,
  label = "Image placeholder",
  labelTa,
  className,
  rounded = false,
}: PlaceholderImageProps) {
  const aspectRatio = (height / width) * 100;

  return (
    <div
      className={cn(
        "preview-frame relative overflow-hidden border border-border bg-muted/25",
        rounded && "rounded-md",
        className,
      )}
      style={{ paddingBottom: `${aspectRatio}%` }}
      role="img"
      aria-label={label}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <div className="grid size-12 place-items-center rounded-md border border-border bg-card text-muted-foreground shadow-xs">
          <ImageIcon className="size-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          {labelTa ? (
            <p className="mt-1 text-xs text-muted-foreground font-tamil">{labelTa}</p>
          ) : null}
          <p className="mt-1 text-[11px] text-muted-foreground/60">
            {width} x {height}
          </p>
        </div>
      </div>
    </div>
  );
}
