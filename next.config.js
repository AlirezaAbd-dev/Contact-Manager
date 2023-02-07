/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatars.dicebear.com",
      },
    ],
  },
};

module.exports = nextConfig;
