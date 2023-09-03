module.exports = {
  experimental: {
    typedRoutes: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  transpilePackages: [
    '@anabasis/lib',
    '@anabasis/db',
    '@anabasis/hooks',
    '@anabasis/ui',
  ],
};
