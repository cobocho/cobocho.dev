/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /^.*\/(robots\.txt|sitemap(-\d+)?\.xml)$/,
      loader: 'ignore-loader',
    });

    config.resolve.fallback = {
      fs: false,
    };

    return config;
  },
};

module.exports = nextConfig;
