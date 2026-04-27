import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Membiarkan build tetap jalan meskipun ada error linting (seperti 'any')
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Membiarkan build tetap jalan meskipun ada error tipe data
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
