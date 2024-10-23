import React from 'react'

import { useCartStore, type ICartState } from '@/store'

export const useCart = (): ICartState => {
  const cart = useCartStore()

  React.useEffect(() => {
    cart.getCart()
  })

  return cart
}
