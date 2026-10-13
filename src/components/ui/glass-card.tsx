import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Base card: flat white panel, hairline border, subtle hover lift.
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
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-xl transition-[translate,border-color] duration-300 ease-out",
        "hover:-translate-y-1 hover:border-ink",
        className
      )}
    >
      {children}
    </div>
  );
}
