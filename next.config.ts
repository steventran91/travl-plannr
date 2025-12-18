import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Prisma generated client
  transpilePackages: ['generated'],
};

export default nextConfig;
