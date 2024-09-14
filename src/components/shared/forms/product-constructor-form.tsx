'use client'

import React from 'react'

import { cn } from '@/lib'
import { useProductOptions, useProductDetails } from '@/hooks'

import { Button } from '@/components/ui'
import { ProductPreview, VariantSelector, IngredientCard } from '@/components/shared'

import type { ProductType } from '@/types/product.types'
import type { PizzaSizes, PizzaTypes } from '@/constants/variants.constants'

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
  const { name, description, imageUrl } = product

  const {
    size,
    type,
    ingredients,
    availableSizes,
    availableTypes,
    setSize,
    setType,
    onToggleIngredient,
  } = useProductOptions(product.variants)

  const { details, total } = useProductDetails(
    size,
    type,
    product.variants,
    product.ingredients,
    ingredients
  )

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
