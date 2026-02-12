"use client";

import { useEffect, useState } from "react";

export function HeaderOverlay() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-background/60 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
            <span className="font-display text-xs font-bold text-background">
              SC
            </span>
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            Scroll Cinema
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#experience"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Experience
          </a>
          <a
            href="#about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </a>
          <a
            href="#details"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Details
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#experience"
            className="rounded-full border border-border/60 bg-foreground px-5 py-2 text-sm font-medium text-background transition-all hover:bg-foreground/90"
          >
            Explore
          </a>
        </div>
      </div>
    </header>
  );
}
