import { CartItemState } from '@/store/cart'

import { PIZZA_TYPES_MAP, type PizzaTypes } from '@/constants/variants.constants'

interface IUseDrawerItemDetailsResponse {
  details: string
  doppings: string
}

export const useDrawerItemDetails = (
  size: number | null,
  type: number | null | undefined,
  weight: number,
  ingredients: CartItemState['ingredients']
): IUseDrawerItemDetailsResponse => {
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
    doppings: `+ ${doppings.join(', ').toLowerCase()}`,
  }
}
