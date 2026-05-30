import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF is ~30% smaller than WebP on the wire. Vercel's image optimizer
    // serves AVIF to browsers that support it (most modern), WebP to the
    // rest, and JPEG to the long tail. Every <Image /> hit gets transformed
    // through this pipeline.
    formats: ["image/avif", "image/webp"],
    // Tightened device-size matrix so phones don't pull an oversized gallery
    // render; defaults go up to 3840 which we never need.
    deviceSizes: [375, 640, 750, 828, 1080, 1280, 1600, 1920],
    // Cache transformed images for a year (file hashes change on re-deploy).
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
};

export default nextConfig;
