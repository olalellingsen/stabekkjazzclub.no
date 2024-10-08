/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.tixly.com",
      },
      {
        protocol: "https",
        hostname: "www.baerumkulturhus.no",
      },
    ],
  },
};

module.exports = nextConfig;
