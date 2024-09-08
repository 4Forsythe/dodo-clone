import React from 'react'

import type { Ingredient } from '@prisma/client'

import { useSet } from 'react-use'

import { api } from '@/services/api'

interface IIngredientsResponse {
  ingredients: Ingredient[]
  values: Set<string>
  onToggle: (value: string) => void
}

export const useIngredients = (): IIngredientsResponse => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([])

  const [values, { toggle }] = useSet(new Set<string>([]))

  const getIngredients = async () => {
    try {
      const data = await api.ingredients.getAll()
      setIngredients(data)
    } catch (error) {
      console.error('useIngredients: getIngredients()', error)
    }
  }

  React.useEffect(() => {
    getIngredients()
  }, [])

  return { ingredients, values, onToggle: toggle }
}
