'use client'

import React from 'react'

import { cn } from '@/lib/utils'
import { useIntersection } from 'react-use'

import { Heading } from './heading'
import { ProductCard } from './product-card'
import { useCategoryStore } from '@/store/category'

interface IProductGroup {
  title: string
  items: any[]
  categoryId: number
  className?: string
}

export const ProductGroup: React.FC<IProductGroup> = ({ title, items, categoryId, className }) => {
  const { setCategory } = useCategoryStore()
  const intersectionRef = React.useRef(null)

  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  })

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      console.log('Новая категория:', categoryId)
      setCategory(categoryId)
    }
  }, [categoryId, intersection?.isIntersecting])

  return (
    <section id={title} ref={intersectionRef} className="flex flex-col">
      {/* Заголовок */}
      <Heading text={title} size="lg" />

      {/* Список товаров */}
      <div className={cn('gap-[50px] grid grid-cols-3', className)}>
        {items.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  )
}
