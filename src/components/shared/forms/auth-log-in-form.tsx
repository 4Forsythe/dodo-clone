'use client'

import React from 'react'

import { cn } from '@/lib'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form'

import { Button } from '@/components/ui'
import { FormField, Heading } from '@/components/shared'
import { logInSchema } from '@/schemas'

import type { LogInFormType } from '@/types/auth.types'

interface IAuthLogInForm {
  className?: string
  onSwitch: () => void
  onClose: () => void
}

export const AuthLogInForm: React.FC<IAuthLogInForm> = ({ className, onSwitch, onClose }) => {
  const methods = useForm<LogInFormType>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { isSubmitting } = methods.formState

  const onSubmit: SubmitHandler<LogInFormType> = async (data) => {
    try {
      const response = await signIn('credentials', { ...data, redirect: false })

      if (!response?.ok) throw Error()

      onClose()
    } catch (error) {
      toast.error('Ой! Кажется, что-то пошло не так...')
      console.error('AuthModal: LogInForm()', error)
    }
  }

  return (
    <FormProvider {...methods}>
      <Heading className="my-0" text="Вход на сайт" size="lg" />

      <p className="mb-6 text-gray-600 font-semibold">
        Подарим подарок на день рождения, сохраним адрес доставки и расскажем об акциях
      </p>

      <form
        className={cn('gap-1.5 flex flex-col', className)}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <FormField name="email" label="Электронная почта" />
        <FormField name="password" label="Пароль" />

        <div className="my-4 gap-2 flex flex-col">
          <Button
            className="h-12 text-base font-semibold rounded-xl"
            size="lg"
            type="submit"
            isLoading={isSubmitting}
          >
            Войти
          </Button>
          <Button
            className="h-12 text-base font-semibold rounded-xl"
            variant="secondary"
            size="lg"
            type="button"
            isLoading={isSubmitting}
            onClick={onSwitch}
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
