"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Flame, Minus, Plus, Search, ShoppingBag, X } from "lucide-react";
import {
  categories,
  menuItems,
  type Filter,
  type MenuItem,
} from "../data/menu";
import Eyebrow from "./Eyebrow";
import MenuCard from "./MenuCard";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";

type Sort = "popular" | "price-asc" | "price-desc";

type MenuSectionProps = {
  onCustomize?: (item: MenuItem) => void;
};

const easeSmooth = [0.22, 1, 0.36, 1] as const;

function formatPrice(value: number) {
  return `Rs. ${value.toLocaleString("en-US")}`;
}

/* Reads optional fields safely, so this works with your existing MenuItem type */
function readExtras(item: MenuItem) {
  const record = item as unknown as Record<string, unknown>;

  const pick = (...keys: string[]) => {
    for (const key of keys) {
      const value = record[key];
      if (typeof value === "string" && value.length > 0) return value;
    }
    return undefined;
  };

  return {
    image: pick("image", "img", "imageUrl", "photo", "src"),
    badge: pick("badge", "tag", "label"),
    veg: record["veg"] === true || record["vegetarian"] === true,
  };
}

/* ---------------- Order details popup ---------------- */

type OrderDetailsProps = {
  item: MenuItem;
  onClose: () => void;
  onAdd: (quantity: number) => void;
};

function OrderDetails({ item, onClose, onAdd }: OrderDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const { image, badge, veg } = readExtras(item);

  // Close with Escape, lock page scroll, focus the close button
  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const total = item.price * quantity;

  return (
    <motion.div
      className="fixed inset-0 z-[400] grid place-items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Dark backdrop */}
      <div
        className="absolute inset-0 bg-[#140c08]/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${item.name} order details`}
        className="relative grid max-h-[92vh] w-full max-w-[760px] grid-cols-[1fr_1fr] overflow-hidden rounded-[6px] bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] max-[700px]:grid-cols-1 max-[700px]:overflow-y-auto"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.4, ease: easeSmooth }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close order details"
          className="absolute top-3 right-3 z-10 grid size-9 cursor-pointer place-items-center rounded-full bg-white/90 text-ink shadow transition duration-200 hover:rotate-90 hover:bg-fire hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire"
        >
          <X size={18} />
        </button>

        {/* Image side */}
        <div className="relative min-h-[300px] overflow-hidden bg-[#e5ded4] max-[700px]:min-h-[240px]">
          {image ? (
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: easeSmooth }}
            >
              <SmartImage
                src={image}
                alt={item.name}
                sizes="(max-width: 700px) 100vw, 380px"
                priority
              />
            </motion.div>
          ) : (
            <div className="absolute inset-0 grid place-items-center text-fire/40">
              <Flame size={80} />
            </div>
          )}

          {badge && (
            <span className="absolute top-3 left-3 bg-ink px-2 py-[7px] text-[7px] font-extrabold tracking-[0.8px] text-white">
              {badge}
            </span>
          )}
        </div>

        {/* Details side */}
        <motion.div
          className="flex flex-col p-6 max-[700px]:p-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
          }}
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            className="flex items-center gap-2 text-[8px] font-extrabold tracking-[1.5px] text-[#82776c]"
          >
            <span className="inline-block h-px w-5 bg-fire" />
            {String(item.category).toUpperCase()}
            {veg && (
              <span className="bg-[#e8f4ea] px-1.5 py-[3px] text-[7px] text-[#2f7a3f]">
                VEG
              </span>
            )}
          </motion.p>

          <motion.h3
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            className="mt-3 font-display text-[28px] leading-tight font-bold"
          >
            {item.name}
          </motion.h3>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            className="mt-3 text-xs leading-[1.8] text-muted"
          >
            {item.description}
          </motion.p>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            className="mt-4 text-[18px] font-extrabold text-fire-dark"
          >
            {formatPrice(item.price)}
          </motion.p>

          <motion.ul
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            className="mt-4 grid gap-2 border-y border-ink/[0.1] py-4 text-[11px] text-[#51473f]"
          >
            <li className="flex items-center gap-2">
              <Clock size={14} className="text-fire" />
              Delivery in about 30 to 40 minutes
            </li>
            <li className="flex items-center gap-2">
              <Flame size={14} className="text-fire" />
              Baked fresh to order
            </li>
          </motion.ul>

          {/* Quantity */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            className="mt-5 flex items-center justify-between"
          >
            <span className="text-[9px] font-extrabold tracking-[1.2px] text-[#82776c]">
              QUANTITY
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="grid size-9 cursor-pointer place-items-center rounded-full border border-ink/[0.18] transition-colors duration-200 hover:border-fire hover:text-fire disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-ink/[0.18] disabled:hover:text-inherit"
              >
                <Minus size={16} />
              </button>

              <div className="relative h-7 w-8 overflow-hidden text-center">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={quantity}
                    className="absolute inset-0 text-[16px] font-extrabold"
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    aria-live="polite"
                  >
                    {quantity}
                  </motion.span>
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                disabled={quantity >= 20}
                aria-label="Increase quantity"
                className="grid size-9 cursor-pointer place-items-center rounded-full border border-ink/[0.18] transition-colors duration-200 hover:border-fire hover:text-fire disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus size={16} />
              </button>
            </div>
          </motion.div>

          {/* Total + add */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            className="mt-5 flex items-center justify-between border-t border-ink/[0.1] pt-4"
          >
            <span className="text-[9px] font-extrabold tracking-[1.2px] text-[#82776c]">
              TOTAL
            </span>
            <span className="text-[20px] font-extrabold">{formatPrice(total)}</span>
          </motion.div>

          <motion.button
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            type="button"
            onClick={() => onAdd(quantity)}
            whileTap={{ scale: 0.97 }}
            className="mt-4 inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-[2px] bg-fire px-[18px] text-[10px] font-extrabold tracking-[1px] text-white transition-colors duration-200 hover:bg-fire-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire focus-visible:ring-offset-2"
          >
            <ShoppingBag size={16} />
            ADD {quantity} TO BAG · {formatPrice(total)}
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- Menu section ---------------- */

export default function MenuSection({ onCustomize }: MenuSectionProps) {
  const [category, setCategory] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("popular");
  const [selected, setSelected] = useState<MenuItem | null>(null);

  // The card's own "Add to bag" button, so the popup uses your existing cart logic
  const addButtonRef = useRef<HTMLButtonElement | null>(null);

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();

    const list = menuItems.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesSearch =
        !search || `${item.name} ${item.description}`.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });

    return list.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return b.popularity - a.popularity;
    });
  }, [category, query, sort]);

  function countFor(filter: Filter) {
    return filter === "All"
      ? menuItems.length
      : menuItems.filter((item) => item.category === filter).length;
  }

  function openDetails(element: HTMLElement, item: MenuItem) {
    addButtonRef.current = element.querySelector<HTMLButtonElement>(
      'button[aria-label^="Add "]'
    );
    setSelected(item);
  }

  function handleCardClick(event: MouseEvent<HTMLDivElement>, item: MenuItem) {
    const target = event.target as HTMLElement;

    // Clicks on the card's own buttons keep working as before
    if (target.closest("button, a, input, select")) return;

    openDetails(event.currentTarget, item);
  }

  function handleCardKey(event: KeyboardEvent<HTMLDivElement>, item: MenuItem) {
    if (event.target !== event.currentTarget) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetails(event.currentTarget, item);
    }
  }

  function handleAdd(quantity: number) {
    const button = addButtonRef.current;

    // Click the card's add button once per quantity, a little apart,
    // so the cart always registers every one
    if (button) {
      for (let i = 0; i < quantity; i += 1) {
        window.setTimeout(() => button.click(), i * 140);
      }
    }

    setSelected(null);
  }

  return (
    <section
      id="menu"
      className="bg-paper px-[8%] py-[100px] max-[600px]:px-[6%] max-[600px]:py-[70px]"
    >
      <Reveal className="flex items-end justify-between gap-[30px] max-[900px]:flex-col max-[900px]:items-start">
        <div>
          <Eyebrow className="text-[#82776c]">STRAIGHT FROM THE OVEN</Eyebrow>
          <h2 className="mt-3.5 font-display text-[clamp(38px,5vw,62px)] leading-none font-bold tracking-[-2px]">
            THE GOOD <span className="text-fire italic">STUFF.</span>
          </h2>
        </div>
        <p className="mb-1 text-xs leading-[1.8] text-muted">
          Big flavour, proper ingredients,
          <br />
          and not a shortcut in sight.
        </p>
      </Reveal>

      <div className="mt-[34px] flex flex-wrap items-center justify-between gap-4 max-[600px]:flex-col max-[600px]:items-stretch">
        <label className="relative block min-w-[220px] flex-1 max-w-[360px] max-[600px]:max-w-none">
          <span className="sr-only">Search the menu</span>
          <Search
            size={15}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search pizzas, sides, drinks…"
            className="min-h-[42px] w-full border border-ink/[0.13] bg-white pr-3 pl-9 text-xs outline-none transition-colors duration-200 placeholder:text-[#a0968c] focus:border-fire"
          />
        </label>

        <label className="flex items-center gap-2 text-[8px] font-extrabold tracking-[1px] text-[#82776c]">
          SORT BY
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as Sort)}
            className="min-h-[42px] cursor-pointer border border-ink/[0.13] bg-white px-3 text-[10px] font-bold tracking-[0.5px] text-ink outline-none transition-colors duration-200 focus:border-fire"
          >
            <option value="popular">Most popular</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>

      <div className="mt-5 mb-[19px] flex items-center justify-between gap-4 border-b border-ink/[0.13] pb-[13px] max-[900px]:flex-col max-[900px]:items-start">
        <div className="flex flex-wrap gap-[7px]" role="group" aria-label="Filter menu">
          {categories.map((filter) => (
            <button
              key={filter}
              className={`cursor-pointer rounded-[2px] border px-3 py-[9px] text-[8px] font-extrabold tracking-[0.8px] transition-all duration-200 ${
                category === filter
                  ? "border-ink/[0.13] bg-cream text-ink"
                  : "border-transparent bg-transparent text-[#746a60] hover:text-fire"
              }`}
              onClick={() => setCategory(filter)}
              aria-pressed={category === filter}
            >
              {filter === "All" ? "ALL" : filter.toUpperCase()}{" "}
              <span className="text-fire">{countFor(filter)}</span>
            </button>
          ))}
        </div>
        <span className="text-[8px] font-extrabold tracking-[1px] text-[#82776c]">
          {results.length} ITEMS <span className="px-1 text-fire">·</span> BAKED
          TO ORDER
        </span>
      </div>

      {results.length === 0 ? (
        <div className="grid place-items-center gap-3 py-20 text-center">
          <h3 className="font-display text-[22px] font-bold">
            Nothing matches that search.
          </h3>
          <p className="text-xs text-muted">
            Try a different word, or clear the filters.
          </p>
          <button
            className="mt-2 cursor-pointer border border-ink/[0.13] px-4 py-3 text-[9px] font-extrabold tracking-[1px] transition-colors duration-200 hover:border-fire hover:bg-fire hover:text-white"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
          >
            CLEAR FILTERS
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1"
        >
          <AnimatePresence mode="popLayout">
            {results.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3, ease: easeSmooth }}
                role="group"
                tabIndex={0}
                aria-label={`${item.name}, view order details`}
                onClick={(event) => handleCardClick(event, item)}
                onKeyDown={(event) => handleCardKey(event, item)}
                className="h-full min-w-0 cursor-pointer rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire focus-visible:ring-offset-2"
              >
                <MenuCard
                  item={item}
                  index={index}
                  onCustomize={onCustomize}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <p className="mt-6 text-center text-[8px] font-bold tracking-[1.2px] text-[#91877d]">
        DEMO MENU <span className="px-[5px] text-fire">·</span> SAMPLE PRICES IN
        PAKISTANI RUPEES
      </p>

      {/* Order details popup */}
      <AnimatePresence>
        {selected && (
          <OrderDetails
            key={selected.id}
            item={selected}
            onClose={() => setSelected(null)}
            onAdd={handleAdd}
          />
        )}
      </AnimatePresence>
    </section>
  );
}