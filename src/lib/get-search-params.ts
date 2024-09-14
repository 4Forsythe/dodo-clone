'use client'

import { useSearchParams } from 'next/navigation'

interface IGetSearchParamsOptions {
  split?: boolean
}

type GetSearchParamsResponse = string | string[] | undefined | []

export const getSearchParams = (
  key: string,
  options?: IGetSearchParamsOptions
): GetSearchParamsResponse => {
  const { split = false } = options || {}

  const searchParams = useSearchParams()

  const param = searchParams.get(key)

  if (!param) {
    return split ? [] : undefined
  }

  if (split) {
    return param.includes(',') ? param.split(',') : [param]
  }

  return param
}
