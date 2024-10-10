import { prisma } from '@/prisma/prisma-client'

import type { Cart } from '@prisma/client'

/**
 * Функция для поиска/создания корзины пользователя
 * @param token - токен пользователя (или userId)
 * @returns объект корзины (Cart)
 */

export const findCart = async (token: string, userId?: string): Promise<Cart> => {
  let cart = await prisma.cart.findFirst({
    where: userId ? { userId } : { token },
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: userId ? { userId, token: userId } : { token },
    })
  }

  return cart
}
