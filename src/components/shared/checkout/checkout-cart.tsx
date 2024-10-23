import React from 'react'

import { getDrawerItemDetails } from '@/lib'

import { Skeleton } from '@/components/ui'
import { CheckoutBlock, CheckoutCartItem } from '@/components/shared'

import type { CartItemState } from '@/store/cart'

interface ICheckoutCart {
  items: CartItemState[]
  isLoading?: boolean
  isPending?: boolean
  className?: string
  onUpdate: (id: string, dto: { quantity: number }, type: 'increment' | 'decrement') => void
  onDelete: (id: string) => void
}

export const CheckoutCart: React.FC<ICheckoutCart> = ({
  items,
  isLoading,
  isPending,
  className,
  onUpdate,
  onDelete,
}) => {
  return (
    <CheckoutBlock title="№1 Корзина" className={className}>
      <div className="gap-3 flex flex-col">
        {!isLoading && !(items.length > 0) && (
          <span className="font-medium text-gray-400">В вашей корзине нет ни одного товара...</span>
        )}

        {isLoading
          ? [...Array(2)].map((_, index) => (
              <div key={index} className="p-2 gap-5 flex items-center">
                <Skeleton className="w-16 h-[3.75rem] rounded-full" />
                <div className="gap-1 flex flex-1 flex-col">
                  <Skeleton className="w-[40%] h-6" />
                  <Skeleton className="w-[90%] h-6" />
                </div>
                <Skeleton className="w-32 h-10" />
              </div>
            ))
          : items.map((item) => {
              const { details, doppings } = getDrawerItemDetails(
                item.size,
                item.type,
                item.weight,
                item.ingredients
              )

              return (
                <CheckoutCartItem
                  key={item.id}
                  {...item}
                  details={details}
                  doppings={doppings}
                  isLoading={isPending}
                  onUpdate={(type) => onUpdate(item.id, { quantity: item.quantity }, type)}
                  onDelete={() => onDelete(item.id)}
                />
              )
            })}
      </div>
    </CheckoutBlock>
  )
}
