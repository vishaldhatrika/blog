import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blogsmedia.lse.ac.uk",
        pathname: "/blogs.dir/**", // Matches your image path
      },
    ],
  },
};

export default nextConfig;
