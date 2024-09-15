import { instance } from './axios.instance'

import type { ICreateCartItem, ICartResponse } from '@/types'

const ENDPOINT = '/carts'

export const create = async (dto: ICreateCartItem): Promise<ICartResponse> => {
  const { data } = await instance.post<ICartResponse>(ENDPOINT, dto)

  return data
}

export const getAll = async (): Promise<ICartResponse> => {
  const { data } = await instance.get<ICartResponse>(ENDPOINT)

  return data
}

export const update = async (id: string, dto: { quantity: number }): Promise<ICartResponse> => {
  const { data } = await instance.patch<ICartResponse>(`${ENDPOINT}/${id}`, dto)

  return data
}

export const remove = async (id: string): Promise<ICartResponse> => {
  const { data } = await instance.delete<ICartResponse>(`${ENDPOINT}/${id}`)

  return data
}
