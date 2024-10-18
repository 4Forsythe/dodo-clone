import { redirect } from 'next/navigation'

import { getUserSession } from '@/lib/get-user-session'

import { route } from '@/config'
import { prisma } from '@/prisma/prisma-client'

import { Profile } from '@/components/shared/profile'

export default async function ProfilePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const user = await getUserSession()

  if (!user) redirect(route.UNAUTHORIZED)

  const profile = await prisma.user.findFirst({ where: { id: user.id } })

  if (!profile) redirect(route.UNAUTHORIZED)

  const isActivated = typeof searchParams?.activated !== 'undefined'

  return <Profile profile={profile} isActivated={isActivated} />
}
