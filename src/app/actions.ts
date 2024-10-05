'use server'

import { cookies } from 'next/headers'

import { prisma } from '@/prisma/prisma-client'

import { route } from '@/config'
import { sendMail } from '@/lib/send-mail'
import { getUserSession } from '@/lib/get-user-session'
import { CART_TOKEN } from '@/constants'

import type { ICreateOrder } from '@/types'

export async function createOrder(dto: ICreateOrder) {
  try {
    const user = await getUserSession()
    const token = cookies().get(CART_TOKEN)?.value

    if (!user) {
      throw new Error('Current user is not found')
    }

    const cart = await prisma.cart.findFirst({
      where: { OR: [{ id: user.id }, { token }] },
      include: {
        user: true,
        items: {
          include: {
            variant: {
              include: {
                product: true,
              },
            },
            doppings: true,
          },
        },
      },
    })

    if (!cart || !(cart.amount > 0)) throw new Error('Cart is missing or empty')

    const order = await prisma.order.create({
      data: {
        amount: cart.amount,
        customerName: dto.customerName,
        customerEmail: dto.customerEmail,
        customerPhone: dto.customerPhone,
        address: dto.address,
        comment: dto.comment,
        userId: user.id,
      },
    })

    cart.items.map(async (item) => {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          variantId: item.variantId,
          doppings: { connect: item.doppings?.map((dopping) => ({ id: dopping.id })) },
        },
      })
    })

    await prisma.cart.update({
      where: { id: cart.id },
      data: { amount: 0 },
    })

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    })

    await sendMail({
      to: cart.user?.email as string,
      subject: `Заказ №${order.id} оформлен`,
      html: {
        path: 'src/templates/create-order.template.html',
        replacements: {
          amount: String(order.amount),
          orderId: String(order.id),
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          customerPhone: order.customerPhone,
          returnUrl: `${route.THANKS}?order=${cart.userId}${order.id}`,
        },
      },
    })

    return `${route.THANKS}?order=${cart.userId}${order.id}`
  } catch (error) {
    console.error('actions: createOrder()', error)
  }
}
