/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_API_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_API_HOST
      }
    ],
    minimumCacheTTL: 0
  }
};

export default nextConfig;
