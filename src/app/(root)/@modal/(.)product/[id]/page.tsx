import { notFound } from 'next/navigation'

import { getProduct } from '@/lib'

import { ProductConstructor } from '@/components/shared'

export default async function ProductModal({ params: { id } }: { params: { id: string } }) {
  const product = await getProduct(+id)

  if (!product) notFound()

  return <ProductConstructor product={product} isModal />
}
