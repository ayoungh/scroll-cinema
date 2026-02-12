"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type ScrollFramePlayerProps = {
  totalFrames: number;
  frameExtension: "png" | "jpg" | "jpeg" | "webp" | "svg";
};

function getFramePath(index: number, frameExtension: ScrollFramePlayerProps["frameExtension"]): string {
  const padded = String(index).padStart(6, "0");
  return `/video-frames/frame_${padded}.${frameExtension}`;
}

export function ScrollFramePlayer({ totalFrames, frameExtension }: ScrollFramePlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Preload all images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = getFramePath(i, frameExtension);

      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === totalFrames) {
          setIsLoading(false);
        }
      };

      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === totalFrames) {
          setIsLoading(false);
        }
      };

      images[i - 1] = img;
    }

    imagesRef.current = images;
  }, [totalFrames, frameExtension]);

  // Draw frame on canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[frameIndex];

    if (!canvas || !ctx || !img || !img.complete || !img.naturalWidth) return;

    // Set canvas to window size
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    // Cover the canvas with the image (like object-fit: cover)
    const canvasW = window.innerWidth;
    const canvasH = window.innerHeight;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const scale = Math.max(canvasW / imgW, canvasH / imgH);
    const x = (canvasW - imgW * scale) / 2;
    const y = (canvasH - imgH * scale) / 2;

    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, x, y, imgW * scale, imgH * scale);
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollableHeight = container.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
        const frameIndex = Math.min(
          totalFrames - 1,
          Math.floor(progress * totalFrames)
        );

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Draw initial frame
    drawFrame(0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [drawFrame]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  const loadProgress = Math.round((loadedCount / totalFrames) * 100);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${totalFrames * 30}px` }}
    >
      {/* Sticky canvas */}
      <canvas
        ref={canvasRef}
        className="sticky top-0 left-0 h-screen w-screen"
        style={{ display: "block" }}
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-6">
            <p className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Loading Experience
            </p>
            <div className="relative h-px w-48 overflow-hidden bg-muted">
              <div
                className="absolute left-0 top-0 h-full bg-foreground transition-all duration-300 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              {loadProgress}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
