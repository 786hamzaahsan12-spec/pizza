"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Flame, Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { navLinks } from "../data/site";
import { logo, logoIcon, navLink } from "../lib/utils";

export default function Navbar() {
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 60);
  });

  return (
    <header
      className={`sticky top-0 z-[60] flex items-center justify-between px-[5.4%] transition-all duration-300 ${
        scrolled
          ? "h-[62px] bg-cream/80 shadow-[0_8px_30px_-18px_rgba(33,27,23,0.45)] backdrop-blur-md"
          : "h-[60px] bg-cream"
      }`}
    >
      <a href="#top" className={logo} aria-label="Crust and Fire home">
        <span className={logoIcon}>
          <Flame size={23} />
        </span>
        <span>
          CRUST<span className="text-fire">&</span>FIRE
        </span>
      </a>

      <nav
        aria-label="Main navigation"
        className={`flex gap-[34px] max-[900px]:absolute max-[900px]:inset-x-0 max-[900px]:top-full max-[900px]:flex-col max-[900px]:gap-0 max-[900px]:border-b max-[900px]:border-ink/[0.13] max-[900px]:bg-cream max-[900px]:px-[5.4%] max-[900px]:pt-2 max-[900px]:pb-[18px] max-[900px]:shadow-[0_20px_30px_-20px_rgba(0,0,0,0.3)] ${
          mobileOpen ? "max-[900px]:flex" : "max-[900px]:hidden"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={navLink}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <button
          id="cart-button"
          className="flex min-h-[42px] cursor-pointer items-center gap-[9px] rounded-[3px] border border-ink/[0.13] bg-transparent px-3 transition-colors duration-200 hover:border-fire hover:bg-[#fffaf1]"
          onClick={() => setOpen(true)}
          aria-label={`Open shopping bag, ${count} items`}
        >
          <ShoppingBag size={18} />
          <span className="text-[9px] font-extrabold tracking-[1px] max-[600px]:hidden">
            YOUR BAG
          </span>
          <motion.span
            key={count}
            className="grid h-[21px] min-w-[21px] place-items-center rounded-full bg-fire px-[5px] text-[10px] font-extrabold text-white"
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 450, damping: 14 }}
          >
            {count}
          </motion.span>
        </button>

        <button
          className="hidden size-[42px] cursor-pointer place-items-center border-0 bg-transparent max-[900px]:grid"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}