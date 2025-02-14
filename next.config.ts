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
    ],
  },
}

export default nextConfig
