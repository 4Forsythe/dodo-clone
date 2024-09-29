import { notFound } from 'next/navigation'

import { getProduct } from '@/lib'

import { Container, ProductConstructor } from '@/components/shared'

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await getProduct(+id)

  if (!product) notFound()

  return (
    <Container className="my-10 flex flex-col">
      <ProductConstructor product={product} />
    </Container>
  )
}
