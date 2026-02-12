import { readdir } from "node:fs/promises";
import path from "node:path";
import { ScrollFramePlayer } from "@/components/scroll-frame-player";
import { HeaderOverlay } from "@/components/header-overlay";
import { HeroOverlay } from "@/components/hero-overlay";
import { ScrollProgress } from "@/components/scroll-progress";
import { FrameCounter } from "@/components/frame-counter";
import { ContentSections } from "@/components/content-sections";

const DEFAULT_TOTAL_FRAMES = 361;
type FrameExtension = "png" | "jpg" | "jpeg" | "webp" | "svg";

async function getFrameConfig(): Promise<{ totalFrames: number; frameExtension: FrameExtension }> {
  try {
    const framesDir = path.join(process.cwd(), "public", "video-frames");
    const files = await readdir(framesDir);
    const frameFiles = files.filter((file) => /^frame_\d+\.(png|jpe?g|webp|svg)$/i.test(file));

    if (frameFiles.length === 0) {
      return { totalFrames: DEFAULT_TOTAL_FRAMES, frameExtension: "png" };
    }

    const extensionCounts = frameFiles.reduce<Record<FrameExtension, number>>(
      (acc, file) => {
        const match = file.match(/\.([a-z0-9]+)$/i);
        const ext = (match?.[1]?.toLowerCase() ?? "png") as FrameExtension;
        acc[ext] = (acc[ext] ?? 0) + 1;
        return acc;
      },
      { png: 0, jpg: 0, jpeg: 0, webp: 0, svg: 0 }
    );

    const extensionPriority: FrameExtension[] = ["png", "jpg", "jpeg", "webp", "svg"];
    const frameExtension = extensionPriority.reduce((best, ext) => {
      const bestCount = extensionCounts[best];
      const currentCount = extensionCounts[ext];
      return currentCount > bestCount ? ext : best;
    }, "png" as FrameExtension);

    return { totalFrames: extensionCounts[frameExtension], frameExtension };
  } catch {
    return { totalFrames: DEFAULT_TOTAL_FRAMES, frameExtension: "png" };
  }
}

export default async function Page() {
  const { totalFrames, frameExtension } = await getFrameConfig();

  return (
    <main>
      <ScrollProgress />
      <HeaderOverlay />
      <HeroOverlay />
      <FrameCounter totalFrames={totalFrames} />

      {/* Scroll-driven frame sequence */}
      <section id="experience">
        <ScrollFramePlayer totalFrames={totalFrames} frameExtension={frameExtension} />
      </section>

      {/* Content below the video */}
      <ContentSections />
    </main>
  );
}
