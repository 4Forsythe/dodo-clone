import { redirect } from 'next/navigation'

import { getUserSession } from '@/lib/get-user-session'

import { route } from '@/config'
import { prisma } from '@/prisma/prisma-client'

import { Checkout } from '@/components/shared'

export default async function CheckoutPage() {
  const user = await getUserSession()

  if (!user) redirect(route.UNAUTHORIZED)

  const profile = await prisma.user.findFirst({ where: { id: user.id } })

  if (!profile) redirect(route.UNAUTHORIZED)

  return <Checkout profile={profile} />
}
