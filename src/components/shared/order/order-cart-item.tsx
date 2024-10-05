'use client'

import React from 'react'

import { cn } from '@/lib'

import * as DrawerItemDetails from '@/components/shared/drawer-item-details'

import type { DrawerItemDetailsType } from '@/components/shared'

interface IOrderCartItem extends DrawerItemDetailsType {
  isLoading?: boolean
  className?: string
}

export const OrderCartItem: React.FC<IOrderCartItem> = ({
  name,
  price,
  quantity,
  imageUrl,
  details,
  doppings,
  className,
}) => {
  return (
    <div className={cn('w-full h-full p-2 gap-3 flex items-center relative', className)}>
      <div className="gap-3 flex flex-1 items-center overflow-hidden">
        <DrawerItemDetails.Image src={imageUrl} width={48} height={48} alt={name} />
        <DrawerItemDetails.Info
          name={`${name}, ${quantity} шт.`}
          details={details}
          doppings={doppings}
        />
      </div>

      <DrawerItemDetails.Price className="flex justify-center" value={price} />
    </div>
  )
}
