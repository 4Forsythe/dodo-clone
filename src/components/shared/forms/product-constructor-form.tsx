'use client'

import React from 'react'

import { cn } from '@/lib/utils'
import { useSet } from 'react-use'

import { Button } from '@/components/ui'
import { ProductPreview, VariantSelector, IngredientCard } from '@/components/shared'

import {
  PIZZA_SIZES,
  PIZZA_TYPES,
  PIZZA_TYPES_MAP,
  type PizzaSizes,
  type PizzaTypes,
} from '@/constants/variants.constants'

import type { ProductType } from '@/types/product.types'
import type { Variant } from '@/components/shared/variant-selector'

interface IProductConstructorForm {
  product: ProductType
  className?: string
  onSubmit: () => void
}

export const ProductConstructorForm: React.FC<IProductConstructorForm> = ({
  product,
  className,
  onSubmit,
}) => {
  const [size, setSize] = React.useState<PizzaSizes>(30)
  const [type, setType] = React.useState<PizzaTypes>(1)

  const { name, imageUrl, description } = product

  const isPizza = Boolean(product.variants[0].type)

  const availableSizeVariants = product.variants.filter((variant) => variant.size === size)

  const availableSizes: Variant[] = PIZZA_SIZES.map((size) => ({
    text: size.text,
    value: size.value,
    disabled: !product.variants.some((variant) => variant.size === Number(size.value)),
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

  const [ingredients, { toggle: onToggleIngredient }] = useSet(new Set<number>([]))

  const calcPizzaPrice = () => {
    const basePrice = product.variants.find(
      (variant) => variant.size === size && variant.type === type
    )?.price

    const doppingPrice = product.ingredients
      .filter((ingredient) => ingredients.has(ingredient.id))
      .reduce((sum, ingredient) => sum + ingredient.price, 0)

    return Number(basePrice) + doppingPrice
  }

  const calcProductPrice = () => {
    return product.variants.find((variant) => variant.size === size)?.price
  }

  const calcProductWeight = () => {
    return product.variants.find((variant) => variant.size === size && variant.type === type)
      ?.weight
  }

  const details = isPizza
    ? `${size} см, ${PIZZA_TYPES_MAP[type].toLowerCase()} тесто, ${calcProductWeight()} г`
    : `${calcProductWeight()} г`

  const total = isPizza ? calcPizzaPrice() : calcProductPrice()

  return (
    <div className={cn('flex flex-1 overflow-hidden', className)}>
      <div className="max-w-[33rem] flex flex-1 items-center justify-center">
        <ProductPreview src={imageUrl} size={size} alt={name} />
      </div>

      <div className="w-[25rem] max-w-[25rem] py-8 flex flex-1 flex-col bg-neutral-50">
        <div className="px-8 flex flex-col overflow-auto scrollbar">
          {/* Общая информация */}
          <div className="mb-3 grow">
            <h1 className="text-2xl font-bold">{name}</h1>
            <div className="mb-1.5">
              <span className="text-sm text-gray-400">{details}</span>
            </div>
            <p className="text-gray-700">{description}</p>
          </div>

          {/* Выбор вариации */}
          <div className="my-2 gap-2 flex flex-col">
            <VariantSelector
              items={availableSizes}
              value={String(size)}
              onSelect={(value) => setSize(Number(value) as PizzaSizes)}
            />
            <VariantSelector
              items={availableTypes}
              value={String(type)}
              onSelect={(value) => setType(Number(value) as PizzaTypes)}
            />
          </div>

          {/* Выбор ингредиентов */}
          <div className="pt-3.5 pb-6 flex flex-col">
            <span className="mb-3 text-xl font-bold">Добавить по вкусу</span>
            <div className="gap-2 grid grid-cols-3">
              {product.ingredients.map((ingredient) => (
                <IngredientCard
                  key={ingredient.id}
                  {...ingredient}
                  isSelected={ingredients.has(ingredient.id)}
                  onClick={() => onToggleIngredient(ingredient.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 px-8">
          <Button className="w-full h-[3rem] px-10 font-bold rounded-3xl">
            В корзину за {total} ₽
          </Button>
        </div>
      </div>
    </div>
  )
}
