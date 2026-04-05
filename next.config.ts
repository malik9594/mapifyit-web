import type { NextConfig } from "next";

const ONE_YEAR = 31536000; // seconds

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Strict-Transport-Security",
            value: `max-age=${ONE_YEAR}; includeSubDomains; preload`,
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
      {
        // Explicit coverage for all _next assets (static chunks, images, turbopack, etc.)
        source: "/_next/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Strict-Transport-Security", value: `max-age=${ONE_YEAR}; includeSubDomains; preload` },
        ],
      },
    ];
  },
};

export default nextConfig;
