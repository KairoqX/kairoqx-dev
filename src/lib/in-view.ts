/**
 * in-view.ts
 * -----------------------------------------------------------------------
 * One shared IntersectionObserver per option-set, instead of one observer
 * (and one Framer Motion wrapper) per animated element. `observeOnce` fires
 * the callback the first time the element scrolls into view, then stops
 * observing it — so nothing keeps running after an element has revealed.
 * -----------------------------------------------------------------------
 */

type Callback = () => void;

interface InViewOptions {
  /** Fraction of the element that must be visible (0-1). */
  threshold?: number;
  rootMargin?: string;
}

interface SharedObserver {
  io: IntersectionObserver;
  callbacks: Map<Element, Callback>;
}

const observers = new Map<string, SharedObserver>();

export function observeOnce(
  el: Element,
  callback: Callback,
  { threshold = 0.15, rootMargin = "0px 0px -80px 0px" }: InViewOptions = {}
): () => void {
  // Very old browsers: just show the content immediately.
  if (typeof IntersectionObserver === "undefined") {
    callback();
    return () => {};
  }

  const key = `${threshold}|${rootMargin}`;
  let shared = observers.get(key);

  if (!shared) {
    const callbacks = new Map<Element, Callback>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const cb = callbacks.get(entry.target);
          if (!cb) continue;
          callbacks.delete(entry.target);
          io.unobserve(entry.target);
          cb();
        }
      },
      { threshold, rootMargin }
    );
    shared = { io, callbacks };
    observers.set(key, shared);
  }

  const { io, callbacks } = shared;
  callbacks.set(el, callback);
  io.observe(el);

  return () => {
    callbacks.delete(el);
    io.unobserve(el);
  };
}
