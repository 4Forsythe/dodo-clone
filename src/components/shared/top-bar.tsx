import React from 'react'

import { cn } from '@/lib/utils'

import { Container } from './container'
import { Categories } from './categories'
import { SortPopup } from './sort-popup'

interface ITopBar {
  className?: string
}

export const TopBar: React.FC<ITopBar> = ({ className }) => {
  return (
    <nav className={cn('top-0 py-5 z-10 bg-white shadow-lg shadow-black/5 sticky', className)}>
      <Container className="flex items-center justify-between">
        {/* Список категорий */}
        <Categories />

        {/* Сортировка */}
        <SortPopup />
      </Container>
    </nav>
  )
}
