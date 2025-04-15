// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable SWC compilation
  swcMinify: true,
  
  // Optional: If you need any custom webpack configurations
  webpack: (config, { isServer }) => {
    // Any custom webpack config here
    return config;
  },
};

module.exports = nextConfig;