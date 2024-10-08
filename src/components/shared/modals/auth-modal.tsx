'use client'

import React from 'react'
import Image from 'next/image'

import { cn } from '@/lib'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { AuthLogInForm, AuthRegisterForm, AuthVerifyForm } from '@/components/shared'

import { useAuthModal } from '@/hooks'

export enum AuthMethods {
  LOGIN = 'login',
  REGISTER = 'register',
  VERIFY = 'verify',
}

interface IAuthModal {
  className?: string
}

export const AuthModal: React.FC<IAuthModal> = ({ className }) => {
  const [method, setMethod] = React.useState<AuthMethods>(AuthMethods.LOGIN)

  const { isOpen, onClose } = useAuthModal()

  const handleOnClose = () => {
    onClose()
  }

  const onSwitch = (method: AuthMethods) => {
    setMethod(method)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOnClose}>
      <DialogContent
        className={cn('w-[28rem] max-w-[28rem] p-8 gap-0 bg-white overflow-hidden', className)}
      >
        {method === AuthMethods.LOGIN && <AuthLogInForm onSwitch={onSwitch} />}
        {method === AuthMethods.REGISTER && <AuthRegisterForm onSwitch={onSwitch} />}
        {method === AuthMethods.VERIFY && <AuthVerifyForm />}

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
