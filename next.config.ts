import type { NextConfig } from "next";

const isGithubPages = process.env.BUILD_TARGET === "github-pages";
const basePath = isGithubPages ? "/casa-colombia" : "";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  ...(isGithubPages && {
    output: "export",
    basePath,
    assetPrefix: basePath,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
