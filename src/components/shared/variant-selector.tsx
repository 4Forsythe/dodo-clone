'use client'

import React from 'react'

import { cn } from '@/lib/utils'

export type Variant = {
  text: string
  value: string
  disabled?: boolean
}

interface IVariantSelector {
  items: Variant[]
  value: Variant['value']
  className?: string
  onSelect: (value: Variant['value']) => void
}

export const VariantSelector: React.FC<IVariantSelector> = ({
  items,
  value,
  className,
  onSelect,
}) => {
  return (
    <div
      className={cn(
        'p-1 flex items-center justify-between bg-neutral-200/60 rounded-3xl select-none',
        className
      )}
    >
      {items.map((item) => (
        <button
          key={item.value}
          className={cn(
            'h-7 px-5 text-[0.8rem] font-medium flex flex-1 items-center justify-center rounded-3xl transition duration-400',
            {
              'bg-white shadow-lg shadow-gray-300': item.value === value,
              'text-gray-400 opacity-50 pointer-events-none': item.disabled,
            }
          )}
          disabled={item.disabled}
          onClick={() => onSelect(item.value)}
        >
          {item.text}
        </button>
      ))}
    </div>
  )
}
