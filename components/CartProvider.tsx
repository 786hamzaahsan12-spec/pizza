"use client";

/**
 * Re-export the canonical CartContext to prevent duplicate/conflicting contexts.
 */
export {
  CartProvider,
  useCart,
  type CartItem,
  type OrderMode,
  type Flight,
} from "@/context/CartContext";