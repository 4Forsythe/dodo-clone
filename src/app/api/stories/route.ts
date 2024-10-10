import { type NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/prisma/prisma-client'

/* getAll() */
export async function GET(request: NextRequest) {
  try {
    const data = await prisma.stories.findMany({
      take: 6,
      skip: 0,
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('api/stories: GET()', error)
    return NextResponse.json(
      { error: 'Internal error', message: 'Internal server error' },
      { status: 500 }
    )
  }
}
