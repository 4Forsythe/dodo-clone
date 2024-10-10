/** @type {import('next').NextConfig} */

import withPlaiceholder from '@plaiceholder/next'

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

export default withPlaiceholder(nextConfig)
