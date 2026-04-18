import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    articles: {
      stale: 300, // 5 minutes
      revalidate: 900, // 15 minutes
      expire: 3600, // 1 hour
    },
    breaking: {
      stale: 60, // 1 minute
      revalidate: 300, // 5 minutes
      expire: 600, // 10 minutes
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
