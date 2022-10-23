/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/projects',
        permanent: true,
      },
    ]
  },
  swcMinify: true,
}

module.exports = nextConfig
