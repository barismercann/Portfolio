import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  typedRoutes: true,
  outputFileTracingRoot: __dirname,
  webpack: (config: { resolve: { alias: { canvas: boolean; }; }; }) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = withNextIntl(nextConfig);