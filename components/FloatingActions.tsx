"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { SITE } from "../data/site";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setShowTop(value > 700);
  });

  const whatsappHref = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hi CRUST & FIRE, I'd like to place an order."
  )}`;

  return (
    <div className="fixed right-5 bottom-6 z-[90] flex flex-col items-center gap-3 max-[600px]:right-4">
      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#top"
            aria-label="Back to top"
            className="grid size-11 place-items-center rounded-full bg-ink text-white shadow-[0_12px_28px_-10px_rgba(0,0,0,0.6)] transition-colors duration-200 hover:bg-fire"
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUp size={19} />
          </motion.a>
        )}
      </AnimatePresence>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Order on WhatsApp"
        className="grid size-[54px] place-items-center rounded-full bg-[#25d366] text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,0.7)] transition-transform duration-200 hover:scale-110"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}