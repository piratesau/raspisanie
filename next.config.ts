import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // output: 'export' — убрать
  // basePath: '/raspisanie' — убрать
  // assetPrefix: '/raspisanie/' — убрать
  // trailingSlash: true — можно оставить или убрать, роли не играет
  images: { unoptimized: true }, // можно оставить, не мешает
};

export default nextConfig;