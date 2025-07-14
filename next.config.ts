import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",         // Allow all domains
        pathname: "**/*.jpg",   // Allow JPG
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "**/*.jpeg",  // Allow JPEG
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "**/*.png",   // Allow PNG
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "**/*.webp",  // Allow WebP
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "**/*.avif",  // Allow AVIF
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "**/*.svg",   // Allow SVG
      },
    ],
  },
};

export default nextConfig;
