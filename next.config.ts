import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};



export default nextConfig;


module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        port: '',
        pathname: '/v1/create-qr-code/**',
      },
    ],
  },
};
