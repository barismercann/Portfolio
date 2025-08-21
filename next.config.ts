import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'] as const,
  },
  typedRoutes: false, // TypedRoutes kapatıldı - dinamik route'lar için
  outputFileTracingRoot: __dirname,
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default withNextIntl(nextConfig);