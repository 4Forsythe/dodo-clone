import { CartItemState } from '@/store/cart'

import { PIZZA_TYPES_MAP, type PizzaTypes } from '@/constants/variants.constants'

interface GetDrawerItemDetailsResponse {
  details: string
  doppings?: string
}

export const getDrawerItemDetails = (
  size: number,
  type: number | undefined,
  weight: number,
  ingredients: CartItemState['ingredients']
): GetDrawerItemDetailsResponse => {
  const details = []
  const doppings = []

  /* Если продукт - пицца */
  if (size && type && type in PIZZA_TYPES_MAP) {
    details.push(`${size} см, ${PIZZA_TYPES_MAP[type as PizzaTypes]} тесто, ${weight} г`)
  }

  /* Если продукт - не пицца */
  if (!(type && type in PIZZA_TYPES_MAP)) {
    details.push(`${size} шт, ${weight} г`)
  }

  /* Список ингредиентов */
  if (ingredients) {
    doppings.push(...ingredients.map((ingredient) => ingredient.name))
  }

  return {
    details: details.join(', ').toLowerCase(),
    doppings: doppings.length > 0 ? `+ ${doppings.join(', ').toLowerCase()}` : undefined,
  }
}
