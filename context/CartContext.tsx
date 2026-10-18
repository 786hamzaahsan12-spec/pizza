"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  type MenuItem,
} from "../data/menu";

export type CartItem = MenuItem & {
  lineId: string;
  quantity: number;
  note?: string;
};

export type OrderMode = "delivery" | "pickup";

export type Flight = {
  id: number;
  image: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
};

type Notice = { id: number; text: string };
type CustomLine = { price: number; note: string };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  mode: OrderMode;
  setMode: (mode: OrderMode) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (
    item: MenuItem,
    origin?: HTMLElement | null,
    custom?: CustomLine
  ) => void;
  changeQuantity: (lineId: string, amount: number) => void;
  clear: () => void;
  notice: Notice | null;
  showNotice: (text: string) => void;
  flights: Flight[];
  removeFlight: (id: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "crust-fire-cart-v1";
let counter = 0;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mode, setMode] = useState<OrderMode>("delivery");
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load the saved cart after mount so server and client HTML always match.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          items?: CartItem[];
          mode?: OrderMode;
        };
        if (Array.isArray(parsed.items)) setItems(parsed.items);
        if (parsed.mode === "delivery" || parsed.mode === "pickup") {
          setMode(parsed.mode);
        }
      }
    } catch {
      /* ignore corrupted or unavailable storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, mode }));
    } catch {
      /* storage may be full or blocked */
    }
  }, [items, mode, hydrated]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 2400);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const showNotice = useCallback((text: string) => {
    counter += 1;
    setNotice({ id: counter, text });
  }, []);

  const addItem = useCallback(
    (item: MenuItem, origin?: HTMLElement | null, custom?: CustomLine) => {
      const lineId = custom ? `${item.id}:${custom.note}` : String(item.id);

      setItems((current) => {
        const existing = current.find((line) => line.lineId === lineId);
        if (existing) {
          return current.map((line) =>
            line.lineId === lineId
              ? { ...line, quantity: line.quantity + 1 }
              : line
          );
        }
        return [
          ...current,
          {
            ...item,
            price: custom ? custom.price : item.price,
            note: custom?.note,
            lineId,
            quantity: 1,
          },
        ];
      });

      counter += 1;
      setNotice({ id: counter, text: `${item.name} added to your bag` });

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const target = document.getElementById("cart-button");

      if (origin && target && !reduce) {
        const a = origin.getBoundingClientRect();
        const b = target.getBoundingClientRect();
        counter += 1;
        const flight: Flight = {
          id: counter,
          image: item.image,
          from: { x: a.left + a.width / 2, y: a.top + a.height / 2 },
          to: { x: b.left + b.width / 2, y: b.top + b.height / 2 },
        };
        setFlights((current) => [...current, flight]);
      }
    },
    []
  );

  const changeQuantity = useCallback((lineId: string, amount: number) => {
    setItems((current) =>
      current
        .map((line) =>
          line.lineId === lineId
            ? { ...line, quantity: line.quantity + amount }
            : line
        )
        .filter((line) => line.quantity > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const removeFlight = useCallback((id: number) => {
    setFlights((current) => current.filter((flight) => flight.id !== id));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = items.reduce(
      (sum, line) => sum + line.price * line.quantity,
      0
    );
    const deliveryFee =
      mode === "delivery" && subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD
        ? DELIVERY_FEE
        : 0;

    return {
      items,
      count,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      mode,
      setMode,
      open,
      setOpen,
      addItem,
      changeQuantity,
      clear,
      notice,
      showNotice,
      flights,
      removeFlight,
    };
  }, [
    items,
    mode,
    open,
    notice,
    flights,
    addItem,
    changeQuantity,
    clear,
    showNotice,
    removeFlight,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}