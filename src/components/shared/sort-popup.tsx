'use client'

import React from 'react'

import { cn } from '@/lib'
import { ArrowUpDown } from 'lucide-react'

import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'

import { SORTS } from '@/constants'
import { useFiltersStore } from '@/store'

interface ISortPopup {
  className?: string
}

export const SortPopup: React.FC<ISortPopup> = ({ className }) => {
  const { sortBy, setSortBy } = useFiltersStore()

  const label = SORTS.find((sort) => sort.property === sortBy)?.name

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'h-10 px-5 gap-1.5 inline-flex items-center text-sm bg-gray-50 rounded-xl transition duration-200 hover:bg-gray-100',
            className
          )}
        >
          <ArrowUpDown size={16} />
          <span className="font-medium">Сортировать по:</span>
          <span className="font-bold text-primary leading-4 border-b border-dashed border-primary">
            {label}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-60 mt-1 p-0 text-sm">
        <ul className="p-2.5 gap-1.5 flex flex-col">
          {SORTS.map((sort) => (
            <PopoverClose asChild>
              <li
                key={sort.property}
                className={cn(
                  'px-3 py-1.5 font-medium rounded-xl cursor-pointer select-none transition duration-200 hover:bg-gray-50',
                  {
                    'font-semibold text-primary bg-secondary hover:bg-primary/20':
                      sortBy === sort.property,
                  }
                )}
                onClick={() => setSortBy(sort.property)}
              >
                {sort.name}
              </li>
            </PopoverClose>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
