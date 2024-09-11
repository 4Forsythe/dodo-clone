import { notFound } from 'next/navigation'

import { prisma } from '@/prisma/prisma-client'

import { Container, Heading, ProductPreview } from '@/components/shared'

export default async function Product({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: { variants: true, ingredients: true },
  })

  if (!product) notFound()

  return (
    <Container className="my-10 flex flex-col">
      <ProductPreview src={product.imageUrl} size={35} alt={product.name} />

      <div className="w-[31rem] px-7 pb-7 bg-neutral-100 rounded-3xl">
        <Heading text={product.name} size="md" />
        <p className="text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque minima veniam nobis illo
          veritatis voluptatum exercitationem similique sunt ea! Ea, distinctio itaque blanditiis
          odit adipisci pariatur aperiam excepturi id, dolores hic quae!
        </p>
      </div>
    </Container>
  )
}
