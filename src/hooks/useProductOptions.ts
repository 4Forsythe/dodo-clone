'use client'

import React from 'react'

import { useSet } from 'react-use'
import { PIZZA_SIZES, PIZZA_TYPES } from '@/constants/variants.constants'

import type { Variant } from '@/components/shared/variant-selector'
import type { ProductVariant } from '@prisma/client'
import type { PizzaSizes, PizzaTypes } from '@/constants/variants.constants'

interface IProductVariantResponse {
  size: PizzaSizes
  type: PizzaTypes
  ingredients: Set<number>
  availableSizes: Variant[]
  availableTypes: Variant[]
  setSize: (size: PizzaSizes) => void
  setType: (type: PizzaTypes) => void
  onToggleIngredient: (ingredient: number) => void
}

/**
 * Хук для получения возможных вариантов (опций) продукта
 * @param variants - варианты продукта
 * @returns size, type, ingredients, availableSizes, availableTypes, setSize, setType, onToggleIngredient
 */

export const useProductOptions = (variants: ProductVariant[]): IProductVariantResponse => {
  const [size, setSize] = React.useState<PizzaSizes>(30)
  const [type, setType] = React.useState<PizzaTypes>(1)
  const [ingredients, { toggle: onToggleIngredient }] = useSet(new Set<number>([]))

  const availableSizeVariants = variants.filter((variant) => variant.size === size)

  const availableSizes: Variant[] = PIZZA_SIZES.map((size) => ({
    text: size.text,
    value: size.value,
    disabled: !variants.some((variant) => variant.size === Number(size.value)),
  }))

  const availableTypes: Variant[] = PIZZA_TYPES.map((type) => ({
    text: type.text,
    value: type.value,
    disabled: !availableSizeVariants.some((variant) => variant.type === Number(type.value)),
  }))

  React.useEffect(() => {
    const isAvailableSize = availableSizes.find(
      (item) => Number(item.value) === size && !item.disabled
    )
    const isAvailableType = availableTypes.find(
      (item) => Number(item.value) === type && !item.disabled
    )

    const firstAvailableSize = availableSizes.find((item) => !item.disabled)
    const firstAvailableType = availableTypes.find((item) => !item.disabled)

    if (!isAvailableSize && firstAvailableSize) {
      setSize(Number(firstAvailableSize.value) as PizzaSizes)
    }
    if (!isAvailableType && firstAvailableType) {
      setType(Number(firstAvailableType.value) as PizzaTypes)
    }
  }, [size, type])

  return {
    size,
    type,
    ingredients,
    availableSizes,
    availableTypes,
    setSize,
    setType,
    onToggleIngredient,
  }
}
