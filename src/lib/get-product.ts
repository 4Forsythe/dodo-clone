import { prisma } from '@/prisma/prisma-client'

export const getProduct = async (id: number) => {
  return prisma.product.findFirst({
    where: { id },
    include: {
      category: true,
      variants: { orderBy: { price: 'asc' } },
      ingredients: true,
    },
  })
}
