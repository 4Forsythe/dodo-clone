import { type NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/prisma/prisma-client'

/* getAll() */
export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query') || ''

  const limit = request.nextUrl.searchParams.get('limit') || 20
  const offset = request.nextUrl.searchParams.get('offset') || 0

  const data = await prisma.ingredient.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    take: +limit,
    skip: +offset,
  })

  return NextResponse.json(data)
}
