"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Toast() {
  const { notice } = useCart();

  return (
    <AnimatePresence>
      {notice && (
        <motion.div
          key={notice.id}
          className="fixed inset-x-0 bottom-6 z-[150] mx-auto flex w-max max-w-[calc(100%_-_32px)] items-center gap-[11px] rounded-[3px] bg-ink px-[18px] py-[13px] text-xs font-bold text-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.5)]"
          role="status"
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          <span className="grid size-[22px] flex-none place-items-center rounded-full bg-fire">
            <Check size={15} />
          </span>
          {notice.text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}