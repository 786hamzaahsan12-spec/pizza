export default function Ticker() {
  return (
    <div
      className="group/ticker overflow-hidden bg-fire py-[12px] text-[#fff9f2]"
      aria-label="Our pizza philosophy"
    >
      <div className="flex w-max animate-ticker group-hover/ticker:[animation-play-state:paused] motion-reduce:animate-none">
        {Array.from({ length: 4 }, (_, index) => (
          <span
            className="pl-[25px] text-[9px] font-extrabold tracking-[1.5px] whitespace-nowrap [&>span]:px-[14px] [&>span]:text-[#ffd3a5]"
            key={index}
            aria-hidden={index > 0}
          >
            GOOD DOUGH TAKES TIME <span>✳</span> REAL INGREDIENTS ONLY{" "}
            <span>✳</span> ALWAYS FRESH, NEVER BORING <span>✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}