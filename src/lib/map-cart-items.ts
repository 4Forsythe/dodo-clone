import type { ICartResponse } from '@/types'
import type { CartItemState } from '@/store/cart'

import { calcCartItemTotal } from './calc-totals'

interface IMapCartItemsResponse {
  amount: number
  items: CartItemState[]
}

/**
 * Функция для преобразования ответа ICartResponse в тип для стейта корзины
 * @param data - объект корзины (ICartResponse)
 * @returns общая стоимость корзины (number); список продуктов (CartItemState[])
 */

export const mapCartItems = (data: ICartResponse): IMapCartItemsResponse => {
  const items = data.items.map((item) => ({
    id: item.id,
    name: item.variant.product.name,
    size: item.variant.size,
    type: item.variant.type,
    weight: item.variant.weight,
    imageUrl: item.variant.product.imageUrl,
    price: calcCartItemTotal(item),
    quantity: item.quantity,
    ingredients: item.doppings.map((dopping) => ({
      name: dopping.name,
      price: dopping.price,
    })),
  })) as CartItemState[]

  return { amount: data.amount, items }
}
