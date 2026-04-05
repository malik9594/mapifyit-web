import type { NextConfig } from "next";

const ONE_YEAR = 31536000; // seconds

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      // Ensure all Next static assets get the security headers too.
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: `max-age=${ONE_YEAR}; includeSubDomains; preload`,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            // Start with one year; lower this if you need a safer ramp-up.
            value: `max-age=${ONE_YEAR}; includeSubDomains; preload`,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
