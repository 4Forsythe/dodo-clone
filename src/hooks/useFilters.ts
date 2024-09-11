import React from 'react'

import { useSet } from 'react-use'
import { getSearchParams } from '@/lib/get-search-params'

import { minPrice, maxPrice } from '@/constants/filters.constants'

interface IPricesParams {
  from: number
  to: number
}

interface IFilterParamsResponse {
  types: Set<string>
  sizes: Set<string>
  prices: IPricesParams
  ingredients: Set<string>
  setTypes: (key: string) => void
  setSizes: (key: string) => void
  setPrices: (key: keyof IPricesParams, value: number) => void
  setIngredients: (key: string) => void
}

export const useFilters = (): IFilterParamsResponse => {
  /* Типы теста */
  const [types, { toggle: setTypes }] = useSet(
    new Set<string>(getSearchParams('types', { split: true }))
  )

  /* Размеры */
  const [sizes, { toggle: setSizes }] = useSet(
    new Set<string>(getSearchParams('sizes', { split: true }))
  )

  /* Разброс цены */
  const from = Number(getSearchParams('from'))
  const to = Number(getSearchParams('to'))

  const [prices, setPrices] = React.useState<IPricesParams>({
    from: from && from >= minPrice && from <= maxPrice ? from : minPrice,
    to: to && to >= minPrice && to <= maxPrice ? to : maxPrice,
  })

  const formatPrices = (key: keyof IPricesParams, value: number) => {
    setPrices((prev) => ({ ...prev, [key]: value }))
  }

  /* Ингредиенты */
  const [ingredients, { toggle: setIngredients }] = useSet(
    new Set<string>(getSearchParams('ingredients', { split: true }))
  )

  return {
    types,
    sizes,
    prices,
    ingredients,
    setTypes,
    setSizes,
    setPrices: formatPrices,
    setIngredients,
  }
}
