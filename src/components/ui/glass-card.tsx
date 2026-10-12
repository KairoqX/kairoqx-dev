import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  gradientBorder?: boolean;
}

/**
 * Base glass card: translucent background, hover lift, optional highlight
 * border.
 *
 * PERF: this used to be a Framer Motion component with two springs per card
 * plus a 3D-tilt handler (~30 cards on the page), and it sat on top of a
 * backdrop-filter blur. It's now a plain <div> with a CSS-only hover — no
 * JavaScript, no re-renders, and it can stay a Server Component. The hover
 * lift animates the `translate` property, which the GPU handles.
 */
export function GlassCard({
  children,
  className,
  gradientBorder = true,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl transition-[translate,border-color,background-color] duration-300 ease-out",
        "hover:-translate-y-1.5 hover:border-secondary/40 hover:bg-white/[.07]",
        gradientBorder && "gradient-border",
        className
      )}
    >
      {children}
    </div>
  );
}
