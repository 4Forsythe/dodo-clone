import type { Metadata } from 'next'

import { cache } from 'react'
import { notFound } from 'next/navigation'

import { getProduct, getRecommendations } from '@/lib'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Container, ProductConstructor, ProductGroup } from '@/components/shared'

import { route } from '@/config'

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

  const recommendations = await getRecommendations(product.categoryId)

  const { name, category } = product

  return (
    <Container className="pb-24 flex flex-col">
      <Breadcrumb className="my-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={route.HOME}>Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`${route.HOME}#category=${category.id}`}>
              {category.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProductConstructor className="mb-14" product={product} />

      <ProductGroup className="grid-cols-4" title="Рекомендации" items={recommendations} />
    </Container>
  )
}
