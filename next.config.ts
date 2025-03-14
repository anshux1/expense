import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "prepmedics.blob.core.windows.net",
        pathname: "/prepmedics/**",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "files.edgestore.dev",
      },
      {
        hostname: "d1nbslm0j6pual.cloudfront.net",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/signin",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        ],
      },
    ]
  },
}

export default nextConfig
