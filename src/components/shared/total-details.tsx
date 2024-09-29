import React from 'react'

import { cn } from '@/lib'

interface ITotalDetails {
  name: string | React.JSX.Element
  value: string | React.JSX.Element
  className?: string
}

export const TotalDetails: React.FC<ITotalDetails> = ({ name, value, className }) => {
  return (
    <div className={cn('gap-0.5 flex items-center', className)}>
      <div className="gap-1 flex items-center text-sm font-medium">{name}</div>
      <div className="mt-auto mb-[5px] flex-1 border-b border-neutral-300 border-dashed" />
      <div className="gap-[1px] flex items-center text-sm font-semibold">{value}</div>
    </div>
  )
}
