import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: '/raspisanie',
  assetPrefix: '/raspisanie/',
};

export default nextConfig;