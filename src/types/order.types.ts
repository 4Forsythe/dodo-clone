import { z } from 'zod'
import { checkoutSchema } from '@/schemas'

import type { Product, ProductVariant, Ingredient, OrderItem } from '@prisma/client'

export type OrderItemType = OrderItem & {
  variant: ProductVariant & { product: Product }
  doppings: Ingredient[]
}

export interface ICreateOrderItem {
  variantId: number
  doppings?: number[]
}

export interface IOrderParams {
  limit?: number
  offset?: number
}

export type ICreateOrder = z.infer<typeof checkoutSchema>
