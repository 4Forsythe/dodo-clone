import React from 'react'

import { cn } from '@/lib/utils'

import type { Category } from '@prisma/client'

import { Container, Categories, SortPopup } from '@/components/shared'

interface ITopBar {
  categories: Category[]
  className?: string
}

export const TopBar: React.FC<ITopBar> = ({ categories, className }) => {
  return (
    <nav className={cn('top-0 py-5 z-10 bg-white shadow-lg shadow-black/5 sticky', className)}>
      <Container className="flex items-center justify-between">
        {/* Список категорий */}
        <Categories items={categories} />

        {/* Сортировка */}
        <SortPopup />
      </Container>
    </nav>
  )
}
