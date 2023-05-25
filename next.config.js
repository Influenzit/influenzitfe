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
  async headers() {
    return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN',
            },
            {
              key: 'Content-Security-Policy',
              value:
                "image-src phplaravel-870335-3074787.cloudwaysapps.com api.influenzit.com ui-avatars.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' www.google-analytics.com connect.facebook.net accounts.google.com js.paystack.co; font-src 'self' fonts.googleapis.com fonts.gstatic.com;",
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'Permissions-Policy',
              value: "camera=(); battery=(self); geolocation=(); microphone=(self)",
            },
            {
              key: 'Referrer-Policy',
              value: 'origin-when-cross-origin',
            },
          ],
        },
      ];
  },
}

module.exports = nextConfig
