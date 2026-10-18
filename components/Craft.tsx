import Eyebrow from "./Eyebrow";
import Reveal, { Stagger, StaggerItem } from "./Reveal";

const items = [
  {
    number: "01",
    title: "TIME IS AN INGREDIENT.",
    body: "Our dough gets the time it needs for a flavourful, airy crust.",
  },
  {
    number: "02",
    title: "KEEP IT REAL.",
    body: "Good ingredients do the talking. No unnecessary fuss.",
  },
  {
    number: "03",
    title: "BRING THE HEAT.",
    body: "High heat, golden edges and that irresistible baked finish.",
  },
];

export default function Craft() {
  return (
    <section
      id="craft"
      className="bg-paper px-[10%] pt-[91px] pb-[99px] max-[600px]:px-[6%]"
    >
      <Reveal className="text-center">
        <Eyebrow className="justify-center text-[#82776c]">
          THE WAY WE DO THINGS
        </Eyebrow>
        <h2 className="mt-3.5 font-display text-[clamp(30px,4.3vw,52px)] leading-none font-bold tracking-[-2px]">
          NO SHORTCUTS.{" "}
          <span className="text-fire italic">JUST GOODNESS.</span>
        </h2>
      </Reveal>

      <Stagger
        gap={0.14}
        className="mt-14 grid grid-cols-3 max-[900px]:grid-cols-1 max-[900px]:gap-[34px]"
      >
        {items.map((item) => (
          <StaggerItem
            key={item.number}
            className="border-r border-ink/[0.13] px-[10%] pt-2 pb-1 last:border-r-0 max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:px-0 max-[900px]:pt-0 max-[900px]:pb-[30px] max-[900px]:last:border-b-0"
          >
            <span className="font-display text-[30px] text-fire italic">
              {item.number}
            </span>
            <h3 className="mt-[17px] mb-2.5 text-[10px] font-bold tracking-[1px]">
              {item.title}
            </h3>
            <p className="max-w-[240px] text-[11px] leading-[1.8] text-muted">
              {item.body}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}