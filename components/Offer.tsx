import { ArrowRight, Flame } from "lucide-react";
import { buttonPrimary } from "../lib/utils";
import Eyebrow from "./Eyebrow";
import MagneticButton from "./MagneticButton";
import { Stagger, StaggerItem } from "./Reveal";

export default function Offer() {
  return (
    <section className="relative isolate flex min-h-[380px] items-center overflow-hidden bg-[#241a15] px-[10%] py-[75px] text-white max-[600px]:px-[6%]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#f5c49d_1px,transparent_1px)] bg-[size:22px_22px] opacity-[0.12]" />

      <Stagger className="max-w-[620px]" amount={0.25}>
        <StaggerItem>
          <Eyebrow className="text-[#fff0df]">A LITTLE EXTRA LOVE</Eyebrow>
        </StaggerItem>
        <StaggerItem>
          <h2 className="mt-[18px] font-display text-[clamp(43px,5.5vw,68px)] leading-[0.98] font-bold tracking-[-3px]">
            GOOD PIZZA.
            <br />
            <span className="text-[#f18a51] italic">BETTER COMPANY.</span>
          </h2>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-[19px] mb-[23px] max-w-[390px] text-xs leading-[1.8] text-white/70">
            Your next favourite pizza is waiting. Pick your flavour and make
            tonight a little more delicious.
          </p>
        </StaggerItem>
        <StaggerItem>
          <MagneticButton href="#menu" className={buttonPrimary}>
            FIND YOUR FAVOURITE <ArrowRight size={17} />
          </MagneticButton>
        </StaggerItem>
      </Stagger>

      <div
        aria-hidden="true"
        className="absolute right-[12%] animate-float text-fire/25 motion-reduce:animate-none max-[900px]:hidden"
      >
        <Flame size={150} strokeWidth={1} />
      </div>
    </section>
  );
}