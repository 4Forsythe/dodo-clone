'use client'

import React from 'react'

import { cn } from '@/lib'
import { useProductOptions, useProductDetails } from '@/hooks'

import { Button } from '@/components/ui'
import { ProductPreview, VariantSelector, IngredientCard } from '@/components/shared'

import type { ProductType } from '@/types/product.types'
import type { PizzaSizes, PizzaTypes } from '@/constants/variants.constants'

interface IProductForm {
  product: ProductType
  isLoading?: boolean
  className?: string
  onSubmit: (variant: number, ingredients: number[]) => void
}

export const ProductForm: React.FC<IProductForm> = ({
  product,
  isLoading,
  className,
  onSubmit,
}) => {
  const { name, description, imageUrl } = product

  const {
    size,
    type,
    variantId,
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

  const handleSubmit = () => {
    if (variantId) {
      onSubmit(variantId, Array.from(ingredients))
    }
  }

  return (
    <div className={cn('gap-12 flex flex-1 justify-between overflow-hidden', className)}>
      <div className="w-[35.5rem] h-[35.5rem] flex items-center justify-center bg-secondary/50 rounded-3xl">
        <ProductPreview src={imageUrl} width={480} height={480} alt={name} />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="px-8 flex flex-1 flex-col">
          {/* Общая информация */}
          <div className="mb-3">
            <h1 className="text-[34px] font-bold">{name}</h1>
            <div className="mb-1.5">
              <span className="text-sm text-gray-400">{details}</span>
            </div>
            <p className="text-sm font-semibold text-gray-600">{description}</p>
          </div>

          {/* Выбор вариации */}
          {product.variants[0].type && (
            <div className="max-w-[70%] my-2 gap-2 flex flex-col">
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
          )}

          {/* Выбор ингредиентов */}
          {product.ingredients.length > 0 && (
            <div className="pt-3.5 pb-6 flex flex-col">
              <span className="mb-3 text-xl font-bold">Добавить по вкусу</span>
              <div className="max-h-[210px] p-2 gap-2 grid grid-cols-4 bg-neutral-200/40 rounded-2xl overflow-y-auto scrollbar">
                {product.ingredients.map((ingredient) => (
                  <IngredientCard
                    key={ingredient.id}
                    size="md"
                    className="shadow-none"
                    {...ingredient}
                    isSelected={ingredients.has(ingredient.id)}
                    onClick={() => onToggleIngredient(ingredient.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 px-8">
          <Button
            className="min-w-[50%] h-[3rem] px-10 font-bold rounded-2xl"
            type="submit"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            В корзину за {total} ₽
          </Button>
        </div>
      </div>
    </div>
  )
}
