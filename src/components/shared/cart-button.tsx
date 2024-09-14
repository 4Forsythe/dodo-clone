import React from 'react'

import { cn } from '@/lib'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui'
import { Drawer } from '@/components/shared'

interface ICartButton {
  className?: string
}

export const CartButton: React.FC<ICartButton> = ({ className }) => {
  return (
    <Drawer>
      <Button className={cn('group relative', className)}>
        <b>Корзина</b>
        <span className="w-[1px] h-2/3 mx-2.5 bg-white/50" />
        <b className="transition duration-300 group-hover:opacity-0">5</b>
        <ArrowRight
          size={18}
          className="right-3.5 opacity-0 -translate-x-2 absolute transition duration-300 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </Drawer>
  )
}
