const runtimeCaching = require("next-pwa/cache");



const withPWA = require('next-pwa')({
  dest: 'public', // This is where the service worker file is placed
  register: true, // Automatically register the service worker
  skipWaiting: true, // Force the new service worker to take control immediately
		runtimeCaching,
    buildExcludes: [/app-build-manifest\.json$/],
	
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        pathname: '/v1/create-qr-code/**',
      },
    ],
  },
  webpack: (config) => {
    // Custom Webpack configuration
    return config;
  },
});

module.exports = nextConfig;
