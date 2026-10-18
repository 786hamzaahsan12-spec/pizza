import { Camera, Flame } from "lucide-react";
import { logo, logoIcon } from "../lib/utils";

export default function Footer() {
  return (
    <footer className="bg-ink px-[5.4%] pt-[34px] text-[#fff9f2]">
      <div className="flex flex-wrap items-center justify-between gap-5 pb-7 max-[600px]:flex-col max-[600px]:items-start">
        <a href="#top" className={logo} aria-label="Back to top">
          <span className={logoIcon}>
            <Flame size={22} />
          </span>
          <span>
            CRUST<span className="text-fire">&</span>FIRE
          </span>
        </a>

        <p className="text-[9px] font-extrabold tracking-[1.5px] text-[#fff9f2]/[0.62]">
          A LITTLE FIRE. A LOT OF FLAVOUR.
        </p>

        <a
          className="grid size-10 place-items-center rounded-full border border-white/[0.22] transition duration-200 hover:-translate-y-[3px] hover:border-fire hover:bg-fire"
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <Camera size={19} />
        </a>
      </div>

      <div className="flex flex-wrap justify-between gap-3.5 border-t border-white/[0.12] pt-[18px] pb-[22px] text-[8px] font-bold tracking-[1.1px] text-[#fff9f2]/50 max-[600px]:flex-col max-[600px]:items-start">
        <span>© 2026 CRUST &amp; FIRE · DEMO BRAND</span>
        <span>BUILT WITH PASSION, NOT SHORTCUTS.</span>
      </div>
    </footer>
  );
}