import React from 'react'

import { cn } from '@/lib'
import { X } from 'lucide-react'

import * as DrawerItemDetails from './drawer-item-details'

import type { DrawerItemDetailsType } from './drawer-item-details'

interface IDrawerItem extends DrawerItemDetailsType {
  className?: string
}

export const DrawerItem: React.FC<IDrawerItem> = ({
  id,
  name,
  price,
  quantity,
  imageUrl,
  details,
  doppings,
  className,
}) => {
  return (
    <div className={cn('w-full px-5 py-4 gap-3 flex flex-col bg-white relative', className)}>
      <div className="gap-6 flex items-center flex-1">
        <DrawerItemDetails.Image src={imageUrl} width={64} height={64} alt={name} />
        <DrawerItemDetails.Info name={name} details={details} doppings={doppings} />
      </div>
      <div className="h-8 flex items-center justify-between">
        <DrawerItemDetails.Price value={price} />
        <DrawerItemDetails.Counter value={quantity} />
      </div>
      <button className="top-3 right-2.5 text-gray-400 hover:text-black absolute transition duration-200">
        <X size={16} />
      </button>
    </div>
  )
}
