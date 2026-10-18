"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { useSafeReducedMotion } from "../lib/use-safe-reduced-motion";
import { buttonPrimary } from "../lib/utils";
import Eyebrow from "./Eyebrow";
import MagneticButton from "./MagneticButton";
import SmartImage from "./SmartImage";

const easeSmooth = [0.22, 1, 0.36, 1] as const;

/* Reset ke waqt (section screen se bahar) koi animation nahi, turant hide */
const instant = { duration: 0 };

/* Parents: sirf "visible" / "hidden" label bhejte hain */
const parent: Variants = {
  hidden: { transition: instant },
  visible: {},
};

const textContainer: Variants = {
  hidden: { transition: instant },
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, transition: instant },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeSmooth },
  },
};

const lineRise: Variants = {
  hidden: { y: "110%", opacity: 0, transition: instant },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: easeSmooth },
  },
};

const frameVariants: Variants = {
  hidden: { opacity: 0, x: -20, y: -20, transition: instant },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 1, delay: 0.5, ease: easeSmooth },
  },
};

const wipeVariants: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", transition: instant },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.2, ease: easeSmooth },
  },
};

const zoomVariants: Variants = {
  hidden: { scale: 1.25, transition: instant },
  visible: {
    scale: 1,
    transition: { duration: 1.8, ease: easeSmooth },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, x: 50, scale: 0.8, transition: instant },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, delay: 0.9, ease: easeSmooth },
  },
};

export default function Story() {
  /* Safe version: same value on server and browser first render, so no hydration error */
  const reduce = useSafeReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  /*
    inView true  -> animation chalti hai
    inView false -> sab kuch reset hota hai
    Isliye har baar scroll karke wapas aane par animation dobara chalti hai.
  */
  const inView = useInView(sectionRef, { amount: 0.25, once: false });
  const state = reduce || inView ? "visible" : "hidden";

  // Image moves slowly while the page scrolls
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="grid grid-cols-[1fr_0.88fr] items-center gap-[9%] overflow-hidden bg-[#eae2d6] px-[10%] py-[100px] max-[900px]:grid-cols-1 max-[900px]:gap-12 max-[600px]:px-[6%]"
    >
      {/* Left: image */}
      <motion.div
        className="relative"
        variants={parent}
        initial="hidden"
        animate={state}
      >
        {/* Dashed frame draws in behind the image */}
        <motion.div
          aria-hidden="true"
          className="absolute -top-4 -left-4 h-full w-full border border-dashed border-fire/50 max-[900px]:hidden"
          variants={frameVariants}
        />

        {/* Image wipes open from left to right */}
        <motion.div
          className="relative h-[430px] overflow-hidden max-[900px]:h-[340px]"
          variants={wipeVariants}
        >
          <motion.div
            className="absolute inset-x-0 -top-[10%] -bottom-[10%]"
            style={{ y: reduce ? 0 : imageY }}
          >
            <motion.div className="absolute inset-0" variants={zoomVariants}>
              <SmartImage
                src="https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=85"
                alt="Freshly baked pizza prepared by hand"
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Badge pops in, then floats gently */}
        <motion.div
          className="absolute -right-4 bottom-5 max-[900px]:right-3"
          variants={badgeVariants}
        >
          <motion.div
            className="flex items-center gap-2 bg-fire px-4 py-[13px] text-[8px] font-extrabold tracking-[1px] text-white shadow-[0_18px_35px_-15px_rgba(0,0,0,0.5)]"
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={
              reduce
                ? undefined
                : { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <motion.span
              animate={reduce ? undefined : { rotate: [0, -12, 12, 0] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
              }
              className="grid place-items-center"
            >
              <Flame size={18} />
            </motion.span>
            FROM OUR OVEN, WITH LOVE.
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right: text */}
      <motion.div
        variants={textContainer}
        initial="hidden"
        animate={state}
      >
        <motion.div variants={fadeUp}>
          <Eyebrow className="text-[#746a60]">A LITTLE ABOUT US</Eyebrow>
        </motion.div>

        <h2 className="mt-[22px] font-display text-[clamp(43px,5.5vw,68px)] leading-[0.98] font-bold tracking-[-3px]">
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span className="block" variants={lineRise}>
              NOT FAST
            </motion.span>
          </span>

          <span className="block overflow-hidden pr-[0.1em] pb-[0.08em]">
            <motion.span className="block" variants={lineRise}>
              FOOD.{" "}
              <span className="text-fire italic drop-shadow-[0_4px_24px_rgba(241,132,71,0.3)]">
                GOOD
              </span>
            </motion.span>
          </span>

          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span className="block" variants={lineRise}>
              FOOD.
            </motion.span>
          </span>
        </h2>

        <motion.p
          variants={fadeUp}
          className="mt-[22px] mb-[26px] max-w-[400px] text-[13px] leading-[1.85] text-[#655c53]"
        >
          We believe a great pizza starts long before it hits the oven. With
          thoughtfully chosen ingredients, patient dough and a proper flame,
          every bite should be worth slowing down for.
        </motion.p>

        <motion.div variants={fadeUp}>
          <MagneticButton href="#craft" className={buttonPrimary}>
            WHAT MAKES US DIFFERENT <ArrowRight size={17} />
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}