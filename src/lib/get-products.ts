import { prisma } from '@/prisma/prisma-client'

import { DEFAULT_PRICE_FROM, DEFAULT_PRICE_TO } from '@/constants'

import { type IProductParams, ProductSortBy } from '@/types/product.types'

export const getProducts = async (params: IProductParams) => {
  // Конвертация строковых значений в массивы чисел
  const sizes = params.sizes?.split(',').map(Number)
  const types = params.types?.split(',').map(Number)
  const ingredients = params.ingredients?.split(',').map(Number)

  const sortBy = params.sortBy

  // Значения разброса по стоимости
  const from = Number(params.from) || DEFAULT_PRICE_FROM
  const to = Number(params.to) || DEFAULT_PRICE_TO

  return prisma.category.findMany({
    include: {
      products: {
        where: {
          variants: {
            every: { price: { gte: from, lte: to } },
            some: { size: { in: sizes }, type: { in: types } },
          },
          ingredients: ingredients ? { some: { id: { in: ingredients } } } : undefined,
        },
        include: {
          variants: {
            orderBy: { price: 'asc' },
          },
          ingredients: true,
        },
        orderBy: sortBy
          ? { [sortBy]: sortBy === ProductSortBy.NAME ? 'asc' : 'desc' }
          : { createdAt: 'desc' },
      },
    },
  })
}
