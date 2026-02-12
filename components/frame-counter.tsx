"use client";

import { useEffect, useState } from "react";

type FrameCounterProps = {
  totalFrames: number;
};

export function FrameCounter({ totalFrames }: FrameCounterProps) {
  const [currentFrame, setCurrentFrame] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / scrollHeight;
      const frame = Math.max(
        1,
        Math.min(totalFrames, Math.ceil(progress * totalFrames))
      );
      setCurrentFrame(frame);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalFrames]);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full border border-border/40 bg-background/60 px-4 py-2 backdrop-blur-xl">
      <div className="flex items-baseline gap-1">
        <span className="font-mono text-sm font-medium tabular-nums text-foreground">
          {String(currentFrame).padStart(3, "0")}
        </span>
        <span className="text-xs text-muted-foreground">/</span>
        <span className="font-mono text-xs tabular-nums text-muted-foreground">
          {totalFrames}
        </span>
      </div>
    </div>
  );
}
