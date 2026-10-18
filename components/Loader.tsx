"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

export default function Loader() {
  const reduce = useSafeReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(
      () => {
        document.body.style.overflow = "";
        setVisible(false);
      },
      reduce ? 400 : 1900
    );

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          role="status"
          aria-label="Loading CRUST and FIRE"
          className="fixed inset-0 z-[300] grid place-items-center bg-ink text-white"
          exit={{ y: "-100%" }}
          transition={{
            duration: reduce ? 0.2 : 0.85,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.span
              className="grid size-[84px] place-items-center rounded-full bg-fire"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
            >
              <motion.span
                className="grid place-items-center"
                animate={
                  reduce
                    ? undefined
                    : { scale: [1, 1.18, 1], rotate: [0, -8, 8, 0] }
                }
                transition={{ duration: 1.1, repeat: Infinity }}
              >
                <Flame size={40} />
              </motion.span>
            </motion.span>

            <motion.p
              className="font-display text-[26px] font-black tracking-[-1px]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              CRUST<span className="text-fire">&</span>FIRE
            </motion.p>

            <div className="h-[2px] w-[180px] overflow-hidden rounded-full bg-white/15">
              <motion.div
                className="h-full bg-fire"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: reduce ? 0.3 : 1.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}