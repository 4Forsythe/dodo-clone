import type { Ingredient, ProductVariant } from '@prisma/client'
import type { PizzaSizes, PizzaTypes } from '@/constants/variants.constants'
import type { CartItemType } from '@/types'

/**
 * Функция для подсчета общей стоимости продукта
 * @param size - размер продукта
 * @param type - тип теста (для пиццы)
 * @param variants - варианты продукта
 * @param ingredients -ингредиенты продукта
 * @param doppings - выбранные пользователем ингредиенты
 * @returns общая стоимость (number)
 */

export const calcProductTotal = (
  size: PizzaSizes,
  type: PizzaTypes,
  variants: ProductVariant[],
  ingredients: Ingredient[],
  doppings: Set<number>
): number => {
  const basePrice = variants.find(
    (variant) => variant.size === size && variant.type === type
  )?.price

  const doppingPrice = ingredients
    .filter((ingredient) => doppings.has(ingredient.id))
    .reduce((sum, ingredient) => sum + ingredient.price, 0)

  return Number(basePrice) + doppingPrice
}

/**
 * Функция для подсчета общей стоимости продукта в корзине, включая вариант продукта и выбранные ингредиенты
 * @param item - продукт из корзины
 * @returns общая стоимость продукта в корзине (number)
 */

export const calcCartItemTotal = (item: CartItemType): number => {
  const doppingPrice = item.doppings.reduce((sum, dopping) => sum + dopping.price, 0)

  return (item.variant.price + doppingPrice) * item.quantity
}
