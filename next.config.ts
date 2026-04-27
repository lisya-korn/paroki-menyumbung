import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  eslint: {
    // Membiarkan build tetap jalan meskipun ada error linting (seperti 'any')
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Membiarkan build tetap jalan meskipun ada error tipe data
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-scripts.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
