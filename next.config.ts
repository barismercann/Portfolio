const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    typedRoutes: true,
  },
  webpack: (config: { resolve: { alias: { canvas: boolean; }; }; }) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = withNextIntl(nextConfig);