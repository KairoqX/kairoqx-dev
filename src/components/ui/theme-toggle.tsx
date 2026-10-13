"use client";

import { Moon, Sun } from "lucide-react";

/**
 * Light / dark toggle.
 *
 * The theme is a `data-theme="dark"` attribute on <html> that swaps the CSS
 * variables in globals.css. The choice is saved in localStorage and applied
 * by a tiny inline script in layout.tsx before first paint, so there's no
 * flash. Light is the default.
 *
 * Both icons are rendered and CSS (see `.theme-icon-*` in globals.css) shows
 * the right one, so there's no hydration mismatch and no state needed.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    if (next === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage can be blocked (private mode) — the toggle still works */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light / dark theme"
      title="Toggle theme"
      className="glass flex h-9 w-9 items-center justify-center rounded-md text-ink transition-colors hover:border-ink"
    >
      <Moon size={17} className="theme-icon-moon" />
      <Sun size={17} className="theme-icon-sun" />
    </button>
  );
}
