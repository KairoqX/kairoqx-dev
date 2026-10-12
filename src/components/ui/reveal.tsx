"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { observeOnce } from "@/lib/in-view";
import { cn } from "@/utils/cn";

type RevealDirection = "up" | "left" | "right" | "scale" | "none";

/**
 * Marks the element `data-visible="true"` the first time it scrolls into
 * view. The actual animation lives in globals.css (.reveal / .reveal-item)
 * and only touches opacity + transform, so it runs on the GPU and never
 * triggers layout.
 *
 * Uses a data attribute rather than a class on purpose: React never
 * overwrites attributes it didn't render, so a re-render can't accidentally
 * "un-reveal" the element.
 */
function useRevealOnView<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeOnce(el, () => {
      el.dataset.visible = "true";
    });
  }, []);

  return ref;
}

interface RevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  /** Delay in seconds before the animation starts. */
  delay?: number;
  className?: string;
}

/** Scroll-reveal used throughout every section. */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: RevealProps) {
  const ref = useRevealOnView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal={direction}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

/** Wraps a group of children and staggers their entrance animation. */
export function RevealStagger({
  children,
  className,
  staggerDelay = 0.09,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRevealOnView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn("reveal-stagger", className)}
      style={{ "--stagger": `${staggerDelay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function RevealStaggerItem({
  children,
  direction = "up",
  className,
}: {
  children: ReactNode;
  direction?: RevealDirection;
  className?: string;
}) {
  return (
    <div data-reveal={direction} className={cn("reveal-item", className)}>
      {children}
    </div>
  );
}
