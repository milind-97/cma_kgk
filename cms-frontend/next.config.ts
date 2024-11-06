// next.config.js
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/posts', 
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
