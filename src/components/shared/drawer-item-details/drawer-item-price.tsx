import React from 'react'

import { cn } from '@/lib'

interface IDrawerItemPrice {
  value: number
  className?: string
}

export const DrawerItemPrice: React.FC<IDrawerItemPrice> = ({ value, className }) => {
  return <span className={cn('font-bold', className)}>{value} ₽</span>
}
