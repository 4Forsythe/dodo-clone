'use client'

import React from 'react'

import { cn } from '@/lib'
import { useFilters, useIngredients, useUpdateFilters } from '@/hooks'
import { PIZZA_SIZES, PIZZA_TYPES } from '@/constants/variants.constants'

import { Input } from '@/components/ui'
import { RangeSlider, FilterCheckboxGroup } from '@/components/shared'

interface IFilters {
  className?: string
}

export const Filters: React.FC<IFilters> = ({ className }) => {
  const filters = useFilters()
  const { ingredients: ingredientsData } = useIngredients()

  const { types, sizes, prices, ingredients, setTypes, setSizes, setPrices, setIngredients } =
    filters

  const formattedIngredients = ingredientsData.map((item) => ({
    text: item.name,
    value: String(item.id),
  }))

  const setPricesRange = (prices: number[]) => {
    setPrices('from', prices[0])
    setPrices('to', prices[1])
  }

  useUpdateFilters(filters)

  return (
    <div className={cn('my-6', className)}>
      {/* Размеры */}
      <FilterCheckboxGroup
        id="sizes"
        className="py-4 flex flex-col"
        text="Размеры"
        items={PIZZA_SIZES}
        values={sizes}
        onChange={setSizes}
      />
      {/* Типы теста */}
      <FilterCheckboxGroup
        id="types"
        className="py-4 flex flex-col"
        text="Тесто"
        items={PIZZA_TYPES}
        values={types}
        onChange={setTypes}
      />

      {/* Стоимость */}
      <div className="py-4 flex flex-col border-t border-neutral-200">
        <span className="mb-4 font-bold">Стоимость</span>
        <div className="mb-5 gap-2.5 flex items-center">
          <Input
            min={275}
            max={1250}
            type="number"
            placeholder={`от ${prices.from} ₽`}
            value={String(prices.from)}
            onChange={(e) => setPrices('from', Number(e.target.value))}
          />
          <Input
            min={275}
            max={1250}
            type="number"
            placeholder={`до ${prices.to} ₽`}
            value={String(prices.to)}
            onChange={(e) => setPrices('to', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={275}
          max={1250}
          step={25}
          value={[prices.from, prices.to]}
          onValueChange={setPricesRange}
        />
      </div>

      {/* Ингредиенты */}
      <FilterCheckboxGroup
        id="ingredients"
        className="py-4 flex flex-col"
        text="Ингредиенты"
        items={formattedIngredients}
        shortItems={formattedIngredients}
        searchPlaceholder="Найти ингредиенты..."
        values={ingredients}
        onChange={setIngredients}
      />
    </div>
  )
}
