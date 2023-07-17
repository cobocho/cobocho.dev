/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /^.*\/(robots\.txt|sitemap(-\d+)?\.xml)$/,
      loader: 'ignore-loader',
    });
    return config;
  },
};

module.exports = nextConfig;
