/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    DOMAIN: process.env.DOMAIN,
    DOMAIN_KOR: process.env.DOMAIN_KOR,
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
