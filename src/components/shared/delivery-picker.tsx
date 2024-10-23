'use client'

import React from 'react'

import { cn, getDeliveryTime } from '@/lib'
import { get, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui'
import { FormErrorBlock } from '@/components/shared'

import type { ICreateOrder } from '@/types'

interface IDeliveryPicker {
  className?: string
}

export const DeliveryPicker: React.FC<IDeliveryPicker> = ({ className }) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ICreateOrder>()

  const value = watch('deliveredAt')
  const error = get(errors, 'deliveredAt')

  const variants = getDeliveryTime()

  const handleClick = (date: Date) => {
    setValue('deliveredAt', date)
  }

  return (
    <div className="gap-2.5 flex flex-col">
      <span className="font-semibold">Время доставки</span>

      <div className="flex flex-col">
        <div className={cn('py-2 gap-2 flex items-center', className)}>
          {variants.map((variant, index) => (
            <Button
              key={index}
              className={cn(
                'px-4 text-base font-bold border-2 border-transparent shadow-lg rounded-xl',
                {
                  'border-primary': variant.getHours() === value?.getHours(),
                }
              )}
              size="lg"
              variant="ghost"
              type="button"
              value={variant.toISOString()}
              onClick={() => handleClick(variant)}
            >
              {variant.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
            </Button>
          ))}
        </div>

        {error && (
          <div className="mt-1">
            <FormErrorBlock text={error.message as string} />
          </div>
        )}
      </div>
    </div>
  )
}
