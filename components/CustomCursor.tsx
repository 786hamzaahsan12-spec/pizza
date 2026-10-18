"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Desktop-only cursor. It never renders on touch devices or with reduced motion. */
export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 38, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 420, damping: 38, mass: 0.4 });

  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!finePointer || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    function handleMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target as HTMLElement | null;
      setHovering(
        Boolean(
          target?.closest(
            "a, button, [role='button'], input, textarea, select, label"
          )
        )
      );
    }

    window.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[400]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="-mt-4 -ml-4 size-8 rounded-full border border-fire"
          animate={{
            scale: hovering ? 1.8 : 1,
            backgroundColor: hovering
              ? "rgba(237, 90, 36, 0.14)"
              : "rgba(237, 90, 36, 0)",
          }}
          transition={{ duration: 0.18 }}
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[401]"
        style={{ x, y }}
      >
        <div className="-mt-[3px] -ml-[3px] size-1.5 rounded-full bg-fire" />
      </motion.div>
    </>
  );
}