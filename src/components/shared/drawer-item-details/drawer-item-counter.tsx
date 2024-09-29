import React from 'react'

import { cn } from '@/lib'
import { Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui'

interface IDrawerItemCounter {
  value?: number
  size?: 'sm' | 'lg'
  disabled?: boolean
  className?: string
  onClick: (type: 'increment' | 'decrement') => void
}

export const DrawerItemCounter: React.FC<IDrawerItemCounter> = ({
  value = 1,
  size = 'sm',
  disabled,
  className,
  onClick,
}) => {
  return (
    <div className={cn('gap-3 inline-flex items-center justify-between', className)}>
      <Button
        className={cn(
          'p-0 bg-neutral-50 border-neutral-200/50 hover:bg-neutral-200/80 disabled:bg-gray-50 disabled:border-gray-300 disabled:text-gray-500 transition duration-200',
          size === 'sm' ? 'w-7 h-7 rounded-md' : 'w-9 h-9 rounded-lg'
        )}
        variant="outline"
        type="button"
        disabled={disabled || value === 1}
        onClick={() => onClick('decrement')}
      >
        <Minus size={size === 'sm' ? 16 : 20} />
      </Button>

      <span className={cn('font-bold', size === 'sm' && 'text-sm')}>{value}</span>

      <Button
        className={cn(
          'p-0 bg-neutral-50 border-neutral-200/50 hover:bg-neutral-200/80 disabled:bg-gray-50 disabled:border-gray-300 disabled:text-gray-500 transition duration-200',
          size === 'sm' ? 'w-7 h-7 rounded-md' : 'w-9 h-9 rounded-lg'
        )}
        variant="outline"
        type="button"
        disabled={disabled}
        onClick={() => onClick('increment')}
      >
        <Plus size={size === 'sm' ? 16 : 20} />
      </Button>
    </div>
  )
}
