import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.clerk.com", "images.clerk.dev"],
  },
  webpack: (config) => {
    config.snapshot = {
      ...config.snapshot,
      managedPaths: [],
    };
    return config;
  },
};

export default nextConfig;
