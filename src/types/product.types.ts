import type { Product, ProductVariant, Ingredient } from '@prisma/client'

export type ProductType = Product & {
  variants: ProductVariant[]
  ingredients: Ingredient[]
}
