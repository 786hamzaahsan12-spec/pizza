
"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Flame,
  Pause,
  Play,
  Star,
} from "lucide-react";

import Eyebrow from "./Eyebrow";
import MagneticButton from "./MagneticButton";
import SmartImage from "./SmartImage";
import { buttonOutline, buttonPrimary } from "../lib/utils";

type Word = {
  text: string;
  accent?: boolean;
};

type HeroSlide = {
  eyebrow: string;
  title: Word[][];
  description: string;
  backgroundImage: string;
  featuredImage: string;
  imageAlt: string;
};

const SLIDE_MS = 5600;
const IMAGE_TRANSITION_MS = 0.9;

const slides: HeroSlide[] = [
  {
    eyebrow: "REAL DOUGH. REAL FIRE. REAL GOOD.",
    title: [
      [{ text: "A" }, { text: "LITTLE" }],
      [{ text: "FIRE." }, { text: "A" }, { text: "LOT" }],
      [{ text: "OF" }, { text: "FLAVOUR.", accent: true }],
    ],
    description:
      "Slow-fermented dough. Bold ingredients.\nA little char, a lot of character.",
    backgroundImage:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1800&q=80",
    featuredImage:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Artisan pizza with colorful fresh toppings",
  },
  {
    eyebrow: "FRESH FROM THE OVEN.",
    title: [
      [{ text: "FRESH" }, { text: "FROM" }],
      [{ text: "THE" }, { text: "FIRE.", accent: true }],
    ],
    description:
      "Hand-stretched dough. Fresh toppings.\nBaked hot and served straight to you.",
    backgroundImage:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1800&q=80",
    featuredImage:
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Freshly baked pizza with melted cheese",
  },
  {
    eyebrow: "MADE TO BRING EVERYONE TO THE TABLE.",
    title: [
      [{ text: "GOOD" }, { text: "FOOD." }],
      [{ text: "GOOD" }, { text: "MOOD.", accent: true }],
    ],
    description:
      "Made by hand. Shared with friends.\nYour new favourite slice is waiting.",
    backgroundImage:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1800&q=80",
    featuredImage:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Golden crust pizza ready to share",
  },
];

const easeSmooth = [0.22, 1, 0.36, 1] as const;
const easeOut = [0.16, 1, 0.3, 1] as const;

const textContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    x: -14,
    transition: {
      duration: 0.22,
      ease: easeOut,
    },
  },
};

const textItem: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    x: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.62,
      ease: easeSmooth,
    },
  },
};

// Animate each complete heading line in sequence: first, second, then third.
const headingVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.02,
    },
  },
};

const lineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    filter: "blur(7px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: easeSmooth,
    },
  },
};

const embers = [
  { left: "12%", size: 3, delay: 0, duration: 8 },
  { left: "28%", size: 4, delay: 2, duration: 9 },
  { left: "47%", size: 3, delay: 1, duration: 8.5 },
  { left: "67%", size: 4, delay: 3, duration: 9 },
  { left: "86%", size: 3, delay: 1.5, duration: 8 },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const slide = slides[activeSlide];
  const paused = isPaused || tabHidden;
  const progress = useMotionValue(0);

  // Keep autoplay paused while the browser tab is hidden.
  useEffect(() => {
    const updateVisibility = () => setTabHidden(document.hidden);

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  // Preload the next slide's images to reduce transition flicker.
  useEffect(() => {
    const next = slides[(activeSlide + 1) % slides.length];

    [next.backgroundImage, next.featuredImage].forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, [activeSlide]);

  // Autoplay continues even when reduced motion is enabled.
  // Pausing stops the progress animation without resetting its position.
  useEffect(() => {
    if (paused) return;

    const remaining = Math.max(
      SLIDE_MS * (1 - progress.get()),
      50
    );

    const controls = animate(progress, 1, {
      duration: remaining / 1000,
      ease: "linear",
      onComplete: () => {
        progress.set(0);
        setActiveSlide((current) => (current + 1) % slides.length);
      },
    });

    return () => controls.stop();
  }, [activeSlide, paused, progress]);

  function goTo(index: number) {
    if (index === activeSlide) return;

    progress.set(0);
    setActiveSlide(index);
  }

  function handlePauseToggle() {
    setIsPaused((current) => !current);
  }

  return (
    <section
      ref={heroRef}
      className="relative isolate flex min-h-[min(700px,calc(100svh-100px))] items-center overflow-hidden bg-[#24150f] text-white max-[600px]:min-h-[640px]"
      aria-label="CRUST & FIRE featured pizzas"
    >
      {/* Background slideshow */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
        aria-hidden="true"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.backgroundImage}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("${slide.backgroundImage}")`,
              willChange: "opacity, transform",
            }}
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : 14,
              scale: reduceMotion ? 1 : 1.025,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: reduceMotion ? 0 : -8,
              scale: 1,
            }}
            transition={{
              duration: reduceMotion ? 0 : IMAGE_TRANSITION_MS,
              ease: easeSmooth,
            }}
          />
        </AnimatePresence>
      </div>

      {/* Readability overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(25,15,10,0.95)_0%,rgba(25,15,10,0.8)_43%,rgba(25,15,10,0.4)_100%),linear-gradient(0deg,rgba(25,15,10,0.55),transparent_55%)]" />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_50%,rgba(241,132,71,0.18),transparent_45%)]" />

      <div className="pointer-events-none absolute inset-0 -z-10 shadow-[inset_0_0_140px_rgba(0,0,0,0.35)]" />

      {/* Subtle embers: disabled for reduced motion and mobile */}
      {!reduceMotion && (
        <div
          className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden max-[600px]:hidden"
          aria-hidden="true"
        >
          {embers.map((ember) => (
            <motion.span
              key={ember.left}
              className="absolute bottom-0 rounded-full bg-[#f18447]"
              style={{
                left: ember.left,
                width: ember.size,
                height: ember.size,
                willChange: "transform, opacity",
              }}
              initial={{ y: 10, opacity: 0 }}
              animate={{
                y: -380,
                opacity: [0, 0.45, 0],
                x: [0, 8, -5],
              }}
              transition={{
                duration: ember.duration,
                delay: ember.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Left: changing text and calls to action */}
      <div className="relative z-10 w-[62%] max-w-[700px] py-20 pl-[8%] pr-4 max-[1100px]:w-[68%] max-[900px]:w-[76%] max-[900px]:pl-[6%] max-[600px]:w-full max-[600px]:px-6 max-[600px]:pt-16 max-[600px]:pb-24">
        <div className="min-h-[290px] sm:min-h-[350px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeSlide}
              variants={textContainer}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              exit={reduceMotion ? { opacity: 0 } : "exit"}
            >
              <motion.div variants={textItem}>
                <Eyebrow className="text-[#fff0df]">
                  {slide.eyebrow}
                </Eyebrow>
              </motion.div>

              <motion.h1
                className="mt-5 font-display text-[clamp(45px,6.2vw,82px)] leading-[0.98] font-bold tracking-[-2.5px] max-[600px]:text-[clamp(43px,11vw,60px)] max-[600px]:tracking-[-1.8px]"
                variants={headingVariants}
              >
                <span className="sr-only">
                  {slide.title
                    .map((line) => line.map((word) => word.text).join(" "))
                    .join(" ")}
                </span>

                <span aria-hidden="true">
                  {slide.title.map((line, lineIndex) => (
                    <motion.span
                      className="block overflow-hidden"
                      key={lineIndex}
                      variants={lineVariants}
                    >
                      {line.map((word, wordIndex) => (
                        <span
                          key={`${word.text}-${wordIndex}`}
                          className={`inline-block pr-[0.12em] pb-[0.1em] align-bottom ${
                            word.accent
                              ? "text-fire italic drop-shadow-[0_4px_24px_rgba(241,132,71,0.35)] motion-safe:animate-[pulse_4s_ease-in-out_infinite]"
                              : ""
                          }`}
                        >
                          {word.text}{" "}
                        </span>
                      ))}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>

              <motion.p
                className="mt-5 max-w-[420px] whitespace-pre-line text-[14px] leading-[1.8] text-[#fffaf4]/90 sm:text-[15px]"
                variants={textItem}
              >
                {slide.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Buttons and rating animate again whenever the slide changes */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`slide-actions-${activeSlide}`}
            className=""
            initial={reduceMotion ? false : { opacity: 0, y: 18, x: 8, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, x: -5, filter: "blur(3px)" }}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              delay: reduceMotion ? 0 : 0.16,
              ease: easeSmooth,
            }}
          >
            <div className="mt-6 flex flex-wrap gap-3">
              <MagneticButton href="#menu" className={buttonPrimary}>
                EXPLORE THE MENU <ArrowRight size={16} />
              </MagneticButton>

              <MagneticButton href="#story" className={buttonOutline}>
                OUR STORY
              </MagneticButton>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div
                className="flex gap-[3px] text-[#f0a34c]"
                aria-label="Five stars"
              >
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <motion.span
                    key={star}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.7, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.3,
                      delay: reduceMotion ? 0 : 0.22 + index * 0.045,
                      ease: easeSmooth,
                    }}
                    className="inline-flex"
                  >
                    <Star size={14} fill="currentColor" />
                  </motion.span>
                ))}
              </div>

              <span className="text-[11px] font-bold tracking-[1.2px] text-white/80">
                MADE FRESH, EVERY SINGLE TIME
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right: featured pizza */}
      <div
        className="absolute top-[47%] right-[8%] size-[min(340px,28vw)] -translate-y-1/2 max-[1100px]:right-[5%] max-[1100px]:size-[min(270px,26vw)] max-[900px]:hidden"
        aria-label={slide.imageAlt}
      >
        <div
          className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(241,132,71,0.3),transparent_68%)]"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -inset-4 rounded-full border border-dashed border-white/25"
          aria-hidden="true"
        />

        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={slide.featuredImage}
            className="absolute inset-0 overflow-hidden rounded-full border-[5px] border-white/25 shadow-[0_25px_65px_-24px_rgba(0,0,0,0.85)]"
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : 72,
              scale: reduceMotion ? 1 : 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: reduceMotion ? 0 : -38,
              scale: reduceMotion ? 1 : 0.96,
            }}
            transition={{
              duration: reduceMotion ? 0 : IMAGE_TRANSITION_MS,
              ease: easeSmooth,
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <SmartImage
              src={slide.featuredImage}
              alt={slide.imageAlt}
              sizes="(min-width: 1101px) 340px, (min-width: 901px) 270px, 0px"
              priority={activeSlide === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Handcrafted badge */}
      <motion.div
        className="absolute right-[4%] bottom-[16%] max-[1100px]:hidden"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 0.6,
          ease: easeSmooth,
        }}
      >
        <div className="flex size-[104px] flex-col items-center justify-center gap-1.5 rounded-full border border-white/40 bg-black/30 text-center text-[9px] font-extrabold tracking-[1px] text-[#fff3e4] backdrop-blur-md">
          <span>HANDCRAFTED</span>
          <Flame size={22} className="text-[#f18447]" />
          <span>FIRE BAKED</span>
        </div>
      </motion.div>

      {/* Slide indicators and pause/resume */}
      <div
        className="absolute right-[5%] bottom-7 z-20 flex items-center gap-2.5 max-[600px]:right-6"
        role="group"
        aria-label="Hero slideshow controls"
      >
        {slides.map((item, index) => {
          const isActive = activeSlide === index;

          return (
            <button
              key={item.eyebrow}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show slide ${index + 1}`}
              aria-pressed={isActive}
              className={`relative h-2 overflow-hidden rounded-full transition-[width,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                isActive
                  ? "w-10 bg-white/30"
                  : "w-2 bg-white/55 hover:bg-white"
              }`}
            >
              {isActive && (
                <motion.span
                  className="absolute inset-0 origin-left rounded-full bg-[#f18447]"
                  style={{
                    scaleX: reduceMotion ? 0 : progress,
                  }}
                />
              )}
            </button>
          );
        })}

        <button
          type="button"
          onClick={handlePauseToggle}
          aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
          aria-pressed={isPaused}
          className="ml-1 rounded-full p-2 text-white/90 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {isPaused ? <Play size={15} /> : <Pause size={15} />}
        </button>
      </div>

      {/* Scroll link */}
      <a
        href="#menu"
        className="absolute bottom-7 left-[8%] z-20 flex items-center gap-2 text-[11px] font-bold tracking-[1.2px] text-white/80 transition-colors hover:text-white max-[900px]:left-[6%] max-[600px]:hidden"
        aria-label="Scroll to menu"
      >
        <span>SCROLL TO DISCOVER</span>
        <ArrowDown
          size={14}
          className="text-fire motion-reduce:animate-none"
        />
      </a>
    </section>
  );
}
