import { type NextRequest, NextResponse } from 'next/server'

import { v4 as uuid } from 'uuid'
import { findCart } from '@/lib/find-cart'
import { refreshCartTotal } from '@/lib/calc-totals'
import { getUserSession } from '@/lib/get-user-session'
import { CART_TOKEN } from '@/constants'

import type { ICreateCartItem } from '@/types'

import { prisma } from '@/prisma/prisma-client'

/* create() */
export async function POST(request: NextRequest) {
  const body = (await request.json()) as ICreateCartItem

  try {
    let token = request.cookies.get(CART_TOKEN)?.value

    if (!token) {
      token = uuid()
    }

    const user = await getUserSession()
    const cart = await findCart(token, user?.id)

    const item = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        variantId: body.variantId,
        doppings: {
          every: { id: { in: body.doppings } },
        },
      },
      include: { doppings: true },
    })

    if (item && item.doppings.length === body.doppings?.length) {
      await prisma.cartItem.update({
        where: { id: item.id },
        data: { quantity: ++item.quantity },
      })
    }

    if (!item || item.doppings.length !== body.doppings?.length) {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          variantId: body.variantId,
          doppings: { connect: body.doppings?.map((id) => ({ id })) },
        },
      })
    }

    const data = await refreshCartTotal(token, user?.id)

    const response = NextResponse.json(data)
    response.cookies.set(CART_TOKEN, token, { maxAge: 60 * 60 * 24 * 14 })

    return response
  } catch (error) {
    console.error('api/carts: POST()', error)
    return NextResponse.json(
      { error: 'Internal error', message: 'Internal server error' },
      { status: 500 }
    )
  }
}

/* getMine() */
export async function GET(request: NextRequest) {
  try {
    const user = await getUserSession()

    const token = request.cookies.get(CART_TOKEN)?.value

    if (!token) {
      return NextResponse.json({ amount: 0, items: [] })
    }

    const cart = await prisma.cart.findFirst({
      where: user ? { userId: user.id } : { token },
      include: {
        items: {
          include: { variant: { include: { product: true } }, doppings: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    return NextResponse.json(cart)
  } catch (error) {
    console.error('api/carts: GET()', error)
    return NextResponse.json(
      { error: 'Internal error', message: 'Internal server error' },
      { status: 500 }
    )
  }
}
