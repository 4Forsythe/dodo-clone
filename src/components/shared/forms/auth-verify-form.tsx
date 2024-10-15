'use client'

import React from 'react'

import { cn } from '@/lib'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui'
import { Heading, FormErrorBlock } from '@/components/shared'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'

import { api } from '@/services/api'
import { useAuthModal } from '@/hooks'
import { verifySchema } from '@/schemas'

import type { VerifyFormType } from '@/types'

interface IAuthVerifyForm {
  className?: string
  setIsRedirecting: (isRedirecting: boolean) => void
}

export const AuthVerifyForm: React.FC<IAuthVerifyForm> = ({ className, setIsRedirecting }) => {
  const { data: session, status } = useSession()

  const methods = useForm<VerifyFormType>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: '',
    },
  })

  const { onClose } = useAuthModal()
  const { isSubmitting, errors } = methods.formState

  const error = errors.code

  const onSubmit: SubmitHandler<VerifyFormType> = async (data) => {
    try {
      setIsRedirecting(true)

      if (session?.user) {
        await api.auth.activate({ user: session.user.id, code: data.code })

        toast.success('Учетная запись была подтверждена')
        onClose()
      }
    } catch (error) {
      toast.error('Введен неверный код подтверждения')
      console.error('AuthModal: VerifyForm()', error)
    } finally {
      setIsRedirecting(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <Heading className="my-0" text="Введите код" size="lg" />

      <p className="mb-6 text-gray-600 font-semibold">
        Код активации был отправлен на ваш адрес электронной почты
      </p>

      <form
        className={cn('gap-2.5 flex flex-col', className)}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="gap-2.5 flex flex-col items-center justify-center">
          <Controller
            name="code"
            control={methods.control}
            render={({ field }) => (
              <InputOTP maxLength={6} {...field}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          {error && <FormErrorBlock text={error.message as string} />}
        </div>

        <div className="my-4 gap-2 flex flex-col">
          <Button
            className="h-12 text-base font-semibold rounded-xl"
            size="lg"
            type="submit"
            isLoading={isSubmitting || status === 'loading'}
          >
            Отправить
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
