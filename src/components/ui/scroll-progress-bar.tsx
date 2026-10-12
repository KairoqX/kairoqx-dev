"use client";

import { motion, useScroll } from "framer-motion";

/**
 * PERF: driven by a Framer Motion MotionValue + `scaleX` (a GPU transform).
 * The previous version put the scroll percentage in React state and animated
 * `width`, which re-rendered React and re-ran layout on every scroll frame.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[100] h-[3px] w-full origin-left bg-gradient-to-r from-secondary to-primary"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}
