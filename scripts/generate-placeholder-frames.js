const { mkdir, writeFile } = require("fs/promises")
const { existsSync } = require("fs")

const TOTAL_FRAMES = 361
const WIDTH = 1280
const HEIGHT = 720

async function generateFrames() {
  const dir = "public/video-frames"
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true })
  }

  // Generate simple SVG-based placeholder frames
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const progress = (i - 1) / (TOTAL_FRAMES - 1)

    // Create a gradient that shifts hue based on frame number
    const hue1 = Math.round(progress * 240) // 0 to 240
    const hue2 = Math.round(progress * 240 + 60) % 360
    const lightness = 10 + Math.sin(progress * Math.PI) * 15

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:hsl(${hue1},40%,${lightness}%)"/>
      <stop offset="100%" style="stop-color:hsl(${hue2},60%,${lightness + 10}%)"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#g)"/>
  <text x="${WIDTH / 2}" y="${HEIGHT / 2 - 20}" text-anchor="middle" font-family="monospace" font-size="80" fill="rgba(255,255,255,0.15)" font-weight="bold">FRAME ${String(i).padStart(6, "0")}</text>
  <text x="${WIDTH / 2}" y="${HEIGHT / 2 + 40}" text-anchor="middle" font-family="monospace" font-size="24" fill="rgba(255,255,255,0.1)">Replace with your video frames</text>
  <circle cx="${progress * WIDTH}" cy="${HEIGHT / 2}" r="4" fill="rgba(255,255,255,0.2)"/>
</svg>`
    const padded = String(i).padStart(6, "0")
    await writeFile(`${dir}/frame_${padded}.svg`, svg)

    if (i % 20 === 0 || i === 1) {
      console.log(`Generated frame ${i}/${TOTAL_FRAMES}`)
    }
  }

  console.log(`\nDone! Generated ${TOTAL_FRAMES} placeholder frames in ${dir}/`)
  console.log("Replace these with your actual video frames (frame_000001.svg to frame_000361.svg)")
}

generateFrames().catch(console.error)
