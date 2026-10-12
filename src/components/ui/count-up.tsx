"use client";

import { useEffect, useRef, useState } from "react";
import { observeOnce } from "@/lib/in-view";

/** Counts from 0 to `target` the first time it scrolls into view. */
export function CountUp({
  target,
  className,
}: {
  target: number;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const stopObserving = observeOnce(
      el,
      () => {
        const start = performance.now();
        const duration = 1000;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
          setValue(Math.round(target * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6, rootMargin: "0px" }
    );

    return () => {
      stopObserving();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <p ref={ref} className={className}>
      {value}
    </p>
  );
}
