import { NextResponse } from 'next/server'

import { prisma } from '@/prisma/prisma-client'

import { getUserSession } from '@/lib/get-user-session'

/* getProfile() */
export async function GET() {
  try {
    const user = await getUserSession()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'User is unauthorized' },
        { status: 401 }
      )
    }

    const data = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        name: true,
        email: true,
        birthday: true,
        activatedAt: true,
        password: false,
      },
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('api/auth/me: GET()', error)
    return NextResponse.json(
      { error: 'Internal error', message: 'Internal server error' },
      { status: 500 }
    )
  }
}
