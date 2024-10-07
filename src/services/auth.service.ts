import { instance } from './axios.instance'

import type { User } from '@prisma/client'

const ENDPOINT = '/auth'

export const getProfile = async (): Promise<User> => {
  const { data } = await instance.get<User>(`${ENDPOINT}/me`)

  return data
}

export const activate = async (params: { user: string; code: string }): Promise<void> => {
  const { data } = await instance.get<void>(`${ENDPOINT}/activate`, { params })

  return data
}
