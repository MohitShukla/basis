// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force SWC transforms even with custom Babel config
  experimental: {
    forceSwcTransforms: true,
  },
  
  // Optional: If you need any custom webpack configurations
  webpack: (config, { isServer }) => {
    // Any custom webpack config here
    return config;
  },
};

module.exports = nextConfig;