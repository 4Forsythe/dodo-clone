import React from 'react'

import { cn } from '@/lib'
import { Loader, X } from 'lucide-react'

import * as DrawerItemDetails from './drawer-item-details'

import type { DrawerItemDetailsType } from './drawer-item-details'

interface IDrawerItem extends DrawerItemDetailsType {
  isLoading?: boolean
  className?: string
  onUpdate: (type: 'increment' | 'decrement') => void
  onDelete: () => void
}

export const DrawerItem: React.FC<IDrawerItem> = ({
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
    <div className={cn('w-full px-5 py-4 gap-3 flex flex-col bg-white relative', className)}>
      {isLoading && (
        <div className="inset-0 flex items-center justify-center bg-neutral-100/40 animate-pulse absolute">
          <Loader className="opacity-80 animate-spin" size={20} />
        </div>
      )}
      <div className="gap-6 flex flex-1 items-center">
        <DrawerItemDetails.Image src={imageUrl} width={64} height={64} alt={name} />
        <DrawerItemDetails.Info name={name} details={details} doppings={doppings} />
      </div>
      <div className="h-8 flex items-center justify-between">
        <DrawerItemDetails.Price value={price} />
        <DrawerItemDetails.Counter value={quantity} disabled={isLoading} onClick={onUpdate} />
      </div>
      <button
        className="top-3 right-2.5 text-gray-400 hover:text-black absolute transition duration-200"
        disabled={isLoading}
        onClick={onDelete}
      >
        <X size={16} />
      </button>
    </div>
  )
}
