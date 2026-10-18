"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bike, Minus, Plus, ShoppingBag, Store, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { FREE_DELIVERY_THRESHOLD } from "../data/menu";
import { buttonDark, buttonPrimary, formatPrice } from "../lib/utils";
import Eyebrow from "./Eyebrow";
import SmartImage from "./SmartImage";

type CartDrawerProps = {
  onCheckout?: () => void;
};

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const {
    items,
    count,
    subtotal,
    deliveryFee,
    total,
    mode,
    setMode,
    open,
    setOpen,
    changeQuantity,
    showNotice,
  } = useCart();
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, setOpen]);

  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  function handleCheckout() {
    if (onCheckout) {
      onCheckout();
    } else {
      showNotice("Demo checkout only — no order was placed.");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex justify-end bg-[rgba(24,15,11,0.55)] backdrop-blur-[3px]"
          onClick={() => setOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <motion.aside
            className="flex h-full w-[min(440px,100%)] flex-col bg-paper shadow-[-24px_0_60px_-20px_rgba(0,0,0,0.4)]"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            onClick={(event) => event.stopPropagation()}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-ink/[0.13] px-[26px] pt-[26px] pb-5">
              <div>
                <Eyebrow className="text-[#82776c]">YOUR ORDER</Eyebrow>
                <h2 className="mt-3 font-display text-[28px] font-bold tracking-[-1px]">
                  YOUR BAG ({count})
                </h2>
              </div>
              <button
                ref={closeRef}
                className="grid size-10 cursor-pointer place-items-center rounded-full border border-ink/[0.13] bg-transparent transition duration-200 hover:rotate-90 hover:bg-cream"
                onClick={() => setOpen(false)}
                aria-label="Close bag"
              >
                <X size={21} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 px-[30px] py-10 text-center">
                <span className="mb-2 grid size-[72px] place-items-center rounded-full bg-cream text-fire">
                  <ShoppingBag size={30} />
                </span>
                <h3 className="font-display text-[22px] font-bold">
                  It&apos;s a little empty in here.
                </h3>
                <p className="mb-3.5 max-w-[260px] text-xs leading-[1.7] text-muted">
                  Your next favourite pizza is just a click away.
                </p>
                <a
                  href="#menu"
                  className={buttonDark}
                  onClick={() => setOpen(false)}
                >
                  EXPLORE THE MENU <ArrowRight size={16} />
                </a>
              </div>
            ) : (
              <>
                <div className="border-b border-ink/[0.13] px-[26px] py-4">
                  <div
                    className="grid grid-cols-2 gap-1 rounded-[3px] bg-cream p-1"
                    role="group"
                    aria-label="Order type"
                  >
                    {(
                      [
                        { value: "delivery", label: "DELIVERY", Icon: Bike },
                        { value: "pickup", label: "PICKUP", Icon: Store },
                      ] as const
                    ).map(({ value, label, Icon }) => (
                      <button
                        key={value}
                        className={`flex min-h-[38px] cursor-pointer items-center justify-center gap-2 rounded-[2px] border-0 text-[9px] font-extrabold tracking-[1px] transition-colors duration-200 ${
                          mode === value
                            ? "bg-ink text-white"
                            : "bg-transparent text-[#746a60] hover:text-fire"
                        }`}
                        onClick={() => setMode(value)}
                        aria-pressed={mode === value}
                      >
                        <Icon size={15} /> {label}
                      </button>
                    ))}
                  </div>

                  {mode === "delivery" && (
                    <div className="mt-4">
                      <p className="text-[10px] font-bold tracking-[0.4px]">
                        {remaining > 0
                          ? `Add ${formatPrice(remaining)} more for free delivery`
                          : "Free delivery unlocked."}
                      </p>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
                        <motion.div
                          className="h-full rounded-full bg-fire"
                          initial={false}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto px-[26px] py-2">
                  <AnimatePresence initial={false} mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        className="grid grid-cols-[72px_1fr_auto] items-center gap-3.5 border-b border-ink/[0.13] py-[18px]"
                        key={item.lineId}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 12 }}
                      >
                        <div className="relative size-[72px] overflow-hidden">
                          <SmartImage
                            src={item.image}
                            alt={item.name}
                            sizes="72px"
                          />
                        </div>
                        <div>
                          <h3 className="font-display text-base font-bold">
                            {item.name}
                          </h3>
                          {item.note && (
                            <p className="mt-0.5 text-[9px] leading-[1.5] text-muted">
                              {item.note}
                            </p>
                          )}
                          <p className="mt-1 mb-2.5 text-[11px] text-muted">
                            {formatPrice(item.price)}
                          </p>
                          <div className="flex w-max items-center border border-ink/[0.13]">
                            <button
                              className="grid size-7 cursor-pointer place-items-center border-0 bg-transparent transition-colors duration-200 hover:bg-fire hover:text-white"
                              onClick={() => changeQuantity(item.lineId, -1)}
                              aria-label={`Remove one ${item.name}`}
                            >
                              <Minus size={13} />
                            </button>
                            <span className="min-w-7 text-center text-xs font-extrabold">
                              {item.quantity}
                            </span>
                            <button
                              className="grid size-7 cursor-pointer place-items-center border-0 bg-transparent transition-colors duration-200 hover:bg-fire hover:text-white"
                              onClick={() => changeQuantity(item.lineId, 1)}
                              aria-label={`Add one ${item.name}`}
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>
                        <strong className="text-xs whitespace-nowrap text-fire-dark">
                          {formatPrice(item.price * item.quantity)}
                        </strong>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="border-t border-ink/[0.13] bg-white px-[26px] pt-[22px] pb-[26px]">
                  <div className="space-y-1.5 text-xs text-muted">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{mode === "delivery" ? "Delivery" : "Pickup"}</span>
                      <span>
                        {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between border-t border-ink/[0.13] pt-3 text-[13px]">
                    <span>Total</span>
                    <strong className="font-display text-[26px]">
                      {formatPrice(total)}
                    </strong>
                  </div>
                  <p className="mt-2 mb-4 text-[10px] leading-[1.6] text-muted">
                    Demo only — no payment or real order is submitted.
                  </p>
                  <button
                    className={`${buttonPrimary} w-full`}
                    onClick={handleCheckout}
                  >
                    CHECKOUT <ArrowRight size={17} />
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}