import { type NextRequest, NextResponse } from 'next/server'

import { getUserSession } from '@/lib/get-user-session'

import { prisma } from '@/prisma/prisma-client'

/* getMine() */
export async function GET(request: NextRequest) {
  // Вынес из trycatch, чтобы предотвратить генерацию динамической страницы Next.js (для фикса [Error]: Dynamic server usage)
  const limit = request.nextUrl.searchParams.get('limit') || 20
  const offset = request.nextUrl.searchParams.get('offset') || 0

  try {
    const user = await getUserSession()

    if (!user) {
      return NextResponse.json(
        { error: 'Not found', message: 'User is not found' },
        { status: 404 }
      )
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        items: {
          include: { variant: { include: { product: true } }, doppings: true },
        },
      },
      take: +limit,
      skip: +offset,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('api/orders: GET()', error)
    return NextResponse.json(
      { error: 'Internal error', message: 'Internal server error' },
      { status: 500 }
    )
  }
}
