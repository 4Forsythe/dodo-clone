import React from 'react'

import { cn } from '@/lib'
import { ArrowUpDown } from 'lucide-react'

interface ISortPopup {
  className?: string
}

export const SortPopup: React.FC<ISortPopup> = ({ className }) => {
  return (
    <button
      className={cn(
        'h-10 px-5 gap-1.5 inline-flex items-center text-sm bg-gray-50 rounded-xl',
        className
      )}
    >
      <ArrowUpDown size={16} />
      <span className="font-bold">Сортировать по:</span>
      <span className="text-primary">рейтингу</span>
    </button>
  )
}
