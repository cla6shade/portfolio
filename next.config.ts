import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const bundleAnalyzerWrapper = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzerWrapper(nextConfig);
