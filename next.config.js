/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/laf.php", // The old route you want to redirect from
        destination: "/laf", // The new route you want to redirect to
        permanent: true, // Use true for a 308 permanent redirect
      },
      {
        source: "/home.php", // Another old route you want to redirect from
        destination: "/", // The new route you want to redirect to
        permanent: true, // Use true for a 308 permanent redirect
      },
    ];
  },
  output: "standalone",
};

module.exports = nextConfig;
