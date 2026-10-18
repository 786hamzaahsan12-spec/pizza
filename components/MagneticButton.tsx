"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { useSafeReducedMotion } from "../lib/use-safe-reduced-motion";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  fullWidth?: boolean;
  ariaLabel?: string;
};

export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  strength = 0.25,
  fullWidth = false,
  ariaLabel,
}: MagneticButtonProps) {
  const reduce = useSafeReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.2 });

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={fullWidth ? "block w-full" : "inline-block"}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {href ? (
        <a
          href={href}
          className={`${className} ${fullWidth ? "w-full" : ""}`}
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {children}
        </a>
      ) : (
        <button
          type="button"
          className={`${className} ${fullWidth ? "w-full" : ""}`}
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
}