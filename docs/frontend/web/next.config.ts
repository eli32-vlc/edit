import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['@ternlight/base'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*'
      }
    ]
  }
}

export default nextConfig
