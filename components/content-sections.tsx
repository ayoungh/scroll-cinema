import React from "react"
import { Play, Layers, Zap, Film } from "lucide-react";

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-border hover:bg-card/80 lg:p-8">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground">
        {icon}
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
        {value}
      </span>
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function ContentSections() {
  return (
    <div className="relative z-10 bg-background">
      {/* About Section */}
      <section id="about" className="px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center gap-8 text-center">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-muted-foreground">
              About the Experience
            </p>
            <h2 className="font-display max-w-2xl text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Scroll-driven storytelling, frame by frame
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              This experience transforms your scroll into a cinematic journey.
              Each scroll event advances through 361 carefully crafted frames,
              creating a fluid video-like narrative that you control entirely
              with your fingertips.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-8 border-t border-border/50 pt-20 sm:grid-cols-4">
            <StatItem value="361" label="Total Frames" />
            <StatItem value="60" label="Frames/sec" />
            <StatItem value="4K" label="Resolution" />
            <StatItem value="100%" label="Scroll Driven" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="details" className="px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 flex flex-col items-center gap-4 text-center">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-muted-foreground">
              How It Works
            </p>
            <h2 className="font-display max-w-xl text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Built for performance
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FeatureCard
              icon={<Layers className="h-5 w-5" />}
              title="Frame Preloading"
              description="All 361 frames are preloaded into memory for instant, jank-free playback as you scroll through the experience."
            />
            <FeatureCard
              icon={<Play className="h-5 w-5" />}
              title="Canvas Rendering"
              description="High-performance HTML5 Canvas rendering ensures smooth frame transitions with GPU-accelerated drawing."
            />
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title="RAF Optimization"
              description="requestAnimationFrame throttling prevents redundant draws and maintains buttery smooth 60fps performance."
            />
            <FeatureCard
              icon={<Film className="h-5 w-5" />}
              title="Responsive Scaling"
              description="Cover-fit algorithm ensures frames fill the viewport perfectly on any screen size or orientation."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 px-6 py-12 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-foreground">
              <span className="font-display text-[10px] font-bold text-background">
                SC
              </span>
            </div>
            <span className="font-display text-sm font-semibold text-foreground">
              Scroll Cinema
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            361 frames. One scroll. Infinite possibilities.
          </p>
        </div>
      </footer>
    </div>
  );
}
