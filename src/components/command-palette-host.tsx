"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// PERF: the palette (cmdk + its dependencies) is only downloaded the first
// time someone actually opens it, instead of being part of every page load.
const CommandPalette = dynamic(
  () => import("@/components/command-palette").then((m) => m.CommandPalette),
  { ssr: false }
);

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT" ||
    target.isContentEditable
  );
}

export function CommandPaletteHost() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isShortcut = e.key === "k" && (e.metaKey || e.ctrlKey);
      // BUG FIX: "/" used to be hijacked even while typing, so you couldn't
      // type a slash in the contact form or the terminal. It now only opens
      // the palette when you're not in a text field.
      const isSlash = e.key === "/" && !isTypingTarget(e.target);

      if (isShortcut || isSlash) {
        e.preventDefault();
        setLoaded(true);
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!loaded) return null;
  return <CommandPalette open={open} onOpenChange={setOpen} />;
}
