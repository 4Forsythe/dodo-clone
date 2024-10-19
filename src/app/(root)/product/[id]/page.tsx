import type { Metadata } from 'next'

import { cache } from 'react'
import { notFound } from 'next/navigation'

import { getProduct } from '@/lib'

import { Container, ProductConstructor } from '@/components/shared'

interface IProductPage {
  params: { id: string }
}

/* Дедупликация запроса для metadata (кеширование) */
const getData = cache(async (id: number) => {
  return getProduct(id)
})

export const generateMetadata = async ({ params: { id } }: IProductPage): Promise<Metadata> => {
  const product = await getData(+id)

  if (!product) {
    return {}
  }

  return {
    title: `🍕 ${product.name}`,
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  }
}

export default async function ProductPage({ params: { id } }: IProductPage) {
  const product = await getData(+id)

  if (!product) notFound()

  return (
    <Container className="py-20 flex flex-col">
      <ProductConstructor product={product} />
    </Container>
  )
}
