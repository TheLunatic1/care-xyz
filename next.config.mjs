/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thumbs.dreamstime.com',
      },
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
      },
      {
        protocol: 'https',
        hostname: 'img.pikbest.com',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["react-email"],
  },
};

export default nextConfig;