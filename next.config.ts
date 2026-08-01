import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/floattrips", destination: "/float-trips", permanent: true },
      { source: "/thingstoknow", destination: "/things-to-know", permanent: true },
      {
        source: "/:path*",
        has: [{ type: "query", key: "page_id", value: "2345" }],
        destination: "/float-trips",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
