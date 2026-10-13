import { cn } from "@/utils/cn";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[0.7rem] tracking-wide text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
