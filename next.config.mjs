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
    experimental: {
      taint: true,
    },
  };

  export default nextConfig;
