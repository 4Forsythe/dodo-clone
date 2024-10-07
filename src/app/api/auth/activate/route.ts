import { type NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/prisma/prisma-client'

import { route } from '@/config'

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get('code')
    const userId = request.nextUrl.searchParams.get('user')

    if (!code || !userId) {
      return NextResponse.json(
        { error: 'Bad request', message: 'Code and user is required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Not found', message: 'User is not found' },
        { status: 404 }
      )
    }

    if (user.activatedAt) {
      return NextResponse.redirect(new URL('?activated', route.PROFILE))
    }

    const activationCode = await prisma.activationCode.findFirst({
      where: { AND: [{ code }, { userId }] },
    })

    if (!activationCode) {
      return NextResponse.json(
        { error: 'Bad request', message: 'Invalid activation code or user id' },
        { status: 400 }
      )
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        activatedAt: new Date(),
      },
    })

    await prisma.activationCode.delete({
      where: { id: activationCode.id },
    })

    return NextResponse.redirect(new URL('?activated', route.PROFILE))
  } catch (error) {
    console.error('api/auth/activate: GET()', error)
    return NextResponse.json(
      { error: 'Internal error', message: 'Internal server error' },
      { status: 500 }
    )
  }
}
