'use client'

import React from 'react'

import { cn } from '@/lib'

import { useFormContext, Controller } from 'react-hook-form'

import { Switch } from '@/components/ui'
import { CheckoutBlock, FormField, FormTextarea, DeliveryPicker } from '@/components/shared'

import type { ICreateOrder } from '@/types'

interface ICheckoutForm {
  isLoading?: boolean
  className?: string
}

export const CheckoutForm: React.FC<ICheckoutForm> = ({ isLoading, className }) => {
  const { control } = useFormContext<ICreateOrder>()

  return (
    <div className={cn('gap-10 flex flex-col', className)}>
      <CheckoutBlock title="№2 Персональные данные" isLoading={isLoading}>
        <div className="gap-5 flex flex-col">
          <div className="gap-7 flex items-start">
            <label htmlFor="customerName" className="w-1/3 py-3 font-semibold">
              Имя получателя
            </label>
            <FormField name="customerName" className="w-[70%]" required />
          </div>
          <div className="gap-7 flex items-start">
            <label htmlFor="customerEmail" className="w-1/3 py-3 font-semibold">
              Электронная почта
            </label>
            <FormField name="customerEmail" className="w-[70%]" required />
          </div>
          <div className="gap-7 flex items-start">
            <label htmlFor="customerPhone" className="w-1/3 py-3 font-semibold">
              Номер телефона
            </label>
            <FormField
              name="customerPhone"
              mask="{+7} (000) 000-00-00"
              className="w-[70%]"
              required
            />
          </div>
        </div>
      </CheckoutBlock>

      <CheckoutBlock title="№3 Доставка" isLoading={isLoading}>
        <div className="gap-5 flex flex-col">
          <div className="gap-2.5 flex flex-col">
            <label htmlFor="address" className="font-semibold">
              Адрес доставки
            </label>
            <FormField name="address" className="w-[95%] text-base font-medium" required />
          </div>

          <div className="mb-1.5 gap-2.5 flex items-center">
            <Controller
              name="isContactless"
              control={control}
              render={({ field }) => (
                <Switch id="isContactless" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <label htmlFor="isContactless" className="font-semibold">
              Оставить у двери?
            </label>
          </div>

          <DeliveryPicker />

          <div className="gap-2.5 flex flex-col">
            <label htmlFor="comment" className="font-semibold">
              Комментарий к заказу
            </label>
            <FormTextarea
              name="comment"
              className="text-base font-medium"
              rows={5}
              placeholder="Оставьте дополнительную информацию для нашего курьера"
            />
          </div>
        </div>
      </CheckoutBlock>
    </div>
  )
}
