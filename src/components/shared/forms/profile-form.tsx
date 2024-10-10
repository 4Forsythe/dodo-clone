'use client'

import React from 'react'

import { cn, getUserBirthday, formatDateString } from '@/lib'
import { toast } from 'sonner'
import { signOut } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form'

import { Button, Input } from '@/components/ui'
import { Heading, FormField, BirthdayPicker } from '@/components/shared'

import { route } from '@/config'
import { updateUser } from '@/app/actions'
import { profileSchema } from '@/schemas/profile'

import type { User } from '@prisma/client'
import type { ProfileFormType } from '@/types/profile.types'

interface IProfileForm {
  profile: User
  className?: string
}

export const ProfileForm: React.FC<IProfileForm> = ({ profile, className }) => {
  const { day, month, year } = getUserBirthday(profile)

  const methods = useForm<ProfileFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name || '',
      email: profile.email,
      phone: profile.phone || '',
      birthday: {
        day,
        month,
        year,
      },
    },
  })

  const onSubmit: SubmitHandler<ProfileFormType> = async (data) => {
    try {
      const day = String(data.birthday?.day).padStart(2, '0')
      const month = String(data.birthday?.month).padStart(2, '0')
      const year = data.birthday?.year

      const hasBirthday = Boolean(day && month && year)
      const birthday = new Date(`${month}/${day}/${year}`)

      const dto = {
        name: data.name || null,
        email: data.email,
        phone: data.phone || null,
        birthday: hasBirthday ? birthday : null,
      }

      await updateUser(dto)
      toast.success('Личные данные обновлены')
    } catch (error) {
      toast.error('Ой! Кажется, что-то пошло не так...')
      console.error('ProfileForm: onSubmit()', error)
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        className={cn('w-[360px] flex flex-col', className)}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Heading text="Личные данные" size="md" />

        <div className="gap-4 flex flex-col">
          <FormField name="name" label="Имя" />

          <div className="gap-1 flex flex-col">
            <Heading className="my-0 mb-1" text="День рождения" size="xs" />
            {profile.birthday ? (
              <Input
                className="h-12 text-base"
                value={formatDateString(profile.birthday)}
                readOnly
              />
            ) : (
              <BirthdayPicker />
            )}
          </div>

          <FormField name="email" label="Эл. почта" readOnly />
          <FormField name="phone" label="Номер телефона" mask="{+7} (000) 000-00-00" />
        </div>

        <Button className="w-[50%] mt-7 font-semibold" size="lg" type="submit">
          Сохранить
        </Button>
      </form>
    </FormProvider>
  )
}
