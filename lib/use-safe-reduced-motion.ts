"use client";

import { useEffect, useState } from "react";

/**
 * Returns true only when the user really asked for reduced motion.
 * Starts as false so server and first client render match,
 * then reads the real browser setting after mount.
 */
export function useSafeReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduce(event.matches);
    query.addEventListener("change", onChange);

    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduce;
}