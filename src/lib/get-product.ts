import { prisma } from '@/prisma/prisma-client'

export const getProduct = async (id: number) => {
  return prisma.product.findFirst({
    where: { id },
    include: {
      variants: { orderBy: { price: 'asc' } },
      ingredients: true,
    },
  })
}