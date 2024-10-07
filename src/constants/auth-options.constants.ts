import { compare } from 'bcrypt'
import { prisma } from '@/prisma/prisma-client'

import GitHubProvider, { type GithubProfile } from 'next-auth/providers/github'
import YandexProvider, { type YandexProfile } from 'next-auth/providers/yandex'
import CredentialsProvider from 'next-auth/providers/credentials'

import type { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(profile: GithubProfile) {
        return {
          id: String(profile.id),
          name: profile.name || profile.login,
          email: profile.email,
          role: 'USER',
        }
      },
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID!,
      clientSecret: process.env.YANDEX_CLIENT_SECRET!,
      profile(profile: YandexProfile) {
        return {
          id: profile.id,
          name: profile.first_name || profile.login,
          email: profile.default_email,
          birthday: profile.birthday ? new Date(profile.birthday) : null,
          role: 'USER',
        }
      },
    }),
    CredentialsProvider({
      name: 'LogIn',
      credentials: {
        email: { label: 'Электронная почта', type: 'text' },
        password: { label: 'Пароль', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null

        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        })

        if (!user || !user.password) return null

        const isValidPassword = await compare(credentials.password, user.password)

        if (!isValidPassword) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          birthday: user.birthday,
          role: user.role,
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || '',
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'credentials') return true
        if (!user.email) return false

        const profile = await prisma.user.findFirst({
          where: {
            OR: [
              {
                provider: account?.provider,
                providerId: account?.providerAccountId,
              },
              {
                email: user.email,
              },
            ],
          },
        })

        if (profile) {
          await prisma.user.update({
            where: { id: profile.id },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          })

          return true
        }

        await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            birthday: user.birthday,
            activatedAt: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        })

        return true
      } catch (error) {
        console.error('NextAuth: signIn()', error)
        return false
      }
    },
    async jwt({ token }) {
      if (!token.email) return token

      const user = await prisma.user.findFirst({
        where: { email: token.email },
      })

      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.phone = user.phone
        token.birthday = user.birthday
        token.role = user.role
      }

      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
      }

      return session
    },
  },
}
