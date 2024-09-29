'use client'

import React from 'react'

import { cn } from '@/lib/utils'
import { useIntersection } from 'react-use'
import { useCategoryStore } from '@/store/category'

import { Heading, ProductCard } from '@/components/shared'

import type { ProductType } from '@/types'

interface IProductGroup {
  title: string
  items: ProductType[]
  categoryId: number
  className?: string
}

export const ProductGroup: React.FC<IProductGroup> = ({ title, items, categoryId, className }) => {
  const { setCategoryId } = useCategoryStore()
  const intersectionRef = React.useRef(null)

  const intersection = useIntersection(intersectionRef, {
    threshold: 0.75,
    rootMargin: '0px',
  })

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setCategoryId(categoryId)
    }
  }, [categoryId, intersection?.isIntersecting])

  return (
    <section id={`category=${categoryId}`} ref={intersectionRef} className="flex flex-col">
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
