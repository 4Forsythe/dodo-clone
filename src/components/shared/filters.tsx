'use client'

import React from 'react'

import { Input } from '@/components/ui'
import { RangeSlider } from './range-slider'
import { FilterCheckboxGroup } from './filter-checkbox-group'

import { useIngredients } from '@/hooks/useIngredients'
import { useSet } from 'react-use'

interface IFilters {
  className?: string
}

interface IPricingRange {
  from: number
  to: number
}

export const Filters: React.FC<IFilters> = ({ className }) => {
  const [types, { toggle: onToggleTypes }] = useSet(new Set<string>([]))
  const [sizes, { toggle: onToggleSizes }] = useSet(new Set<string>([]))

  const [prices, setPrices] = React.useState<IPricingRange>({ from: 275, to: 1250 })

  const { ingredients, values: ingredientIds, onToggle: onToggleIngredients } = useIngredients()

  const ingredientGroup = ingredients.map((item) => ({ text: item.name, value: String(item.id) }))

  const onPriceRange = (key: keyof IPricingRange, value: number) => {
    setPrices({ ...prices, [key]: value })
  }

  React.useEffect(() => {
    console.log(types, sizes, prices, ingredientIds)
  }, [types, sizes, prices, ingredientIds])

  return (
    <div className={className}>
      {/* Типы теста */}
      <FilterCheckboxGroup
        id="types"
        className="py-4 flex flex-col"
        text="Тесто"
        items={[
          {
            text: 'Тонкое',
            value: '1',
          },
          {
            text: 'Традиционное',
            value: '2',
          },
        ]}
        values={types}
        onChange={onToggleTypes}
      />

      {/* Размеры */}
      <FilterCheckboxGroup
        id="sizes"
        className="py-4 flex flex-col"
        text="Размеры"
        items={[
          {
            text: '25 см',
            value: '25',
          },
          {
            text: '30 см',
            value: '30',
          },
          {
            text: '35 см',
            value: '35',
          },
        ]}
        values={sizes}
        onChange={onToggleSizes}
      />

      {/* Стоимость */}
      <div className="py-4 flex flex-col border-t border-neutral-200">
        <span className="mb-4 font-bold">Стоимость</span>
        <div className="mb-4 gap-2.5 flex items-center">
          <Input
            min={275}
            max={1250}
            type="number"
            placeholder={`от ${prices.from} ₽`}
            value={String(prices.from)}
            onChange={(e) => onPriceRange('from', Number(e.target.value))}
          />
          <Input
            min={275}
            max={1250}
            type="number"
            placeholder={`до ${prices.to} ₽`}
            value={String(prices.to)}
            onChange={(e) => onPriceRange('to', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={275}
          max={1250}
          step={25}
          value={[prices.from, prices.to]}
          onValueChange={([from, to]) => setPrices({ from, to })}
        />
      </div>

      {/* Ингредиенты */}
      <FilterCheckboxGroup
        id="ingredients"
        className="py-4 flex flex-col"
        text="Ингредиенты"
        items={ingredientGroup}
        shortItems={ingredientGroup}
        searchPlaceholder="Найти ингредиенты..."
        values={ingredientIds}
        onChange={onToggleIngredients}
      />
    </div>
  )
}
