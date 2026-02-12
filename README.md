# Scroll Cinema

Scroll Cinema is an immersive, scroll-driven frame player built with Next.js. As users scroll, the app renders a frame sequence to a full-screen canvas to simulate video playback.

https://scroll-cinema.vercel.app/

## Features

- Scroll-driven frame-by-frame playback on a sticky canvas
- Loading progress overlay while frames preload
- Responsive full-viewport rendering with cover-style scaling
- Simple frame asset convention (`/public/video-frames/frame_000001.png`, etc.)

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Install

```bash
pnpm install
```

### Run in development

```bash
pnpm dev
```

Open http://localhost:3000.

### Type check

```bash
pnpm lint
```

### Generate placeholder frames

```bash
pnpm generate:frames
```

### Production build

```bash
pnpm build
pnpm start
```

## Frame Assets

The player expects image frames in:

- `/public/video-frames/`

File naming format:

- `frame_000001.png`
- `frame_000002.png`
- ...

Supported frame extensions:

- `.png`
- `.jpg`
- `.jpeg`
- `.webp`
- `.svg`

The app counts frame files at runtime and uses that count for scroll duration.

### Extract frames from a video (ffmpeg)

Install `ffmpeg` on macOS with Homebrew:

```bash
brew install ffmpeg
```

If you have a source video file, you can extract frame images from terminal with `ffmpeg`:

```bash
cd public/video-frames
ffmpeg -i /path/to/your-video.mp4 frame_%06d.png
```

This repo includes `scroll-cinema-preview.mp4` in the project root as a demo preview of the app output. It is not intended to be used as the source for frame extraction in this project.

Example (same pattern you used):

```bash
ffmpeg -i hf_20260212_191016_a391bb10-fa4e-4b0b-9b8d-af77d3b9cc96.mp4 frame_%06d.png
```

This outputs files like `frame_000001.png`, `frame_000002.png`, etc., which match the player naming format.

## Project Structure

- `app/`: Next.js App Router entrypoints
- `components/`: UI and player components
- `public/video-frames/`: Frame sequence assets
- `scripts/`: Utility scripts

## Open Source

- License: MIT (see `LICENSE`)
- Contributing guidelines: `CONTRIBUTING.md`
- Code of Conduct: `CODE_OF_CONDUCT.md`
- Security policy: `SECURITY.md`
