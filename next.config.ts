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
}

export default nextConfig
