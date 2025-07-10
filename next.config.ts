import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'h3uycccedqi52fdy.public.blob.vercel-storage.com',
      }
    ]
  }
};

export default nextConfig;
