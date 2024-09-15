import { prisma } from '@/prisma/prisma-client'

import type { Cart, Ingredient, ProductVariant } from '@prisma/client'

import type { CartItemType } from '@/types'
import type { PizzaSizes, PizzaTypes } from '@/constants/variants.constants'

/**
 * Функция для подсчета общей стоимости продукта
 * @param size - размер продукта
 * @param type - тип теста (для пиццы)
 * @param variants - варианты продукта
 * @param ingredients -ингредиенты продукта
 * @param doppings - выбранные пользователем ингредиенты
 * @returns общая стоимость продукта (number)
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

/**
 * Функция для перерасчета общей стоимости корзины на основе внесенных изменений
 * @param token - токен пользователя (или userId)
 * @returns объект корзины или неизвестное (Cart | undefined)
 */

export const refreshCartTotal = async (token: string): Promise<Cart | undefined> => {
  const cart = await prisma.cart.findFirst({
    where: { OR: [{ userId: token }, { token }] },
    include: {
      items: {
        include: { variant: { include: { product: true } }, doppings: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!cart) return

  const amount = cart.items.reduce((sum, item) => sum + calcCartItemTotal(item), 0)

  return prisma.cart.update({
    where: { id: cart.id },
    data: { amount },
    include: {
      items: {
        include: { variant: { include: { product: true } }, doppings: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  })
}
