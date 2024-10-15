'use server'

import { hashSync } from 'bcrypt'
import { cookies } from 'next/headers'

import { prisma } from '@/prisma/prisma-client'

import { sendMail } from '@/lib/send-mail'
import { getUserSession } from '@/lib/get-user-session'

import { route } from '@/config'
import { CART_TOKEN } from '@/constants'

import type { Prisma } from '@prisma/client'
import type { ICreateOrder } from '@/types'

export async function updateUser(dto: Prisma.UserUpdateInput) {
  try {
    const user = await getUserSession()

    if (!user) throw new Error('Current user is not found')

    const data = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        name: true,
        email: true,
        phone: true,
        birthday: true,
      },
    })

    if (JSON.stringify(data) !== JSON.stringify(dto)) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          name: dto.name,
          email: dto.email,
          phone: dto.phone,
          birthday: dto.birthday,
          password: dto.password && hashSync(dto.password as string, 12),
        },
      })
    }
  } catch (error) {
    console.error('actions: updateUser()', error)
  }
}

export async function deleteUser() {
  try {
    const user = await getUserSession()

    if (!user) throw new Error('Current user is not found')

    const data = await prisma.user.findUnique({
      where: { id: user.id },
    })

    if (data) {
      await prisma.user.delete({
        where: { id: data.id },
      })
    }
  } catch (error) {
    console.error('actions: deleteUser()', error)
  }
}

export async function registerUser(dto: Prisma.UserCreateInput) {
  try {
    const isExistingUser = await prisma.user.findFirst({
      where: { email: dto.email },
    })

    if (isExistingUser) {
      if (!isExistingUser.activatedAt) throw new Error('User email is not activated')

      throw new Error('User is already exist')
    }

    const user = await prisma.user.create({
      data: {
        email: dto.email,
        password: hashSync(dto.password as string, 12),
      },
    })

    const code = Math.floor(100000 + Math.random() * 900000).toString()

    await prisma.activationCode.create({
      data: {
        code,
        userId: user.id,
      },
    })

    await sendMail({
      to: user.email,
      subject: 'Подтвердите свой E-mail',
      html: {
        path: 'src/templates/confirm-email.template.html',
        replacements: {
          code,
          returnUrl: `${process.env.NEXT_PUBLIC_API_URL}/auth/activate?user=${user.id}&code=${code}`,
        },
      },
    })
  } catch (error) {
    console.error('actions: registerUser()', error)
  }
}

export async function createOrder(dto: ICreateOrder) {
  try {
    const user = await getUserSession()

    if (!user) {
      throw new Error('Current user is not found')
    }

    const token = cookies().get(CART_TOKEN)?.value

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
