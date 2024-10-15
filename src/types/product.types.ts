import type { Product, ProductVariant, Ingredient } from '@prisma/client'

export type ProductType = Product & {
  variants: ProductVariant[]
  ingredients: Ingredient[]
}

export enum ProductSortBy {
  NAME = 'name',
  RATING = 'rating',
  CREATED_AT = 'createdAt',
}

export interface IProductParams {
  query?: string
  types?: string
  sizes?: string
  from?: string
  to?: string
  ingredients?: string
  sortBy?: string
  limit?: number
  offset?: number
  page?: number
}
