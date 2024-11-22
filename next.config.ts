import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      'cloudflare-ipfs.com',
      'ui-avatars.com',
      'lh3.googleusercontent.com',
      'i.imgur.com',
      'avatars.githubusercontent.com',
      'firebasestorage.googleapis.com',
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
