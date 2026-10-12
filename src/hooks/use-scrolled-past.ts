"use client";

import { useEffect, useState } from "react";

/**
 * Returns true once the page has scrolled past `threshold` px.
 *
 * PERF: the old `useScrollProgress` hook stored the exact scroll percentage
 * in React state, so every component using it (navbar, progress bar,
 * back-to-top) re-rendered on every scroll frame. This one only updates
 * state when the boolean actually flips — a handful of times per visit.
 */
export function useScrolledPast(threshold = 40) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let ticking = false;
    let current = false;

    const update = () => {
      ticking = false;
      const next = window.scrollY > threshold;
      if (next !== current) {
        current = next;
        setPast(next);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return past;
}
