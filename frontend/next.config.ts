import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: ( config, { isServer }) => {
    if (!isServer) {
      // Exclude Node.js modules from client bundles
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        process: false,
        os: false,
      }
    }
    return config
  },
  experimental: {
    turbo: {
      // Turbopack configurations
      loaders: {
        '.md': ['text-loader']
      }
    }
  }
};

export default nextConfig;
