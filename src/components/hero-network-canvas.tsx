"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
  near: boolean;
}

const BUCKETS = 6; // line-alpha buckets — one stroke() per bucket, not per line
const MAX_LINE_ALPHA = 0.5;

/**
 * Canvas "neural network" visual for the hero: nodes drift, connect with
 * lines when close together, and react gently to the mouse.
 *
 * PERF changes vs. the original:
 *  - Lines are batched into a few alpha buckets and stroked once per bucket
 *    (was one beginPath/stroke per line — hundreds per frame).
 *  - Squared-distance checks instead of Math.hypot in the O(n²) loop.
 *  - Device-pixel-ratio capped at 1.5 (a 3x phone screen was drawing 9x the
 *    pixels for faint lines nobody can see the difference on).
 *  - Fewer nodes, even fewer on small / low-core devices.
 *  - Frame-rate capped at ~30fps with time-based motion, so speed is the
 *    same but the work is halved.
 *  - Only runs while the hero is on screen; ResizeObserver replaces a leaked
 *    window "resize" listener; mouse tracking listens on the hero section.
 */
export function HeroNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const host = canvas.parentElement ?? canvas;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const lowEnd = (navigator.hardwareConcurrency ?? 8) <= 4;
    const small = window.innerWidth < 768;
    const nodeCount = small ? 16 : lowEnd ? 22 : 32;

    const linkDist = 130 * dpr;
    const linkDist2 = linkDist * linkDist;
    const reactRadius = 160 * dpr;
    const reactRadius2 = reactRadius * reactRadius;
    const nearRadius2 = (200 * dpr) * (200 * dpr);
    const maxSpeed = 0.9 * dpr;
    const FRAME_MS = 1000 / 30;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let rafId = 0;
    let running = false;
    let lastTime = 0;
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      if (!canvas) return;
      width = canvas.width = Math.max(1, Math.round(canvas.offsetWidth * dpr));
      height = canvas.height = Math.max(
        1,
        Math.round(canvas.offsetHeight * dpr)
      );
    }

    function init() {
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35 * dpr,
        vy: (Math.random() - 0.5) * 0.35 * dpr,
        r: (Math.random() * 1.6 + 0.8) * dpr,
        pulse: Math.random() * Math.PI * 2,
        near: false,
      }));
    }

    function draw(dt: number) {
      if (!ctx) return;
      // dt is normalised to "frames at 60fps" so motion speed is
      // independent of the actual frame rate.
      const k = dt / 16.67;
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx * k;
        n.y += n.vy * k;
        n.pulse += 0.02 * k;

        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d2 = dx * dx + dy * dy;
        n.near = d2 < nearRadius2;

        if (d2 < reactRadius2) {
          const force = (1 - Math.sqrt(d2) / reactRadius) * 0.02;
          n.vx += dx * force * 0.02 * k;
          n.vy += dy * force * 0.02 * k;
        }

        const speed2 = n.vx * n.vx + n.vy * n.vy;
        if (speed2 > maxSpeed * maxSpeed) {
          const speed = Math.sqrt(speed2);
          n.vx = (n.vx / speed) * maxSpeed;
          n.vy = (n.vy / speed) * maxSpeed;
        }

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const glow = 0.55 + Math.sin(n.pulse) * 0.25;
        ctx.fillStyle = `rgba(255,255,255,${glow.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Connections — collected into alpha buckets, stroked once each.
      const paths = Array.from({ length: BUCKETS }, () => new Path2D());
      const used = new Array<boolean>(BUCKETS).fill(false);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 >= linkDist2) continue;

          const closeness = 1 - Math.sqrt(d2) / linkDist;
          const alpha = closeness * (a.near ? MAX_LINE_ALPHA : 0.18);
          const bucket = Math.min(
            BUCKETS - 1,
            Math.floor((alpha / MAX_LINE_ALPHA) * BUCKETS)
          );
          paths[bucket].moveTo(a.x, a.y);
          paths[bucket].lineTo(b.x, b.y);
          used[bucket] = true;
        }
      }

      ctx.lineWidth = dpr;
      for (let b = 0; b < BUCKETS; b++) {
        if (!used[b]) continue;
        const alpha = ((b + 0.5) / BUCKETS) * MAX_LINE_ALPHA;
        ctx.strokeStyle = `rgba(210,210,210,${alpha.toFixed(3)})`;
        ctx.stroke(paths[b]);
      }
    }

    function frame(now: number) {
      if (!running) return;
      rafId = requestAnimationFrame(frame);
      const elapsed = now - lastTime;
      if (elapsed < FRAME_MS) return; // cap at ~30fps
      lastTime = now;
      draw(Math.min(elapsed, 100)); // clamp so a tab-switch doesn't teleport nodes
    }

    function start() {
      if (running) return;
      running = true;
      lastTime = performance.now();
      rafId = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (e.clientY - rect.top) * dpr;
    }
    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    init();

    if (prefersReduced) {
      // Reduced motion: draw one static frame, no animation loop at all.
      draw(16.67);
      return;
    }

    // Only animate while the hero is actually visible on screen.
    const visibility = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    visibility.observe(canvas);

    let resizePending = false;
    const resizeObserver = new ResizeObserver(() => {
      if (resizePending) return;
      resizePending = true;
      requestAnimationFrame(() => {
        resizePending = false;
        resize();
        init();
      });
    });
    resizeObserver.observe(canvas);

    host.addEventListener("mousemove", onMouseMove, { passive: true });
    host.addEventListener("mouseleave", onMouseLeave);

    return () => {
      stop();
      visibility.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener("mousemove", onMouseMove);
      host.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-70"
      aria-hidden="true"
    />
  );
}
