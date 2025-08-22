"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type Slide = { src: string; alt?: string };
type Props = {
  images: Slide[];
  interval?: number;    
  className?: string;
  showDots?: boolean;
};

export default function TileCarousel({
  images,
  interval = 3500,
  className,
  showDots = true,
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (images.length <= 1) return;
    if (paused) return;
    timer.current = setTimeout(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, paused, images.length, interval]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (images.length <= 1) return;
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length]);

  return (
    <div
      className={clsx(
        "relative w-full h-full overflow-hidden rounded-2xl",
        className
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Slides */}
      {images.map((img, i) => (
        <img
          key={img.src + i}
          src={img.src}
          alt={img.alt ?? ""}
          className={clsx(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            i === index ? "opacity-100" : "opacity-0"
          )}
          draggable={false}
        />
      ))}

      {/* Dots */}
      {showDots && images.length > 1 && (
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={clsx(
              "h-2.5 w-2.5 rounded-full bg-white/40 hover:bg-white focus:outline-none",
              i === index && "bg-white"
            )}
          />
        ))}
      </div>
    )}
    </div>
  );
}
