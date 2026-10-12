"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop-only cursor glow + dot follower.
 *
 * Mounted once, directly in the root layout (no transformed/blurred
 * ancestor), so `position: fixed` stays relative to the viewport.
 *
 * PERF changes:
 *  - The animation loop only runs while the glow is still catching up to
 *    the cursor, then stops. Before, a requestAnimationFrame loop ran
 *    forever (60x/sec) even when the mouse was completely still.
 *  - Removed `mix-blend-mode: screen` and the box-shadow glow on the dot.
 *    A blend mode on a fixed, moving element forces the browser to
 *    re-composite everything underneath it every frame.
 *  - Skipped entirely on touch devices and when reduced motion is on.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!canHover || reduced) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let rafId = 0;

    const loop = () => {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      }
      // Keep looping only while there's visible distance left to cover.
      if (Math.abs(mouseX - glowX) > 0.5 || Math.abs(mouseY - glowY) > 0.5) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = 0;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      if (!rafId) rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[420px] w-[420px] rounded-full opacity-70 will-change-transform md:block"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 16%, transparent), transparent 70%)",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2.5 w-2.5 rounded-full bg-primary will-change-transform md:block"
      />
    </>
  );
}
