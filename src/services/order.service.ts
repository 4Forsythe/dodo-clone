import { instance } from './axios.instance'

import type { Order } from '@prisma/client'
import type { IOrderParams } from '@/types'

const ENDPOINT = '/orders'

export const getAll = async (params?: IOrderParams): Promise<Order[]> => {
  const { data } = await instance.get<Order[]>(ENDPOINT, { params })

  return data
}
