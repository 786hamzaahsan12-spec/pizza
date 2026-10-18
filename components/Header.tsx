
"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Header() {
  const [nav, setNav] = useState(false);
  const cart = useCart();

  const count = cart?.count ?? 0;
  const setOpen = cart?.setOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#141211]/95 text-[#FFF5E8] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setNav(false)}
        >
          <span className="text-3xl">🍕</span>
          <span className="text-xl font-black tracking-tight">
            Pizza<span className="text-orange-500">House</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#top" className="text-sm transition hover:text-orange-400">
            Home
          </Link>
          <Link
            href="#menu"
            className="text-sm transition hover:text-orange-400"
          >
            Menu
          </Link>
          <Link
            href="#story"
            className="text-sm transition hover:text-orange-400"
          >
            Story
          </Link>
          <Link
            href="#craft"
            className="text-sm transition hover:text-orange-400"
          >
            Craft
          </Link>
          <Link
            href="#visit"
            className="text-sm transition hover:text-orange-400"
          >
            Visit
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen?.(true)}
            aria-label={`Open cart, ${count} items`}
            className="relative rounded-full border border-white/15 px-4 py-2 text-sm font-semibold transition hover:border-orange-500 hover:bg-orange-500/10"
          >
            🛒 Cart
            <span className="ml-2 rounded-full bg-orange-500 px-2 py-0.5 text-xs font-bold text-white">
              {count}
            </span>
          </button>

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={nav}
            onClick={() => setNav((previous) => !previous)}
            className="rounded-lg border border-white/15 px-3 py-2 text-xl md:hidden"
          >
            {nav ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {nav && (
        <nav className="border-t border-white/10 bg-[#141211] px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="#top" onClick={() => setNav(false)}>Home</Link>
            <Link href="#menu" onClick={() => setNav(false)}>Menu</Link>
            <Link href="#story" onClick={() => setNav(false)}>Story</Link>
            <Link href="#craft" onClick={() => setNav(false)}>Craft</Link>
            <Link href="#visit" onClick={() => setNav(false)}>Visit</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
