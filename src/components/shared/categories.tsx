'use client'

import React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { useFiltersStore } from '@/store'

import type { Category } from '@prisma/client'

interface ICategories {
  items: Category[]
  className?: string
}

export const Categories: React.FC<ICategories> = ({ items, className }) => {
  const { category } = useFiltersStore()

  return (
    <ul
      className={cn('h-10 p-1 gap-1.5 inline-flex items-center bg-gray-50 rounded-xl', className)}
    >
      {items.map((item) => (
        <li
          key={item.id}
          className={cn(
            'flex items-center text-sm font-bold rounded-xl',
            category === item.id && 'text-primary bg-white shadow-md shadow-gray-200'
          )}
        >
          <Link href={`#category=${item.id}`} className="px-4 py-1.5">
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
