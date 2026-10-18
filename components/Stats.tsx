"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useSafeReducedMotion } from "../lib/use-safe-reduced-motion";
import { Stagger, StaggerItem } from "./Reveal";

type Stat = {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
};

const stats: Stat[] = [
  { value: 5000, suffix: "+", label: "HAPPY CUSTOMERS" },
  { value: 15, label: "FRESH MENU ITEMS" },
  { value: 4.9, decimals: 1, label: "AVERAGE RATING" },
  { value: 30, suffix: " min", label: "AVERAGE DELIVERY" },
];

function Counter({ value, suffix = "", decimals = 0 }: Omit<Stat, "label">) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useSafeReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduce) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(latest),
    });

    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-PK", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section
      aria-label="CRUST & FIRE in numbers"
      className="bg-ink px-[8%] py-12 text-white max-[600px]:px-[6%]"
    >
      <Stagger
        gap={0.1}
        className="grid grid-cols-4 gap-y-10 max-[700px]:grid-cols-2"
      >
        {stats.map((stat) => (
          <StaggerItem key={stat.label} className="text-center">
            <p className="font-display text-[clamp(34px,4.5vw,54px)] leading-none font-bold text-[#f18a51]">
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
              />
            </p>
            <p className="mt-3 text-[9px] font-extrabold tracking-[1.5px] text-white/60">
              {stat.label}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}