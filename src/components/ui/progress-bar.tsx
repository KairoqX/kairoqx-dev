"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { observeOnce } from "@/lib/in-view";
import { cn } from "@/utils/cn";

/**
 * Skill / language bar. The fill animates with `transform: scaleX` (see
 * .bar-fill in globals.css) instead of `width`, so filling the bar never
 * triggers layout — previously 12+ bars each re-laid-out the page on every
 * frame while animating.
 */
export function ProgressBar({
  label,
  value,
  color = "brand",
  colorHex,
}: {
  label: string;
  value: number;
  color?: "brand" | "custom";
  colorHex?: string;
}) {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    return observeOnce(
      el,
      () => {
        el.dataset.visible = "true";
      },
      { threshold: 0.4, rootMargin: "0px" }
    );
  }, []);

  return (
    <div>
      <div className="mb-2 flex justify-between font-mono text-xs text-muted">
        <span className="text-white/80">{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[.06]">
        <div
          ref={fillRef}
          className={cn(
            "bar-fill h-full w-full rounded-full",
            color === "brand" && "bg-gradient-to-r from-secondary to-primary"
          )}
          style={
            {
              "--fill": value / 100,
              ...(color === "custom" ? { background: colorHex } : {}),
            } as CSSProperties
          }
        />
      </div>
    </div>
  );
}
