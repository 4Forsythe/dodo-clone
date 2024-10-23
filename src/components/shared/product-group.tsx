'use client'

import React from 'react'

import { cn } from '@/lib'
import { useIntersection } from 'react-use'

import { Heading, ProductCard } from '@/components/shared'

import { useFiltersStore } from '@/store'

import type { ProductType } from '@/types'

interface IProductGroup {
  title: string
  items: ProductType[]
  categoryId?: number
  className?: string
}

export const ProductGroup: React.FC<IProductGroup> = ({ title, items, categoryId, className }) => {
  const { setCategory } = useFiltersStore()
  const intersectionRef = React.useRef(null)

  const intersection = useIntersection(intersectionRef, {
    threshold: 0.75,
    rootMargin: '0px',
  })

  React.useEffect(() => {
    if (categoryId && intersection?.isIntersecting) {
      setCategory(categoryId)
    }
  }, [categoryId, setCategory, intersection?.isIntersecting])

  return (
    <section
      id={categoryId ? `category=${categoryId}` : undefined}
      ref={intersectionRef}
      className="flex flex-col"
    >
      {/* Заголовок */}
      <Heading text={title} size="lg" />

      {/* Список товаров */}
      <div className={cn('gap-[50px] grid grid-cols-3', className)}>
        {items.map((item) => (
          <ProductCard key={item.id} price={item.variants[0].price} {...item} />
        ))}
      </div>
    </section>
  )
}
