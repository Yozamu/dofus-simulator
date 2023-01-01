/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/stuff',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
