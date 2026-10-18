"use client";

import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import SmartImage from "./SmartImage";

const HALF = 28; // half of the 56px flying thumbnail

export default function FlyToCart() {
  const { flights, removeFlight } = useCart();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[250]"
    >
      {flights.map((flight) => (
        <motion.div
          key={flight.id}
          className="absolute top-0 left-0 size-14 overflow-hidden rounded-full border-2 border-white shadow-[0_10px_24px_-6px_rgba(0,0,0,0.5)]"
          initial={{
            x: flight.from.x - HALF,
            y: flight.from.y - HALF,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: flight.to.x - HALF,
            y: flight.to.y - HALF,
            scale: 0.25,
            opacity: 0.7,
          }}
          transition={{
            duration: 0.8,
            x: { duration: 0.8, ease: "easeIn" },
            y: { duration: 0.8, ease: "easeOut" },
          }}
          onAnimationComplete={() => removeFlight(flight.id)}
        >
          <SmartImage src={flight.image} alt="" sizes="56px" />
        </motion.div>
      ))}
    </div>
  );
}