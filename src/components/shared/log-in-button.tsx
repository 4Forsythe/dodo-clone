'use client'

import React from 'react'
import Link from 'next/link'

import { User } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { route } from '@/config'
import { useAuthModal } from '@/hooks'

import { Button } from '@/components/ui'

interface ILogInButton {
  hasCart?: boolean
  className?: string
}

export const LogInButton: React.FC<ILogInButton> = ({ hasCart, className }) => {
  const { onOpen } = useAuthModal()
  const { data: session, status } = useSession()

  return (
    <div className={className}>
      {session ? (
        <Link href={route.PROFILE}>
          <Button variant="secondary">
            <User className="mr-1.5" size={18} />
            <b>Кабинет</b>
          </Button>
        </Link>
      ) : (
        <Button
          variant={hasCart ? 'outline' : 'default'}
          isLoading={status === 'loading'}
          onClick={onOpen}
        >
          <b>Войти</b>
        </Button>
      )}
    </div>
  )
}
