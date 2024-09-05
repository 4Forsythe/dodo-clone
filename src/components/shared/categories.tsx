'use client'

import React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store/category'

interface ICategories {
  className?: string
}

const categories = [
  'Завтрак',
  'Пиццы',
  'Комбо',
  'Закуски',
  'Коктейли',
  'Кофе',
  'Напитки',
  'Десерты',
]

export const Categories: React.FC<ICategories> = ({ className }) => {
  const { category } = useCategoryStore()

  return (
    <ul
      className={cn('h-10 p-1 gap-1.5 inline-flex items-center bg-gray-50 rounded-xl', className)}
    >
      {categories.map((item, index) => (
        <li
          key={index}
          className={cn(
            'flex items-center text-sm font-bold rounded-xl',
            category === index && 'text-primary bg-white shadow-md shadow-gray-200'
          )}
        >
          <Link href={`/#${item}`} className="px-4 py-1.5">
            {item}
          </Link>
        </li>
      ))}
    </ul>
  )
}
