/**
 * Boot-screen splash. Pure CSS (see .page-loader in globals.css): it shows
 * for a moment, fades out, and stops blocking clicks — with no React state,
 * no timers, and no Framer Motion.
 *
 * PERF: this used to wait 500ms in JS, then run a 600ms Framer exit
 * animation with an infinite spinner, delaying everything underneath it.
 * It now clears in under a second and doesn't depend on hydration at all.
 */
export function PageLoader() {
  return (
    <div
      aria-hidden="true"
      className="page-loader fixed inset-0 z-[200] flex items-center justify-center bg-bg"
    >
      <div className="text-center">
        <div
          className="page-loader-spinner mx-auto mb-4 h-14 w-14 rounded-full border-[3px] border-line"
          style={{
            borderTopColor: "var(--color-ink)",
          }}
        />
        <p className="font-mono text-xs tracking-widest text-muted">
          booting_portfolio.exe
        </p>
      </div>
    </div>
  );
}
