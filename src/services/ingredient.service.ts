import { instance } from './axios.instance'

import type { Ingredient } from '@prisma/client'

const ENDPOINT = '/ingredients'

interface IIngredientParams {
  query?: string
  limit?: number
  offset?: number
}

export const getAll = async (params?: IIngredientParams): Promise<Ingredient[]> => {
  const { data } = await instance.get<Ingredient[]>(ENDPOINT, { params })

  return data
}
