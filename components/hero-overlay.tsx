"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export function HeroOverlay() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 0;
      const fadeEnd = window.innerHeight * 0.5;
      const newOpacity = Math.max(
        0,
        1 - (scrollY - fadeStart) / (fadeEnd - fadeStart)
      );
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 flex flex-col items-center justify-center"
      style={{ opacity }}
    >
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/30 to-background/80" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <p className="font-display text-xs uppercase tracking-[0.4em] text-muted-foreground sm:text-sm">
          Scroll to Explore
        </p>
        <h1 className="font-display max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
          Every Frame
          <br />
          <span className="text-muted-foreground">Tells a Story</span>
        </h1>
        <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
          An immersive cinematic experience driven by your scroll. 361 frames,
          one seamless journey.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce text-muted-foreground" />
      </div>
    </div>
  );
}
