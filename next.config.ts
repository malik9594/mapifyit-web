import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/faq",
        destination: "/faqs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
