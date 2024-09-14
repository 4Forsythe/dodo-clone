import { instance } from './axios.instance'

import type { ICartResponse } from '@/types'

const ENDPOINT = '/carts'

export const getAll = async (): Promise<ICartResponse> => {
  const { data } = await instance.get<ICartResponse>(ENDPOINT)

  return data
}
