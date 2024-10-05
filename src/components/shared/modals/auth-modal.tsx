'use client'

import React from 'react'
import Image from 'next/image'

import { cn } from '@/lib'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { AuthLogInForm, AuthRegisterForm } from '@/components/shared'

interface IAuthModal {
  isOpen?: boolean
  className?: string
  onClose: () => void
}

export const AuthModal: React.FC<IAuthModal> = ({ isOpen, className, onClose }) => {
  const [method, setMethod] = React.useState<'login' | 'register'>('login')

  const handleOnClose = () => {
    onClose()
  }

  const onSwitch = () => {
    method === 'login' ? setMethod('register') : setMethod('login')
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOnClose}>
      <DialogContent
        className={cn('w-[28rem] max-w-[28rem] p-8 gap-0 bg-white overflow-hidden', className)}
      >
        {method === 'login' ? (
          <AuthLogInForm onSwitch={onSwitch} onClose={onClose} />
        ) : (
          <AuthRegisterForm onSwitch={onSwitch} onClose={onClose} />
        )}

        <div className="my-3.5 gap-3 flex items-center">
          <div className="w-full h-[1px] bg-neutral-300" />
          <span className="text-sm font-medium text-nowrap flex-1">или через</span>
          <div className="w-full h-[1px] bg-neutral-300" />
        </div>

        <div className="mt-3.5 gap-2 flex items-center justify-center">
          <Button
            className="py-5 gap-1.5 bg-neutral-200/50 rounded-xl hover:text-primary hover:bg-secondary"
            variant="ghost"
            onClick={() => signIn('yandex', { redirect: false })}
          >
            <Image width={24} height={24} src="/icons/yandex.svg" alt="Yandex.ID" priority />
            <b>Яндекс ID</b>
          </Button>
          <Button
            className="py-5 gap-1.5 bg-neutral-200/50 rounded-xl hover:text-primary hover:bg-secondary"
            variant="ghost"
            onClick={() => signIn('github', { redirect: false })}
          >
            <Image width={24} height={24} src="/icons/github.svg" alt="VK" priority />
            <b>GitHub</b>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
