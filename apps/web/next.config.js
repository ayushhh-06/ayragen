/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@auragen/schema', '@auragen/ui-config'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'grainy-gradients.vercel.app' },
    ],
  },
};

module.exports = nextConfig;
