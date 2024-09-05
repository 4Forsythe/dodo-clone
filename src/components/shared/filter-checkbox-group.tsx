'use client'

import React from 'react'

import { cn } from '@/lib/utils'

import { Input } from '@/components/ui'
import { FilterCheckbox, IFilterCheckbox } from './filter-checkbox'
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight } from 'lucide-react'

type Item = IFilterCheckbox

interface IFilterCheckboxGroup {
  text: string
  items: Item[]
  defaultItems: Item[]
  defaultValues?: string[]
  limit?: number
  searchPlaceholder?: string
  className?: string
  onChange?: (values: string[]) => void
}

export const FilterCheckboxGroup: React.FC<IFilterCheckboxGroup> = ({
  text,
  items,
  defaultItems,
  defaultValues,
  limit = 5,
  searchPlaceholder = 'Найти...',
  className,
  onChange,
}) => {
  const [isPopup, setIsPopup] = React.useState(false)

  const list = isPopup ? items : defaultItems.slice(0, limit)

  return (
    <div className={cn('py-6 pb-7 flex flex-col border-t border-neutral-200', className)}>
      <span className="mb-4 font-bold">{text}</span>

      {/* Расширенный поиск */}
      {isPopup && (
        <div className="mb-5">
          <Input className="bg-neutral-50 border-none" placeholder={searchPlaceholder} />
        </div>
      )}

      {/* Чекбоксы */}
      <div className="max-h-96 mb-3.5 pr-2 gap-3.5 flex flex-col overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            extra={item.extra}
            checked={false}
            onCheckedChange={(ids) => console.log(ids)}
          />
        ))}
      </div>

      {/* Показать все */}
      {items.length > limit && (
        <div className="border-t border-neutral-200">
          <button
            className="mt-2.5 gap-1 flex items-center text-sm text-primary"
            onClick={() => setIsPopup(!isPopup)}
          >
            <ChevronRight
              className={cn('transition duration-300', isPopup && '-rotate-90')}
              size={18}
            />
            {isPopup ? 'Скрыть' : 'Показать все'}
          </button>
        </div>
      )}
    </div>
  )
}
