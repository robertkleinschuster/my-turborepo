const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
});

module.exports = withPWA({
  reactStrictMode: true,
  transpilePackages: ["ui", "konsta"]
});
