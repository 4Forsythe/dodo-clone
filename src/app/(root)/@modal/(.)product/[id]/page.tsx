import { notFound } from 'next/navigation'

import { prisma } from '@/prisma/prisma-client'

import { ProductConstructor } from '@/components/shared'

export default async function ProductModal({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: { variants: true, ingredients: true },
  })

  if (!product) notFound()

  return <ProductConstructor product={product} />
}
