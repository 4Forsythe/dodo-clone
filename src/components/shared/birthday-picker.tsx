'use client'

import React from 'react'

import { cn } from '@/lib'
import { useFormContext, Controller, type FieldError } from 'react-hook-form'

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select'
import { FormField, FormErrorBlock } from '@/components/shared'

import type { ProfileFormType } from '@/types/profile.types'

interface IBirthdayPicker {
  className?: string
}

const months = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
]

export const BirthdayPicker: React.FC<IBirthdayPicker> = ({ className }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProfileFormType>()

  const error =
    errors.birthday && ((errors.birthday?.root || Object.values(errors.birthday)[0]) as FieldError)

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="mb-1 gap-1.5 flex items-start">
        <FormField
          className="max-w-full w-24"
          name="birthday.day"
          size="sm"
          type="number"
          maxLength={2}
          placeholder="День"
          hiddenError
        />

        <Controller
          name="birthday.month"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger
                className={cn('w-[130px] text-base font-medium', {
                  'border-destructive': error && !field.value,
                })}
              >
                <SelectValue placeholder="Месяц" />
              </SelectTrigger>
              <SelectContent className="max-h-[230px] overflow-auto">
                <SelectGroup>
                  <SelectLabel>Месяц</SelectLabel>
                  {months.map((month, index) => (
                    <SelectItem key={index} value={String(index + 1)}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />

        <FormField
          className="w-[6.5rem]"
          name="birthday.year"
          size="sm"
          type="number"
          maxLength={4}
          placeholder="Год"
          hiddenError
        />
      </div>

      {error && <FormErrorBlock text={error.message as string} />}
    </div>
  )
}
