import { calcProductTotal } from '@/lib'

import type { ProductVariant, Ingredient } from '@prisma/client'
import { PIZZA_TYPES_MAP, type PizzaSizes, type PizzaTypes } from '@/constants/variants.constants'

/**
 * Хук для составления деталей продукта
 * @param size - размер продукта
 * @param type - тип теста (для пиццы)
 * @param variants - варианты продукта
 * @param ingredients - ингредиенты продукта
 * @param doppings -выбранные пользователем ингредиенты
 * @returns детали продукта (string); общая стоимость (number)
 */

export const useProductDetails = (
  size: PizzaSizes | number,
  type: PizzaTypes | null,
  variants: ProductVariant[],
  ingredients: Ingredient[],
  doppings: Set<number>
) => {
  const isPizza = type

  const weight = isPizza
    ? variants.find((variant) => variant.size === size && variant.type === type)?.weight
    : variants.find((variant) => variant.size === size)?.weight

  const details = isPizza
    ? `${size} см, ${PIZZA_TYPES_MAP[type].toLowerCase()} тесто, ${weight} г`
    : `${size} шт, ${weight} г`

  const total = calcProductTotal(size, type, variants, ingredients, doppings)

  return { details, total }
}
