import { MetadataRoute } from 'next'

import { route } from '@/config'
import { api } from '@/services/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await api.products.getAll()

  const productsMetadata: MetadataRoute.Sitemap = products.map(({ id, updatedAt }) => ({
    url: `${route.PRODUCT}/${id}`,
    lastModified: new Date(updatedAt),
  }))

  return [
    {
      url: route.HOME,
      lastModified: new Date(),
    },
    {
      url: route.ABOUT,
      lastModified: new Date(),
    },
    {
      url: route.DONATE,
      lastModified: new Date(),
    },
    {
      url: route.PROFILE,
      lastModified: new Date(),
    },
    {
      url: route.CHECKOUT,
      lastModified: new Date(),
    },
    {
      url: route.THANKS,
      lastModified: new Date(),
    },
    ...productsMetadata,
  ]
}
