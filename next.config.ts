import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "ghchart.rshah.org" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
    // The optimized avatar rarely changes — cache it for a month instead of
    // re-optimizing it frequently.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        // Icons / OG image in /public: cache for a day (+ serve stale while
        // revalidating) instead of Vercel's default of re-checking every visit.
        source: "/:file(.*\\.(?:png|ico|svg|webp|jpg|jpeg|webmanifest))",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
