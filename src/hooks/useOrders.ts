import React from 'react'

import { useOrderStore, type IOrderState } from '@/store'

export const useOrders = (): IOrderState => {
  const orders = useOrderStore()

  React.useEffect(() => {
    orders.getOrders()
  }, [])

  return orders
}
