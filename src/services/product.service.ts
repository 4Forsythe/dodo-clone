import { instance } from './axios.instance'

import type { Product } from '@prisma/client'
import type { IProductParams } from '@/types'

const ENDPOINT = '/products'

export const getAll = async (params?: IProductParams): Promise<Product[]> => {
  const { data } = await instance.get<Product[]>(ENDPOINT, { params })

  return data
}
