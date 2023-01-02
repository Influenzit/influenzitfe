/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'phplaravel-870335-3074787.cloudwaysapps.com',
        port: '80',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '80',
        pathname: '/api/**',
      },
    ],
  },

  trailingSlash: true,
}

module.exports = nextConfig
