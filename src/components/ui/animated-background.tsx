/**
 * Rendered once, directly in the root layout, sitting behind everything
 * at z-0. Kept outside of any section that applies `transform`/`filter`
 * so it never becomes an accidental containing block for fixed UI.
 *
 * PERF: this is now a single static gradient layer. It used to animate
 * `background-position` (repainting the full screen every frame) and stack
 * an SVG-noise layer with `mix-blend-mode: overlay` on top of it.
 */
export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="animated-gradient-bg absolute inset-0" />
    </div>
  );
}
