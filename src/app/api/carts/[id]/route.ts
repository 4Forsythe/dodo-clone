import { type NextRequest, NextResponse } from 'next/server'

import { refreshCartTotal } from '@/lib/calc-totals'
import { CART_TOKEN } from '@/constants'

import { prisma } from '@/prisma/prisma-client'

/* update() */
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = (await request.json()) as { quantity: number }

    const token = request.cookies.get(CART_TOKEN)?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Not found', message: 'Cart token is not found' },
        { status: 404 }
      )
    }

    const item = await prisma.cartItem.findFirst({ where: { id } })

    if (!item) {
      return NextResponse.json(
        { error: 'Not found', message: 'Cart item is not found' },
        { status: 404 }
      )
    }

    if (body.quantity < 0) {
      return NextResponse.json(
        { error: 'Bad request', message: "Cart item's quantity must be equal to 0 or greater" },
        { status: 400 }
      )
    }

    if (body.quantity === 0) {
      await prisma.cartItem.delete({ where: { id } })

      const cart = await refreshCartTotal(token)

      return NextResponse.json(cart)
    }

    await prisma.cartItem.update({
      where: { id },
      data: { quantity: body.quantity },
    })

    const cart = await refreshCartTotal(token)

    return NextResponse.json(cart)
  } catch (error) {
    console.error('api/carts: PATCH()', error)
    return NextResponse.json(
      { error: 'Internal error', message: 'Internal server error' },
      { status: 500 }
    )
  }
}

/* delete() */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const token = request.cookies.get(CART_TOKEN)?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Not found', message: 'Cart token is not found' },
        { status: 404 }
      )
    }

    const item = await prisma.cartItem.findFirst({ where: { id } })

    if (!item) {
      return NextResponse.json(
        { error: 'Not found', message: 'Cart item is not found' },
        { status: 404 }
      )
    }

    await prisma.cartItem.delete({ where: { id } })

    const cart = await refreshCartTotal(token)

    return NextResponse.json(cart)
  } catch (error) {
    console.error('api/carts: DELETE()', error)
    return NextResponse.json(
      { error: 'Internal error', message: 'Internal server error' },
      { status: 500 }
    )
  }
}
