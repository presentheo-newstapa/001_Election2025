import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/2025/factcheck2025",
  images: {
    unoptimized: true,
  },
  assetPrefix : "/2025/factcheck2025",
};

export default nextConfig;
