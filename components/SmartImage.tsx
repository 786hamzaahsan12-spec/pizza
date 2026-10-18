"use client";

import { useState } from "react";
import Image from "next/image";
import { Flame } from "lucide-react";

type SmartImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

type Status = "loading" | "loaded" | "error";

/** Fills its (relative, sized) parent. Shows a shimmer skeleton, then the image, or a fallback if the image fails. */
export default function SmartImage({
  src,
  alt,
  sizes,
  className = "",
  priority = false,
}: SmartImageProps) {
  const [status, setStatus] = useState<Status>("loading");

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#e5ded4]">
      {status === "loading" && (
        <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,#e5ded4_30%,#f4eee4_50%,#e5ded4_70%)] bg-[length:200%_100%] motion-reduce:animate-none" />
      )}

      {status === "error" ? (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 grid place-items-center bg-[#2a1d16] text-fire"
        >
          <Flame size={34} />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`object-cover transition-opacity duration-500 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          } ${className}`}
        />
      )}
    </div>
  );
}