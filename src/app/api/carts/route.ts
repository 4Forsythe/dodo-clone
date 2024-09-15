import { type NextRequest, NextResponse } from 'next/server'

import { v4 as uuid } from 'uuid'
import { findCart, refreshCartTotal } from '@/lib'
import { CART_TOKEN } from '@/constants'

import type { ICreateCartItem } from '@/types'

import { prisma } from '@/prisma/prisma-client'

/* create() */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ICreateCartItem

    let token = request.cookies.get(CART_TOKEN)?.value

    if (!token) {
      token = uuid()
    }

    const cart = await findCart(token)

    const item = await prisma.cartItem.findFirst({
      where: {
        AND: {
          cartId: cart.id,
          variantId: body.variantId,
          doppings: { every: { id: { in: body.doppings } } },
        },
      },
    })

    console.log(Boolean(item))

    if (item) {
      await prisma.cartItem.update({
        where: { id: item.id },
        data: { quantity: ++item.quantity },
      })
    }

    if (!item) {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          variantId: body.variantId,
          doppings: { connect: body.doppings?.map((id) => ({ id })) },
        },
      })
    }

    const data = await refreshCartTotal(token)

    const response = NextResponse.json(data)
    response.cookies.set(CART_TOKEN, token, { maxAge: 60 * 60 * 24 * 14 })

    return response
  } catch (error) {
    console.error('api/carts POST()', error)
    return NextResponse.json(
      { error: 'Internal error', message: 'Internal server error' },
      { status: 500 }
    )
  }
}

/* getMine() */
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(CART_TOKEN)?.value

    if (!token) {
      return NextResponse.json({ amount: 0, items: [] })
    }

    const cart = await prisma.cart.findFirst({
      where: { token },
      include: {
        items: {
          include: { variant: { include: { product: true } }, doppings: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    return NextResponse.json(cart)
  } catch (error) {
    console.error('api/carts GET()', error)
    return NextResponse.json(
      { error: 'Internal error', message: 'Internal server error' },
      { status: 500 }
    )
  }
}
