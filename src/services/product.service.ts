import { instance } from './axios.instance'

import type { Product } from '@prisma/client'

const ENDPOINT = '/products'

interface IProductParams {
  query?: string
  limit?: number
  offset?: number
}

export const getAll = async (params?: IProductParams): Promise<Product[]> => {
  const { data } = await instance.get<Product[]>(ENDPOINT, { params })

  return data
}
