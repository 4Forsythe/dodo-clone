import { create } from 'zustand'

import { api } from '@/services/api'
import { mapCartItems } from '@/lib/map-cart-items'

import type { ICreateCartItem } from '@/types'

export type CartItemState = {
  id: string
  name: string
  size: number | null
  type?: number | null
  weight: number
  imageUrl: string
  price: number
  quantity: number
  ingredients: Array<{ name: string; price: number }>
}

interface ICartState {
  amount: number
  items: CartItemState[]
  isLoading: boolean
  isError: boolean
  getCart: () => Promise<void>
  createCartItem: (dto: ICreateCartItem) => Promise<void>
  updateCartItem: (id: string, dto: { quantity: number }) => Promise<void>
  deleteCartItem: (id: string) => Promise<void>
}

export const useCartStore = create<ICartState>((set, get) => ({
  amount: 0,
  items: [],
  isLoading: true,
  isError: false,
  getCart: async () => {
    try {
      set({ isLoading: true, isError: false })

      const data = await api.carts.getAll()
      const { amount, items } = mapCartItems(data)

      set({ amount, items })
    } catch (error) {
      set({ isError: true })
      console.error('useCartStore(): getCart()', error)
    } finally {
      set({ isLoading: false })
    }
  },
  createCartItem: async (dto: ICreateCartItem) => {
    try {
      set({ isLoading: true, isError: false })

      const data = await api.carts.create(dto)
      const { amount, items } = mapCartItems(data)

      set({ amount, items })
    } catch (error) {
      set({ isError: true })
      console.error('useCartStore(): createCartItem()', error)
    } finally {
      set({ isLoading: false })
    }
  },
  updateCartItem: async (id: string, dto: { quantity: number }) => {
    try {
      set({ isLoading: true, isError: false })

      const data = await api.carts.update(id, dto)
      const { amount, items } = mapCartItems(data)

      set({ amount, items })
    } catch (error) {
      set({ isError: true })
      console.error('useCartStore(): updateCartItem()', error)
    } finally {
      set({ isLoading: false })
    }
  },
  deleteCartItem: async (id: string) => {
    try {
      set({ isLoading: true, isError: false })

      const data = await api.carts.remove(id)
      const { amount, items } = mapCartItems(data)

      set({ amount, items })
    } catch (error) {
      set({ isError: true })
      console.error('useCartStore(): deleteCartItem()', error)
    } finally {
      set({ isLoading: false })
    }
  },
}))
