import type { Cart, CartItem, Product, ProductVariant, Ingredient } from '@prisma/client'

export type CartItemType = CartItem & {
  variant: ProductVariant & { product: Product }
  doppings: Ingredient[]
}

export interface ICartResponse extends Cart {
  items: CartItemType[]
}

export interface ICreateCartItem {
  variantId: number
  doppings?: number[]
}
