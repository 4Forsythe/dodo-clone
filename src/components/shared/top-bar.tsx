'use client'

import React from 'react'

import { cn } from '@/lib'

import { Container, Categories, SortPopup, LogInButton, CartButton } from '@/components/shared'

import type { Category } from '@prisma/client'

interface ITopBar {
  categories: Category[]
  className?: string
}

export const TopBar: React.FC<ITopBar> = ({ categories, className }) => {
  const [hasControls, setHasControls] = React.useState(false)

  const handleScroll = () => {
    if (window.scrollY >= 115) {
      setHasControls(true)
    } else {
      setHasControls(false)
    }
  }

  React.useEffect(() => {
    // Проверяем положение скролла при обновлении страницы
    handleScroll()

    // Следим за положением во время изменения скролла
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      className={cn(
        'top-0 py-3.5 z-10 backdrop-filter backdrop-blur-xl shadow-lg shadow-neutral-300/20 sticky',
        className
      )}
    >
      <Container className="flex items-center justify-between relative">
        {/* Список категорий */}
        <Categories items={categories} />

        {/* Взаимодействие */}
        <div className="gap-3 flex items-center">
          <SortPopup
            className={cn(
              'right-0 translate-x-0 absolute transition duration-200',
              hasControls && '-translate-x-[14.5rem]'
            )}
          />

          <div
            className={cn(
              'opacity-0 -translate-y-10 transition duration-300',
              hasControls && 'opacity-100 translate-y-0'
            )}
          >
            {hasControls && (
              <div className="gap-1.5 flex items-center">
                <LogInButton hasCart={true} />
                <CartButton />
              </div>
            )}
          </div>
        </div>
      </Container>
    </nav>
  )
}
