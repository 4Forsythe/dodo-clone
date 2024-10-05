'use client'

import React from 'react'

import { cn } from '@/lib'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form'

import { Button } from '@/components/ui'
import { FormField, Heading } from '@/components/shared'
import { registerSchema } from '@/schemas'

import type { RegisterFormType } from '@/types/auth.types'
import { registerUser } from '@/app/actions'

interface IAuthRegisterForm {
  className?: string
  onSwitch: () => void
  onClose: () => void
}

export const AuthRegisterForm: React.FC<IAuthRegisterForm> = ({ className, onSwitch, onClose }) => {
  const methods = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { isSubmitting } = methods.formState

  const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
    try {
      await registerUser(data)
      onClose()
    } catch (error) {
      toast.error('Ой! Кажется, что-то пошло не так...')
      console.error('AuthModal: RegisterForm()', error)
    }
  }

  return (
    <FormProvider {...methods}>
      <Heading className="my-0" text="Регистрация" size="lg" />

      <p className="mb-6 text-gray-600 font-semibold">
        Подарим подарок на день рождения, сохраним адрес доставки и расскажем об акциях
      </p>

      <form
        className={cn('gap-2.5 flex flex-col', className)}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <FormField name="email" label="Электронная почта" required />
        <FormField name="password" label="Пароль" type="password" required />
        <FormField name="confirmPassword" label="Подтвердить пароль" type="password" required />

        <div className="my-4 gap-2 flex flex-col">
          <Button
            className="h-12 text-base font-semibold rounded-xl"
            size="lg"
            type="submit"
            isLoading={isSubmitting}
          >
            Зарегистрироваться
          </Button>
          <Button
            className="h-12 text-base font-semibold rounded-xl"
            variant="secondary"
            size="lg"
            type="button"
            isLoading={isSubmitting}
            onClick={onSwitch}
          >
            Войти
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
