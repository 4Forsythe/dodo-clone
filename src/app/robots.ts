import { MetadataRoute } from 'next'

import { route } from '@/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [route.CHECKOUT, route.THANKS, route.UNAUTHORIZED],
    },
    sitemap: route.SITEMAP,
  }
}
