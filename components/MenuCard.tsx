"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Check, Plus, SlidersHorizontal } from "lucide-react";
import { useCart } from "../context/CartContext";
import type { MenuItem } from "../data/menu";
import { useSafeReducedMotion } from "../lib/use-safe-reduced-motion";
import { formatPrice } from "../lib/utils";
import SmartImage from "./SmartImage";

type MenuCardProps = {
  item: MenuItem;
  index: number;
  onCustomize?: (item: MenuItem) => void;
};

export default function MenuCard({ item, index, onCustomize }: MenuCardProps) {
  const { addItem } = useCart();
  const reduce = useSafeReducedMotion();
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 20 });

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(-py * 10);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  function handleAdd(origin: HTMLElement) {
    addItem(item, origin);
    setAdded(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1000);
  }

  const canCustomize = Boolean(onCustomize) && item.category === "Pizzas";

  return (
    <motion.article
      layout
      className="min-w-0"
      initial={reduce ? false : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.4,
        delay: (index % 4) * 0.07,
        layout: { duration: 0.25 },
      }}
    >
      <motion.div
        className="group h-full border border-ink/[0.09] bg-white p-[9px] transition-[box-shadow,translate] duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-22px_rgba(33,27,23,0.35)]"
        style={{
          rotateX: springX,
          rotateY: springY,
          transformPerspective: 900,
        }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="relative aspect-[1/0.88] overflow-hidden bg-[#e5ded4]">
          <SmartImage
            src={item.image}
            alt={item.name}
            sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw"
            className="duration-[550ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.07]"
          />

          {item.tag && (
            <span className="absolute top-[11px] left-[11px] bg-ink px-2 py-[7px] text-[7px] font-extrabold tracking-[0.8px] text-white">
              {item.tag}
            </span>
          )}

          {item.veg && (
            <span className="absolute top-[11px] right-[11px] bg-white/90 px-1.5 py-1 text-[7px] font-extrabold tracking-[0.8px] text-[#2f7a3f]">
              VEG
            </span>
          )}

          <button
            className={`absolute right-2.5 bottom-2.5 grid size-[35px] cursor-pointer place-items-center rounded-full border-0 text-white transition duration-200 ${
              added ? "bg-[#2f7a3f]" : "bg-fire hover:rotate-90 hover:bg-fire-dark"
            }`}
            onClick={(event) => handleAdd(event.currentTarget)}
            aria-label={`Add ${item.name} to bag`}
          >
            {added ? <Check size={19} /> : <Plus size={19} />}
          </button>
        </div>

        <div className="flex min-h-[91px] justify-between gap-[7px] px-[5px] pt-4 pb-[11px]">
          <div>
            <h3 className="font-display text-[17px] font-bold">{item.name}</h3>
            <p className="mt-[7px] max-w-[185px] text-[10px] leading-[1.55] text-muted">
              {item.description}
            </p>
          </div>
          <span className="pt-0.5 text-[10px] font-extrabold whitespace-nowrap text-fire-dark">
            {formatPrice(item.price)}
          </span>
        </div>

        <div className="flex gap-2">
          {canCustomize && (
            <button
              className="flex min-h-[38px] cursor-pointer items-center justify-center gap-1.5 border border-ink/[0.13] bg-transparent px-3 text-[8px] font-extrabold tracking-[1px] text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white"
              onClick={() => onCustomize?.(item)}
              aria-label={`Customize ${item.name}`}
            >
              <SlidersHorizontal size={13} /> CUSTOMIZE
            </button>
          )}

          <button
            className={`flex min-h-[38px] flex-1 cursor-pointer items-center justify-center border text-[8px] font-extrabold tracking-[1px] transition-all duration-200 ${
              added
                ? "border-[#2f7a3f] bg-[#2f7a3f] text-white"
                : "border-ink/[0.13] bg-transparent text-ink hover:border-fire hover:bg-fire hover:text-white"
            }`}
            onClick={(event) => handleAdd(event.currentTarget)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={added ? "added" : "add"}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
              >
                {added ? (
                  <>
                    ADDED <Check size={15} />
                  </>
                ) : (
                  <>
                    ADD TO BAG <Plus size={15} />
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.div>
    </motion.article>
  );
}