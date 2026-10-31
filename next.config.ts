import type { NextConfig } from "next";

// GITHUB_PAGES=true builds a static export served from /<repo>/ on GitHub Pages.
// Vercel and local dev use the normal server build.
const pagesBasePath = process.env.GITHUB_PAGES === "true" ? (process.env.PAGES_BASE_PATH ?? "/photo-gallery-BYO") : "";

const nextConfig: NextConfig = {
  // Static export doesn't support Cache Components / PPR.
  cacheComponents: !pagesBasePath,
  partialPrefetching: !pagesBasePath,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  ...(pagesBasePath && {
    output: "export",
    basePath: pagesBasePath,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
  env: {
    NEXT_PUBLIC_BASE_PATH: pagesBasePath,
  },
};

export default nextConfig;
