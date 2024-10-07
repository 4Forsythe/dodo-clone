import React from 'react'

import { cn } from '@/lib'

import { Checkbox } from '@/components/ui'

export interface IFilterCheckbox {
  id?: string
  text: string
  value: string
  extra?: React.ReactNode
  className?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const FilterCheckbox: React.FC<IFilterCheckbox> = ({
  id,
  text,
  value,
  extra,
  className,
  checked,
  onCheckedChange,
}) => {
  return (
    <div className={cn('w-fit inline-flex items-center group space-x-2', className)}>
      <Checkbox
        id={`checkbox-${String(id)}-${String(value)}`}
        className="w-5 h-5 rounded-md"
        value={value}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <label
        htmlFor={`checkbox-${String(id)}-${String(value)}`}
        className={cn(
          'flex-1 text-sm leading-none cursor-pointer select-none group-hover:text-primary transition duration-200',
          checked && 'text-primary'
        )}
      >
        {text}
      </label>
      {extra}
    </div>
  )
}
