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
    experimental: {
      taint: true,
    },
  };

  export default nextConfig;
