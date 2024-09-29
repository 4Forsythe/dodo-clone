'use client'

import React from 'react'

import { cn } from '@/lib'
import { X } from 'lucide-react'

import * as DrawerItemDetails from '@/components/shared/drawer-item-details'

import type { DrawerItemDetailsType } from '@/components/shared'

interface ICheckoutCartItem extends DrawerItemDetailsType {
  isLoading?: boolean
  className?: string
  onUpdate: (type: 'increment' | 'decrement') => void
  onDelete: () => void
}

export const CheckoutCartItem: React.FC<ICheckoutCartItem> = ({
  name,
  price,
  quantity,
  imageUrl,
  details,
  doppings,
  isLoading,
  className,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className={cn('w-full p-2 gap-3 flex items-center overflow-hidden relative', className)}>
      {/* {isLoading && (
        <div className="inset-0 flex items-center justify-center bg-neutral-100/40 animate-pulse absolute">
          <Loader className="opacity-80 animate-spin" size={20} />
        </div>
      )} */}

      <div className="gap-6 flex flex-1 items-center">
        <DrawerItemDetails.Image src={imageUrl} width={64} height={64} alt={name} />
        <DrawerItemDetails.Info name={name} details={details} doppings={doppings} />
      </div>

      <div className="w-[45%] grid grid-cols-[1fr,2fr,auto] items-center">
        <DrawerItemDetails.Price className="flex justify-center" value={price} />

        <div className="ml-3.5 gap-6 flex items-center justify-center">
          <DrawerItemDetails.Counter
            size="lg"
            value={quantity}
            disabled={isLoading}
            onClick={onUpdate}
          />
        </div>

        <button
          className="ml-3.5 text-gray-400 hover:text-black transition duration-200 disabled:text-gray-300/80"
          type="button"
          disabled={isLoading}
          onClick={onDelete}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  )
}
