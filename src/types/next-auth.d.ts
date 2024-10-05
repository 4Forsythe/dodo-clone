// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import type { UserRole } from '@prisma/client'

import type { JWT, DefaultJWT } from 'next-auth/jwt'
import type { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      birthday?: Date | null
      role: UserRole
    }
  }

  interface User extends DefaultUser {
    id: string
    birthday?: Date | null
    role: UserRole
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    birthday?: Date | null
    role: UserRole
  }
}
