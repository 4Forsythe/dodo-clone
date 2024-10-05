import { getServerSession } from 'next-auth'

import { authOptions } from '@/constants/auth-options.constants'

export const getUserSession = async () => {
  const session = await getServerSession(authOptions)

  return session?.user ?? null
}
