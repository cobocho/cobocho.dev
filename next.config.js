/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
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
