/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost"
      }
    ],
    minimumCacheTTL: 0
  }
};

export default nextConfig;
