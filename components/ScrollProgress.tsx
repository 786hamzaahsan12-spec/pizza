"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[200] h-[3px] origin-left bg-linear-to-r from-fire to-[#f5a35c]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}