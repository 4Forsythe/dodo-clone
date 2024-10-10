import { instance } from './axios.instance'

import type { StoriesType } from '@/types'

const ENDPOINT = '/stories'

export const getAll = async (): Promise<StoriesType[]> => {
  const { data } = await instance.get<StoriesType[]>(ENDPOINT)

  return data
}
