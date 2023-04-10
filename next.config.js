const webpack = require("webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/build",
        destination: "/build/list",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
