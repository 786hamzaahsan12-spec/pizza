import type { ReactNode } from "react";
import { eyebrow } from "../lib/utils";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export default function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p className={`${eyebrow} ${className}`}>
      <span className="inline-block h-px w-6 bg-fire" />
      {children}
    </p>
  );
}