import { type NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/prisma/prisma-client'

/* getMine() */
export async function GET(request: NextRequest) {
  const TOKEN_NAME = 'cart_token'

  try {
    const userId = '4d2c1785-d501-44fd-9742-ba65a9e48989'
    const tokenId = request.cookies.get(TOKEN_NAME)?.value

    if (!tokenId) {
      return NextResponse.json({ amount: 0, items: [] })
    }

    const cart = await prisma.cart.findFirst({
      where: { OR: [{ userId }, { token: tokenId }] },
      include: {
        items: {
          include: { variant: { include: { product: true } }, doppings: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    return NextResponse.json(cart)
  } catch (error) {
    console.error(error)
  }
}
