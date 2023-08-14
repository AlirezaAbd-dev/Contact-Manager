/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "contactmanager-avatars.s3.ir-thr-at1.arvanstorage.ir",
      },
    ],
  },
};

module.exports = nextConfig;
