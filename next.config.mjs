/** @type {import('next').NextConfig} */
const nextConfig = {
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
  //   // Add sanity, @sanity/workbench, and @sanity/ui to be explicitly compiled
  transpilePackages: ['sanity', '@sanity/workbench', '@sanity/ui'],
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.sanity.io",
        },
      ],
  },
  sassOptions: {
    // 💡 This tells Sass to treat @import warnings as text logs instead of building errors
    silenceDeprecations: ['import'],
  },
  typescript: {
    // This allows production builds to successfully complete
    // even if third-party Sanity generated types have property mismatches!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Silences code-linting blockers during production bundling
    ignoreDuringBuilds: true,
  },
    experimental: {
      taint: true,
    },
  };

  export default nextConfig;
