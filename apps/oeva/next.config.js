const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  scope: '/app',
});

module.exports = withPWA({
  reactStrictMode: true,
  transpilePackages: ["ui", "konsta", "hafas-client"],
  experimental: {
    serverComponentsExternalPackages: ["hafas-client"]
  },
});
