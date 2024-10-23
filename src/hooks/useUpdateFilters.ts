'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import qs from 'qs'
import { useFiltersStore } from '@/store'

import type { IFilterParamsResponse } from './useFilters'

export const useUpdateFilters = (filters: IFilterParamsResponse) => {
  const router = useRouter()
  const isMounted = React.useRef(false)

  const { category, sortBy } = useFiltersStore()

  const { sizes, types, prices, ingredients } = filters

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        sizes: Array.from(sizes),
        types: Array.from(types),
        ...prices,
        ingredients: Array.from(ingredients),
        sortBy,
      }

      router.push(`?${qs.stringify(params, { arrayFormat: 'comma' })}#category=${category}`, {
        scroll: false,
      })
    }

    isMounted.current = true
  }, [router, sizes, types, prices, ingredients, category, sortBy])
}
