/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'phplaravel-870335-3074787.cloudwaysapps.com',
        port: '',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/api/**',
      },
    ],
  },
}

module.exports = nextConfig
