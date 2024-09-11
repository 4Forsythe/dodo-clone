import React from 'react'

import type { Ingredient } from '@prisma/client'

import { api } from '@/services/api'

interface IIngredientsResponse {
  ingredients: Ingredient[]
}

export const useIngredients = (): IIngredientsResponse => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([])

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

  return { ingredients }
}
