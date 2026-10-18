
"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { riseIn, stagger } from "@/lib/animations";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  amount?: number;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  x = 0,
  amount = 0.2,
}: RevealProps) {
  const reduce = useSafeReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: x ? 0 : 28, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  gap?: number;
  amount?: number;
};

export function Stagger({
  children,
  className,
  gap = 0.12,
  amount = 0.2,
}: StaggerProps) {
  const reduce = useSafeReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={stagger(gap)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={riseIn}>
      {children}
    </motion.div>
  );
}
