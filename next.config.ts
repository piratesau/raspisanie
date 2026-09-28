import type { NextConfig } from 'next';

const repo = 'raspisanie'; // ← замени на имя твоего репозитория на GitHub

const nextConfig: NextConfig = {
  output: 'export',              // собирать в статику
  images: { unoptimized: true }, // next/image не работает без сервера
  trailingSlash: true,           // чтобы /schedule/ работал как папка
  basePath: `/${repo}`,          // нужно для username.github.io/repo-name
  assetPrefix: `/${repo}/`,      // чтобы CSS/JS грузились по правильному пути
};

export default nextConfig;
