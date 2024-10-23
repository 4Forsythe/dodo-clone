import { prisma } from '@/prisma/prisma-client'

import { type IProductParams } from '@/types/product.types'

export const getRecommendations = async (categoryId: number, params?: IProductParams) => {
  const limit = params?.limit || 4
  const offset = params?.offset || 0

  return prisma.product.findMany({
    where: { categoryId },
    include: {
      category: true,
      variants: { orderBy: { price: 'asc' } },
      ingredients: true,
    },
    take: +limit,
    skip: +offset,
  })
}
