"use client";

import { roles } from "@/lib/site-config";
import { useTypingEffect } from "@/hooks/use-typing-effect";

/**
 * The only part of the hero that needs JavaScript state. Isolated so the
 * rest of the hero can be a Server Component, and so each keystroke only
 * re-renders this one <span>.
 */
export function TypedText() {
  const typedText = useTypingEffect(roles);
  return (
    <>
      <span>{typedText}</span>
      <span className="typing-cursor h-[1em] align-middle" />
    </>
  );
}
