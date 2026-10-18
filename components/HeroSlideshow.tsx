"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

const heroImages = [
  "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=2000&q=90",
  "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=2000&q=90",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=2000&q=90",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=2000&q=90",
];

export default function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useSafeReducedMotion();

  useEffect(() => {
    // Reduced-motion setting on rahe to image static rakhein.
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={heroImages[activeIndex]}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${heroImages[activeIndex]}")` }}
          initial={
            reduceMotion
              ? false
              : { opacity: 0, scale: 1.04 }
          }
          animate={{
            opacity: 1,
            scale: reduceMotion ? 1 : 1.1,
          }}
          exit={
            reduceMotion
              ? undefined
              : { opacity: 0 }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  opacity: { duration: 0.75, ease: "easeInOut" },
                  scale: { duration: 3.7, ease: "linear" },
                }
          }
        />
      </AnimatePresence>
    </div>
  );
}