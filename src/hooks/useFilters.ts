import React from 'react'

import { useSet } from 'react-use'
import { getSearchParams } from '@/lib/get-search-params'

import { DEFAULT_PRICE_FROM, DEFAULT_PRICE_TO } from '@/constants'

interface IPricesParams {
  from: number
  to: number
}

export interface IFilterParamsResponse {
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
  /* Размеры */
  const [sizes, { toggle: setSizes }] = useSet(
    new Set<string>(getSearchParams('sizes', { split: true }))
  )
  /* Типы теста */
  const [types, { toggle: setTypes }] = useSet(
    new Set<string>(getSearchParams('types', { split: true }))
  )

  /* Разброс цены */
  const from = Number(getSearchParams('from'))
  const to = Number(getSearchParams('to'))

  /* Значения границ разброса по умолчанию */
  const minPrice = DEFAULT_PRICE_FROM
  const maxPrice = DEFAULT_PRICE_TO

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

  return React.useMemo(
    () => ({
      sizes,
      types,
      prices,
      ingredients,
      setSizes,
      setTypes,
      setPrices: formatPrices,
      setIngredients,
    }),
    [sizes, types, prices, ingredients, setSizes, setTypes, setPrices, setIngredients]
  )
}
