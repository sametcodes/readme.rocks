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
    config.module.rules.push({ test: /\.node$/i, loader: "node-loader" });
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
