/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ayragen/schema', '@ayragen/ui-config'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'grainy-gradients.vercel.app' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

module.exports = nextConfig;
