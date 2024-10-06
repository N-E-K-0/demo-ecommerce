/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "i.imgur.com",
      "i0.pickpik.com",
      "freerangestock.com",
      "storage.needpix.com",
      "cdn.stocksnap.io",
      "placehold.co",
      "placeimg.com",
      "api.lorem.space",
      "images.pexels.com",
    ],
    // Allow images from any domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Accept images from any hostname
        pathname: "/**", // Accept images from any path
      },
      {
        protocol: "http",
        hostname: "**", // Accept images from any hostname
        pathname: "/**", // Accept images from any path
      },
    ],
  },
};

export default nextConfig;
