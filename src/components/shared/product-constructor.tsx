'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { useCartStore } from '@/store'
import { ProductForm, ProductConstructorModal } from '@/components/shared'

import type { ProductType } from '@/types'

interface IProductConstructor {
  product: ProductType
  isModal?: boolean
  className?: string
}

export const ProductConstructor: React.FC<IProductConstructor> = ({
  product,
  isModal,
  className,
}) => {
  const router = useRouter()
  const { isPending, createCartItem } = useCartStore()

  const onClose = () => {
    if (isModal) router.back()
  }

  const onSubmit = async (variant: number, ingredients: number[]) => {
    if (!isPending) {
      await createCartItem({ variantId: variant, doppings: ingredients }, onClose)
    }
  }

  if (isModal) {
    return (
      <div className={className}>
        <ProductConstructorModal
          product={product}
          isLoading={isPending}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </div>
    )
  }

  return (
    <div className={className}>
      <ProductForm product={product} isLoading={isPending} onSubmit={onSubmit} />
    </div>
  )
}
