'use client'

import React from 'react'

import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

import { Input } from '@/components/ui'
import { FilterCheckbox, IFilterCheckbox } from './filter-checkbox'

type Item = IFilterCheckbox

interface IFilterCheckboxGroup {
  id: string
  text: string
  items: Item[]
  shortItems?: Item[]
  limit?: number
  searchPlaceholder?: string
  values?: Set<string>
  onChange?: (value: string) => void
  className?: string
}

export const FilterCheckboxGroup: React.FC<IFilterCheckboxGroup> = ({
  id,
  text,
  items,
  shortItems,
  limit = 5,
  searchPlaceholder = 'Найти...',
  values,
  onChange,
  className,
}) => {
  const [query, setQuery] = React.useState('')
  const [isPopup, setIsPopup] = React.useState(false)

  const list = isPopup
    ? items.filter((item) => item.text.toLowerCase().includes(query.toLowerCase()))
    : (shortItems || items).slice(0, limit)

  return (
    <div className={cn('py-6 pb-7 flex flex-col', className)}>
      <span className="mb-4 font-bold">{text}</span>

      {/* Расширенный поиск */}
      {isPopup && (
        <div className="mb-5">
          <Input
            className="bg-neutral-100 border-none"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}

      {/* Чекбоксы */}
      <div className="max-h-96 pr-2 gap-3.5 flex flex-col overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            id={id}
            key={index}
            text={item.text}
            value={item.value}
            extra={item.extra}
            checked={values?.has(item.value)}
            onCheckedChange={() => onChange?.(item.value)}
          />
        ))}
      </div>

      {/* Показать все */}
      {items.length > limit && (
        <div className="mt-3.5 border-t border-neutral-200">
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
