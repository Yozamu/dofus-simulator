/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.ankama.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
