/** @type {import('next').NextConfig} */

const nextConfig = {
  // Загрузка внешних изображений
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig
