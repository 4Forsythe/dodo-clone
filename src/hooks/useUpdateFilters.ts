'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import qs from 'qs'

import type { IFilterParamsResponse } from './useFilters'

export const useUpdateFilters = (filters: IFilterParamsResponse) => {
  const router = useRouter()
  const isMounted = React.useRef(false)

  const { sizes, types, prices, ingredients } = filters

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        sizes: Array.from(sizes),
        types: Array.from(types),
        ...prices,
        ingredients: Array.from(ingredients),
      }

      router.push(`?${qs.stringify(params, { arrayFormat: 'comma' })}`, { scroll: false })
    }

    isMounted.current = true
  }, [sizes, types, prices, ingredients])
}
