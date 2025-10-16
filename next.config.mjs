/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "https://focused-dachshund-484.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
