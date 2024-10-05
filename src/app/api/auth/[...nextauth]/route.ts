import NextAuth from 'next-auth'

import { authOptions } from '@/constants/auth-options.constants'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
