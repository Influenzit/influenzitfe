/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'phplaravel-870335-3074787.cloudwaysapps.]scom',
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
  async redirects() {
    return [
      {
        source: "/:path((?!_next|influencer-waitlist|business-waitlist$).*)/",
        has: [
          {
            type: 'header',
            key: 'x-redirect-me'
          }
        ],
        destination: "/influencer-waitlist",
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
