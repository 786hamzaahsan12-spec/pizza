import type { Variants } from "framer-motion";

export const formatPrice = (amount: number) =>
  `Rs. ${amount.toLocaleString("en-PK")}`;

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};
export function stagger(gap = 0.12, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        delayChildren,
        staggerChildren: gap,
      },
    },
  };
}



/* ---------- Shared Tailwind class groups ---------- */
export const button =
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-[2px] border px-[18px] text-[9px] font-extrabold tracking-[1px] transition duration-200 hover:-translate-y-0.5 [&_svg]:transition-transform hover:[&_svg]:translate-x-[3px]";
export const buttonPrimary = `${button} border-transparent bg-fire text-white hover:bg-fire-dark`;
export const buttonOutline = `${button} border-white/45 bg-transparent text-white hover:border-white hover:bg-white/[0.09]`;
export const buttonDark = `${button} border-transparent bg-ink text-white hover:bg-[#40342b]`;

export const eyebrow =
  "m-0 flex items-center gap-[9px] text-[9px] font-extrabold tracking-[1.8px]";

export const navLink =
  "relative text-xs font-bold text-[#51473f] transition-colors hover:text-fire after:absolute after:inset-x-0 after:-bottom-[7px] after:h-px after:origin-left after:scale-x-0 after:bg-fire after:transition-transform after:duration-200 after:content-[''] hover:after:scale-x-100 max-[900px]:border-b max-[900px]:border-ink/[0.13] max-[900px]:py-3.5 max-[900px]:after:hidden";

export const logo =
  "group inline-flex items-center gap-[9px] text-[17px] font-black tracking-[-1px]";
export const logoIcon =
  "grid size-[37px] place-items-center rounded-full bg-fire text-white transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-[1.06]";


