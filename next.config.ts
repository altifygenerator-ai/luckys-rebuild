import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        { key: "Strict-Transport-Security", value: "max-age=31536000" },
      ],
    }];
  },
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
