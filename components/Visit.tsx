import { ArrowRight } from "lucide-react";
import { buttonDark } from "../lib/utils";
import Eyebrow from "./Eyebrow";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";

export default function Visit() {
  return (
    <section
      id="visit"
      className="grid grid-cols-[1.1fr_0.8fr] items-center gap-[10%] bg-cream px-[10%] py-[77px] max-[900px]:grid-cols-1 max-[900px]:gap-12 max-[600px]:px-[6%]"
    >
      <Reveal>
        <Eyebrow className="text-[#746a60]">COME SAY HELLO</Eyebrow>
        <h2 className="mt-[17px] font-display text-[clamp(38px,4.5vw,56px)] leading-[0.98] font-bold tracking-[-3px]">
          LET&apos;S MAKE
          <br />
          <span className="text-[0.8em] text-fire italic">
            IT A PIZZA NIGHT.
          </span>
        </h2>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mb-[21px] max-w-[420px] text-xs leading-[1.85] text-muted">
          CRUST &amp; FIRE is a fictional restaurant concept created as a
          website demo. Replace these details with your real address, opening
          hours and contact information before launch.
        </p>
        <MagneticButton href="#menu" className={buttonDark}>
          BROWSE THE MENU <ArrowRight size={17} />
        </MagneticButton>
      </Reveal>
    </section>
  );
}