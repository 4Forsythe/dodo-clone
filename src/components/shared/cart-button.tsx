'use client'

import React from 'react'

import { cn } from '@/lib'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui'
import { Drawer } from '@/components/shared'

import { useCartStore } from '@/store'

interface ICartButton {
  className?: string
}

export const CartButton: React.FC<ICartButton> = ({ className }) => {
  const { amount, items, isLoading } = useCartStore()

  return (
    <Drawer>
      <Button className={cn('min-w-24 group relative', className)} isLoading={isLoading}>
        {items.length > 0 ? `${amount} ₽` : <b>Корзина</b>}
        {items.length > 0 && (
          <>
            <span className="w-[1px] h-2/3 mx-2.5 bg-white/50" />
            <b className="transition duration-300 group-hover:opacity-0">{items.length}</b>
            <ArrowRight
              size={18}
              className="right-3.5 opacity-0 -translate-x-2 absolute transition duration-300 group-hover:opacity-100 group-hover:translate-x-0"
            />
          </>
        )}
      </Button>
    </Drawer>
  )
}
